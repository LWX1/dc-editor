<script setup lang="ts">
    import { OneMenus, TwoMenus } from 'src/config/editorMenuConfig';
    import { CEditor } from 'src/utils/editor';
    import { computed } from 'vue';
    import EditorMenusItem from './editorMenusItem.vue';
    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });
    const oneMenusComputes = computed(() => {
        return OneMenus();
    });

    const twoMenusComputes = computed(() => {
        return TwoMenus(props.editor as CEditor);
    });
</script>
<template>
    <el-tabs type="border-card">
        <el-tab-pane
            :label="item.label"
            v-for="item in oneMenusComputes"
            :key="item.value"
        >
            <div
                v-if="twoMenusComputes[item.value]"
                class="menus-box"
            >
                <div
                    class="menus-item"
                    v-for="menus in Object.keys(twoMenusComputes[item.value])"
                    :key="item.value"
                >
                    <div class="menus-list">
                        <div v-for="menu in twoMenusComputes[item.value][menus]">
                            <div
                                v-for="data in menu"
                                :key="data.label"
                                class="edit-item"
                            >
                                <span
                                    v-if="!data.type"
                                    class="edit"
                                    v-bind="data.others"
                                    v-on="data.events || {}"
                                >
                                    {{ data.label }}
                                </span>
                                <template v-else>
                                    <span
                                        v-show="!data.hiddenLabel"
                                        :class="data.type ? '' : 'edit'"
                                    >
                                        {{ data.label }}
                                    </span>
                                    <EditorMenusItem
                                        :formItemProps="data"
                                        :editor="editor"
                                    />
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="menus-sub-title">
                        {{ menus }}
                    </div>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped lang="scss">
    .menus-box {
        display: flex;
        gap: 10px;
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#ffffff), to(#eaedf1));
        // min-height: 110px;
        .menus-item {
            display: flex;
            padding: 10px;
            justify-content: space-between;
            flex-direction: column;
            border-right: 1px solid #d7d7d7;
            &:last-child {
                border: none;
            }
            .menus-list {
                display: flex;
                gap: 10px;

                .edit-item {
                    white-space: nowrap;
                    margin-bottom: 5px;
                    color: rgba(0, 0, 0, 0.7);
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
            // background-color: antiquewhite;
        }
        .menus-sub-title {
            text-align: center;
            color: rgb(124, 124, 216);
        }
    }
</style>
