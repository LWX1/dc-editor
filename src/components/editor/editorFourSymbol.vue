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
    const title = '斜视符号';

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
                const values = `Value1:${obj.Value1};`;
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
                obj[arr[0]] = arr[1];
            });
        }
        console.log(obj);
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
        width="600px"
    >
        <el-form
            inline="true"
            :model="formModal"
            ref="formModalRef"
            class="four-form"
        >
            <el-form-item
                class="four-form-item"
                label="类型"
            >
                <el-radio-group
                    v-model="formModal.Value1"
                    v-bind="InputNumberConfig"
                >
                    <el-radio label="L" />
                    <el-radio label="R" />
                    <el-radio label="LR" />
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div class="four-box">
            <div class="four-view">
                <p
                    v-show="formModal.Value1 !== 'R'"
                    class="left-line"
                    style="display: block"
                ></p>
                <p
                    v-show="formModal.Value1 !== 'L'"
                    class="right-line"
                    style="display: block"
                ></p>
                <p class="center-round"></p>
                <p
                    style="
                        position: absolute;
                        bottom: 0px;
                        left: 10px;
                        font-size: 14px;
                        font-weight: 900;
                        display: block;
                    "
                >
                    L
                </p>
                <p
                    style="
                        position: absolute;
                        bottom: 0px;
                        right: 10px;
                        font-size: 14px;
                        font-weight: 900;
                        display: block;
                    "
                >
                    R
                </p>
            </div>
        </div>
    </BaseModal>
</template>

<style lang="scss" scoped>
    p {
        margin: 0;
    }
    .four-form-item {
        margin: 0;
        > label {
            text-align: center !important;
        }
    }
    .four-form {
        overflow: hidden;
        text-align: center;
    }
    .four-box {
        width: 180px;
        height: 180px;
        background: #9bbbe3;
        padding: 10px;
        margin: auto;
    }
    .four-view {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        position: relative;
        .left-line {
            width: 100%;
            border-top: 3px solid #000;
            position: absolute;
            top: 50%;
            transform: rotate(-45deg) translateY(-50%);
        }
        .right-line {
            width: 100%;
            border-top: 3px solid #000;
            position: absolute;
            top: 50%;
            transform: rotate(45deg) translateY(-50%);
        }
        .center-round {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #000;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -5px !important;
            margin-left: -5px !important;
        }
    }
</style>
