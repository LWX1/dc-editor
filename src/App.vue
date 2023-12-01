<script setup lang="ts">
    import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
    import { RouterView } from 'vue-router';
</script>

<template>
    <el-config-provider :locale="zhCn">
        <RouterView />
    </el-config-provider>
</template>

<style scoped lang="scss"></style>
