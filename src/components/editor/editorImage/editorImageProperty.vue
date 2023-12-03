<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, h, reactive, ref, toRef, watch } from 'vue';
    import { EEditorInputFeildType } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { getEditorFunction, getInputFeildOptions } from 'src/config/editorData';
    import { IFourImage, IInputField } from 'src/interface/editorInputFeild';
    import { IFormItem, IObject } from 'src/interface';
    import ExampleTable from '../components/exampleTable.vue';
    import { clearObject } from 'src/utils';
    import { EditImageLayoutSelected, EditVerticalAlignSelected } from 'src/config/editorSelected';
    import { IsYesNo } from 'src/config';
    import { handleUploadImage } from '../editorMethods';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '图片元素';
    // 案例
    const exampleRef = ref();

    const visible = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IFourImage>({});

    const saveFormModal = reactive<IFourImage>({});

    // 表单列表
    const FormModalLists = ref<Array<IFormItem>>([]);

    // 图片查看处理
    const dialogImageUrl = ref('');
    const dialogVisible = ref(false);
    // 预览
    const handlePreview = (url) => {
        dialogImageUrl.value = url;
        dialogVisible.value = true;
    };

    // 关闭
    const closeImage = () => {
        dialogVisible.value = false;
    };

    watch(
        [() => formModal.Src, () => formModal.ZOrderStyle],
        () => {
            let arr: Array<IFormItem> = [
                {
                    type: 'Text',
                    label: '基本属性',
                },
                {
                    type: 'Input',
                    name: 'ID',
                    label: '编号',
                    rules: [{ required: true, message: '请输入编号ID' }],
                },
                {
                    type: 'InputNumber',
                    name: 'Width',
                    label: '宽度',
                },
                {
                    type: 'InputNumber',
                    name: 'Height',
                    label: '高度',
                },

                {
                    type: 'Select',
                    name: 'KeepWidthHeightRate',
                    label: '保持长宽比',
                    options: IsYesNo,
                },
                {
                    type: 'Select',
                    name: 'SmoothZoom',
                    label: '平滑缩放',
                    options: IsYesNo,
                },
                {
                    type: 'Auto',
                    name: 'VisibleExpression',
                    label: '可见性表达式',
                    options: getEditorFunction().map((item) => ({
                        value: item.function,
                        label: item.function,
                    })),
                    render: h(
                        'div',
                        {
                            class: 'edit',
                            onClick: () => {
                                exampleRef.value.modalTogetter();
                            },
                        },
                        '示例'
                    ),
                },
                {
                    type: 'Text',
                    label: '样式属性',
                },
                {
                    type: 'Select',
                    name: 'ZOrderStyle',
                    label: '布局方式',
                    options: EditImageLayoutSelected,
                },
                {
                    type: 'InputNumber',
                    name: 'OffsetX',
                    label: 'X偏移量',
                    others: {
                        disabled: formModal.ZOrderStyle === 'Normal',
                    },
                },

                {
                    type: 'InputNumber',
                    name: 'OffsetY',
                    label: 'Y偏移量',
                    others: {
                        disabled: formModal.ZOrderStyle === 'Normal',
                    },
                },

                {
                    type: 'Color',
                    name: 'TransparentColorValue',
                    label: '透明色',
                    others: {
                        disabled: formModal.ZOrderStyle === 'Normal',
                    },
                },

                {
                    type: 'Select',
                    name: 'VAlign',
                    label: '垂直对齐方式',
                    options: EditVerticalAlignSelected,
                    others: {
                        disabled: formModal.ZOrderStyle === 'Normal',
                    },
                },

                {
                    type: 'Text',
                    label: '图片内容',
                },
                {
                    type: 'Upload',
                    name: 'Src',
                    label: '图片',
                    others: handleUploadImage(formModal, 'Src', handlePreview, {}, () => {}),
                },
            ];

            FormModalLists.value = arr.map((item: any) => {
                item.value = toRef(formModal, item.name);
                return item;
            });
        },
        {
            immediate: true,
        }
    );

    const formModalProps = computed(() => {
        return {
            model: formModal,
            ref: formModalRef,
            'label-width': '180px',
            rules: {
                //   name: [{ required: true, message: '请输入菜单名字', trigger: 'blur' }],
                //   type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
                //   url: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }]
                // icon: [{ required: true, message: '请输入菜单图标', trigger: 'blur' }]
            },
        };
    });

    // 提交
    const submitModalForm = () => {
        formModalRef.value!.validate(async (valid) => {
            if (!props.editor) return;
            if (valid) {
                const obj: IObject<any> = { ...formModal };
                const ele = props.editor.getCurrentElement();
                if (saveFormModal.Src !== formModal.Src) {
                    obj.Attributes = {};
                }
                // console.log(obj, 555555);
                let index = obj.Src.indexOf(',');
                if (index !== -1) {
                    obj.Src = obj.Src.slice(index + 1, obj.Src.length);
                }
                props.editor.setElementProperties(obj, ele);
                props.editor.refreshDocument();
                visible.value = !visible.value;
            }
        });
    };

    // 取消
    const cancelModalForm = () => {
        visible.value = false;
    };

    // 打开或者关闭弹框
    const modalTogetter = (values: EEditorInputFeildType | IInputField) => {
        visible.value = !visible.value;
        clearObject(formModal);
        let obj;
        if (typeof values === 'string') {
            // 深拷贝测试数据，防止被修改
            obj = JSON.parse(JSON.stringify(getInputFeildOptions()[values].data));
        } else {
            obj = values;
        }
        if (obj.Src && obj.Src.indexOf(';base64,') === -1) {
            obj.Src = 'data:image/png;base64,' + obj.Src;
        }
        // 保持的数据
        Object.assign(saveFormModal, obj);
        Object.assign(formModal, obj);
    };

    defineExpose({
        modalTogetter,
    });
</script>

<template>
    <BaseModal
        :visible="visible"
        :title="title"
        :handleClose="cancelModalForm"
        :onSubmit="submitModalForm"
        :onCancel="cancelModalForm"
    >
        <BaseForm
            :formProps="formModalProps"
            :dataList="FormModalLists"
        />
        <ExampleTable ref="exampleRef" />
        <BaseModal
            :visible="dialogVisible"
            title="查看图片"
            :hiddenSubmit="true"
            :onCancel="closeImage"
            :handleClose="closeImage"
        >
            <img
                style="width: 100%"
                :src="dialogImageUrl"
                alt="图片预览"
            />
        </BaseModal>
    </BaseModal>
</template>

<style lang="scss" scoped></style>
