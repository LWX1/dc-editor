<script setup lang="ts">
    import { FormInstance } from 'element-plus';
    import { computed, reactive, ref, toRef, watch } from 'vue';
    import { CEditor } from 'src/utils/editor';
    import { IsYesNo } from 'src/config';
    import { IObject } from 'src/interface';
    import { clearObject } from 'src/utils';
    import { IInputField } from 'src/interface/editorInputFeild';
    import {
        EditAlignmentSelected,
        EditFocusSelected,
        EditActiveSelected,
        EditHighLightSelected,
        EditPrintVisibleSelected,
        EditBorderVisibleSelected,
        EditReadonlySelected,
        EditEncryptSelected,
    } from 'src/config/editorSelected';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
        options: {
            type: Object,
            default: {},
        },
    });

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IInputField>({
        BackgroundTextColor: '#000',
        TextColor: '#000',
        BackgroundColorString: '#000',
    });

    const inheritRef = reactive({
        textColorDisable: true,
        strColorDisabled: true,
    });

    const FormModalList = computed(() => {
        return [
            {
                type: 'Text',
                label: '基本属性',
            },
            {
                type: 'Input',
                name: 'ID',
                label: '编号ID',
                rules: [{ required: true, message: '请输入编号ID' }],
            },

            {
                type: 'Input',
                name: 'Name',
                label: '名称',
                rules: [{ required: true, message: '请输入名称' }],
            },
            {
                type: 'Input',
                name: 'BackgroundText',
                label: '背景文字',
            },
            {
                type: 'Input',
                name: 'ToolTip',
                label: '提示文字',
            },
            {
                type: 'Input',
                name: 'StartBorderText',
                label: '左边框',
            },
            {
                type: 'Input',
                name: 'EndBorderText',
                label: '右边框',
            },
            {
                type: 'Radio',
                name: 'Alignment',
                label: '内容对齐放松',
                options: EditAlignmentSelected,
            },
            {
                type: 'InputNumber',
                name: 'SpecifyWidth',
                label: '固定宽度',
            },
            {
                type: 'Radio',
                name: 'MoveFocusHotKey',
                label: '焦点快捷键',
                options: EditFocusSelected,
            },
            {
                type: 'Input',
                name: 'LabelText',
                label: '标签文本',
            },
            {
                type: 'Input',
                name: 'UnitText',
                label: '单位文本',
            },
            {
                type: 'Input',
                name: 'DefaultEventExpression',
                label: '简单级联',
            },
            {
                type: 'Select',
                name: 'EditorActiveMode',
                label: '激活模式',
                options: EditActiveSelected,
                others: {
                    multiple: true,
                },
            },
            {
                type: 'Radio',
                name: 'EnableHighlight',
                label: '高亮度状态',
                options: EditHighLightSelected,
            },
            {
                type: 'Radio',
                name: 'PrintVisibility',
                label: '打印显示',
                options: EditPrintVisibleSelected,
            },
            {
                type: 'Radio',
                name: 'BorderVisible',
                label: '边框是否可见',
                options: EditBorderVisibleSelected,
            },
            {
                type: 'Text',
                label: '权限属性',
            },
            {
                type: 'Select',
                name: 'HiddenPrintWhenEmpty',
                label: '是否为空时打印隐藏',
                options: IsYesNo,
            },
            {
                type: 'Radio',
                name: 'Deleteable',
                label: '是否允许被删除',
                options: IsYesNo,
            },
            {
                type: 'Radio',
                name: 'UserEditable',
                label: '是否可以直接编辑修改内容',
                options: IsYesNo,
            },
            {
                type: 'Radio',
                name: 'ContentReadonly',
                label: '是否只读',
                options: EditReadonlySelected,
            },
            {
                type: 'InputNumber',
                name: 'MaxInputLength',
                label: '输入最大字符数',
            },
            {
                type: 'Radio',
                name: 'ViewEncryptType',
                label: '加密显示',
                options: EditEncryptSelected,
            },
            {
                type: 'Text',
                label: '赋值属性',
            },
            {
                type: 'Input',
                name: 'DataSource',
                label: '数据源名称',
            },
            {
                type: 'Input',
                name: 'BindingPath',
                label: '绑定路径',
            },
            {
                type: 'Input',
                name: 'BindingPathForText',
                label: 'Text绑定路径',
            },
            {
                type: 'Text',
                label: '颜色属性',
            },
            {
                type: 'Radio',
                name: 'textColorDisable',
                label: '继承文本颜色',
                options: IsYesNo,
                events: {
                    change: (e: boolean) => {
                        inheritRef.textColorDisable = e;
                    },
                },
            },
            {
                type: 'Color',
                name: 'TextColor',
                label: '文字颜色',
                others: {
                    disabled: toRef(inheritRef, 'textColorDisable'),
                },
            },
            {
                type: 'Color',
                name: 'BackgroundTextColor',
                label: '背景文字颜色',
                others: {
                    disabled: toRef(inheritRef, 'textColorDisable'),
                },
            },
            {
                type: 'Text',
                label: '背景颜色属性',
            },
            {
                type: 'Radio',
                name: 'strColorDisabled',
                label: '继承文本颜色',
                options: IsYesNo,
                events: {
                    change: (e: boolean) => {
                        inheritRef.strColorDisabled = e;
                    },
                },
            },
            {
                type: 'Color',
                name: 'BackgroundColorString',
                label: '背景颜色',
                others: {
                    disabled: toRef(inheritRef, 'strColorDisabled'),
                },
            },
        ];
    });

    const FormModalLists = reactive(
        FormModalList.value.map((item: any) => {
            item.value = toRef(formModal, item.name);
            return item;
        }),
    );

    const formModalProps = computed(() => {
        return {
            model: formModal,
            ref: formModalRef,
            'label-width': '180px',
            rules: {
                //   name: [{ required: true, message: '请输入菜单名字', trigger: 'blur' }],
                //   type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
                //   url: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }]
                // icon: [{ required: true, message: '请输入菜单图标', trigger: 'blur' }]
            },
        };
    });

    watch(
        () => props.options,
        () => {
            const options = JSON.parse(JSON.stringify(props.options));
            clearObject(formModal);

            Object.assign(formModal, options, {
                textColorDisable: true,
                strColorDisabled: true,
            });
            if (formModal.EditorActiveMode) {
                formModal.EditorActiveMode = (formModal.EditorActiveMode as string).split(',');
            }
            if (formModal.ValueBinding) {
                Object.assign(formModal, formModal.ValueBinding);
            }
            inheritRef.textColorDisable = true;
            inheritRef.strColorDisabled = true;
        },
        {
            immediate: true,
        },
    );

    // 提交
    const submitForm = () => {
        return new Promise((resolve) => {
            formModalRef.value!.validate(async (valid) => {
                if (valid) {
                    const obj: IObject<any> = {};
                    let EditorActiveMode: string;
                    if (formModal.EditorActiveMode) {
                        EditorActiveMode = (formModal.EditorActiveMode as []).join(',');
                    }

                    // 过滤字符串只需要自己的
                    FormModalList.value.forEach((item) => {
                        if (item.name) {
                            if (item.name === 'EditorActiveMode') {
                                obj[item.name as string] = EditorActiveMode;
                            } else {
                                obj[item.name as string] = formModal[item.name as string];
                            }
                        }
                    });
                    obj.ValueBinding = {
                        BindingPath: formModal.BindingPath,
                        DataSource: formModal.DataSource,
                        BindingPathForText: formModal.BindingPathForText,
                    };
                    resolve(obj);
                }
            });
        });
    };

    defineExpose({
        submitForm,
    });
</script>

<template>
    <BaseForm
        :formProps="formModalProps"
        :dataList="FormModalLists"
    />
</template>

<style lang="scss" scoped></style>
