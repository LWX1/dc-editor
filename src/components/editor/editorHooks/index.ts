import { EditProcessStateSelected } from 'src/config/editorSelected';
import { ref, toRef } from 'vue';

/** 使用数据绑定结构 */
export const useDataSource = () => {
    const disabled = ref(true);

    const setDisabled = (values: boolean) => {
        disabled.value = values;
    };

    return {
        setDisabled,
        data: [
            {
                type: 'Text',
                label: '数据源信息',
            },
            {
                type: 'CheckBox',
                // 名字重复，得替换
                name: 'DataEnabled',
                label: '数据源绑定设置有效',
                events: {
                    change: (values: boolean) => {
                        disabled.value = !values;
                    },
                },
            },
            {
                type: 'Input',
                name: 'DataSource',
                label: '数据源',
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'Input',
                name: 'FormatString',
                label: '格式化',
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'Input',
                name: 'BindingPath',
                label: '绑定路径',
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'Input',
                name: 'BindingPathForText',
                label: 'Text的绑定路径(仅适用于输入域元素)',
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'CheckBox',
                name: 'Readonly',
                label: '只读，不能回填',
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'CheckBox',
                name: 'AutoUpdate',
                label: '自动更新，当加载文档或数据源发生变化时自动更新数值',
                others: {
                    disabled: toRef(disabled),
                },
            },
            {
                type: 'Select',
                name: 'ProcessState',
                label: '执行状态',
                options: EditProcessStateSelected,
                others: {
                    disabled: toRef(disabled),
                },
            },
        ],
    };
};
