<script setup lang="ts">
    import { getPlaceholder } from './getPlaceholder';
    const props = defineProps({
        formItemProps: {
            type: Object,
            default: () => ({}),
        },
    });

    const loadingData = () => {
        return props.formItemProps.options;
    };
</script>

<template>
    <el-autocomplete
        v-model="formItemProps.value"
        :style="{ width: formItemProps.width || '100%' }"
        :placeholder="getPlaceholder(formItemProps)"
        clearable
        :fetch-suggestions="loadingData"
        v-bind="formItemProps.others"
        v-on="formItemProps.events || {}"
    >
        <template #default="{ item }">
            {{ item.label }}
        </template>
        <template
            v-if="formItemProps.render"
            #append
        >
            <component :is="formItemProps.render" />
        </template>
    </el-autocomplete>
</template>
