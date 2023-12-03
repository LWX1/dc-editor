<script setup lang="ts">
    import BaseModal from 'src/components/BaseModal.vue';
    import { computed, ref } from 'vue';
    import { EExecuteCommand } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import {
        EditMedicalCharSelected,
        EditNumericCharSelected,
        EditRomanCharSelected,
        EditSpecialCharSelected,
    } from 'src/config/editorSelected';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '插入特殊符号';
    // 案例

    const visible = ref(false);

    const tagslist = [
        {
            name: '特殊字符',
            dataList: EditSpecialCharSelected,
        },
        {
            name: '罗马字符',
            dataList: EditRomanCharSelected,
        },
        {
            name: '数字字符',
            dataList: EditNumericCharSelected,
        },
        {
            name: '医学字符',
            dataList: EditMedicalCharSelected,
        },
    ];

    const activeName = ref(tagslist[0].name);

    const dataList = computed(() => {
        const result = tagslist.find((item) => activeName.value === item.name);
        if (result) {
            return result.dataList;
        }
        return [];
    });

    // 切换tabs
    const handleTabsClick = (value: string) => {
        activeName.value = value;
    };

    // 提交
    const submitModalForm = (value) => {
        props.editor?.executeCommand(EExecuteCommand.INSERT_SPECIFY_CHARACTER, false, value);
        cancelModalForm();
    };

    // 取消
    const cancelModalForm = () => {
        visible.value = false;
    };

    // 打开或者关闭弹框
    const modalTogetter = () => {
        visible.value = !visible.value;
    };

    defineExpose({
        modalTogetter,
    });
</script>

<template>
    <BaseModal
        :visible="visible"
        :title="title"
        :handleClose="cancelModalForm"
        :onSubmit="submitModalForm"
        :onCancel="cancelModalForm"
    >
        <el-tabs
            v-model="activeName"
            class="tabs-box"
            @tab-click="handleTabsClick"
        >
            <el-tab-pane
                :label="item.name"
                :name="item.name"
                v-for="item in tagslist"
            >
                <div class="specify-box">
                    <el-tag
                        class="specify-tag"
                        v-for="tags in dataList"
                        :key="tags.value"
                        @click="submitModalForm(tags.value)"
                    >
                        {{ tags.label }}
                    </el-tag>
                </div>
            </el-tab-pane>
        </el-tabs>
    </BaseModal>
</template>

<style lang="scss" scoped>
    .specify-box {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        .specify-tag {
            cursor: pointer;
            &:hover {
                background-color: #a5c8ee;
            }
        }
    }
</style>
