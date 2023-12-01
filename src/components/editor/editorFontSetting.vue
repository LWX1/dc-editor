<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, reactive, ref, toRef, watchEffect } from 'vue';
    import { IFont } from 'src/interface/editor';
    import { IsYesNo } from 'src/config';
    import { CEditor } from 'src/utils/editor';
    import { FontInit } from 'src/config/editorMenuConfig';
    import { EditFontSelected, EditFontSizeSelected } from 'src/config/editorSelected';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '字体设置';

    const visible = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IFont>({
        Bold: false,
        FontFamily: FontInit.FontFamily,
        FontSize: FontInit.FontSize,
        Italic: false,
        Strikeout: false,
        Underline: false,
    });

    const FormModalList = computed(() => {
        return [
            {
                type: 'Select',
                name: 'FontFamily',
                label: '字体',
                options: EditFontSelected,
            },

            {
                type: 'Select',
                name: 'FontSize',
                label: '字体大小',
                options: EditFontSizeSelected,
            },
            {
                type: 'Text',
                label: '字形',
            },
            {
                type: 'Radio',
                name: 'Bold',
                label: '粗体',
                options: IsYesNo,
            },
            {
                type: 'Radio',
                name: 'Italic',
                label: '斜体',
                options: IsYesNo,
            },
            {
                type: 'Text',
                label: '效果',
            },
            {
                type: 'Radio',
                name: 'Underline',
                label: '下划线',
                options: IsYesNo,
            },
            {
                type: 'Radio',
                name: 'Strikeout',
                label: '删除线',
                options: IsYesNo,
            },
        ];
    });

    const FormModalLists = reactive(
        FormModalList.value.map((item: any) => {
            item.value = toRef(formModal, item.name);
            return item;
        }),
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
            if (valid) {
                // console.log(formModal)
                props.editor?.setFontObject(formModal);
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
    };

    watchEffect(() => {
        if (visible.value) {
            const obj = props.editor?.getFontObject();
            if (obj) {
                Object.assign(formModal, obj);
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
    </BaseModal>
</template>

<style lang="scss" scoped></style>
