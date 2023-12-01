<template>
    <el-form-item
        v-bind="formItemProp"
        :others="undefined"
        :render="undefined"
        :prop="formItemProp.name"
    >
        <component
            :is="currentTab"
            :formItemProps="formItemProps"
        ></component>
    </el-form-item>
</template>

<script setup lang="ts">
    import { computed, defineAsyncComponent } from 'vue';
    import FormItemCom from 'src/utils/getFormItems';

    const props = defineProps({
        formItemProps: {
            type: Object,
            default: () => ({}),
        },
        defaultFormItemProps: {
            type: Object,
            default: () => ({}),
        },
    });

    const formItemProp = computed(() => {
        return Object.assign({}, props.defaultFormItemProps, props.formItemProps, {
            options: undefined,
        });
    });
    // console.log(props.formItemProps)
    const currentTab = defineAsyncComponent(
        FormItemCom[props.formItemProps.type] || FormItemCom['Input'],
    );
</script>

<style lang="scss" scoped></style>
