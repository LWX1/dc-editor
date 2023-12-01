<script setup lang="ts">
    import { SubInfo } from 'src/utils/pubSub';
    import { onMounted, onUnmounted, ref } from 'vue';

    const editor = defineProps({
        id: String,
    });

    const min = 0.1;
    const max = 5;
    const scaleRef = ref(1);
    // 获取放大缩小，并发送给编辑器
    const getScale = (scale: number) => {
        SubInfo.publish('componentToEditorScale', scale, editor.id);
    };

    // 编辑器发送数据给缩放组件
    const changeScale = (values: number) => {
        // console.log(values)
        scaleRef.value = values;
    };

    onMounted(() => {
        // 监听放大
        SubInfo.subscribe('editorToComponentScale', changeScale);
    });
    onUnmounted(() => {
        // 监听放大
        SubInfo.unSubscribe('editorToComponentScale', changeScale);
    });
</script>
<template>
    <div class="scale">
        <span>{{ min }}</span>
        <el-slider
            v-model="scaleRef"
            :min="min"
            :max="max"
            size="small"
            :step="0.1"
            @change="getScale"
        />
        <span>{{ max }}</span>
        <span>当前：{{ scaleRef }}</span>
    </div>
</template>

<style scoped lang="scss">
    .scale {
        display: flex;
        align-items: center;
        position: fixed;
        right: 0;
        width: 300px;
        height: 20px;
        bottom: 0;
        z-index: 9;
        margin-right: 10px;
        gap: 5px;
        > span {
            white-space: nowrap;
        }
        .el-slider {
            --el-border-color-light: #fff;
            --el-slider-button-size: 14px;
        }
    }
</style>
