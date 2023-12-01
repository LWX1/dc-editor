<script setup lang="ts">
    import { FormInstance } from 'element-plus';
    import { computed, h, reactive, ref, toRef, watch, watchEffect } from 'vue';
    import { CEditor } from 'src/utils/editor';
    import BaseModal from 'src/components/BaseModal.vue';
    import { IsYesNo } from 'src/config';
    import { IFormItem, IObject } from 'src/interface';
    import OperateList from '../components/operateList.vue';
    import { clearObject, getKeyValue } from 'src/utils';
    import { IInputField } from 'src/interface/editorInputFeild';
    import {
        EditInputFeildSelected,
        EditInputListSelected,
        EditSeparatorSelected,
        EditStaticContentSelected,
    } from 'src/config/editorSelected';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
        options: {
            type: Object,
            default: {},
        },
    });

    // 表单ref
    const formModalRef = ref<FormInstance>();

    // 表单数据
    const formModal = reactive<IInputField>({});

    // 表单列表
    const FormModalLists = ref<Array<IFormItem>>([]);

    // 输入框类型
    const inputFeildType = ref(EditInputFeildSelected[0].value);

    // 表格数据
    const tableListItems = ref<Array<IObject<string>>>([]);

    // 静态自定义数据
    const visible = ref(false);
    const title = '静态列表(字典和列表（优先）二选一)';
    const operateRef = ref();
    const dictInput = ref();

    const cancelModalForm = () => {
        visible.value = false;
    };

    const submitModalForm = () => {
        const [form, dataList] = operateRef.value!.getTableData();
        if (dataList.length > 0) {
            const columns = ['Text', 'Value', 'TextInList'];
            let bool = true;
            const arr: IObject<string>[] = [];
            dataList.forEach((_: any, index: string) => {
                let obj: IObject<string> = {};
                columns.forEach((column) => {
                    let str = column + '_' + index;
                    if (str !== 'TextInList' && !form[column + '_' + index]) {
                        bool = false;
                    }
                    obj[column] = form[str];
                });
                arr.push(obj);
            });
            if (!bool) {
                ElMessage({
                    type: 'warning',
                    message: '请清空无效的数据',
                });
                return;
            }
            Object.assign(formModal, {
                myCustom: JSON.stringify(arr),
            });
            tableListItems.value = arr;
        } else {
            Object.assign(formModal, {
                myCustom: dictInput.value,
            });
        }

        visible.value = false;
    };

    // 格式类型
    const styleRef = ref();

    // 改变style
    const changeStyle = (e: any) => {
        if (typeof e !== 'string') {
            e = e.value;
        }
        formModal.customStyle = e;
    };

    watch(
        () => formModal.customStyle,
        (e) => {
            const data = getKeyValue(EditInputListSelected, e, 'text');
            styleRef.value = ((data && data.Child) || []).map((item: { text: any }) => ({
                label: item.text,
                value: item.text,
            }));
        }
    );

    /********* 动态表单 ***************/

    watchEffect(() => {
        let arr: Array<IFormItem> = [
            {
                type: 'Text',
                label: '输出格式',
            },
            {
                type: 'Auto',
                label: '格式类型',
                name: 'customStyle',
                options: EditInputListSelected.map((item: any) => ({
                    label: item.text,
                    value: item.text,
                })),
                events: {
                    change: (e: string) => {
                        changeStyle(e);
                    },
                    select: (e: { value: string | undefined }) => {
                        changeStyle(e);
                    },
                },
            },
            {
                type: 'Auto',
                label: '格式类型',
                name: 'customFormat',
                options: styleRef.value,
                events: {
                    change: (e: string) => {
                        formModal.customFormat = e;
                    },
                    select: (e: { value: string }) => {
                        formModal.customFormat = e.value;
                    },
                },
            },
            {
                type: 'Text',
                label: '各类型格式',
            },
            {
                type: 'Select',
                name: 'InnerEditStyle',
                label: '文本格式',
                options: EditInputFeildSelected,
                events: {
                    change: (e: string) => {
                        inputFeildType.value = e;
                    },
                },
            },
        ];
        if (inputFeildType.value === 'DropDownList') {
            const ArrList: Array<IFormItem> = [
                {
                    type: 'Radio',
                    name: 'InnerMultiSelect',
                    label: '是否允许多选',
                    options: IsYesNo,
                },
                {
                    type: 'Radio',
                    name: 'DynamicListItems',
                    label: '动态下拉列表',
                    options: IsYesNo,
                },
                {
                    type: 'Select',
                    name: 'ListValueSeparatorChar',
                    label: '列表项目分割字符',
                    options: EditSeparatorSelected,
                },
                {
                    type: 'Input',
                    name: 'ListValueFormatString',
                    label: '列表格式化',
                },
                {
                    type: 'Input',
                    name: 'myCustom',
                    label: '静态选择项内容',
                    options: EditStaticContentSelected,
                    others: {
                        disabled: true,
                    },
                    render: h(
                        'div',
                        {
                            class: 'edit',
                            onClick: () => {
                                visible.value = true;
                            },
                        },
                        '选择'
                    ),
                },
            ];
            arr = arr.concat(ArrList);
        }

        FormModalLists.value = arr.map((item: any) => {
            item.value = toRef(formModal, item.name);
            return item;
        });
    });

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

    watch(
        () => props.options,
        () => {
            const options = JSON.parse(JSON.stringify(props.options));
            clearObject(formModal);
            Object.assign(formModal, options);
            //  输入方式
            inputFeildType.value = formModal.InnerEditStyle as string;
            // 自定义列表
            if (options.ListItems) {
                tableListItems.value = formModal.ListItems || [];
                Object.assign(formModal, {
                    myCustom: JSON.stringify(formModal.ListItems),
                });
            } else {
                tableListItems.value = [];
            }
            // 字典来源
            dictInput.value = formModal.InnerListSourceName;
            // 输出格式
            if (options.DisplayFormat) {
                formModal.customStyle = options.DisplayFormat.Style;
                formModal.customFormat = options.DisplayFormat.Format;
            } else {
                formModal.customStyle = '';
                formModal.customFormat = '';
            }
        },
        {
            // deep: true,
            immediate: true,
        }
    );

    // 提交
    const submitForm = () => {
        return new Promise((resolve) => {
            formModalRef.value!.validate(async (valid) => {
                if (valid) {
                    if (formModal.customStyle && formModal.customFormat) {
                        formModal.DisPlayFormat = {
                            Style: formModal.customStyle,
                            Format: formModal.customFormat as string,
                        };
                    }
                    if (formModal.myCustom) {
                        if (tableListItems.value) {
                            formModal.ListItems = tableListItems.value;
                        } else {
                            formModal.InnerListSourceName = dictInput.value;
                        }
                    }
                    const obj: IObject<string> = {};
                    // 过滤字符串只需要自己的
                    [
                        'InnerEditStyle',
                        'InnerMultiSelect',
                        'DynamicListItems',
                        'ListValueSeparatorChar',
                        'ListValueFormatString',
                        'DisPlayFormat',
                        'ListItems',
                        'InnerListSourceName',
                    ].forEach((item: string) => {
                        obj[item] = formModal[item];
                    });
                    resolve(obj);
                }
            });
        });
    };

    defineExpose({
        submitForm,
    });
</script>

<template>
    <BaseForm
        :formProps="formModalProps"
        :dataList="FormModalLists"
    />
    <BaseModal
        :visible="visible"
        :title="title"
        :handleClose="cancelModalForm"
        :onSubmit="submitModalForm"
        :onCancel="cancelModalForm"
    >
        <el-divider>字典来源</el-divider>
        <el-input v-model="dictInput" />
        <OperateList
            :dataList="tableListItems"
            ref="operateRef"
        />
    </BaseModal>
</template>

<style lang="scss" scoped></style>
