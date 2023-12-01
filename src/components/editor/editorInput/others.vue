<script setup lang="ts">
    import { FormInstance } from 'element-plus';
    import { computed, h, reactive, ref, toRef, watch, watchEffect } from 'vue';
    import { CEditor } from 'src/utils/editor';
    import { IsYesNo } from 'src/config';
    import { IFormItem, IObject } from 'src/interface';
    import ExampleTable from '../components/exampleTable.vue';
    import { getEditorFunction } from 'src/config/editorData';
    import OperateList from '../components/operateList.vue';
    import { clearObject } from 'src/utils';
    import { IInputField } from 'src/interface/editorInputFeild';
    import { EditDocumentElementSelected } from 'src/config/editorSelected';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
        options: {
            type: Object,
            default: {},
        },
    });

    const formModalRef = ref<FormInstance>();

    // 表单数据
    const formModal = reactive<IInputField>({});

    // 表单列表
    const FormModalLists = ref<Array<IFormItem>>([]);

    // 包含内容
    const containContentRef = ref(false);

    // 案例
    const exampleRef = ref();

    // 自定义属性
    // 回显
    const selfDataListRef = ref();
    // 保存值
    let selfSaveDataListRef: {} | null = null;
    const selfDataListPengdingRef = ref();
    const selfVisible = ref(false);
    const title = '自定义属性';
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
            label: '值',
        },
        {
            label: '操作',
            value: 'action',
        },
    ];

    // 取消
    const cancelModalForm = () => {
        selfVisible.value = false;
    };

    // 提交
    const submitModalForm = (form?: any, dataList?: any) => {
        if (!form || !dataList) {
            [form, dataList] = selfDataListPengdingRef.value!.getTableData();
        }
        const obj: any = {};
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
        Object.assign(formModal, {
            Attributes: JSON.stringify(obj),
        });
        selfVisible.value = false;
        selfSaveDataListRef = obj;
    };

    watchEffect(() => {
        let arr = [
            {
                type: 'Text',
                label: '表达式',
            },
            {
                type: 'Input',
                name: 'ValueExpression',
                label: '计算表达式',
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
                name: 'isAll',
                label: '可包含内容为所有文档类型',
                options: IsYesNo,
                events: {
                    change: (e: boolean) => {
                        containContentRef.value = e;
                    },
                },
            },
            {
                type: 'Select',
                name: 'customFormat',
                label: '可包含内容',
                others: {
                    multiple: true,
                    disabled: toRef(containContentRef),
                },
                options: EditDocumentElementSelected,
            },
            {
                type: 'Input',
                name: 'Attributes',
                label: '自定义属性',
                others: {
                    disabled: true,
                },
                render: h(
                    'div',
                    {
                        class: 'edit',
                        onClick: () => {
                            selfVisible.value = true;
                        },
                    },
                    '预览'
                ),
            },
        ];

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
            // 包含内容
            if (formModal.AcceptChildElementTypes) {
                if (formModal.AcceptChildElementTypes === 'All') {
                    formModal.isAll = true;
                } else {
                    formModal.isAll = false;
                    formModal.customFormat = formModal.AcceptChildElementTypes.split(',');
                }
            }
            // 自定义属性
            if (formModal.Attributes) {
                const arr: any = [];
                for (let item in formModal.Attributes) {
                    arr.push({
                        Text: item,
                        Value: formModal.Attributes[item],
                    });
                }
                Object.assign(formModal, {
                    Attributes: JSON.stringify(formModal.Attributes),
                });
                selfDataListRef.value = arr;
            } else {
                selfDataListRef.value = [];
                selfSaveDataListRef = null;
            }
        },
        {
            immediate: true,
        }
    );

    // 提交
    const submitForm = () => {
        return new Promise((resolve) => {
            formModalRef.value!.validate(async (valid) => {
                if (valid) {
                    const obj: IObject<any> = {};
                    let AcceptChildElementTypes: string;
                    if (formModal.isAll) {
                        AcceptChildElementTypes = 'All';
                    } else {
                        if (formModal.customFormat) {
                            AcceptChildElementTypes = (formModal.customFormat as []).join(',');
                        }
                    }
                    // 过滤字符串只需要自己的
                    [
                        'ValueExpression',
                        'VisibleExpression',
                        'AcceptChildElementTypes',
                        'Attributes',
                    ].forEach((item) => {
                        if (item === 'Attributes') {
                            obj[item] = selfSaveDataListRef || {};
                        } else if (item === 'AcceptChildElementTypes') {
                            obj[item] = AcceptChildElementTypes;
                        } else {
                            obj[item] = formModal[item];
                        }
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
    <ExampleTable ref="exampleRef" />
    <BaseModal
        :visible="selfVisible"
        :title="title"
        :handleClose="cancelModalForm"
        :onSubmit="submitModalForm"
        :onCancel="cancelModalForm"
    >
        <OperateList
            ref="selfDataListPengdingRef"
            :headerList="headerList"
            :title="title"
            :dataList="selfDataListRef"
        />
    </BaseModal>
</template>

<style lang="scss" scoped></style>
