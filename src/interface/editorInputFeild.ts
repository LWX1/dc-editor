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

    /****  用户自定义属性列表 {自定义} ****/
    Attributes?: IObject<string>;

    /****  	内容是否可读 true 只读 false 不只读 Inherit继承父节点 ****/
    ContentReadonly?: 'True' | 'False' | 'Inherit';

    /****  对象是否能被删除 ****/
    Deleteable?: boolean;

    /****  文档元素事件模板名称 ****/
    EventTemplateName?: string;

    /****  高度 ****/
    Height?: number;

    /****  元素编号 ****/
    ID?: string;

    /****  元素内部ID ****/
    InnerID?: string;

    /****  元素内容的文本内容 ****/
    InnerText?: string;
    /** 是否为逻辑删除 */
    IsLogicDeleted?: boolean;

    /****  	单击时执行的javascript脚本 ****/
    JavaScriptForClick?: Function;
    /****  双击时执行的javascript脚本 ****/
    JavaScriptForDoubleClick?: Function;

    /****  左端位置 ****/
    Left?: string;
    /****  文档元素在文档页中的距离页面纸张左上角的水平距离 ****/
    LeftInOwnerPage?: string;

    /****  记录内容是否修改 ****/
    Modified?: boolean;
    /****  元素名称 ****/
    Name?: string;

    /** 自然处理 */
    NativeHandle?: string;
    /****  获得一个从0开始计算的元素下边缘所能到达的页码 ****/
    OwnerLastPageIndex?: number;
    /****  获得一个从0开始计算的当前元素所在的页码 ****/
    OwnerPageIndex?: number;
    /****  打印时是否可见Visible：显示Hidden：隐藏，但占据排版位置None：隐藏，而且不占据排版位置 ****/
    PrintVisibility?: 'Visible' | 'Hidden' | 'None';
    /** 父级 */
    Parent?: string;
    /****  元素样式列表 ****/
    Style?: IStyle;
    /** 自定义的数据，不存在编辑器上，用于判断重写 */
    selfAttr?: string;
    /** 图片是否是编辑，不存在编辑器，切换编辑和属性替换，自己定义的属性 */
    selfImageEdit?: boolean;
    /****  光标悬浮时的提示文本 ****/
    ToolTip?: string;
    /****  文本内容 ****/
    Text?: string;

    /****  顶端位置 ****/
    Top?: string;
    /****  文档元素在文档页中的距离页面纸张左上角的垂直距离 ****/
    TopInOwnerPage?: string;
    /****  元素类型 ****/
    TypeName?: string;

    /****  用户标记 ****/
    UserFlags?: string;

    /****  数值表达式 ****/
    ValueExpression?: string;
    /****  元素是否可见 ****/
    Visible?: boolean;
    /****  可见性表达式 ****/
    VisibleExpression?: string;
    /****  宽度 ****/
    Width?: number;
}

/** 输入域 */
export interface IInputField extends IBaseProperty {
    /****  内容对齐方式，包含Near左对齐、Center居中、Far右对齐。 ****/
    Alignment?: 'Near' | 'Center' | 'Far';
    /****  允许接收的内容样式 ****/
    AcceptChildElementTypes?: string;
    /****  能否接受制表符，默认false ****/
    AcceptTab?: boolean;
    /****  文本自动修复模式 ****/
    AutoFixTextMode?: boolean;
    /****  自动隐藏模式 None：不做设置  HideWhenEmpty：内容为空时自动隐藏  HideWhenChildFieldEmpty：子输入域内容为空时自动隐藏 ****/
    AutoHideMode?: 'None' | 'HideWhenEmpty' | 'HideWhenChildFieldEmpty';

    /****  背景色 ****/
    BackgroundColor?: string;

