<script setup lang="ts">
    import { ISelected } from 'src/interface';
    import { ref, watch } from 'vue';
    const activeData = ref('');
    const data = defineProps({
        active: {
            type: String,
            default: '',
        },
        dataList: Array<ISelected>,
        clickTabs: Function,
        removeTabs: Function,
    });
    watch(
        () => data.active,
        (count) => {
            activeData.value = count;
        },
        {
            immediate: true,
        },
    );
</script>
<template>
    <el-tabs
        v-model="activeData"
        class="tabs-box"
        @tab-click="clickTabs"
        :closable="true"
        @tab-remove="removeTabs"
    >
        <el-tab-pane
            v-for="item in dataList"
            :label="item.label"
            :name="item.value"
            :key="item.value"
        >
            <slot :name="item.value"></slot>
        </el-tab-pane>
    </el-tabs>
</template>

<style lang="scss">
    .tabs-box {
        width: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
        > div {
            &:nth-child(2) {
                overflow: auto;
            }
        }
    }
</style>
