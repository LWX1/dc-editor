<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, reactive, ref, toRef, watchEffect } from 'vue';
    import { IGridLine } from 'src/interface/editor';
    import { IsYesNo } from 'src/config';
    import { CEditor } from 'src/utils/editor';
    import { EditGridLineSelected } from 'src/config/editorSelected';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '网格线设置';

    const visible = ref(false);
    const disabled = ref(true);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IGridLine>({
        AlignToGridLine: false,
        ColorValue: '',
        GridNumInOnePage: 0,
        LineStyle: 'System',
        Printable: false,
        Visible: false,
    });

    const FormModalList = computed(() => {
        return [
            {
                type: 'Radio',
                name: 'Visible',
                label: '是否显示网格线',
                options: IsYesNo,
                events: {
                    change: (e: boolean) => {
                        disabled.value = !e;
                    },
                },
            },

            {
                type: 'Select',
                name: 'LineStyle',
                label: '线样式',
                options: EditGridLineSelected,
                others: {
                    disabled: toRef(disabled),
                },
            },

            {
                type: 'Color',
                name: 'ColorValue',
                label: '颜色',
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'InputNumber',
                name: 'GridNumInOnePage',
                label: '每页行数',
                others: {
                    min: 0,
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'Select',
                name: 'AlignToGridLine',
                label: '文本是否对齐网格线',
                options: IsYesNo,
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'Select',
                name: 'Printable',
                label: '是否打印网格线',
                options: IsYesNo,
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
                props.editor?.setDocumentGridLine(formModal);
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
            const obj = props.editor?.getDocumentGridLine();
            if (obj) {
                disabled.value = !obj.Visible;
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
