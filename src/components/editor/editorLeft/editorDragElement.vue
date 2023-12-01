<script setup lang="ts">
    import { DragElementData } from 'src/config/editorDragElement';
    import { EExecuteCommand } from 'src/interface/editor';

    const getConfigText = (txt: string) => {
        return {
            ContentReadonly: 'Inherit',
            UserEditable: true,
            ToolTip: txt,
            BackgroundText: txt,
            Text: '',
            InnerValue: null,
            ValidateStyle: null,
            EnableValueValidate: true,
            Name: '',
            ID: new Date().valueOf(),
            Alignment: 'Near',
            BackgroundTextColor: null,
            TextColor: null,
            SpecifyWidth: 0,
            StartBorderText: null,
            EndBorderText: null,
            UnitText: null,
        };
    };

    const formatTree: any = (data: any[]) => {
        return data.map((item: { label: any; NodeText: any; children: any; ChildNodes: any }) => {
            item.label = item.NodeText;
            item.children = item.ChildNodes;
            if (item.children) {
                return {
                    ...item,
                    children: formatTree(item.children),
                };
            }
            return item;
        });
    };

    const dataList = formatTree(DragElementData);

    const dragstart = (e: DragEvent, data: any) => {
        const options = getConfigText(data.label);
        e.dataTransfer?.setData(
            'text/plain',
            JSON.stringify({
                type: EExecuteCommand.INSERT_INPUT_FIELD,
                data: options,
            }),
        );
    };
</script>
<template>
    <el-tree
        class="left-tree"
        :data="dataList"
    >
        <template #default="{ node, data }">
            <span
                draggable="true"
                v-on:dragstart="dragstart($event, data)"
            >
                {{ node.label }}
            </span>
        </template>
    </el-tree>
</template>

<style scoped>
    .left-tree {
        padding: 10px;
        min-width: 200px;
    }
</style>
