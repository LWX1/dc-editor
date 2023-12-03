<script setup lang="ts">
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { onMounted, reactive, ref } from 'vue';
    import { EEditorInputFeildType, EExecuteCommand } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { getInputFeildOptions } from 'src/config/editorData';
    import { IFour, IInputField } from 'src/interface/editorInputFeild';
    import { IObject } from 'src/interface';
    import { clearObject } from 'src/utils';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
        title: {
            type: String,
            default: '恒牙牙位图',
        },
    });

    /** 表格 */

    const ColumnProps = {
        width: '50px',
        align: 'center',
        className: 'my-column-style',
    };

    // 属性数组
    const PropertyList = ['P', 'L', 'B', 'D', 'O', 'M'];

    const Columns: Array<IObject<any>> = [
        {
            title: '',
            dataIndex: 'start',
            ...ColumnProps,
        },
        {
            title: '第三磨牙',
            dataIndex: '右第三磨牙',
            ...ColumnProps,
        },
        {
            title: '第二磨牙',
            dataIndex: '右第二磨牙',
            ...ColumnProps,
        },
        {
            title: '第一磨牙',
            dataIndex: '右第一磨牙',
            ...ColumnProps,
        },
        {
            title: '第二前磨牙',
            dataIndex: '右第二前磨牙',
            ...ColumnProps,
        },
        {
            title: '第一前磨牙',
            dataIndex: '右第一前磨牙',
            ...ColumnProps,
        },
        {
            title: '上颌',
            dataIndex: '上颌',
            ...ColumnProps,
            children: [
                {
                    title: '尖牙',
                    dataIndex: '右尖牙',
                    ...ColumnProps,
                },
                {
                    title: '侧切牙',
                    dataIndex: '右侧切牙',
                    ...ColumnProps,
                },
                {
                    title: '中切牙',
                    dataIndex: '右中切牙',
                    ...ColumnProps,
                },
                {
                    title: '中切牙',
                    dataIndex: '左中切牙',
                    ...ColumnProps,
                },
                {
                    title: '侧切牙',
                    dataIndex: '左侧切牙',
                    ...ColumnProps,
                },
                {
                    title: '尖牙',
                    dataIndex: '左尖牙',
                    ...ColumnProps,
                },
            ],
        },
        {
            title: '第一前磨牙',
            dataIndex: '左第一前磨牙',
            ...ColumnProps,
        },
        {
            title: '第二前磨牙',
            dataIndex: '左第二前磨牙',
            ...ColumnProps,
        },
        {
            title: '第一磨牙',
            dataIndex: '左第一磨牙',
            ...ColumnProps,
        },
        {
            title: '第二磨牙',
            dataIndex: '左第二磨牙',
            ...ColumnProps,
        },
        {
            title: '第三磨牙',
            dataIndex: '左第三磨牙',
            ...ColumnProps,
        },
        {
            title: '',
            dataIndex: 'end',
            ...ColumnProps,
        },
    ];

    const tableData = ref([]);

    /*****弹框表单 */

    const visible = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IFour>({});

    let isAdd = true;

    const mergeTitle = (rowIndex) => {
        if (rowIndex === 0) {
            return {
                rowspan: 6,
                colspan: 1,
            };
        } else if (rowIndex === 6) {
            return {
                rowspan: 2,
                colspan: 1,
            };
        } else if (rowIndex === 8) {
            return {
                rowspan: 6,
                colspan: 1,
            };
        } else {
            return {
                rowspan: 0,
                colspan: 0,
            };
        }
    };

    /** 合并行列 */
    const getMergeSpan = ({ row, column, rowIndex, columnIndex }) => {
        // console.log(row, column, rowIndex, columnIndex);
        // 最前面
        if (columnIndex === 0) {
            return mergeTitle(rowIndex);
        } else if (columnIndex === 17) {
            return mergeTitle(rowIndex);
        }
    };

    // 获取选择
    const getCheckbox = (e, scope) => {
        console.log(e, scope);
        // 自动选择左右的值
        if (e) {
            let index = `Value${scope.$index >= 7 ? scope.cellIndex + 16 : scope.cellIndex}_`;
            if (scope.cellIndex < 9) {
                index += 9 - scope.cellIndex;
            } else {
                index += scope.cellIndex - 9 + 1;
            }
            formModal[index] = true;
        }
    };

    // 提交
    const submitModalForm = () => {
        formModalRef.value!.validate(async (valid) => {
            if (!props.editor) return;
            if (valid) {
                const obj: IObject<any> = { ...formModal };
                const objValue = {};
                for (let i in obj) {
                    if (i.indexOf('Value') !== -1) {
                        if (obj[i]) {
                            const arr = i.split('_');
                            if (objValue[arr[0]]) {
                                objValue[arr[0]].push(arr[1]);
                            } else {
                                objValue[arr[0]] = [arr[1]];
                            }
                        }
                    }
                }
                // 排序
                for (let i in objValue) {
                    const arr: Array<string> = [];
                    objValue[i].forEach((item) => {
                        const id = PropertyList.indexOf(item);
                        if (id !== -1) {
                            arr[id + 1] = item;
                        } else {
                            arr[0] = item;
                        }
                    });
                    objValue[i] = arr;
                }
                let values = '';
                for (let i = 1; i <= 32; i++) {
                    values += `Value${i}:${
                        objValue['Value' + i] ? objValue['Value' + i].join('') : ''
                    };`;
                }
                obj.Values = values;
                console.log('options', obj);
                if (isAdd) {
                    props.editor?.executeCommand(
                        EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
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
        // 'Value1:8PLBDOM;Value2:7;Value3:6;Value4:5;Value5:4;Value6:3;Value7:2;Value8:1;Value9:1;Value10:2;Value11:3;Value12:4;Value13:5;Value14:6;Value15:7;Value16:8;Value17:8MOD;Value18:7;Value19:6;Value20:5;Value21:;Value22:;Value23:;Value24:;Value25:;Value26:;Value27:;Value28:;Value29:;Value30:;Value31:;Value32:'
        if (obj.Values) {
            const listArr = obj.Values.split(';');
            listArr.forEach((item) => {
                const arr = item.split(':');
                if (arr[1]) {
                    let len = arr[1].length;
                    const data = arr[1];
                    for (let i = 0; i < len; i++) {
                        obj[`${arr[0]}_${data[i]}`] = true;
                    }
                }
            });
        }
        Object.assign(formModal, obj);

        for (let i in formModal) {
            if (i.indexOf('Value') !== -1) {
                formModal[i] = formModal[i] || false;
            }
        }
    };

    onMounted(() => {
        const result: any = [];
        const columnList: any = [];
        Columns.forEach((item) => {
            if (item.children) {
                item.children.forEach((child) => {
                    columnList.push(child.dataIndex);
                });
            } else {
                columnList.push(item.dataIndex);
            }
        });

        for (let property in PropertyList) {
            const obj: any = {};
            for (let i = 0; i < columnList.length; i++) {
                obj[columnList[i]] = PropertyList[property];
            }
            obj.start = '牙面';
            obj.end = '牙面';
            result.push(obj);
        }
        for (let j = 0; j < 2; j++) {
            let flag = false;
            const obj: any = {};
            for (let i = 0; i < columnList.length; i++) {
                if (9 - i === 0) {
                    flag = true;
                }
                if (!flag) {
                    obj[columnList[i]] = `${9 - i}`;
                } else {
                    obj[columnList[i]] = `${i - 9 + 1}`;
                }
            }
            obj.start = '右';
            obj.end = '左';
            result.push(obj);
        }

        const reversePropertyList = [...PropertyList].reverse();
        for (let property in reversePropertyList) {
            const obj: any = {};
            for (let i = 0; i < columnList.length; i++) {
                obj[columnList[i]] = reversePropertyList[property];
            }
            obj.start = '牙面';
            obj.end = '牙面';
            result.push(obj);
        }
        tableData.value = result;
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
        width="1000px"
    >
        <el-form
            :model="formModal"
            ref="formModalRef"
            class="four-form"
        >
            <el-table
                :span-method="getMergeSpan"
                :data="tableData"
                :fit="false"
            >
                <el-table-column
                    v-for="item in Columns"
                    :width="item.width"
                    :align="item.align"
                    :label="item.title"
                    :prop="item.dataIndex"
                >
                    <template #default="scope">
                        <template v-if="item.children && item.children.length">
                            <el-table-column
                                v-for="child in item.children || []"
                                v-bind="child"
                                :label="child.title"
                                :prop="child.dataIndex"
                            >
                                <template #default="scope">
                                    <el-form-item class="four-form-item">
                                        <el-checkbox
                                            @change="getCheckbox($event, scope)"
                                            v-model="
                                                formModal[
                                                    `Value${
                                                        scope.$index >= 7
                                                            ? scope.cellIndex + 16
                                                            : scope.cellIndex
                                                    }_${scope.row[scope.column.property]}`
                                                ]
                                            "
                                            :label="scope.row[scope.column.property]"
                                        />
                                    </el-form-item>
                                </template>
                            </el-table-column>
                        </template>
                        <template
                            v-else-if="
                                scope.column.property === 'start' || scope.column.property === 'end'
                            "
                        >
                            <span>{{ scope.row[scope.column.property] }}</span>
                        </template>
                        <template v-else>
                            <el-form-item class="four-form-item">
                                <el-checkbox
                                    @change="getCheckbox($event, scope)"
                                    v-model="
                                        formModal[
                                            `Value${
                                                scope.$index >= 7
                                                    ? scope.cellIndex + 16
                                                    : scope.cellIndex
                                            }_${scope.row[scope.column.property]}`
                                        ]
                                    "
                                    :label="scope.row[scope.column.property]"
                                />
                            </el-form-item>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer">下颌</div>
        </el-form>
    </BaseModal>
</template>

<style lang="scss" scoped>
    :deep(.el-scrollbar) {
        > div {
            > div {
                display: block !important;
            }
        }
    }
    .four-form {
        overflow: hidden;
        text-align: center;
        .footer {
            text-align: center;
        }
    }
    .four-form-item {
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
