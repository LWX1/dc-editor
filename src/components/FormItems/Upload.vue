<script setup lang="ts">
    defineProps({
        formItemProps: {
            type: Object,
            default: () => ({}),
        },
    });
</script>
<template>
    <el-upload
        ref="uploadRef"
        v-model="formItemProps.value"
        v-bind="formItemProps.others"
        v-on="formItemProps.events || {}"
    >
        <el-button
            type="primary"
            v-show="!formItemProps.others?.hiddenBtn"
            :disabled="formItemProps.others?.disabled"
            :size="formItemProps.others?.size"
        >
            上传
        </el-button>
    </el-upload>
</template>
