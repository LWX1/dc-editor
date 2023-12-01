<script setup lang="ts">
    import { ref } from 'vue';
    import { CEditor } from 'src/utils/editor';
    import EditorTemplate from './editorTemplate.vue';
    import EditorDragElement from './editorDragElement.vue';

    defineProps({
        editor: {
            type: CEditor,
        },
    });

    // 标签
    const tagslist = [
        {
            label: '模板列表',
            value: '模板列表',
            component: EditorTemplate,
        },
        {
            label: '拖拽元素列表',
            value: '拖拽元素列表',
            component: EditorDragElement,
        },
    ];

    const activeName = ref(tagslist[0].value);

    const handleTabsClick = (values: { props: { name: string } }) => {
        activeName.value = values.props.name;
    };
</script>

<template>
    <el-tabs
        v-model="activeName"
        class="tabs-right-box"
        @tab-click="handleTabsClick"
    >
        <el-tab-pane
            :label="item.label"
            :name="item.value"
            v-for="item in tagslist"
        >
            <component
                :is="item.component"
                :editor="editor"
                ref="refTest"
            />
        </el-tab-pane>
    </el-tabs>
</template>

<style lang="scss">
    .tabs-right-box {
        width: 300px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        > div {
            &:nth-of-type(2) {
                overflow: auto;
            }
        }
    }
</style>
