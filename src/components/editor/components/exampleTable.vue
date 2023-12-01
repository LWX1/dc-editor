<script setup lang="ts">
    import BaseTable from 'src/components/BaseTable.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { getEditorFunction } from 'src/config/editorData';
    import { ref } from 'vue';
    const visible = ref(false);
    const title = '示例';
    const cancelModalForm = () => {
        visible.value = false;
    };
    const modalTogetter = () => {
        visible.value = true;
    };

    const columns = [
        {
            title: '函数',
            dataIndex: 'function',
        },
        {
            title: '解释说明',
            dataIndex: 'description',
        },
        {
            title: '用法',
            dataIndex: 'example',
        },
    ];
    const tableData = getEditorFunction();

    defineExpose({
        modalTogetter: modalTogetter,
    });
</script>

<template>
    <BaseModal
        :visible="visible"
        :title="title"
        :handleClose="cancelModalForm"
        :hiddenSubmit="true"
        :onCancel="cancelModalForm"
    >
        <BaseTable
            :tableData="tableData"
            :columns="columns"
            :pagination="undefined"
        />
    </BaseModal>
</template>

<style lang="scss" scoped></style>
