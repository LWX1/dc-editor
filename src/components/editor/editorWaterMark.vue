<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, reactive, ref, toRef, watch, watchEffect } from 'vue';
    import { IWaterMark } from 'src/interface/editor';
    import { IsYesNo } from 'src/config';
    import { imageChangeBase64 } from 'src/utils';
    import { CEditor } from 'src/utils/editor';
    import { EditWaterMarkSelected } from 'src/config/editorSelected';
    import { handleUploadImage } from './editorMethods';
    import { IFormItem } from 'src/interface';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '水印设置';

    const visible = ref(false);
    const imageDisabled = ref(false);
    const textDisabled = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IWaterMark>({
        // 透明度0-255
        Alpha: 0,
        // 旋转角度
        Angle: 0,
        // 背景颜色值
        BackColorValue: '',
        // 文本颜色值
        ColorValue: '',
        // 重复的密度
        DensityForRepeat: 0,
        // 字体
        Font: '',
        // 水印图片的base64数据
        ImageDataBase64String: '',
        // 是否重复
        Repeat: false,
        // 水印文字
        Text: '',
        // 水印类型，包含Text和Image、None
        Type: 'None',
    });

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
        [() => imageDisabled, () => textDisabled, () => formModal.ImageDataBase64String],
        () => {
            let arr: Array<IFormItem> = [
                {
                    type: 'InputNumber',
                    name: 'Alpha',
                    label: '透明度',
                    others: {
                        min: 0,
                        max: 255,
                    },
                },
                {
                    type: 'InputNumber',
                    name: 'Angle',
                    label: '旋转角度',
                },
                {
                    type: 'Radio',
                    name: 'Repeat',
                    label: '重复平铺',
                    options: IsYesNo,
                },
                {
                    type: 'InputNumber',
                    name: 'DensityForRepeat',
                    label: '密度（0-1）',
                    others: {
                        min: 0,
                        step: 0.1,
                        max: 1,
                    },
                },
                {
                    type: 'Radio',
                    name: 'Type',
                    label: '水印类型',
                    options: EditWaterMarkSelected,
                    events: {
                        change: (e: string) => {
                            changeDisabled(e);
                        },
                    },
                },
                {
                    type: 'Text',
                    label: '图片水印',
                },
                {
                    type: 'Upload',
                    name: 'ImageDataBase64String',
                    label: '图片',
                    others: handleUploadImage(formModal, 'ImageDataBase64String', handlePreview, {
                        disabled: toRef(imageDisabled),
                    }),
                },
                {
                    type: 'Text',
                    label: '文字水印',
                },
                {
                    type: 'Input',
                    name: 'Text',
                    label: '文字',
                    others: {
                        disabled: toRef(textDisabled),
                    },
                },
                {
                    type: 'Color',
                    name: 'ColorValue',
                    label: '颜色',
                    others: {
                        disabled: toRef(textDisabled),
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

    7;
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
            if (valid) {
                props.editor?.setDocumentWatermark(formModal);
                visible.value = false;
            }
        });
    };

    // 取消
    const cancelModalForm = () => {
        visible.value = false;
    };

    // 打开或者关闭弹框
    const modalTogetter = () => {
        visible.value = !visible.value;
        formModal.ImageDataBase64String = '';
    };

    // 图片和文字的disable
    const changeDisabled = (e: string) => {
        if (e === 'Image') {
            imageDisabled.value = false;
            textDisabled.value = true;
        } else if (e === 'Text') {
            imageDisabled.value = true;
            textDisabled.value = false;
        } else {
            imageDisabled.value = true;
            textDisabled.value = true;
        }
    };

    watchEffect(() => {
        if (visible.value) {
            const obj = props.editor?.getDocumentWatermark();
            if (obj) {
                Object.assign(formModal, obj);
                changeDisabled(obj.Type);
            }
        }
    });

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
