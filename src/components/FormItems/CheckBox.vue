<template>
    <template v-if="formItemProps.options">
        <el-checkbox-group
            v-model="formItemProps.value"
            v-bind="formItemProps.others"
            v-on="formItemProps.events || {}"
        >
            <el-checkbox
                v-for="item in formItemProps.options || []"
                v-bind="item"
                :key="item.value"
                :label="item.value"
            >
                {{ item.label }}
            </el-checkbox>
        </el-checkbox-group>
    </template>
    <template v-else>
        <el-checkbox
            v-model="formItemProps.value"
            :key="formItemProps.label"
            :label="formItemProps.label"
            v-bind="formItemProps.others"
            v-on="formItemProps.events || {}"
        >
            <!-- hiddenLabel 表示formItem label 被隐藏 -->
            {{ formItemProps.hiddenLabel ? formItemProps.label : '' }}
        </el-checkbox>
    </template>
</template>

<script setup lang="ts">
    defineProps({
        formItemProps: {
            type: Object,
            default: () => ({}),
        },
    });
</script>