    /****  背景颜色属性 ****/
    BackgroundColorString?: string;
    /****  背景文字颜色 ****/
    BackgroundTextColor?: string;
    /****  输入域边框颜色 ****/
    BorderElementColor?: string;
    /****  背景文字 ****/
    BackgroundText?: string;
    /** 边框是否可见  Default默认 Visible 可见 Hidden隐藏 AlwaysVisible 始终可见*/
    BorderVisible?: 'Default' | 'Visible' | 'Hidden' | 'AlwaysVisible';
    /****  自定义属性 ****/
    customStyle?: string;

    /****  自定义格式 ****/
    customFormat?: string | Array<any>;
    /****  内容锁 ****/
    ContentLock?: boolean;
    /****  元素内容只读性表达式 ****/
    ContentReadonlyExpression?: string;
    /****  内容复制来源 ****/
    CopySource?: boolean;
    /****  默认使用的事件表达式字符串 ****/
    DefaultEventExpression?: string;
    /****  输出格式 ****/
    DisplayFormat?: IObject<string>;
    /****  动态加载列表项目 ****/
    DynamicListItems?: boolean;
    /**** 数据源 ****/
    Datasource?: string;
    /****  显示的格式化对象，支持自定义显示的格式 {Format: "yyyy年MM月dd日",Style: "DateTime"} ****/
    DisPlayFormat?: IObject<string>;
    /****  是否启用权限控制 ****/
    EnablePermission?: boolean;
    /****  是否启用校验 ****/
    EnableValueValidate?: boolean;
    /** 节点 */
    Elements?: Array<any>;
    /****  结束边框文本 ****/
    EndBorderText?: string;
    /****  高亮度状态 ****/
    EnableHighlight?: 'Default' | 'Enabled' | 'Disabled';
    /****  编辑器激活模式，"F2, MouseDblClick, MouseClick" 默认双击激活 MouseDblClick：双击激活MouseDClick：单击激活 ****/
    EditorActiveMode?: string | string[];
    /****  多选时，是否按照勾选的时间排序 ****/
    GetValueOrderByTime?: boolean;
    /****  内容为空时不打印 ****/
    HiddenPrintWhenEmpty?: boolean;
    /****  输入域类型，包含多种 ****/
    InnerEditStyle?:
        | 'Text'
        | 'DropDownList'
        | 'Date'
        | 'DateTime'
        | 'DateTimeWithoutSecond'
        | 'Time'
        | 'Numeric';
    /****  是否多选 ****/
    InnerMultiSelect?: boolean;
    /****  动态列表 ****/
    InnerListSourceName?: string;
    /****  内置的数值 ****/
    InnerValue?: string;

    /****  输入域可输入的数据类型 如：’1,2,3,4,5,6,7,8,9,0’，只允许输入数字1,2,3,4,5,6,7,8,9,0 ****/
    LimitedInputChars?: string;
    /****  列表值之间的分隔字符 ****/
    ListValueSeparatorChar?: string;
    /****  列表值格式化字符串 ****/
    ListValueFormatString?: string;
    /****  下拉框列表 [{Text: "男",Value: "0"},] ****/
    ListItems?: Array<IObject<string>>;
    /****  标签文本 ****/
    LabelText?: string;
    /****  用户最大可输入的字符数 ****/
    MaxInputLength?: string;
    /****  移动焦点使用的快捷键 ****/
    MoveFocusHotKey?: string;

    /****  打印可见性表达式 ****/
    PrintVisibilityExpression?: string;
    /****  输入域固定宽度 值为正数的时候，输入的内容宽度超过设置的固定宽度，随内容的宽度变化而变化 值为负数的时候，输入的内容宽度超过设置的固定宽度，内容自动隐藏宽度不变 ****/
    SpecifyWidth?: number;
    /** 是否排斥组 */
    RepulsionForGroup?: boolean;
    /****  起始边框文本 ****/
    StartBorderText?: string;
    /****  文本颜色 ****/
    TextColor?: string;
    /****  单位（后缀）文本 ****/
    UnitText?: string;
    /****  用户是否允许编辑 ****/
    UserEditable?: boolean;
    /****  内容脱敏 None：不加密  Partial：部分加密,前面和后面一个字符不加密  Both ：全部加密，所有内容加密 ****/
    ViewEncryptType?: 'None' | 'Partial' | ' Both';
    /*** 验证样式 */
    ValidateStyle?: IValidateStyle;

