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
    const title = '眼球突出度';

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
        width="600px"
    >
        <el-form
            :model="formModal"
            ref="formModalRef"
            class="four-form"
            label-suffix="mm"
        >
            <el-row>
                <el-col :span="6"></el-col>
                <el-col
                    :span="12"
                    style="padding: 0 50px"
                    class="flex"
                >
                    <el-form-item class="four-form-item">
                        <el-input-number
                            v-model="formModal.Value2"
                            v-bind="InputNumberConfig"
                        />
                    </el-form-item>
                    <span class="unit">mm</span>
                </el-col>
                <el-col :span="6"></el-col>
            </el-row>
            <el-row class="row-border">
                <el-col
                    :span="6"
                    style="padding-right: 10px"
                    class="col-border col-1 flex"
                >
                    <el-form-item class="four-form-item">
                        <el-input-number
                            v-model="formModal.Value1"
                            v-bind="InputNumberConfig"
                        />
                    </el-form-item>
                    <span class="unit">mm</span>
                </el-col>
                <el-col
                    :span="12"
                    class="col-2"
                >
                    <i class="border-line" />
                </el-col>
                <el-col
                    :span="6"
                    style="padding-left: 10px"
                    class="col-border col-3 flex"
                >
                    <el-form-item class="four-form-item">
                        <el-input-number
                            v-model="formModal.Value3"
                            v-bind="InputNumberConfig"
                        />
                    </el-form-item>
                    <span class="unit">mm</span>
                </el-col>
            </el-row>
        </el-form>
    </BaseModal>
</template>

<style lang="scss" scoped>
    .four-form {
        overflow: hidden;
        .flex {
            display: flex;
            align-items: center;
            .unit {
                margin-left: 5px;
            }
        }
    }
    .row-border {
        height: 50px;
    }
    .col-2 {
        position: relative;
        height: 32px;

        .border-line {
            display: block;
            pointer-events: none;
            position: absolute;
            width: 94%;
            height: 0px;
            left: 8px;
            top: 50%;
            border-bottom: 1px solid;
        }
    }
    .col-border {
        position: relative;
        height: 32px;

        &::after {
            display: block;
            content: ' ';
            position: absolute;
            width: 1px;
            height: 100%;
            background: black;
            right: 0;
            top: 50%;
            transform: skewX(150deg);
            // transform: translateY(-50%) skewX(160deg);
        }
        &::before {
            display: block;
            content: ' ';
            position: absolute;
            width: 1px;
            height: 100%;
            background: black;
            right: 0;
            top: -45%;
            transform: skewX(30deg);
            // transform: translateY(-50%) skewX(160deg);
        }
        &.col-3 {
            &::after {
                left: 0;
                transform: skewX(-150deg);
            }
            &::before {
                left: 0;
                transform: skewX(-30deg);
            }
        }
    }
    .four-form-item {
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
