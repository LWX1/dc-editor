<script setup lang="ts">
    import { clearObject } from 'src/utils';
    import { ref, watch } from 'vue';

    const props = defineProps({
        dataList: {
            type: Array,
            default: [],
        },
        title: {
            type: String,
            default: '静态列表',
        },
        headerList: {
            default: [
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
                    value: 'TextInList',
                    label: '指定列表文本',
                },
                {
                    label: '操作',
                    value: 'action',
                },
            ],
        },
    });

    const formModal = ref<any>({});
    const refForm = ref();

    const tableData = ref<any>([]);

    watch(
        () => props.dataList,

        () => {
            clearObject(formModal.value);
            tableData.value = props.dataList || [];
        },
        {
            immediate: true,
        }
    );

    // 更新响应式数据
    const updateData = () => {
        var obj: any = {};
        for (let header of props.headerList) {
            for (let item in tableData.value) {
                if (header.value === 'id') {
                    obj[header.value + '_' + item] = Number(item) + 1;
                } else {
                    obj[header.value + '_' + item] = tableData.value[item][header.value];
                }
            }
        }
        formModal.value = Object.assign({}, obj);
    };

    watch(() => tableData.value, updateData, {
        immediate: true,
    });

    // 更新表格数据
    const updateTableData = () => {
        for (let item in formModal.value) {
            const data = item.split('_');
            if (data.length > 1) {
                tableData.value[data[data.length - 1]][data[0]] = formModal.value[item];
            }
        }
    };

    // 添加数据
    const addData = () => {
        tableData.value.push({
            id: new Date().valueOf(),
        });
        updateTableData();
        updateData();
    };

    // 删除数据
    const deleteData = (scope: any) => {
        updateTableData();
        const index = scope.$index;
        tableData.value.splice(index, 1);
        updateData();
    };

    const getTableData = () => {
        //   const arr = tableData.value.filter((item: { Text: any; TextInList: any }) => {
        //     if (!item.Text && !item.TextInList) {
        //       return true;
        //     }
        //     return false;
        //   });
        //   if (arr.length) {
        //     ElMessage({
        //       type: "warning",
        //       message: "请清空没有数据的表格",
        //     });
        //     return;
        //   }
        return [formModal.value, tableData.value];
    };

    defineExpose({
        getTableData,
    });
</script>
<template>
    <el-divider>{{ title }}</el-divider>
    <span
        class="edit"
        @click="addData()"
    >
        添加行
    </span>
    <el-form
        :model="formModal"
        ref="refForm"
        class="edit-table"
    >
        <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column
                :label="item.label"
                :width="item.width"
                v-for="(item, index) in headerList"
                :key="item.value"
            >
                <template #default="scope">
                    <span v-if="scope.column.rawColumnKey === 'id'">
                        {{ formModal[item.value + '_' + scope.$index] }}
                    </span>
                    <span v-else-if="scope.column.rawColumnKey === 'action'">
                        <div class="btn-list">
                            <span
                                class="delete"
                                @click="deleteData(scope)"
                            >
                                删除
                            </span>
                        </div>
                    </span>
                    <el-form-item
                        v-else
                        :prop="item.value + index"
                    >
                        <el-input v-model="formModal[item.value + '_' + scope.$index]" />
                    </el-form-item>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
</template>

<style scoped lang="scss">
    .edit-table {
        .el-form-item {
            margin-bottom: 0;
        }
    }
</style>
