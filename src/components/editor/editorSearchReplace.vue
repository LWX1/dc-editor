<script setup lang="ts">
    import BaseForm from 'src/components/BaseForm.vue';
    import BaseModal from 'src/components/BaseModal.vue';
    import { FormInstance } from 'element-plus';
    import { computed, reactive, ref, toRef } from 'vue';
    import { ISearchReplace } from 'src/interface/editor';
    import { IsYesNo } from 'src/config';
    import { CEditor } from 'src/utils/editor';
    import BaseDraggableModal from '../BaseDraggableModal.vue';
    import { EditFontSelected } from 'src/config/editorSelected';

    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '查找/替换';

    const visible = ref(false);
    const disabled = ref(true);

    const formModalRef = ref<FormInstance>();

    const formModal = reactive<ISearchReplace>({
        searchstring: '',
        replacestring: '',
        enablereplacestring: false,
        backward: true,
        ignorecase: false,
        logundo: false,
        excludebackgroundtext: false,
        SearchID: false,
    });

    const FormModalList = computed(() => {
        return [
            {
                type: 'Input',
                name: 'searchstring',
                label: '查找内容',
                options: EditFontSelected,
            },
            {
                type: 'Text',
                label: '替换选项',
            },
            {
                type: 'Radio',
                name: 'enablereplacestring',
                label: '是否替换',
                options: IsYesNo,
                events: {
                    change: (e: boolean) => {
                        disabled.value = !e;
                    },
                },
            },

            {
                type: 'Input',
                name: 'replacestring',
                label: '替换内容',
                options: EditFontSelected,
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'Radio',
                name: 'backward',
                label: '方向',
                options: [
                    {
                        label: '向上',
                        value: false,
                    },
                    {
                        label: '向下',
                        value: true,
                    },
                ],
            },
            {
                type: 'Text',
                label: '其他选项',
            },
            {
                type: 'Radio',
                name: 'ignorecase',
                label: '是否区分大小写',
                options: IsYesNo,
            },
            {
                type: 'Radio',
                name: 'logundo',
                label: '是否记录撤销操作信息',
                options: IsYesNo,
            },
            {
                type: 'Radio',
                name: 'excludebackgroundtext',
                label: '是否忽略掉背景文字',
                options: IsYesNo,
            },
            {
                type: 'Radio',
                name: 'SearchID',
                label: '是否限制为查询元素编号',
                options: IsYesNo,
            },
        ];
    });

    const FormModalLists = reactive(
        FormModalList.value.map((item: any) => {
            item.value = toRef(formModal, item.name);
            return item;
        })
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
    const submitModalForm = (type: number) => {
        formModalRef.value!.validate(async (valid) => {
            if (valid) {
                switch (type) {
                    case 1:
                        return props.editor?.search(formModal);
                    case 2:
                        return props.editor?.reaplace(formModal);
                    case 3:
                        return props.editor?.reaplaceAll(formModal);
                }

                // console.log(formModal)
                // props.editor?.setFontObject(formModal);
                // visible.value = false
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

    defineExpose({
        modalTogetter,
    });
</script>

<template>
    <BaseDraggableModal
        :visible="visible"
        :title="title"
        :handleClose="cancelModalForm"
        :onSubmit="submitModalForm"
        :onCancel="cancelModalForm"
    >
        <template #footer>
            <el-button
                type="primary"
                @click="submitModalForm(1)"
            >
                查找
            </el-button>
            <el-button
                :disabled="disabled"
                type="primary"
                @click="submitModalForm(2)"
            >
                替换
            </el-button>
            <el-button
                :disabled="disabled"
                type="primary"
                @click="submitModalForm(3)"
            >
                全部替换
            </el-button>
            <el-button @click="cancelModalForm">关闭</el-button>
        </template>
        <BaseForm
            :formProps="formModalProps"
            :dataList="FormModalLists"
        />
    </BaseDraggableModal>
</template>

<style lang="scss" scoped></style>
