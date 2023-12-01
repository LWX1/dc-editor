<script setup lang="ts">
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { reactive, ref } from 'vue';
    import { EEditorInputFeildType, EExecuteCommand } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { getInputFeildOptions } from 'src/config/editorData';
    import { IInputField } from 'src/interface/editorInputFeild';
    import { IObject } from 'src/interface';
    import { clearObject } from 'src/utils';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    const InputNumberConfig = {
        'controls-position': 'right',
        style: 'width: 100%;',
    };

    /*****弹框表单 */
    const title = '月经史公式3';

    const visible = ref(false);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IObject<string>>({});

    let isAdd = true;

    // 提交
    const submitModalForm = () => {
        formModalRef.value!.validate(async (valid) => {
            if (!props.editor) return;
            if (valid) {
                const obj: IObject<any> = { ...formModal };
                const values = `Value1:${obj.Value1};Value2:${obj.Value2};Value3:${obj.Value3};`;
                obj.Values = values;
                console.log('options', obj);
                if (isAdd) {
                    props.editor?.executeCommand(
                        EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
                        false,
                        obj
                    );
                } else {
                    const ele = props.editor.getCurrentElement();
                    props.editor.setElementProperties(obj, ele);
                    props.editor.refreshDocument();
                }
                visible.value = !visible.value;
            }
        });
    };

    // 取消
    const cancelModalForm = () => {
        visible.value = false;
    };

    // 打开或者关闭弹框
    const modalTogetter = (values: EEditorInputFeildType | IInputField) => {
        visible.value = !visible.value;
        clearObject(formModal);
        let obj;
        if (typeof values === 'string') {
            isAdd = true;
            // 深拷贝测试数据，防止被修改
            obj = JSON.parse(JSON.stringify(getInputFeildOptions()[values].data));
        } else {
            isAdd = false;
            obj = values;
        }
        if (obj.Values) {
            const listArr = obj.Values.split(';');
            listArr.forEach((item) => {
                const arr = item.split(':');
                obj[arr[0]] = Number(arr[1]);
            });
        }
        Object.assign(formModal, obj);
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
        width="500px"
    >
        <el-form
            :model="formModal"
            label-width="120px"
            label-position="top"
            ref="formModalRef"
            class="four-form"
        >
            <el-row>
                <el-col :span="12"></el-col>
                <el-col
                    :span="12"
                    class="border-col"
                >
                    <i class="border-line line-1" />
                    <el-form-item
                        label="B值"
                        class="four-form-item"
                    >
                        <el-input-number
                            v-model="formModal.Value2"
                            v-bind="InputNumberConfig"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="row-2">
                <el-col
                    :span="12"
                    style="padding-right: 40px"
                    class="col-1"
                >
                    <el-form-item
                        label="A值"
                        class="four-form-item"
                    >
                        <el-input-number
                            v-model="formModal.Value1"
                            v-bind="InputNumberConfig"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="12"></el-col>
            </el-row>
            <el-row>
                <el-col :span="12"></el-col>
                <el-col :span="12">
                    <el-form-item
                        label="C值"
                        class="four-form-item"
                    >
                        <el-input-number
                            v-model="formModal.Value3"
                            v-bind="InputNumberConfig"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </BaseModal>
</template>

<style lang="scss" scoped>
    .four-form {
        overflow: hidden;
    }
    .border-col {
        position: relative;
        .border-line {
            display: block;
            pointer-events: none;
            position: absolute;
            width: 100%;
            height: 150%;
            left: 0;
            top: 0;
            &.line-1 {
                border-bottom: 1px solid;
            }
        }
    }
    .row-2 {
        .col-1 {
            position: relative;
            &::after {
                display: block;
                content: ' ';
                position: absolute;
                width: 1px;
                height: 50%;
                background: black;
                right: 20px;
                top: 50%;
                transform: translateY(-50%) skewX(160deg);
            }
        }
    }
    .four-form-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
