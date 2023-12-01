import { Ref } from 'vue';

/****  定义对象 ****/
export interface IObject<T> {
    [key: string]: T;
}

/****  定义下拉框数组对象 ****/
export interface ISelected {
    /** 显示的值 */
    label: string;
    /** 操作的值 */
    value: string;
}

/****  ajax 请求 ****/
export interface IAjax {
    /** 请求的数据 */
    data?: {
        [key: string]: string;
    };
    /** 请求类型 */
    type?: string;
    /** 请求的地址 */
    url: string;
    /** 请求头 */
    header?: {
        [key: string]: string | undefined;
    };
    /** 请求成功后 */
    success: Function;
    /** 请求错误后 */
    error?: Function;
    /** 是否为异步请求 */
    async?: boolean;
    /** 请求返回数据类型 */
    responseType?: XMLHttpRequestResponseType;
    /** 其他参数 */
    othersData?: any;
}

/****  定义表格的columns ****/
export interface ITableColumns {
    /** 组件表格标题头 */
    title: string;
    /** 组件表格标题头对应的每列的值 */
    dataIndex: string;
    /** 每列的key */
    key?: string;
    /** 每列的宽度 */
    width?: number;
    /** 是否自定义渲染 */
    render?: boolean;
}

/****  定义按钮 ****/
export interface IButton {
    /** 按钮类型 */
    type?: string;
    /** 按钮名称 */
    name: string;
    /** 按钮点击 */
    onClick: Function;
}

/****  定义表单项 ****/
export interface IFormItem {
    /** 标签 */
    label: string;
    /** 名字 */
    name?: string;
    /** 类型 */
    type: string;
    /** 标签的值 */
    value?: string;
    /** 标签的输入框提示 */
    placeholder?: string;
    /** 规则 */
    rules?: Array<object>;
    /** 表单每一项配置 */
    options?: Array<object>;
    /** 是否禁用 */
    disabled?: boolean;
    /** 表单宽度 */
    width?: string | number;
    /** 表单的世界 */
    events?: IObject<string | Function>;
    /** 表单中其他的属性 */
    others?: any;
    /** 是否自定义渲染 */
    render?: any;
}

/** 画布操作状态管理 */
export interface ICanvasState {
    /** 指针标记当前位置 */
    pointer: number;
    /** 操作记录 */
    operateList: Array<any>;
    /** 深度，最大记录步骤次数 */
    maxDeep: number;
    /** 画布 */
    canvas: HTMLCanvasElement | null;
}
