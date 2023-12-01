<script setup lang="ts">
    defineProps({
        formItemProps: {
            type: Object,
            default: () => ({}),
        },
    });
</script>
<template>
    <el-color-picker
        v-model="formItemProps.value"
        v-bind="formItemProps.others"
        v-on="formItemProps.events || {}"
    />
</template>

<style scoped></style>
