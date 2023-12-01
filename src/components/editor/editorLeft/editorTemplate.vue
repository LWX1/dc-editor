<script setup lang="ts">
    import { OperateEvent } from 'src/config';
    import { TemplateList } from 'src/config/template';
    import { EEditorSubOperateType } from 'src/interface/editor';
    import { ajax } from 'src/utils';
    import { SubInfo } from 'src/utils/pubSub';

    const formatTree: any = (data: any[]) => {
        return data.map((item: { label: any; NodeName: any; children: any; ChildNodes: any }) => {
            item.label = item.NodeName;
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

    const dataList = formatTree(TemplateList);

    const handleNodeClick = (node: { [x: string]: any; children: any }) => {
        if (!node.children) {
            ajax({
                url: `http://www.dcwriter.cn:6969/${node.NodePath}`,
                success: (data: any) => {
                    SubInfo.publish(OperateEvent, EEditorSubOperateType.ACTION_EXAMPLE, {
                        fileName: node.label,
                        fileExtension: node.FileExtension,
                        data,
                    });
                },
                async: true,
            });
        }
    };
</script>
<template>
    <el-tree
        class="left-tree"
        :data="dataList"
        @node-click="handleNodeClick"
    />
</template>

<style scoped>
    .left-tree {
        padding: 10px;
        min-width: 200px;
    }
</style>
