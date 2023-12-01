<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, reactive, ref, toRef, watchEffect } from 'vue';
    import { IGutter } from 'src/interface/editor';
    import { IsYesNo } from 'src/config';
    import { CEditor } from 'src/utils/editor';
    import { EditGutterSelected } from 'src/config/editorSelected';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '装订线设置';

    const visible = ref(false);
    const disabled = ref(true);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IGutter>({
        GutterPosition: 0,
        GutterStyle: '',
        ShowGutterLine: false,
        SwapGutter: false,
    });

    const FormModalList = computed(() => {
        return [
            {
                type: 'Radio',
                name: 'ShowGutterLine',
                label: '是否显示装订线',
                options: IsYesNo,
                events: {
                    change: (e: boolean) => {
                        disabled.value = !e;
                    },
                },
            },

            {
                type: 'Select',
                name: 'GutterStyle',
                label: '线样式',
                options: EditGutterSelected,
                others: {
                    disabled: toRef(disabled),
                },
            },

            {
                type: 'Radio',
                name: 'SwapGutter',
                label: '是否双面装订',
                options: IsYesNo,
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'InputNumber',
                name: 'GutterPosition',
                label: '装订线距离',
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
                props.editor?.setDocumentGutter(formModal);
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
            const obj = props.editor?.getDocumentGutter();
            if (obj) {
                disabled.value = !obj.ShowGutterLine;
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
