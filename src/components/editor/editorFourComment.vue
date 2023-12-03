<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, reactive, ref, toRef } from 'vue';
    import { EEditorInputFeildType, EExecuteCommand } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { getInputFeildOptions } from 'src/config/editorData';
    import { IInputField } from 'src/interface/editorInputFeild';
    import { IObject } from 'src/interface';
    import { clearObject } from 'src/utils';

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
            value: 'Text',
            label: '文本',
        },
        {
            value: 'Value',
            label: '数值',
        },
    ];

    /*****弹框表单 */
    const title = '编辑文档批注';

    const visible = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IObject<string>>({});

    let isAdd = true;

    const FormModalList = computed(() => {
        return [
            {
                type: 'Text',
                label: '基本信息',
            },
            {
                type: 'Input',
                name: 'Text',
                label: '批注内容',
                others: {
                    autosize: { minRows: 3, maxRows: 5 },
                    type: 'textarea',
                },
            },
            {
                type: 'Text',
                label: '颜色设置',
            },

            {
                type: 'Color',
                name: 'BackColor',
                label: '背景颜色',
            },
            {
                type: 'Color',
                name: 'ForeColor',
                label: '前景颜色',
            },

            {
                type: 'Text',
                label: '作者',
            },
            {
                type: 'Input',
                name: 'Author',
                label: '姓名',
                others: {
                    disabled: true,
                },
            },
            {
                type: 'Input',
                name: 'AuthorID',
                label: '编号',
                others: {
                    disabled: true,
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
                const formObj: IObject<any> = { ...formModal };
                formObj.Attributes = obj;
                if (isAdd) {
                    props.editor?.executeCommand(EExecuteCommand.INSERT_COMMENT, false, formObj);
                } else {
                    props.editor.setCurrentComment(formObj);
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
        // 自定义列表

        if (typeof values === 'string') {
            isAdd = true;
            // 深拷贝测试数据，防止被修改
            obj = JSON.parse(JSON.stringify(getInputFeildOptions()[values].data));
        } else {
            isAdd = false;
            obj = values;
        }

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
    </BaseModal>
</template>

<style lang="scss" scoped></style>
