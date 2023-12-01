<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, h, reactive, ref, toRef } from 'vue';
    import { EEditorInputFeildType, EExecuteCommand } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { getEditorFunction, getInputFeildOptions } from 'src/config/editorData';
    import { IInputField, IPagePagination } from 'src/interface/editorInputFeild';
    import { IObject } from 'src/interface';
    import ExampleTable from './components/exampleTable.vue';
    import { clearObject } from 'src/utils';
    import { EditContactActionSelected } from 'src/config/editorSelected';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '文本标签属性';
    // 案例
    const exampleRef = ref();

    const visible = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IPagePagination>({});

    let isAdd = true;

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
                name: 'AutoSize',
                label: '自动大小',
            },
            {
                type: 'CheckBox',
                name: 'Multiline',
                label: '自动换行',
            },
            {
                type: 'CheckBox',
                name: 'Deleteable',
                label: '能否被删除',
            },
            {
                type: 'CheckBox',
                name: 'Bold',
                label: '是否加粗',
            },
            {
                type: 'Text',
                label: '连接模式设置',
            },
            {
                type: 'Select',
                name: 'ContactAction',
                label: '模式',
                options: EditContactActionSelected,
            },
            {
                type: 'Input',
                name: 'AttributeNameForContactAction',
                label: '属性名',
            },
            {
                type: 'Input',
                name: 'LinkTextForContactAction',
                label: '连接文本',
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
                if (isAdd) {
                    props.editor?.executeCommand(EExecuteCommand.INSERT_LABEL_ELEMENT, false, obj);
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
