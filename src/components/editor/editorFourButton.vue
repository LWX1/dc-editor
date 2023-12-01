<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, h, reactive, ref, toRef, watch, watchEffect } from 'vue';
    import { EEditorInputFeildType, EExecuteCommand } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { getEditorFunction, getInputFeildOptions } from 'src/config/editorData';
    import { IInputField, IPagePagination } from 'src/interface/editorInputFeild';
    import { IFormItem, IObject } from 'src/interface';
    import ExampleTable from './components/exampleTable.vue';
    import { clearObject } from 'src/utils';
    import { EditPrintVisibleSelected } from 'src/config/editorSelected';
    import { handleUploadImage } from './editorMethods';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '按钮属性';
    // 案例
    const exampleRef = ref();

    const visible = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IPagePagination>({});

    // 表单列表
    const FormModalLists = ref<Array<IFormItem>>([]);

    let isAdd = true;

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
        [
            () => formModal.ImgBase64,
            () => formModal.ImgBase64ForDown,
            () => formModal.ImgBase64ForOver,
        ],
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
                    type: 'Input',
                    name: 'Name',
                    label: '名称',
                },
                {
                    type: 'InputNumber',
                    name: 'Height',
                    label: '高度',
                },
                {
                    type: 'InputNumber',
                    name: 'Width',
                    label: '宽度',
                },
                {
                    type: 'CheckBox',
                    name: 'Deleteable',
                    label: '能否被删除',
                },
                {
                    type: 'CheckBox',
                    name: 'Enabled',
                    label: '是否可用',
                },
                {
                    type: 'CheckBox',
                    name: 'AutoSize',
                    label: '自动大小',
                },
                {
                    type: 'CheckBox',
                    name: 'PrintAsText',
                    label: '以文本方式打印',
                },
                {
                    type: 'Select',
                    name: 'PrintVisibility',
                    label: '打印时可见',
                    options: EditPrintVisibleSelected,
                },
                {
                    type: 'Input',
                    name: 'CommandName',
                    label: '命令文本',
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
                    type: 'Upload',
                    name: 'ImgBase64',
                    label: '按钮图片',
                    others: handleUploadImage(formModal, 'ImgBase64', handlePreview),
                },
                {
                    type: 'Upload',
                    name: 'ImgBase64ForDown',
                    label: '按下时图片',
                    others: handleUploadImage(formModal, 'ImgBase64ForDown', handlePreview),
                },
                {
                    type: 'Upload',
                    name: 'ImgBase64ForOver',
                    label: '鼠标悬停时图片',
                    others: handleUploadImage(formModal, 'ImgBase64ForOver', handlePreview),
                },
                {
                    type: 'Input',
                    name: 'Text',
                    label: '文本',
                    others: {
                        autosize: { minRows: 3, maxRows: 5 },
                        type: 'textarea',
                    },
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
                console.log(obj);
                if (isAdd) {
                    props.editor?.executeCommand(EExecuteCommand.INSERT_BUTTON, false, obj);
                } else {
                    const ele = props.editor.getCurrentElement();
                    props.editor.setElementProperties(obj, ele);
                    props.editor.refreshDocument();
                }
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
            isAdd = true;
            // 深拷贝测试数据，防止被修改
            obj = JSON.parse(JSON.stringify(getInputFeildOptions()[values].data));
        } else {
            isAdd = false;
            obj = values;
        }
        if (obj.ImgBase64 && obj.ImgBase64.indexOf(';base64,') === -1) {
            obj.ImgBase64 = 'data:image/png;base64,' + obj.ImgBase64;
        }
        if (obj.ImgBase64ForOver && obj.ImgBase64ForOver.indexOf(';base64,') === -1) {
            obj.ImgBase64ForOver = 'data:image/png;base64,' + obj.ImgBase64ForOver;
        }
        if (obj.ImgBase64ForDown && obj.ImgBase64ForDown.indexOf(';base64,') === -1) {
            obj.ImgBase64ForDown = 'data:image/png;base64,' + obj.ImgBase64ForDown;
        }
        //
        console.log(obj);
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

<style lang="scss" scoped>
    :deep(.self-upload-style) {
        .el-upload--picture-card {
            --el-upload-picture-card-size: 70px;
        }
        .el-upload-list--picture-card {
            --el-upload-list-picture-card-size: 70px;
        }
    }
</style>
