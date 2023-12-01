<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, h, reactive, ref, toRef } from 'vue';
    import { EEditorInputFeildType, EExecuteCommand } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { getEditorFunction, getInputFeildOptions } from 'src/config/editorData';
    import { IInputField, IRadioCheckbox } from 'src/interface/editorInputFeild';
    import { IObject } from 'src/interface';
    import ExampleTable from '../components/exampleTable.vue';
    import { clearObject } from 'src/utils';
    import {
        EditRadioCheckboxSelected,
        EditRadioCheckboxStyleSelected,
    } from 'src/config/editorSelected';
    import OperateList from '../components/operateList.vue';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    // 表格数据
    const tableListItems = ref<Array<IObject<string>>>([]);
    const operateRef = ref();
    const headerList = [
        {
            value: 'ID',
            label: '编号',
        },
        {
            value: 'Text',
            label: '文本',
        },
        {
            value: 'Value',
            label: '数值',
        },
        {
            label: '操作',
            value: 'action',
        },
    ];

    /*****弹框表单 */
    const DefaultData = {
        Type: 'radio',
        VisualStyle: 'Default',
        Deleteable: true,
        CheckAlignLeft: true,
    };
    const title = '插入多个单选框/复选框';
    // 案例
    const exampleRef = ref();

    const visible = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IRadioCheckbox>({});

    const FormModalList = computed(() => {
        return [
            {
                type: 'Text',
                label: '基本属性',
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
                type: 'Radio',
                name: 'Type',
                label: '类型',
                options: EditRadioCheckboxSelected,
            },
            {
                type: 'Radio',
                name: 'VisualStyle',
                label: '显示样式',
                options: EditRadioCheckboxStyleSelected,
            },
            {
                type: 'CheckBox',
                name: 'Deleteable',
                label: '可以删除',
            },
            {
                type: 'CheckBox',
                name: 'CheckAlignLeft',
                label: '勾选框左对齐',
            },
            {
                type: 'CheckBox',
                name: 'Multiline',
                label: '文本多行',
            },
            {
                type: 'CheckBox',
                name: 'Requried',
                label: '必勾项',
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
        const [form, dataList] = operateRef.value!.getTableData();
        formModalRef.value!.validate(async (valid) => {
            if (!props.editor) return;
            if (valid) {
                const formObj: IObject<any> = {};
                const columns = headerList
                    .slice(0, headerList.length - 1)
                    .map((item) => item.value);
                const arr: IObject<string>[] = [];
                const arrColumns = [
                    'VisibleExpression',
                    'VisualStyle',
                    'Deleteable',
                    'CheckAlignLeft',
                    'Multiline',
                    'Requried',
                ];
                dataList.forEach((_: any, index: string) => {
                    let obj: IObject<string> = {};
                    columns.forEach((column) => {
                        let str = column + '_' + index;
                        obj[column] = form[str];
                    });
                    arrColumns.forEach((column) => {
                        obj[column] = formModal[column];
                    });
                    arr.push(obj);
                });
                formObj.ListItems = arr;
                formObj.Name = formModal.Name;
                formObj.Type = formModal.Type;
                console.log(formObj);
                props.editor?.executeCommand(
                    EExecuteCommand.INSERT_CHECK_BOX_OR_RADIO,
                    false,
                    formObj
                );
                visible.value = false;
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
        for (let i in formModal) {
            if (formModal[i] === undefined && i !== 'ListItems') {
                formModal[i] = false;
            }
        }
        let obj;
        if (typeof values === 'string') {
            // 深拷贝测试数据，防止被修改
            obj = JSON.parse(JSON.stringify(getInputFeildOptions()[values].data));
            Object.assign(formModal, DefaultData);
        } else {
            obj = values;
        }
        // 自定义列表
        if (obj.ListItems) {
            tableListItems.value = obj.ListItems || [];
        } else {
            tableListItems.value = [];
        }
        // console.log(tableListItems, obj);
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
        <div style="padding: 0 20px">
            <OperateList
                title="单复选框显示列表"
                :dataList="tableListItems"
                :headerList="headerList"
                ref="operateRef"
            />
        </div>
        <ExampleTable ref="exampleRef" />
    </BaseModal>
</template>

<style lang="scss" scoped></style>
