<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, reactive, ref, toRef, watchEffect } from 'vue';
    import { IParagraph } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { EditParagraphSelected, EditSpaceDistanceSelected } from 'src/config/editorSelected';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    const disabledList = ['SpaceSpecify', 'SpaceMultiple'];

    /*****弹框表单 */
    const title = '段落设置';

    const visible = ref(false);

    const disabled = ref(true);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IParagraph>({
        ParagraphListStyle: '',
        LeftIndent: 0,
        FirstLineIndent: 0,
        SpacingBeforeParagraph: 0,
        SpacingAfterParagraph: 0,
        LineSpacingStyle: 'SpaceSingle',
        LineSpacing: 0,
    });

    const FormModalList = computed(() => {
        return [
            {
                type: 'Select',
                name: 'ParagraphListStyle',
                label: '段落列表样式',
                options: EditParagraphSelected,
            },
            {
                type: 'Text',
                label: '缩进配置',
            },
            {
                type: 'InputNumber',
                name: 'LeftIndent',
                label: '左缩进',
            },
            {
                type: 'InputNumber',
                name: 'FirstLineIndent',
                label: '首行缩进',
            },
            {
                type: 'Text',
                label: '间距',
            },
            {
                type: 'InputNumber',
                name: 'SpacingBeforeParagraph',
                label: '段落前间距',
            },
            {
                type: 'InputNumber',
                name: 'SpacingAfterParagraph',
                label: '段落后间距',
            },
            {
                type: 'Select',
                name: 'LineSpacingStyle',
                label: '行距',
                options: EditSpaceDistanceSelected,
                events: {
                    change: (e: any) => {
                        if (disabledList.includes(e)) {
                            disabled.value = false;
                        } else {
                            disabled.value = true;
                        }
                    },
                },
            },
            {
                type: 'InputNumber',
                name: 'LineSpacing',
                label: '设置值',
                others: {
                    disabled: toRef(disabled),
                },
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
                const obj = props.editor?.getCurrentParagraphStyle();
                props.editor?.setCurrentParagraphStyle({ ...obj, ...formModal });
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
            const obj = props.editor?.getCurrentParagraphStyle();
            if (obj) {
                Object.assign(formModal, obj);
                if (disabledList.includes(obj.LineSpacingStyle)) {
                    disabled.value = false;
                } else {
                    disabled.value = true;
                }
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
