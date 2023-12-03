<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, h, reactive, ref, toRef } from 'vue';
    import { EEditorElement, EEditorInputFeildType } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { getEditorFunction, getInputFeildOptions } from 'src/config/editorData';
    import { IFourRadioCheckbox, IInputField } from 'src/interface/editorInputFeild';
    import { IObject } from 'src/interface';
    import ExampleTable from '../components/exampleTable.vue';
    import { clearObject } from 'src/utils';
    import {
        EditHighLightSelected,
        EditRadioCheckboxStyleSelected,
    } from 'src/config/editorSelected';
    import OperateList from '../components/operateList.vue';
    import { useDataSource } from '../editorHooks';
    import { getEditorValueBinding, setEditorValueBinding } from '../editorMethods';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
        title: {
            type: String,
            default: '单选框属性',
        },
    });

    // 表格数据
    const tableListItems = ref<Array<IObject<string>>>([]);
    const operateRef = ref();
    const headerList = [
        {
            value: 'id',
            label: '序号',
            width: 70,
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
    // 案例
    const exampleRef = ref();

    // 保存默认的数据
    const saveProperty = reactive({});

    const visible = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IFourRadioCheckbox>({});

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
            },
            {
                type: 'Input',
                name: 'Name',
                label: '名称',
            },
            {
                type: 'Input',
                name: 'Text',
                label: '文本',
            },
            {
                type: 'Input',
                name: 'Value',
                label: '数值',
            },
            {
                type: 'Input',
                name: 'ToolTip',
                label: '提示文本',
            },
            {
                type: 'Input',
                name: 'StringTag',
                label: '附加数据',
            },
            {
                type: 'Radio',
                name: 'VisualStyle',
                label: '显示样式',
                options: EditRadioCheckboxStyleSelected,
            },
            {
                type: 'Radio',
                name: 'EnableHighlight',
                label: '高亮度状态',
                options: EditHighLightSelected,
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
                name: 'Checked',
                label: '处于选择状态',
            },
            {
                type: 'CheckBox',
                name: 'Deleteable',
                label: '可以删除',
            },
            {
                type: 'CheckBox',
                name: 'Multiline',
                label: '文本多行',
            },
            {
                type: 'CheckBox',
                name: 'Enabled',
                label: '对象是否可用',
            },
            {
                type: 'CheckBox',
                name: 'CheckAlignLeft',
                label: '勾选框左对齐',
            },

            {
                type: 'CheckBox',
                name: 'Requried',
                label: '必勾项',
            },
            {
                type: 'CheckBox',
                name: 'CaptionFlowLayout',
                label: '文本参与流式排版',
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
    const submitModalForm = (form?: any, dataList?: any) => {
        formModalRef.value!.validate(async (valid) => {
            if (!props.editor) return;

            if (valid) {
                if (!form || !dataList) {
                    [form, dataList] = operateRef.value!.getTableData();
                }
                const obj: IObject<any> = {};
                const columns = ['Text', 'Value'];
                let bool = true;
                console.log(dataList);
                dataList.forEach((_: any, index: string) => {
                    if (form[columns[0] + '_' + index] && form[columns[1] + '_' + index]) {
                        obj[form[columns[0] + '_' + index]] = form[columns[1] + '_' + index];
                    } else {
                        bool = false;
                    }
                });
                if (!bool) {
                    ElMessage({
                        type: 'warning',
                        message: '请清空无效的数据',
                    });
                    return;
                }
                Object.assign(formModal, {
                    Attributes: JSON.parse(JSON.stringify(obj)),
                });
                obj.ValueBinding = getEditorValueBinding(formModal);
                const ele = formModal.IsRadio
                    ? props.editor.getCurrentElement(EEditorElement.RADIO)
                    : props.editor.getCurrentElement(EEditorElement.CHECKBOX);
                props.editor.setElementProperties(
                    {
                        ...formModal,
                        ...obj,
                    },
                    ele
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
        Object.assign(saveProperty, obj);

        // 自定义列表
        if (obj.Attributes) {
            const arr: Array<IObject<string>> = [];
            for (let i in obj.Attributes) {
                arr.push({
                    Text: i,
                    Value: obj.Attributes[i],
                });
            }
            tableListItems.value = arr;
        } else {
            tableListItems.value = [];
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
        <div style="padding: 0 20px">
            <OperateList
                title="自定义属性"
                :dataList="tableListItems"
                :headerList="headerList"
                ref="operateRef"
            />
        </div>
        <ExampleTable ref="exampleRef" />
    </BaseModal>
</template>

<style lang="scss" scoped></style>