    /****  数据源绑定 ****/
    ValueBinding?: IValueBinding;
}

/** 二维码和条形码基本属性 */
export interface IFourCode extends IBaseProperty {
    /** 是否有效 */
    Enabled?: boolean;
    /** x 偏移量 */
    OffsetX?: number;
    /** y 偏移量 */
    OffsetY?: number;
    /**字符串标签 */
    StringTag?: string;
    /** 布局位置  Normal普通 UnderText文本下方 InFrontOfText文本上方*/
    ZOrderStyle?: 'Normal' | 'UnderText' | 'InFrontOfText';
    /****  数据源绑定 ****/
    ValueBinding?: IValueBinding;
}

/** 条形码属性 */
export interface IFourBarcode extends IFourCode {
    /** 条码样式 值在 EditBarcodeStyleSelected */
    BarcodeStyle?: string;
    /** 是否展示文本 */
    ShowText?: boolean;
    /** 文字对齐方式 */
    TextAlignment?: 'Near' | 'Center' | 'Far';
}

/** 二维码属性 */
export interface IFourTDBarcode extends IFourCode {
    /** 条形码类型 QR表示二维码 */
    BarcodeType: 'QR';
    /** 纠错能力 */
    ErroeCorrectionLevel?: string;
    /** 对齐方式 */
    VAlign?: string;
}

/** 页码属性 */
export interface IFourPagePagination extends IBaseProperty {
    /** 是否激活 */
    Enabled?: boolean;

    /** x 偏移量 */
    OffsetX?: number;
    /** y 偏移量 */
    OffsetY?: number;

    /**字符串标签 */
    StringTag?: string;
    /** 内容类型 PageIndex页码 NumOfPages总页码 LocalPageIndex本地页码 LocalNumOfPages本地总页码*/
    ValueType?: 'PageIndex' | 'NumOfPages' | 'LocalPageIndex' | 'LocalNumOfPages';
    /** 格式化字符串 */
    FormatString?: string;
    /** 特殊字符列表 */
    SpecifyPageIndexTextList?: Array<any>;
    /** 布局位置  Normal普通 UnderText文本下方 InFrontOfText文本上方*/
    ZOrderStyle?: 'Normal' | 'UnderText' | 'InFrontOfText';
}

/** 月经史 */
export interface IFour extends IBaseProperty {
    /** 是否激活 */
    Enabled?: boolean;
    /** x 偏移量 */
    OffsetX?: number;
    /** y 偏移量 */
    OffsetY?: number;
    /**字符串标签 */
    StringTag?: string;
    /**
     * 医学表达式类型
     *@remark
     ```ts
    月经史公式1：FourValues1
    月经史公式2：FourValues2
    月经史公式3：ThreeValues
    月经史公式4：FourValues
    瞳孔图类型：Pupil
    胎心图类型：FetalHeart
    标尺公式类型：PainIndex
    恒牙牙位图类型：PermanentTeethBitmap
    乳牙牙位图类型：DeciduousTeech
    病变上牙图类型：DiseasedTeethTop
    病变下牙图类型：DiseasedTeethBotton
    分数公式类型：Fraction
    眼球突出度公式：ThreeValues2
    斜视符号公式：StrabismusSymbol
     ```
     */
    ExpressionStyle?:
        | 'FourValues1'
        | 'FourValues2'
        | 'ThreeValues'
        | 'FourValues'
        | 'Pupil'
        | 'FetalHeart'
        | 'PainIndex'
        | 'PermanentTeethBitmap'
        | 'DeciduousTeech'
        | 'DiseasedTeethTop'
        | 'DiseasedTeethBotton'
        | 'Fraction'
        | 'ThreeValues2'
        | 'StrabismusSymbol';
    /** 布局位置  Normal普通 UnderText文本下方 InFrontOfText文本上方*/
    ZOrderStyle?: 'Normal' | 'UnderText' | 'InFrontOfText';
}

