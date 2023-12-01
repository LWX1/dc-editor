import { IObject } from '.';
import { IParagraph } from './editor';

/** s数据源绑定 */
export interface IValueBinding {
    /** 数据源绑定路径 */
    BindingPath?: string;
    /** 数据源 */
    DataSource?: string;
    /** text 绑定路径 */
    BindingPathForText?: string;
    /** 是否启动 */
    Enabled?: boolean;
    /** 格式化 */
    FormatString?: string;
    /** 是否只读 */
    Readonly?: boolean;
    /** 是否自动更新 */
    AutoUpdate?: boolean;
    /** 执行状态 */
    ProcessState?: string;
}

/** 有效的验证样式配置参数 */
export interface IValidateStyle {
    /****  进行的是二进制长度判断 ****/
    BinaryLength?: boolean;
    /****  是否需要判断小数位数 ****/
    CheckDecimalDigits?: boolean;
    /****  检查数值或者日期值的最大值 ****/
    CheckMaxValue?: string;
    /****  检查数值或者日期值的最小值 ****/
    CheckMinValue?: string;
    /****  自定义提示信息 ****/
    CustomMessage?: string;
    /****  最大时间日期值 ****/
    DateTimeMaxValue?: string;
    /****  最小时间日期值 ****/
    DateTimeMinValue?: string;
    /****  	排除关键字 ****/
    ExcludeKeywords?: string;
    /****  允许包含的关键字，各个关键字之间用英文逗号分开。 ****/
    IncludeKeywords?: string;
    /****  校验等级 ****/
    Level?: number;
    /****  小数最大位数 ****/
    MaxDecimalDigits?: number;
    /****  最大文本长度 ****/
    MaxLength?: number;
    /****  数值最大值 ****/
    MaxValue?: number;
    /****  	验证结果 ****/
    Message?: string;
    /****  最小文本长度 ****/
    MinLength?: number;
    /****  数值最小值 ****/
    MinValue?: number;
    /****  	数据取值范围 ****/
    Range?: string;
    /****  	正则表达式文字 ****/
    RegExpression?: string;
    /****  必填数据 ****/
    Required?: boolean;
    /****  由于必填项而导致的数据校验无效的标记 ****/
    RequiredInvalidateFlag?: boolean;
    /****  数据的名称 ****/
    ValueName?: string;
    /****  数值类型 ****/
    ValueType?: string;
    /****  高亮度状态 ****/
    EnableHighlight?: 'Default' | 'Enabled' | 'Disabled';
}

