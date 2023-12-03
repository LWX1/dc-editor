import { EditValueBindingArr, DataEnabled, EditValueBindingDefaultValue } from 'src/config';
import { imageChangeBase64 } from 'src/utils';

/**
 * 设置数据源得值，更改Enabled 为DataEnabled
 * @param obj 响应式表单得数据
 * @param dataSourceHooks 数据源得hooks
 * @returns 响应式表单得数据
 */
export const setEditorValueBinding = (obj, dataSourceHooks) => {
    // 初始化数据
    EditValueBindingArr.forEach((item) => {
        obj[item] = EditValueBindingDefaultValue[item];
    });
    if (obj.ValueBinding) {
        const Enabled =
            obj.ValueBinding.Enabled === undefined ? obj[DataEnabled] : obj.ValueBinding.Enabled;
        if (Enabled === false) {
            dataSourceHooks.setDisabled(true);
        } else {
            obj[DataEnabled] = true;
            dataSourceHooks.setDisabled(false);
        }
        delete obj.ValueBinding.Enabled;
        return Object.assign(obj, {
            [DataEnabled]: Enabled,
            ...obj.ValueBinding,
        });
    } else {
        if (obj[DataEnabled] === false) {
            dataSourceHooks.setDisabled(true);
        } else {
            dataSourceHooks.setDisabled(false);
        }
    }
    return obj;
};

/**
 * 获取数据源数据 并把DataEnabled 的值赋值为Enabled
 * @param obj 响应式表单得数据
 * @returns 数据源得数据
 */
export const getEditorValueBinding = (formModal) => {
    const ValueBinding: any = {};
    EditValueBindingArr.forEach((item) => {
        if (item !== DataEnabled) {
            ValueBinding[item] = formModal[item];
        } else {
            ValueBinding['Enabled'] = formModal[item];
        }
    });
    return ValueBinding;
};

/**
 * 处理上传图片
 * @param form 表单
 * @param property 属性
 * @param preview 预览
 * @param options 自定义配置
 * @param cb 回调函数
 * @returns
 */
export const handleUploadImage = (form, property, preview, options?, cb?) => {
    return {
        class: 'self-upload-style',
        hiddenBtn: false,
        size: 'small',
        accept: '.png,.jpg',
        // 'auto-upload': false,
        'before-upload': (file: Blob) => {
            imageChangeBase64(file).then((res: any) => {
                form[property] = res;
                cb && cb();
            });

            return false;
        },

        'on-remove': () => {
            form[property] = '';
        },
        'on-preview': () => {
            preview(form[property]);
        },
        'file-list': form[property]
            ? [
                  {
                      name: '按钮图片',
                      url: form[property],
                  },
              ]
            : [],
        'list-type': 'picture-card',
        ...(options || {}),
    };
};
