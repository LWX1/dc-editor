<script setup lang="ts">
    import { defineAsyncComponent } from 'vue';
    import { getPlaceholder } from './getPlaceholder';
    const props = defineProps({
        formItemProps: {
            type: Object,
            default: () => ({}),
        },
    });

    const com = props.formItemProps.component || {};
    const CurrentComponent = com.render && defineAsyncComponent(com.render);
    const CurrentComponentProps = com.props || {};
</script>
<template>
    <el-input
        :clearable="true"
        :placeholder="getPlaceholder(formItemProps)"
        v-model="formItemProps.value"
        :style="{ width: formItemProps.width || '100%' }"
        v-bind="formItemProps.others"
        v-on="formItemProps.events || {}"
    >
        <template
            v-if="CurrentComponent"
            #append
        >
            <CurrentComponent v-bind="CurrentComponentProps" />
        </template>
        <template
            v-else-if="formItemProps.render"
            #append
        >
            <component :is="formItemProps.render" />
        </template>
    </el-input>
</template>
