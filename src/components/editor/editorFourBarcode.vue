<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, h, reactive, ref, toRef } from 'vue';
    import { EEditorInputFeildType, EExecuteCommand } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { getEditorFunction, getInputFeildOptions } from 'src/config/editorData';
    import { IFourBarcode, IInputField } from 'src/interface/editorInputFeild';
    import { IObject } from 'src/interface';
    import ExampleTable from './components/exampleTable.vue';
    import { clearObject } from 'src/utils';
    import { useDataSource } from './editorHooks';
    import { EditAlignmentSelected, EditBarcodeStyleSelected } from 'src/config/editorSelected';
    import { getEditorValueBinding, setEditorValueBinding } from './editorMethods';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '条形码属性';
    // 案例
    const exampleRef = ref();

    const visible = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IFourBarcode>({});

    let isAdd = true;

    const dataSourceHooks = useDataSource();

    const FormModalList = computed(() => {
        return [
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
                type: 'Input',
                name: 'Text',
                label: '文本内容',
                rules: [{ required: true, message: '请输入文本内容' }],
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
                name: 'BarcodeStyle',
                label: '条码样式',
                options: EditBarcodeStyleSelected,
            },
            {
                type: 'Select',
                name: 'TextAlignment',
                label: '文本对齐方式',
                options: EditAlignmentSelected,
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
                type: 'CheckBox',
                name: 'ShowText',
                label: '是否显示文本',
            },
        ].concat(dataSourceHooks.data);
    });

    const FormModalLists = reactive(
        FormModalList.value.map((item: any) => {
            item.value = toRef(formModal, item.name);
            return item;
        })
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
                obj.ValueBinding = getEditorValueBinding(formModal);
                if (isAdd) {
                    props.editor?.executeCommand(
                        EExecuteCommand.INSERT_BARCODE_ELEMENT,
                        false,
                        obj
                    );
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

        obj = setEditorValueBinding(obj, dataSourceHooks);
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
    </BaseModal>
</template>

<style lang="scss" scoped></style>
