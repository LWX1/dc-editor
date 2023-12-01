<script setup lang="ts">
    import { FormInstance } from 'element-plus';
    import { computed, reactive, ref, toRef, watch, watchEffect } from 'vue';
    import { CEditor } from 'src/utils/editor';
    import { IsYesNo } from 'src/config';
    import { IFormItem, IObject } from 'src/interface';
    import { clearObject } from 'src/utils';
    import { IInputField } from 'src/interface/editorInputFeild';

    const ValidTypeObj = {
        Text: 'Text',
        Number: 'Numeric',
        Date: 'Date',
        Reg: 'Reg',
    };

    const ValidType = [
        {
            label: '纯文本格式校验',
            value: ValidTypeObj.Text,
        },
        {
            label: '数值格式校验',
            value: ValidTypeObj.Number,
        },
        {
            label: '日期时间格式校验',
            value: ValidTypeObj.Date,
        },
        {
            label: '正则表达式',
            value: ValidTypeObj.Reg,
        },
    ];

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

    // 表单数据
    const formModal = reactive<IInputField>({});

    // 表单列表
    const FormModalLists = ref<Array<IFormItem>>([]);

    // 校验类型
    const validTypeRef = ref();

    watchEffect(() => {
        let arr = [
            {
                type: 'Text',
                label: '基本属性',
            },
            {
                type: 'Select',
                name: 'Required',
                label: '是否必填',
                options: IsYesNo,
            },

            {
                type: 'Input',
                name: 'CustomMessage',
                label: '错误提示',
            },

            {
                type: 'Input',
                name: 'ExcludeKeywords',
                label: '违禁关键字',
            },
            {
                type: 'Input',
                name: 'IncludeKeywords',
                label: '允许关键字',
            },
            {
                type: 'Select',
                name: 'ValidType',
                label: '类型格式校验',
                options: ValidType,
                events: {
                    change: (e: string) => {
                        validTypeRef.value = e;
                    },
                },
            },
            {
                type: 'Text',
                label: '额外属性',
            },
        ];
        if (validTypeRef.value === ValidTypeObj.Text) {
            arr.push(
                {
                    type: 'InputNumber',
                    name: 'MinLength',
                    label: '最小长度',
                },
                {
                    type: 'InputNumber',
                    name: 'MaxLength',
                    label: '最大长度',
                },
            );
        } else if (validTypeRef.value === ValidTypeObj.Number) {
            arr.push(
                {
                    type: 'InputNumber',
                    name: 'CheckMinValue',
                    label: '最小长度',
                },
                {
                    type: 'InputNumber',
                    name: 'CheckMaxValue',
                    label: '最大长度',
                },
                {
                    type: 'InputNumber',
                    name: 'CheckDecimalDigits',
                    label: '最大小数位数',
                },
            );
        } else if (validTypeRef.value === ValidTypeObj.Date) {
            arr.push(
                {
                    type: 'Date',
                    name: 'DateTimeMinValue',
                    label: '不得早于',
                },
                {
                    type: 'Date',
                    name: 'DateTimeMaxValue',
                    label: '不得晚于',
                },
            );
        } else if (validTypeRef.value === ValidTypeObj.Reg) {
            arr.push({
                type: 'Input',
                name: 'RegExpression',
                label: '正则表达式',
            });
        }
        FormModalLists.value = arr.map((item: any) => {
            item.value = toRef(formModal, item.name);
            return item;
        });
    });

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
            Object.assign(formModal, options.ValidateStyle);
            formModal.ValidType = options.InnerEditStyle;
            validTypeRef.value = options.InnerEditStyle || ValidTypeObj.Text;
            // if (options.InnerEditStyle)
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
                    const obj: IObject<string> = {};
                    // 过滤字符串只需要自己的
                    [
                        'Required',
                        'CustomMessage',
                        'ExcludeKeywords',
                        'IncludeKeywords',
                        'MinLength',
                        'MaxLength',
                        'CheckMinValue',
                        'CheckMaxValue',
                        'CheckDecimalDigits',
                        'DateTimeMinValue',
                        'DateTimeMaxValue',
                        'RegExpression',
                    ].forEach((item) => {
                        obj[item] = formModal[item];
                    });
                    resolve({
                        ValidateStyle: obj,
                    });
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