/** 样式 */
export interface IStyle extends IParagraph {
    /** 标签大纲级别，值从0到7，若不设置则此标签不作为大纲节点 */
    TitleLevel?: -1;
    /** 是否为粗体 */
    Bold?: false;
    /** 颜色 */
    ColorString?: null;
    /** 垂直对齐方式 */
    VerticalAlign?: 'Top' | 'Bottom' | 'Middle';
    /** 水平对齐方式 */
    Align?: 'Left' | 'Right' | 'Center';
    /** 是否显示上边距 */
    BorderTop?: boolean;
    /** 是否显示右边距 */
    BorderRight?: boolean;
    /** 是否显示左边距 */
    BorderLeft?: boolean;
    /** 是否显示下边距 */
    BorderBottom?: boolean;
    /** 下边距颜色 */
    BorderBottomColorString?: string;
    /** 右边距颜色 */
    BorderRightColorString?: string;
    /** 左边距颜色 */
    BorderLeftColorString?: string;
    /** 上边距颜色 */
    BorderTopColorString?: string;
    /** 线条样式 */
    BorderStyle?: 'Solid' | 'Dash' | 'Dot' | 'DashDot' | 'DashDotDot';
    /** 边距宽度 */
    BorderWidth?: number;
    /** 边距间隔 */
    BorderSpacing?: number;
    /** 下边内边距 */
    PaddingBottom?: number;
    /** 左边内边距 */
    PaddingLeft?: number;
    /** 右边内边距 */
    PaddingRight?: number;
    /** 上边内边距 */
    PaddingTop?: number;
    /** 背景颜色 */
    BackgroundColorString?: string;
    /** 段落外线等级 */
    ParagraphOutlineLevel?: -1;
    /** 段落多线等级 */
    ParagraphMultiLevel?: false;
    /** 字体样式 */
    FontStyle?: string;
    /** 字体高度 */
    FontHeight?: number;
    /** 字体名字 */
    FontName?: '宋体';
    /** 字体大小 */
    FontSize?: number;
    /** 布局对其方式 */
    LayoutAlign?: string;
}
/** 基本属性类 */
export interface IBaseProperty {
    [key: string]: any;
    /****  对象在文档中的绝对坐标位置 (左侧) ****/
    AbsLeft?: string;
    /****  对象在文档中的绝对坐标位置（上侧） ****/
    AbsTop?: string;
    /****  允许接收的内容样式 ****/
    AcceptChildElementTypes?: string;
    /****  能否接受制表符，默认false ****/
    AcceptTab?: boolean;
    /****  内容对齐方式，包含Near左对齐、Center居中、Far右对齐。 ****/
    Alignment?: 'Near' | 'Center' | 'Far';
    /****  用户自定义属性列表 {自定义} ****/
    Attributes?: IObject<string>;
    /****  文本自动修复模式 ****/
    AutoFixTextMode?: boolean;
    /****  自动隐藏模式 None：不做设置  HideWhenEmpty：内容为空时自动隐藏  HideWhenChildFieldEmpty：子输入域内容为空时自动隐藏 ****/
    AutoHideMode?: 'None' | 'HideWhenEmpty' | 'HideWhenChildFieldEmpty';
    /****  背景色 ****/
    BackgroundColor?: string;
    /****  背景文字 ****/
    BackgroundText?: string;
    /****  背景文字颜色 ****/
    BackgroundTextColor?: string;
    /****  输入域边框颜色 ****/
    BorderElementColor?: string;
    /****  背景颜色属性 ****/
    BackgroundColorString?: string;

    /****  数据源绑定 ****/
    ValueBinding?: IValueBinding;

