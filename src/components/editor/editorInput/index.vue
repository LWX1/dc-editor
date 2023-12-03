<script setup lang="ts">
    import BaseModal from 'src/components/BaseModal.vue';
    import { ref } from 'vue';
    import { CEditor } from 'src/utils/editor';
    import Normal from './normal.vue';
    import { IObject } from 'src/interface';
    import { getInputFeildOptions } from 'src/config/editorData';
    import { EEditorInputFeildType, EExecuteCommand } from 'src/interface/editor';
    import Format from './format.vue';
    import Validate from './validate.vue';
    import Others from './others.vue';
    import { IInputField } from 'src/interface/editorInputFeild';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '文字输入域属性';

    const visible = ref(false);

    const options: IObject<any> = ref({});

    // 是新增还是编辑
    let isAdd = true;

    const refTest = ref();

    // 标签
    const tagslist = [
        {
            label: '常规',
            value: '常规',
            component: Normal,
        },
        {
            label: '格式',
            value: '格式',
            component: Format,
        },
        {
            label: '校验',
            value: '校验',
            component: Validate,
        },
        {
            label: '其他',
            value: '其他',
            component: Others,
        },
    ];

    const activeName = ref(tagslist[0].value);

    const handleTabsClick = (values: { props: { name: string } }) => {
        activeName.value = values.props.name;
    };

    // 提交
    const submitModalForm = () => {
        // refList.forEach(item => {
        //   console.log(item.value.submitForm, item.value[0].submitForm)
        // })
        const all: any[] = [];
        refTest.value.forEach((item: any) => {
            all.push(item.submitForm());
        });

        Promise.all(all).then((dataList) => {
            if (!props.editor) return;
            let options = {};
            dataList.forEach((item) => {
                Object.assign(options, item);
            });
            // ctl.DCExecuteCommand("InsertInputField", false, newOptions);
            console.log(options, '提交');
            if (isAdd) {
                props.editor.executeCommand(EExecuteCommand.INSERT_INPUT_FIELD, false, options);
            } else {
                const ele = props.editor.getCurrentInputField();
                props.editor.setElementProperties(options, ele);
                props.editor.refreshDocument();
            }

            visible.value = false;
            // console.log(res, 5555)
        });
    };

    // 取消
    const cancelModalForm = () => {
        visible.value = false;
    };

    // 打开或者关闭弹框
    const modalTogetter = (values: EEditorInputFeildType | IInputField) => {
        if (typeof values === 'string') {
            isAdd = true;
            const result = getInputFeildOptions()[values];
            // 数组直接插入
            if (Array.isArray(result.data)) {
                result.data.forEach((item) => {
                    props.editor?.executeCommand(result.type, false, item);
                });
            } else {
                options.value = result.data;
                visible.value = !visible.value;
            }
        } else {
            isAdd = false;
            options.value = values;
            visible.value = !visible.value;
        }
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
        :close-on-click-modal="false"
    >
        <el-tabs
            v-model="activeName"
            class="tabs-box"
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
                    :options="options"
                    ref="refTest"
                />
            </el-tab-pane>
        </el-tabs>
    </BaseModal>
</template>

<style lang="scss" scoped>
    .tabs-box {
        width: 100%;
        max-height: inherit;
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
