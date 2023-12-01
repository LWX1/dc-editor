<script setup lang="ts">
    import FormItemCom from 'src/utils/getFormItems';
    import { defineAsyncComponent, reactive, watch } from 'vue';

    const state = reactive({
        auto: '',
    });

    const props = defineProps({
        formItemProps: {
            type: Object,
            default: () => ({}),
        },
    });

    watch(
        () => props.formItemProps.value,
        () => {
            state.auto = props.formItemProps.value;
        },
        {
            immediate: true,
        },
    );

    // 加载下拉
    const loadingData = () => {
        return props.formItemProps.options;
    };

    // 输入改变
    const changeData = (value: string) => {
        state.auto = value;
        props.formItemProps.events.change && props.formItemProps.events.change(value);
    };

    // 选择改变
    const selectData = (value: { value: string }) => {
        state.auto = value.value;
        props.formItemProps.events.select && props.formItemProps.events.select(value);
    };
    const currentTab = defineAsyncComponent(
        FormItemCom[props.formItemProps.type] || FormItemCom['Input'],
    );
</script>

<template>
    <!-- 特殊处理 -->
    <template v-if="formItemProps.type === 'Auto' && !formItemProps.name">
        <el-autocomplete
            v-model="state.auto"
            :fetch-suggestions="loadingData"
            v-bind="formItemProps.others"
            @change="changeData"
            @select="selectData"
        />
    </template>
    <template v-else>
        <component
            :is="currentTab"
            :formItemProps="formItemProps"
        ></component>
    </template>
</template>

<style lang="scss" scoped></style>