/** 单复选框默认样式 */
export interface IFourRadioCheckboxDefault extends IBaseProperty {
    /** 复选框后面跟着的文本 */
    Caption?: string;
    /**  文本参与流式排版  */
    CaptionFlowLayout?: boolean;
    /** 勾选框左对齐 */
    CheckAlignLeft?: boolean;
    /** 是否为选中状态 */
    Checked?: boolean;
    /** 是否激活 */
    Enabled?: boolean;
    /** 高亮度状态 默认Default 允许Enabled 禁止Disabled*/
    EnableHighlight?: 'Default' | 'Enabled' | 'Disabled';
    /** 是否为单选框 */
    IsRadio?: boolean;
    /** 文本多行 */
    Multiline?: boolean;
    /** x 偏移量 */
    OffsetX?: number;
    /** y 偏移量 */
    OffsetY?: number;
    /** 必填项 */
    Requried?: boolean;
    /**字符串标签 */
    StringTag?: string;
    /** 值 */
    Value?: string;
    /** 渲染得样式值 默认样式Default 单选框样式RadioBox 复选框样式CheckBox*/
    VisualStyle?: 'Default' | 'RadioBox' | 'CheckBox';
    /****  数据源绑定 ****/
    ValueBinding?: IValueBinding;
    /** 布局位置  Normal普通 UnderText文本下方 InFrontOfText文本上方*/
    ZOrderStyle?: 'Normal' | 'UnderText' | 'InFrontOfText';
}

/** 单复选框属性 */
export interface IFourRadioCheckbox extends IFourRadioCheckboxDefault {
    /** 自定义类型 */
    Type?: string;
}

/** 文本标签 */
export interface IFourLabel extends IBaseProperty {
    /****  内容对齐方式，包含Near左对齐、Center居中、Far右对齐。 ****/
    Alignment?: 'Near' | 'Center' | 'Far';
    /** 执行连接动作使用的属性名 （来自于元素的自定义属性值） */
    AttributeNameForContactAction?: string;
    /** 允许用户编辑当前页标签文本 */
    AllowUserEditCurrentPageLabelText?: boolean;
    /** 自动设置大小 */
    AutoSize?: boolean;
    /** 是否为粗体 */
    Bold?: boolean;

    /** 连接模式 */
    ContactAction?:
        | 'LastTableRowInpage'
        | 'FirstTableRowInpage'
        | 'TableRow'
        | 'LasrSectioInpage'
        | 'FirstTableRowInPage'
        | 'Normal'
        | 'Disable';
    /** 是否激活 */
    Enabled?: boolean;
    /** 连接的文本 */
    LinkTextForContactAction?: string;
    /** 文本多行 */
    Multiline?: boolean;
    /** x 偏移量 */
    OffsetX?: number;
    /** y 偏移量 */
    OffsetY?: number;
    /** 各个页面的文本 
     * 
     * @remark
     ```ts
        [
              {
                 PageIndex: 0,
                 PageIndexText: "自定义文本aaa"
              },
              {
                 PageIndex: 1,
                 PageIndexText: "自定义文本bbb"
              },
              {
                 PageIndex: 2,
                 PageIndexText: "自定义文本ccc"
              },
              {
                 PageIndex: 3,
                 PageIndexText: "自定义文本ddd"
              }
           ]
     ```
    */
    PageTexts?: Array<any>;
    /**字符串标签 */
    StringTag?: string;
    /** 标签大纲级别 */
    TitleLevel?: number;
    /** 布局位置  Normal普通 UnderText文本下方 InFrontOfText文本上方*/
    ZOrderStyle?: 'Normal' | 'UnderText' | 'InFrontOfText';
}

