<script setup lang="ts">
    defineProps({
        formItemProps: {
            type: Object,
            default: () => ({}),
        },
    });
</script>

<template>
    <el-date-picker
        v-model="formItemProps.value"
        type="date"
        :placeholder="`请选择${formItemProps.label}时间`"
        v-bind="formItemProps.others"
        v-on="formItemProps.events || {}"
    />
</template>