    /****  内容锁 ****/
    ContentLock?: boolean;
    /****  	内容是否可读 true 只读 false 不只读 Inherit继承父节点 ****/
    ContentReadonly?: 'True' | 'False' | 'Inherit';
    /****  元素内容只读性表达式 ****/
    ContentReadonlyExpression?: string;
    /****  内容复制来源 ****/
    CopySource?: boolean;
    /****  ****/
    Datasource?: string;
    /****  默认使用的事件表达式字符串 ****/
    DefaultEventExpression?: string;
    /****  对象是否能被删除 ****/
    Deleteable?: boolean;
    /****  显示的格式化对象，支持自定义显示的格式 {Format: "yyyy年MM月dd日",Style: "DateTime"} ****/
    DisPlayFormat?: IObject<string>;
    /****  动态加载列表项目 ****/
    DynamicListItems?: boolean;
    /****  编辑器激活模式，"F2, MouseDblClick, MouseClick" 默认双击激活 MouseDblClick：双击激活MouseDClick：单击激活 ****/
    EditorActiveMode?: string | string[];
    /****  是否启用权限控制 ****/
    EnablePermission?: boolean;
    /****  是否启用校验 ****/
    EnableValueValidate?: boolean;
    /****  结束边框文本 ****/
    EndBorderText?: string;
    /****  文档元素事件模板名称 ****/
    EventTemplateName?: string;
    /****  多选时，是否按照勾选的时间排序 ****/
    GetValueOrderByTime?: boolean;
    /****  高度 ****/
    Height?: number;
    /****  内容为空时不打印 ****/
    HiddenPrintWhenEmpty?: boolean;
    /****  元素编号 ****/
    ID?: string;
    /****  输入域类型，包含多种 ****/
    InnerEditStyle?:
        | 'Text'
        | 'DropDownList'
        | 'Date'
        | 'DateTime'
        | 'DateTimeWithoutSecond'
        | 'Time'
        | 'Numeric';
    /****  元素内部ID ****/
    InnerID?: string;
    /****  是否多选 ****/
    InnerMultiSelect?: boolean;
    /****  元素内容的文本内容 ****/
    InnerText?: string;
    /****  内置的数值 ****/
    InnerValue?: string;
    /****  动态列表 ****/
    InnerListSourceName?: string;
    /****  	单击时执行的javascript脚本 ****/
    JavaScriptForClick?: Function;
    /****  双击时执行的javascript脚本 ****/
    JavaScriptForDoubleClick?: Function;
    /****  输入域可输入的数据类型 如：’1,2,3,4,5,6,7,8,9,0’，只允许输入数字1,2,3,4,5,6,7,8,9,0 ****/
    LimitedInputChars?: string;
    /****  下拉框列表 [{Text: "男",Value: "0"},] ****/
    ListItems?: Array<IObject<string>>;
    /****  标签文本 ****/
    LabelText?: string;
    /****  左端位置 ****/
    Left?: string;
    /****  文档元素在文档页中的距离页面纸张左上角的水平距离 ****/
    LeftInOwnerPage?: string;
    /****  列表值之间的分隔字符 ****/
    ListValueSeparatorChar?: string;
    /****  移动焦点使用的快捷键 ****/
    MoveFocusHotKey?: string;
    /****  用户最大可输入的字符数 ****/
    MaxInputLength?: string;
    /****  记录内容是否修改 ****/
    Modified?: boolean;
    /****  元素名称 ****/
    Name?: string;
    /****  获得一个从0开始计算的元素下边缘所能到达的页码 ****/
    OwnerLastPageIndex?: number;
    /****  获得一个从0开始计算的当前元素所在的页码 ****/
    OwnerPageIndex?: number;
    /****  打印时是否可见Visible：显示Hidden：隐藏，但占据排版位置None：隐藏，而且不占据排版位置 ****/
    PrintVisibility?: 'Visible' | 'Hidden' | 'None';
    /****  打印可见性表达式 ****/
    PrintVisibilityExpression?: string;
    /****  起始边框文本 ****/
    StartBorderText?: string;
    /****  输入域固定宽度 值为正数的时候，输入的内容宽度超过设置的固定宽度，随内容的宽度变化而变化 值为负数的时候，输入的内容宽度超过设置的固定宽度，内容自动隐藏宽度不变 ****/
    SpecifyWidth?: number;
    /****  元素样式列表 ****/
    Style?: IStyle;
    /****  光标悬浮时的提示文本 ****/
    ToolTip?: string;
    /****  文本内容 ****/
    Text?: string;
    /****  文本颜色 ****/
    TextColor?: string;
    /****  顶端位置 ****/
    Top?: string;
    /****  文档元素在文档页中的距离页面纸张左上角的垂直距离 ****/
    TopInOwnerPage?: string;
    /****  元素类型 ****/
    TypeName?: string;
    /****  单位（后缀）文本 ****/
    UnitText?: string;
    /****  用户是否允许编辑 ****/
    UserEditable?: boolean;
    /****  用户标记 ****/
    UserFlags?: string;
    /*** 验证样式 */
    ValidateStyle?: IValidateStyle;
    /****  数值表达式 ****/
    ValueExpression?: string;
    /****  内容脱敏 None：不加密  Partial：部分加密,前面和后面一个字符不加密  Both ：全部加密，所有内容加密 ****/
    ViewEncryptType?: 'None' | 'Partial' | ' Both';
    /****  元素是否可见 ****/
    Visible?: boolean;
    /****  可见性表达式 ****/
    VisibleExpression?: string;
    /****  宽度 ****/
    Width?: number;
    /****  自定义属性 ****/
    customStyle?: string;
    /****  自定义格式 ****/
    customFormat?: string | Array<any>;
}

export interface IInputField extends IBaseProperty {}

/** 条形码属性 */
export interface IBarcode extends IBaseProperty {
    BarcodeStyle?: string;
    TextAlignment?: 'Near' | 'Center' | 'Far';
    ShowText?: boolean;
}

/** 二维码属性 */
export interface ITDBarcode extends IBaseProperty, IBarcode {
    ErroeCorrectionLevel?: string;
}

/** 页码属性 */
export interface IPagePagination extends IBaseProperty {}

/** 单复选框属性 */
export interface IRadioCheckbox extends IBaseProperty {
    Type?: string;
}