/** 水平线 */
export interface IFourHorizontalLine extends IBaseProperty {
    /** 去除宽度 */
    width?: never;
    /** 线条颜色 */
    Color?: string;
    /** 是否激活 */
    Enabled?: boolean;
    /** 线段的长度（cm 单位） */
    LineLengthInCM?: number;
    /**
     * 线条样式 DashDotDot -▪▪-▪▪- DashDot-▪-▪-▪- Dot▪▪▪▪▪▪▪ Dash------- Solid——
     */
    LineStyle?: 'DashDotDot' | 'DashDot' | 'Dot' | 'Dash' | 'Solid';
    /** 线条粗细 */
    LineSize?: number;
    /** x 偏移量 */
    OffsetX?: number;
    /** y 偏移量 */
    OffsetY?: number;
    /**字符串标签 */
    StringTag?: string;
    /** 内部单位，没开发 */
    Unit?: number;
    /** 布局位置  Normal普通 UnderText文本下方 InFrontOfText文本上方*/
    ZOrderStyle?: 'Normal' | 'UnderText' | 'InFrontOfText';
}

/** 按钮 */
export interface IFourButton extends IBaseProperty {
    /** 自动调节大小 */
    AutoSize?: boolean;
    /** 命令文本 */
    CommandName?: string;
    /** 是否激活 */
    Enabled?: boolean;
    /** 按钮图片 */
    ImgBase64?: string;
    /** 按钮悬浮图片 */
    ImgBase64ForOver?: string;
    /** 按钮点击图片 */
    ImgBase64ForDown?: string;
    /** x 偏移量 */
    OffsetX?: number;
    /** y 偏移量 */
    OffsetY?: number;
    /** 以文本方式打印 */
    PrintAsText?: boolean;
    /**字符串标签 */
    StringTag?: string;
    /** 按钮点击时使用的脚本 */
    ScriptTextForClick?: boolean;
    /** 布局位置  Normal普通 UnderText文本下方 InFrontOfText文本上方*/
    ZOrderStyle?: 'Normal' | 'UnderText' | 'InFrontOfText';
}

/** 图片 */
export interface IFourImage extends IBaseProperty {
    /** 是否激活 */
    Enabled?: boolean;
    /** 保持长宽比 */
    KeepWidthHeightRate?: boolean;

    /** x 偏移量 */
    OffsetX?: number;
    /** y 偏移量 */
    OffsetY?: number;
    /** 图片格式 */
    RawFormat?: string;
    /**字符串标签 */
    StringTag?: string;
    /** 保持内容到文件中 */
    SaveContentInFile?: boolean;
    /** 图片数据，为base64 */
    Src?: string;
    /** 平滑缩放 */
    SmoothZoom?: boolean;
    /** 透明色 */
    TransparentColorValue?: string;
    /****  数据源绑定 ****/
    ValueBinding?: IValueBinding;
    /** 对齐方式 */
    VAlign?: string;
    /** 布局位置  Normal普通 UnderText文本下方 InFrontOfText文本上方*/
    ZOrderStyle?: 'Normal' | 'UnderText' | 'InFrontOfText';
}

/** 媒体 */
export interface IFourMedia extends IBaseProperty {
    /** 是否激活 */
    Enabled?: boolean;
    /** 保持长宽比 */
    KeepWidthHeightRate?: boolean;
    /** x 偏移量 */
    OffsetX?: number;
    /** y 偏移量 */
    OffsetY?: number;
    /** 图片格式 */
    RawFormat?: string;
    /**字符串标签 */
    StringTag?: string;
    /** 保持内容到文件中 */
    SaveContentInFile?: boolean;
    /** 图片数据，为base64 */
    Src?: string;
    /** 平滑缩放 */
    SmoothZoom?: boolean;
    /** 透明色 */
    TransparentColorValue?: string;
    /****  数据源绑定 ****/
    ValueBinding?: IValueBinding;
    /** 对齐方式 */
    VAlign?: string;
    /** 布局位置  Normal普通 UnderText文本下方 InFrontOfText文本上方*/
    ZOrderStyle?: 'Normal' | 'UnderText' | 'InFrontOfText';
}
