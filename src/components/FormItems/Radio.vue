<script setup lang="ts">
    defineProps({
        formItemProps: {
            type: Object,
            default: () => ({}),
        },
    });
</script>

<template>
    <el-radio-group
        v-model="formItemProps.value"
        v-bind="formItemProps.others"
        v-on="formItemProps.events || {}"
    >
        <el-radio
            v-for="item in formItemProps.options || []"
            v-bind="item"
            :key="item.value"
            :label="item.value"
        >
            {{ item.label }}
        </el-radio>
    </el-radio-group>
</template>
