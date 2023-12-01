<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, reactive, ref, toRef, watchEffect } from 'vue';
    import { IPageSetting } from 'src/interface/editor';
    import { IsYesNo } from 'src/config';
    import { getKeyValue } from 'src/utils';
    import { CEditor } from 'src/utils/editor';
    import { EditPageDistanceSelected, EditPageSelected } from 'src/config/editorSelected';

    // const MIN = 0;
    const OthersOptions = {
        step: 0.01,
    };

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '页面设置';

    const visible = ref(false);
    const disabled = ref(true);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<IPageSetting>({
        //自定义
        PaperKind: 'A4',
        //宽度 毫米
        PaperWidthInCM: 0,
        //高度 毫米
        PaperHeightInCM: 0,
        //横向，纵向
        Landscape: false,
        //左边距
        LeftMarginInCM: 0,
        //右边距
        RightMarginInCM: 0,
        // /上边距
        TopMarginInCM: 0,
        //下边距
        BottomMarginInCM: 0,
        //页眉位置 单位 毫米
        HeaderDistance: 0,
        //页脚位置 单位 毫米
        FooterDistance: 0,
        ShowGutterLine: false,
        // 装订线位置
        GutterPosition: 0,
        SwapGutter: false,
        //0表示Left，1表示Top，2表示Right
        GutterStyle: '0',
        // 首页页眉和页脚不同
        HeaderFooterDifferentFirstPage: false,
    });

    const FormModalList = computed(() => {
        return [
            {
                type: 'Radio',
                name: 'Landscape',
                label: '页面方向',
                options: EditPageDistanceSelected,
            },

            {
                type: 'Select',
                name: 'PaperKind',
                label: '页面大小',
                options: EditPageSelected,
                events: {
                    change: (e: string) => {
                        const obj = getKeyValue(EditPageSelected, e);
                        if (obj && obj.widthmm) {
                            disabled.value = true;

                            formModal.PaperHeightInCM = obj.heightmm;
                            formModal.PaperWidthInCM = obj.widthmm;
                        } else {
                            disabled.value = false;
                            formModal.PaperHeightInCM = 0;
                            formModal.PaperWidthInCM = 0;
                        }
                    },
                },
            },
            {
                type: 'Text',
                label: '页面尺寸（mm）',
            },
            {
                type: 'InputNumber',
                name: 'PaperWidthInCM',
                label: '纸张宽度',
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'InputNumber',
                name: 'PaperHeightInCM',
                label: '纸张高度',
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'Text',
                label: '页边距（mm）',
            },
            {
                type: 'InputNumber',
                name: 'LeftMarginInCM',
                label: '页面左边距',
                others: OthersOptions,
            },
            {
                type: 'InputNumber',
                name: 'RightMarginInCM',
                label: '页面右边距',
                others: OthersOptions,
            },
            {
                type: 'InputNumber',
                name: 'TopMarginInCM',
                label: '页面上边距',
                others: OthersOptions,
            },
            {
                type: 'InputNumber',
                name: 'BottomMarginInCM',
                label: '页面下边距',
                others: OthersOptions,
            },
            {
                type: 'Text',
                label: '页眉页脚',
            },
            {
                type: 'Radio',
                name: 'HeaderFooterDifferentFirstPage',
                label: '首页页眉页脚不同',
                options: IsYesNo,
            },
            {
                type: 'InputNumber',
                name: 'HeaderDistance',
                label: '页眉位置',
                others: OthersOptions,
            },
            {
                type: 'InputNumber',
                name: 'FooterDistance',
                label: '页脚位置',
                others: OthersOptions,
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

    // 提交
    const submitModalForm = () => {
        formModalRef.value!.validate(async (valid) => {
            if (valid) {
                // console.log(formModal)
                props.editor?.setDocumentPageSettings(formModal);
                visible.value = false;
            }
        });
    };

    // 取消
    const cancelModalForm = () => {
        visible.value = false;
    };

    // 打开或者关闭弹框
    const modalTogetter = () => {
        visible.value = !visible.value;
    };

    watchEffect(() => {
        if (visible.value) {
            const obj = props.editor?.getDocumentPageSettings();
            if (obj) {
                Object.assign(formModal, obj);
                if (obj.PaperKind === 'Custom') {
                    disabled.value = false;
                }
            }
        }
    });

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
        <BaseForm
            :formProps="formModalProps"
            :dataList="FormModalLists"
        />
    </BaseModal>
</template>

<style lang="scss" scoped></style>
