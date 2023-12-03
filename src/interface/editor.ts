import { IObject } from '.';

/** 类Editor配置参数 */
export interface IEditor {
    [key: string]: string | Function | undefined;
    /****  Element ID ****/
    id: string;
    /****  文档加载完成回调 ****/
    documentLoadCallback?: Function;
    /****  文档改变 ****/
    documentContentChangedCallback?: Function;
    /****  控件加载完成回调 ****/
    controlOnLoadCallback?: Function;
    /****  错误事件回调 ****/
    exceptionEventCallback?: Function;
    /****  page 改变回调 ****/
    eventPageResizeCallback?: Function;
    /****  resize 回调 ****/
    eventResizeCallback?: Function;
    /****  错误事件回调 ****/
    eventOnErrorCallback?: Function;
    /****  命令执行之间是否组织回调 返回true:阻止命令执行，fales：不阻止 （默认返回false，不阻止） ****/
    eventBeforeExecuteCommandCallback?: Function;
    /****  保存文档格式校验的错误回调 ****/
    eventSaveDocumentToStringValidateCallback?: Function;
    /****  失去焦点回调 ****/
    eventElementLostFocusCallback?: Function;
    /****  获取焦点回调 ****/
    eventElementGotFocusCallback?: Function;
    /****  剪切之前 ****/
    eventBeforeCutCallback?: Function;
    /****  复制之前 ****/
    eventBeforeCopyCallback?: Function;
    /****   粘贴之前 ****/
    eventBeforePasteCallback?: Function;
    /****  打印之前 ****/
    eventBeforePrintPreviewCallback?: Function;
}

/** 字体配置参数 */
export interface IFont {
    /****  粗体 ****/
    Bold: boolean;
    /****  字体 ****/
    FontFamily: number | string;
    /****  字体大小 ****/
    FontSize: number | string;
    /****  斜体 ****/
    Italic: boolean;
    /****  删除线 ****/
    Strikeout: boolean;
    /****  下划线 ****/
    Underline: boolean;
}

/** xml导入配置参数 */
export interface IXMLInput {
    /**** xml文档 ****/
    file: string;
    /**** xml文档格式 ****/
    format: 'xml';
    /**** 是否是base64字符串 ****/
    base64: boolean;
    /****  one-整个html、two-body内的html ****/
    type: 'one' | 'two';
    /****  start-目标容器的头部插入、end-目标容器的尾部插入 ****/
    position: 'start' | 'end';
    /**** 是否清除插入文档的格式 ****/
    ClearFormat: true;
}

/** 图片配置参数 */
export interface IImage {
    /*** 图片ID ***/
    ID: string;
    /*** 宽度 ***/
    Width: number | string;
    /*** 高度 ***/
    Height: number | string;
    /*** 保存成文件 ***/
    SaveContentInFile: boolean;
    /*** 图片地址 ***/
    Src: string;
}

/** 签名配置参数 */
export interface ICAS {
    /*** 图片编号 ***/
    id: string;
    /*** 图片的base64数据 ***/
    base64Img: string;
    /*** 容器类型（InputField等） ***/
    scope: string;
    /*** 用户ID ***/
    userID: string;
    /*** 用户名称 ***/
    userName: string;
    /*** 图片是否悬浮 ***/
    imageInFrontOfText: boolean;
    /*** 客户端名称 ***/
    clientName: string;
    /*** 图片宽度 ***/
    width: string | number;
    /*** 图片高度 ***/
    height: string | number;
    /**** 1:软签 2：诺安签名 ****/
    providerName: 1 | 2;
}

/** 保存文档配置参数 */
export interface ISaveDocumentOptions {
    /****  生成文档的数据格式 ****/
    FileFormat: string;
    /****  是否提交所有的痕迹 ****/
    CommitUserTrace: boolean;
    /****  是否输出带格式的xml ****/
    OutputFormatXml: boolean;
    /****  输入xml内容的编码格式（默认）utf-8 ****/
    EncodingName: string;
    /****  是否保存成base64形式的xml字符串 ****/
    SaveBase64String: boolean;
    SpecifySavePart: EDocumentType;
}

/** 页码配置参数 */
export interface IPageSetting {
    /**** 自定义 ****/
    PaperKind: 'A3' | 'A4' | 'A5' | 'B4' | 'B5' | 'Custom' | 'Prc16K' | 'Prc16KRotated';
    /**** 宽度 毫米 ****/
    PaperWidth?: number;
    /**** 宽度 厘米 ****/
    PaperWidthInCM: Number;
    /**** 高度 厘米 ****/
    PaperHeight?: number;
    /**** 高度 毫米 ****/
    PaperHeightInCM: number;
    /**** 横向，纵向 ****/
    Landscape: boolean;
    /**** 左边距 单位 毫米 ****/
    LeftMargin?: number;
    /**** 左边距 厘米****/
    LeftMarginInCM: number;
    /**** 右边距 单位 毫米 ****/
    RightMargin?: number;
    /**** 右边距 厘米****/
    RightMarginInCM: number;
    /**** 上边距 单位 毫米 ****/
    TopMargin?: number;
    /****  /上边距 厘米****/
    TopMarginInCM: number;
    /**** 下边距 单位 毫米 ****/
    BottomMargin?: number;
    /**** 下边距 厘米****/
    BottomMarginInCM: number;
    /**** 页眉位置 单位 毫米 ****/
    HeaderDistance: number;
    /**** 页脚位置 单位 毫米 ****/
    FooterDistance: number;
    /**** 页脚位置 单位 毫米 ****/
    ShowGutterLine: boolean;
    /****  装订线位置 ****/
    GutterPosition: number;
    SwapGutter: boolean;
    /**** 0表示Left，1表示Top，2表示Right ****/
    GutterStyle: '0' | '1' | '2';
    /****  首页页眉和页脚不同 ****/
    HeaderFooterDifferentFirstPage: boolean;
}

/** 水印配置参数 */
export interface IWaterMark {
    /****  透明度0-255 ****/
    Alpha: number;
    /****  旋转角度 ****/
    Angle: number;
    /****  背景颜色值 ****/
    BackColorValue: string;
    /****  文本颜色值 ****/
    ColorValue: string;
    /****  重复的密度 ****/
    DensityForRepeat: number;
    /****  字体 ****/
    Font: string;
    /****  水印图片的base64数据 ****/
    ImageDataBase64String: string;
    /****  是否重复 ****/
    Repeat: boolean;
    /****  水印文字 ****/
    Text: string;
    /****  水印类型，包含Text和Image ****/
    Type: string;
}

/** 网格线配置参数 */
export interface IGridLine {
    /****  是否和文本对齐 ****/
    AlignToGridLine: boolean;
    /****  网格线颜色 ****/
    ColorValue: string;
    /****  每页网格线数量 ****/
    GridNumInOnePage: number;
    /****  线型的枚举	网格线线型，枚举值 ****/
    LineStyle: 'System' | 'Drawing' | 'Drawing2D' | 'DashStyle';
    /****  是否打印网格线 ****/
    Printable: boolean;
    /****  是否显示网格线 ****/
    Visible: boolean;
}

/** 装订线配置参数 */
export interface IGutter {
    /****  装订线距离 ****/
    GutterPosition: number;
    /****  装订线位置 ****/
    GutterStyle: string;
    /****  是否显示装订线 ****/
    ShowGutterLine: boolean;
    /****  是否双面装订 ****/
    SwapGutter: boolean;
}

/** 查找替换配置参数 */
export interface ISearchReplace {
    /**** 要查找的字符串 ****/
    searchstring: string;
    /**** 是否启用替换 ****/
    enablereplacestring: boolean;
    /****  替换字符 ****/
    replacestring: '';
    /**** 是否向后替换 ****/
    backward: boolean;
    /**** 是否区分大小写 ****/
    ignorecase: boolean;
    /**** 记录撤销操作信息 ****/
    logundo: boolean;
    /**** 忽略掉背景文字 ****/
    excludebackgroundtext: boolean;
    /**** 是否限制为查询元素编号 ****/
    SearchID: boolean;
}

/** 段落配置参数 */
export interface IParagraph {
    /****   段落列表样式 ****/
    ParagraphListStyle: string;
    /****  左侧缩进量 ****/
    LeftIndent: number;
    /****  首行缩进量 ****/
    FirstLineIndent: number;
    /****  段落前间距 ****/
    SpacingBeforeParagraph: number;
    /****  段落后间距 ****/
    SpacingAfterParagraph: number;
    /****  行距 ****/
    LineSpacingStyle:
        | 'SpaceSingle'
        | 'Space1pt5'
        | 'SpaceDouble'
        | 'SpaceExactly'
        | 'SpaceSpecify'
        | 'SpaceMultiple';
    /****  设置值 ****/
    LineSpacing: number;
}

/** 用户登录配置参数 */
export interface IUserLogin {
    /****  用户编号 ****/
    ID: string;
    /****  用户名 ****/
    Name: string;
    /****  客户端电脑名称 ****/
    ClientName: string;
    /****  用户授权等级 ****/
    PermissionLevel: 1 | 2 | 0;
    /****  其他说明 ****/
    Description: string;
}

/** 打印预览配置参数 */
export interface IPrintPreview {
    /****  默认为true,是否打印表格单元格边框 ****/
    PrintTableCellBorder?: boolean | null;
    /****  默认为空，是否为整洁打印模式，可选值为true:整洁打印，false:留痕打印，空：采用编辑器当前的留痕显示设置。 ****/
    CleanMode?: boolean | null;
    /****  默认AllPages,打印范围，为一个字符串，可以为 AllPages,Selection,SomePages,CurrentPage ****/
    PrintRange?: 'AllPages' | 'Selection' | 'SomePages' | 'CurrentPage';
    /****  默认Normal,打印模式，为一个字符串，可以为 Normal,OddPage,EvenPage。这里的页码是从0开始计算的。 ****/
    PrintMode?: 'Normal' | 'OddPage' | 'EvenPage';
    /****  默认false,是否为逐份打印，为一个布尔值 ****/
    Collate?: boolean;
    /****  默认1,打印份数，为一个整数。 ****/
    Copies?: number;
    /****  默认0，从0开始计算的打印开始页码，只有PrintRange=SomePages时本设置才有效 ****/
    FromPage?: number;
    /**** 默认为总页数, 从0开始计算的打印结束开始页码，只有PrintRange=SomePages时本设置才有效 ****/
    ToPage?: number;
    /**** 默认空，打印指定页码列表，页码从0开始计算，各个项目之间用逗号分开，如果项目中间有个横杠，表示一个页码范围"1,3,6-11,12" ****/
    SpecifyPageIndexs?: string;
    /****  默认为0，正文偏移续打的纵向偏移量。当该值大于0，则续打设置无效。 ****/
    BodyLayoutOffset?: number;
    /****  默认为0，打印出来的页码值的修正量。 ****/
    PageIndexFix?: number;
    /****  续打开始处的文档元素编号，若该属性值有效，则续打开始位置为该指定ID的元素的上边缘。 ****/
    JumpPrintStartElementID?: string;
    /****  续打结束处元素编号，若该属性值有效，则结束处续打的开始位置为指定ID的元素的下边缘。 ****/
    JumpPrintEndElementID?: string;
    /****  续打信息 ****/
    JumpPrint?: {
        /****  从0开始计算的续打开始的页码 ****/
        PageIndex?: number;
        /****  开始续打的位置 ****/
        Position?: number;
        /****  从0开始计算的下端续打的页码 ****/
        EndPageIndex?: number;
        /****  下端续打的位置 ****/
        EndPosition?: number;
    };
}

/** 本地打印配置参数 */
export interface IPrintLocal {
    /**** 是否弹出打印对话框 ****/
    ShowUI: boolean;
    /**** 自定义打印机名称，若为空则选择默认打印机 ****/
    PrinterName: string | null;
    /**** 支持格式"2,5-7,9"等混合格式 ****/
    PrintPageRange: string | 'all';
    /*** 打印偏移量 */
    OffsetY: number;
    /*** 自动页码 */
    AutoFitPageSize: boolean;
    /** 打印模式 */
    CleanMode: boolean;
    /** 打印是否为双面 */
    ManualDuplex: boolean;
    /**** 为空则打印当前文档，可设为二维数组支持混合合并文档打印 ****/
    Files: string | null;
    /**打印的位置 */
    JumpPrintPosition: string | null;
    /**打印的最后位置 */
    JumpPrintEndPosition: string | null;
    /**打印的服务器位置 */
    PrintServicePageUrl: string;
}

/**
 * @enum 命令枚举
 */
export enum EExecuteCommand {
    /*************************** 编辑和格式 **********************************/
    /****  插入内容 ****/
    INSERT_STRING = 'InsertString',
    /****  插入XML 当前位置插入指定的XML内容 ****/
    INSERT_XML = 'InsertXML',
    /****  插入HTML 向文档中插入一段HTML文档 options="<div>3333<div>" ****/
    INSERT_HTML = 'InsertHtml',
    /****  插入文本标签元素 在文档当前位置插入一个文本标签元素，用户参数可以为一个字符串，为新增的文本标签元素的文本内容 options="3333" ****/
    INSERT_LABEL = 'InsertLabel',
    /****  关于插件 ****/
    ABOUT_CONTROL = 'AboutControl',
    /****  新建文件 ****/
    FILE_NEW = 'FileNew',
    /****  打开本地文件 ****/
    FILE_OPEN = 'FileOpen',

    /****  清空文档所有的内容 ****/
    CLEAR_DOC = 'cleardoc',
    /****  剪切 ****/
    CUT = 'Cut',
    /****  复制 ****/
    COPY = 'Copy',
    /****  粘贴 ****/
    PASTE = 'Paste',
    /****  纯文本复制 ****/
    COPY_AS_TEXT = 'CopyAsText',
    /****  纯文本粘贴 ****/
    PASTE_AS_TEXT = 'PasteAsText',
    /****  撤销 快捷键为Ctl+Z ****/
    UNDO = 'Undo',
    /****  重做 快捷键为Ctl+Y ****/
    REDO = 'Redo',
    /****  字体 ****/
    FONT = 'Font',
    /****  字体名称 电脑安装的字体 ****/
    FONT_NAME = 'FontName',
    /****  字体大小 可以是三号，或者 数字 ****/
    FONT_SIZE = 'FontSize',
    /****  清空当前选中内容所在的字号恢复成默认12 ****/
    REMOVE_FONT_SIZE = 'removefontsize',
    /****  清空当前选中内容所在的字体样式恢复成默认样式 ****/
    REMOVE_FORMAT = 'removeformat',
    /****  粗体 ****/
    BOLD = 'Bold',
    /****  斜体 ****/
    ITALIC = 'Italic',
    /****  下划线 ****/
    UNDER_LINE = 'UnderLine',
    /****  删除线 ****/
    STRIKE_OUT = 'Strikeout',
    /****  删除线 ****/
    STRIKE_THROUGH = 'Strikethrough',
    /****  前景色 ****/
    COLOR = 'Color',
    /****  背景色 ****/
    BACK_COLOR = 'BackColor',
    /****  上标 ****/
    SUPER_SCRIPT = 'Superscript',
    /****  下标 ****/
    SUB_SCRIPT = 'Subscript',
    /****  套圈 options=None/Circle/Rectangle ****/
    CHARACTER_CIRCLE = 'CharacterCircle',
    /****  左对齐 ****/
    ALIGN_LEFT = 'AlignLeft',
    /****  右对齐 ****/
    ALIGN_RIGHT = 'AlignRight',
    /****  居中对齐 ****/
    ALIGN_CENTER = 'AlignCenter',
    /****  分散对齐 ****/
    ALIGN_DISTRIBUTE = 'AlignDistribute',
    /****  首行缩进 ****/
    FIRST_LINE_INDENT = 'FirstLineIndent',
    /****  首行缩进 ****/
    INDENT = 'Indent',
    /****  左缩进量 options = {firstlineindent: "-88",//首行左缩进量 leftindent: "236" //左缩进量} ****/
    HANGING_INDENT = 'hangingindent',
    /****  段前/后距 options='10,top'/options='10,bottom' ****/
    ROW_SPACING = 'rowspacing',
    /****  行间距 1.5/250px ****/
    LINE_HEIGHT = 'lineheight',
    /****  退格 ****/
    BACK_SPACE = 'Backspace',
    /****  圆点列表 ****/
    BULLETED_LIST = 'BulletedList',
    /**
	 * @name 有序列表 
	 *  @remark
	```js
	 * options= {
	 *   None 不操作
	 *   ListNumberStyle 默认数字
	 *   ListNumberStyleArabic1 阿拉伯 1 型数字样式
	 *   ListNumberStyleArabic2 阿拉伯 2 型数字样式
	 *   ListNumberStyleLowercaseLetter 小写字母样式
	 *   ListNumberStyleLowercaseRoman 小写罗马样式
	 *   ListNumberStyleNumberInCircle 带圈数字样式
	 *   ListNumberStyleSimpChinNum1 简体中文数字 1 样式
	 *   ListNumberStyleSimpChinNum2 简体中文数字 2 样式
	 *   ListNumberStyleTradChinNum1 繁体中文数字 1 样式
	 *   ListNumberStyleTradChinNum2 繁体中文数字 2 样式
	 *   ListNumberStyleUppercaseLetter 大写字母样式
	 *   ListNumberStyleUppercaseRoman 大写罗马样式
	 *   ListNumberStyleZodiac1 Zodiac1样式
	 *   ListNumberStyleZodiac2 Zodiac2样式
	 *   BulletedListHollowStar 空心星列表
	 *   BulletedList 圆头列表
	 *   BulletedListBlock 方块列表
	 *   BulletedListDiamond 菱形方块列表
	 *   BulletedListCheck 钩子列表
	 *   BulletedListRightArrow 向右的箭头列表
	 * }
	 ```
	 */
    INSERT_ORDERED_LIST = 'insertorderedlist',
    /****  无序列表 ****/
    INSERT_UNORDERED_LIST = 'insertunorderedlist',
    /****  清空正文所有输入域的内容 ****/
    CLEAR_ALL_FIELD_VALUE = 'ClearAllFieldValue',
    /****  清空正文内容 ****/
    CLEAR_BODY_CONTENT = 'ClearBodyContent',
    /****  清空正文当前输入域的内容 ****/
    CLEAR_CURRENT_FIELD_VALUE = 'ClearCurrentFieldValue',
    /****  清除格式 ****/
    CLEAR_FORMAT = 'ClearFormat',
    /****  清除撤销信息列表 不可恢复 ****/
    CLEAR_UNDO = 'ClearUndo',
    /****  清除批注式校验结果 ****/
    CLEAR_VALUE_VALIDATE_RESULT = 'ClearValueValidateResult',
    /****  将选中的内容转为输入域内容 ****/
    CONVERT_CONTENT_TO_FIELD = 'ConvertContentToField',
    /****  将当前焦点输入域内容转为文本内容 ****/
    CONVERT_FIELD_TO_CONTENT = 'ConvertFieldToContent',
    /****  带清空输入域内容的复制 ****/
    COPY_WITH_CLEAR_FIELD_VALUE = 'CopyWithClearFieldValue',
    /****  删除 ****/
    DELETE = 'Delete',
    /****  物理删除 当内容被逻辑删除之后调用该命令能物理删除内容 ****/
    DELETE_ABSOLUTE = 'DeleteAbsolute',
    /****  删除所有批注 ****/
    DELETE_ALL_CONMMENT = 'DeleteAllComment',
    /****  删除当前批注 ****/
    DELETE_CONMMENT = 'DeleteComment',
    /****  删除当前行文本 ****/
    DELETE_LINE = 'DeleteLine',
    /****  删除文档后面的空白内容 ****/
    DELETE_REDUNDANT = 'DeleteRedundant',
    /****  显示编辑器文档中隐藏的元素 ****/
    DISPLAY_WHOLE = 'DisplayWhole',
    /****  段落 设置段落样式 ****/
    PARAGRAPH_FORMAT = 'paragraphformat',
    /****  插入分页符 ****/
    INSERT_PAGE_BREAK = 'InsertPageBreak',
    /****  设置文档默认样式 options = IFont ****/
    DOCUMENT_DEFAULT_FONT = 'DocumentDefaultFont',
    /****  对文档中所有的表单输入域进行数据校验，本命令存在返回值。校验成功返回一个空着，校验失败返回一个数据列表。 ****/
    DOCUMENT_VALUE_VALIDATE = 'DocumentValueValidate',
    /****  对文档中所有的表单输入域进行批注式数据校验，本命令存在返回值。校验成功返回一个空着，校验失败返回一个数据列表。 ****/
    DOCUMENT_VALUE_VALIDATE_WITH_CREATE_DOCUMENT_COMMENTS = 'DocumentValueValidateWithCreateDocumentComments',
    /****  着重号 ****/
    EMPHASIS_MARK = 'EmphasisMark',
    /****  设置输入域的固定宽度 设置输入域为固定的宽度。用户参数可选，需要搭配文档刷新命令来使用 ****/
    FIELD_SPECIFY_WIDTH = 'FieldSpecifyWidth',
    /****  获得文档中被选择的内容。用户参数指定文本格式 options = EEditorType ****/
    GET_SELECTION_CONTENT_TEXT = 'GetSelectionContentText',
    /****  设置标准的标题1样式。 ****/
    HEADER1 = 'Header1',
    /****  设置标准的标题数字列表1的样式。 ****/
    HEADER1_WITH_MULTI_NUMBER_LIST = 'Header1WithMultiNumberlist',
    /****  设置标准的标题2样式。 ****/
    HEADER2 = 'Header2',
    /****  设置标准的标题数字列表2的样式。 ****/
    HEADER2_WITH_MULTI_NUMBER_LIST = 'Header2WithMultiNumberlist',
    /****  设置标准的标题3样式。 ****/
    HEADER3 = 'Header3',
    /****  设置标准的标题数字列表3的样式。 ****/
    HEADER3_WITH_MULTI_NUMBER_LIST = 'Header3WithMultiNumberlist',
    /****  设置标准的标题4样式。 ****/
    HEADER4 = 'Header4',
    /****  设置标准的标题数字列表4的样式。 ****/
    HEADER4_WITH_MULTI_NUMBER_LIST = 'Header4WithMultiNumberlist',
    /****  设置标准的标题5样式。 ****/
    HEADER5 = 'Header5',
    /****  设置标准的标题数字列表5的样式。 ****/
    HEADER5_WITH_MULTI_NUMBER_LIST = 'Header5WithMultiNumberlist',
    /****  设置标准的标题6样式。 ****/
    HEADER6 = 'Header6',
    /****  设置标准的标题数字列表6的样式。 ****/
    HEADER6_WITH_MULTI_NUMBER_LIST = 'Header6WithMultiNumberlist',
    /****  设置是否显示页眉下边缘的横线 ****/
    HEADER_BOTTOM_LINE_VISIBLE = 'HeaderBottomLineVisible',
    /****  隐藏被标记为自动隐藏的元素 ****/
    HIDE_ELEMENT_MARK_AUTO_HIDE = 'HideElementMarkAutoHide',
    /****  插入软回车 在文档当前位置插入软回车，用户参数无用，快捷键为Shift+Enter键 ****/
    INSERT_LINE_BREAK = 'InsertLineBreak',
    /****  插入段落符号 在文档当前位置插入段落符号，用户参数无用，快捷键为Enter键 ****/
    INSERT_PARAGRAH_FLAG = 'InsertParagrahFlag',
    /****  插入空格进行右对齐 插入空格使后面的内容右对齐 ****/
    INSERT_WHITE_SPACE_FOR_ALIGN_RIGHT = 'InsertWhiteSpaceForAlignRight',
    /****  字符间距 设置被选中的文档的字符间距，参数可以为空，也可以为一个整数，用于指定字符间距值，单位厘米。 ****/
    LETTER_SPACING = 'LetterSpacing',
    /****  向下移动一行 ****/
    MOVE_DOWN = 'MoveDown',
    /****  向上移动一行 ****/
    MOVE_UP = 'MoveUp',
    /****  移动到行尾  快捷键为End键 ****/
    MOVE_END = 'MoveEnd',
    /****  移动到行首 快捷键为Home键 ****/
    MOVE_HOME = 'MoveHome',
    /****  向左移动一列 ****/
    MOVE_LEFT = 'MoveLeft',
    /****  向右移动一列 ****/
    MOVE_RIGHT = 'MoveRight',
    /****  向下翻页 ****/
    MOVE_PAGE_DOWN = 'MovePageDown',
    /****  向上翻页 ****/
    MOVE_PAGE_UP = 'MovePageUp',
    /**
     *  @remark
     * 移动到指定插入点位置 options= {
     *   None 不操作
     *   DocumentHome 文档的开头
     *   CellHome 当前插入点所在表格单元格的开头
     *   ParagraphHome 当前插入点所在的段落的开头
     *   PreLine 上一行
     *   Home 行首
     *   End 行尾
     *   NextLine 下一行
     *   ParagraphEnd 当前段落的结尾
     *   CellEnd 当前单元格的结尾
     *   DocumentEnd 文档的结尾
     *   BeforeTable 在表格前面
     *   AfterTable 在表格后面
     *   BeforeField 在文档域的前面
     *   AfterField 在文档域的后面
     *   PreCell 前一个表格单元格
     *   AfterCell 在后一个表格单元格
     *   afterBegin	输入域起始边框之后(输入域内部)
     *   afterEnd	输入域元素之后（输入域外部）
     *   beforeBegin	输入域元素之前（输入域外部）
     *   beforeEnd	输入域结束边框之前（输入域内部）
     * }
     *
     *  */
    MOVE_TO = 'MoveTo',
    /****  将插入点移动到文档中的指定的位置（有问题，切换的时候上面按钮会丢失）options=非负整数或者表示非负整数的字符串。 ****/
    MOVE_TO_POSITION = 'MoveToPosition',
    /****  重置表单数据 ****/
    RESET_FORM_VALUE = 'ResetFormValue',
    /****  全选 快捷键为Ctl+A ****/
    SELECT_ALL = 'SelectAll',
    /****  选中当前光标行 ****/
    SELECT_LINE = 'SelectLine',
    /****  设置文档默认样式 options='Align:Center' ****/
    SET_DEFAULT_STYLE = 'SetDefaultStyle',
    /****  带选择的向下移动一行 快捷键为Shift+下光标键。 ****/
    SHIFT_MOVE_DOWN = 'ShiftMoveDown',
    /****  带选择的向上移动一行 快捷键为Shift+上光标键。 ****/
    SHIFT_MOVE_UP = 'ShiftMoveUp',
    /****  带选择的移动行尾 快捷键为Shift+End。 ****/
    SHIFT_MOVE_END = 'ShiftMoveEnd',
    /****  带选择的移动行首 快捷键为Shift+Home。 ****/
    SHIFT_MOVE_HOME = 'ShiftMoveHome',
    /****  带选择的左移 快捷键为Shift+左键。 ****/
    SHIFT_MOVE_LEFT = 'ShiftMoveLeft',
    /****  带选择的有移 快捷键为Shift+右键。 ****/
    SHIFT_MOVE_RIGHT = 'ShiftMoveRight',

    /****  带选择的向下移动一页 快捷键为Shift+PageDown键。 ****/
    SHIFT_MOVE_PAGE_DOWN = 'ShiftMovePageDown',
    /****  带选择的向上移动一页 快捷键为Shift+PageUp键。 ****/
    SHIFT_MOVE_PAGE_UP = 'ShiftMovePageUp',
    /****  显示被标记为自动隐藏的元素 ****/
    SHOW_ELEMENT_MARK_AUTO_HIDE = 'ShowElementMarkAutoHide',
    /****  简体和繁体相互转换 内容中受保护的内容不转换，也可以将文档内容通篇将繁体汉字转换为简体汉字 ****/
    SIMPLIFIED_SWAP_TRADITIONAL = 'SimplifiedSwapTraditional',
    /****  打印预览 ****/
    FILE_PRINT_PREVIEW = 'FilePrintPreview',
    /****  格式刷 ****/
    FORMAT_BRUSH = 'FormatBrush',
    /****  插入特殊字符 ****/
    SPE_CHARS = 'Spechars',
    /****  大写字母转小写字母 ****/
    TOLOWER_CASE = 'TolowerCase',
    /****  小写字母转大写字母 ****/
    TOUPPER_CASE = 'ToupperCase',
    /****  字符边框 ****/
    FONT_BORDER = 'Fontborder',
    /****  插入当前时间 ****/
    TIME = 'Time',
    /****  插入当前日期 ****/
    DATE = 'Data',

    /*************************** 表格 *****************************/
    /****  插入表格 options = '1,2' 1行2列 ****/
    INSERT_TABLE = 'InsertTable',
    /****  删除表格列 ****/
    TABLE_DELETE_COLUMN = 'Table_DeleteColumn',
    /****  删除表格行 ****/
    TABLE_DELETE_ROW = 'Table_DeleteRow',
    /****  删除表格 ****/
    TABLE_DELETE_TABLE = 'Table_DeleteTable',
    /****  上面插入行 ****/
    TABLE_INSERT_ROW_UP = 'Table_InsertRowUp',
    /****  下面插入行 ****/
    TABLE_INSERT_ROW_DOWN = 'Table_InsertRowDown',
    /****  左边插入列 ****/
    TABLE_INSERT_COLUMN_LEFT = 'Table_InsertColumnLeft',
    /****  右边插入列 ****/
    TABLE_INSERT_COLUMN_RIGHT = 'Table_InsertColumnRight',
    /****  合并单元格 ****/
    TABLE_MERGE_CELL = 'Table_MergeCell',
    /****  拆分单元格 options=2,3 2行3列 ****/
    TABLE_SPLIT_CELL_EXT = 'Table_SplitCellExt',
    /****  显示单元格背景编号 ****/
    SHOW_BACKGROUND_CELL_ID = 'ShowBackgroundCellID',
    /****  顶端左对齐 ****/
    ALIGN_TOP_LEFT = 'AlignTopLeft',
    /****  顶端右对齐 ****/
    ALIGN_TOP_RIGHT = 'AlignTopRight',
    /****  顶端中间对齐 ****/
    ALIGN_TOP_CENTER = 'AlignTopCenter',
    /****  垂直水平左对齐 ****/
    ALIGN_MIDDLE_LEFT = 'AlignMiddleLeft',
    /****  垂直水平右对齐 ****/
    ALIGN_MIDDLE_RIGHT = 'AlignMiddleRight',
    /****  垂直水平中间对齐 ****/
    ALIGN_MIDDLE_CENTER = 'AlignMiddleCenter',
    /****  底端左对齐 ****/
    ALIGN_BOTTOM_LEFT = 'AlignBottomLeft',
    /****  底端右对齐 ****/
    ALIGN_BOTTOM_RIGHT = 'AlignBottomRight',
    /****  底端中间对齐 ****/
    ALIGN_BOTTOM_CENTER = 'AlignBottomCenter',
    /****  表格内边距 ****/
    PADDING = 'Padding',
    /**
     *  @remark
     * 表格属性对话框 showUI为true
     *   AbsLeft	对象在文档中的绝对坐标位置 (左侧)
     *   AbsTop	对象在文档中的绝对坐标位置（上侧）
     *   AcceptChildElementTypes	能接收的子元素类型
     *   AcceptTab	能否接受制表符，默认false。
     *   AllowUserDeleteRow	用户可删除表格行 布尔值
     *   AllowUserInsertRow	用户可新增表格行 布尔值
     *   AllowUserToResizeColumns	用户可调整列宽 布尔值
     *   AllowUserToResizeRows	用户可调整行高 布尔值
     *   Attributes	用户自定义属性列表
     *   AutoFixTextMode	文本自动修复模式
     *   Cells	当前表格单元格对象集合
     *   ColumnsWidth	列宽
     *   CompressOwnerLineSpacing	压缩所在文档行的行间距
     *   ContentLock	内容锁
     *   ContentReadonly	元素只读状态
     *   ContentReadonlyExpression	元素内容只读性表达式。
     *   CopySource	内容复制来源
     *   Deleteable	用户可删除表格
     *   Elements	子对象列表
     *   EnablePermission	启用授权控制 布尔值
     *   EnableValueValidate	是否启用数值校验功能
     *   EventTemplateName	文档元素事件模板名称
     *   Height	高度
     *   HiddenPrintWhenEmpty	内容为空时不打印
     *   ID	元素编号
     *   InnerID	元素内部ID
     *   InnerText	元素内容的文本内容
     *   JavaScriptForClick	单击时执行的javascript脚本
     *   JavaScriptForDoubleClick	双击时执行的javascript脚本
     *   Left	左端位置
     *   LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
     *   LimitedInputChars	本容器元素能接受的字符清单，比如本属性设置为“0123456789”,则在用户界面中本容器元素只能输入规定的数字字符
     *   MaxInputLength	最大可输入的字符的长度，属性值小于等于0则无限制。
     *   Modified	元素是否修改
     *   OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
     *   OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码
     *   PrintBothBorderWhenJumpPrint	续打时打印所有单元格边框
     *   PrintVisibility	未勾选时的打印可见性设置
     *   PrintVisibilityExpression	打印时的可见性设置
     *   Rows	当前表格表格行对象集合
     *   RowsCount	当前表格表格行行数
     *   RowsHeight	行高
     *   Style	元素样式列表
     *   Text	表格内容
     *   ToolTip	元素提示信息
     *   Top	顶端位置
     *   TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
     *   TypeName	元素类型
     *   UserFlags	用户标记
     *   ValidateStyle	数据验证样式
     *   ValueExpression	数值表达式
     *   Visible	元素是否可见
     *   Width	宽度
     *  */
    TABLE_PROPERTIES = 'TableProperties',
    /**
     * @remark
     * AbsLeft	对象在文档中的绝对坐标位置 (左侧)
     * AbsTop	对象在文档中的绝对坐标位置（上侧）
     * AcceptChildElementTypes		允许接收的内容样式
     * AcceptTab	输入域接收Tab符号
     * Attributes	用户自定义属性列表
     * AutoFixFontSizeMode	自动修改字体大小以适应内容
     * AutoFixTextMode	文本自动修复模式
     * AutoHideMode	自动隐藏模式
     * None：不做设置
     * HideWhenEmpty：内容为空时自动隐藏
     * HideWhenChildFieldEmpty：子输入域内容为空时自动隐藏
     * BorderPrintedWhenJumpPrint	在续打的时候已经打印了边框，和XTextTableElement.PrintBothBorderWhenJumpPrint属性搭配使用。
     * CellID	单元格背景ID
     * CloneType	复制方式
     * Default：默认方式，只复制表格行及单元格，不复制内容。对于单元格是继承上级设置。
     * ContentWithClearField：
     * 复制内容，但删除输入域中的内容。
     * Complete：完整的复制，包括输入域中的内容。
     * ColIndex	当前单元格所在列索引
     * ColSpan	跨列数合并
     * ContentLock	内容锁
     * ContentReadonly	内容是否只读
     * True：只读
     * False：不只读
     * Inherit：继承父节点
     * ContentReadonlyExpression	元素内容只读性表达式。
     * CopySource	内容复制来源
     * Deleteable	是否允许删除
     * Elements	子元素列表
     * EnablePermission	启用文档内容安全和权限控制
     * True：启用
     * False：不启用
     * Inherit：继承父节点
     * EnableValueValidate	是否启用数值校验功能
     * EventTemplateName	文档元素事件模板名称
     * GridLine	网格线设置
     * Height	高度
     * HiddenPrintWhenEmpty	当为空时打印是否隐藏
     * ID	元素编号
     * InnerID	元素内部ID
     * InnerText	元素内容的文本内容
     * IsOverrided	判断本单元格是否被其他单元格合并了
     * JavaScriptForClick	单击时执行的javascript脚本
     * JavaScriptForDoubleClick	双击时执行的javascript脚本
     * Left	左端位置
     * LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
     * LimitedInputChars	本容器元素能接受的字符清单，比如本属性设置为“0123456789”,则在用户界面中本容器元素只能输入规定的数字字符
     * MaxInputLength	最大可输入的字符的长度，属性值小于等于0则无限制。
     * MirrorViewForCrossPage	跨页视图镜像
     * Modified	元素是否修改
     * MoveFocusHotKey	移动焦点使用的快捷键
     * OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
     * OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码
     * PrintVisibility	打印时是否可见
     * Visible：显示
     * Hidden：隐藏，但占据排版位置
     * None：隐藏，而且不占据排版位置
     * PrintVisibilityExpression	打印时可见表达式
     * RowIndex	要操作的表格行序号
     * RowSpan	跨行数合并
     * SlantSplitLineStyle	斜分割线样式
     * Style	元素样式列表
     * Text	元素内容
     * ToolTip	元素提示信息
     * Top	顶端位置
     * TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
     * TypeName	元素类型
     * UserFlags	用户标记
     * ValidateStyle	数据校验格式
     * ValueBinding	数据源绑定信息
     * ValueExpression	数值表达式
     * Visible	元素是否可见
     * Width	宽度
     * VisibleExpression	元素可见性表达式
     *
     *  */
    TABLE_CELL_PROPERTIES = 'TableCellProperties',
    /****  表格行属性 ****/
    TABLE_ROW_PROPERTIES = 'TableRowProperties',
    /****  表格列属性 ****/
    TABLE_COLUMN_PROPERTIES = 'tableColumnproperties',
    /****  表格前插入段落符号 ****/
    INSERT_PARAGRAPH_BEFORE_TABLE = 'insertparagraphbeforetable',
    /****  删除当前输入焦点所在的输入域 ****/
    DELETE_FIELD = 'DeleteField',
    /****  当前输入域设置下划线 ****/
    INPUT_FIELD_UNDERLINE = 'InputFieldUnderLine',

    /*************************** 打印 *****************************/
    /****  续打 options = Normal 为续打，空为取消续打 ****/
    JUMP_PRINT_MODE = 'JumpPrintMode',
    /****  根据选择区域来设置续打状态 ****/
    JUMP_PRINT_MODE_BY_SELECTION = 'JumpPrintModeBySelection',
    /****  退出续打模式 ****/
    CLEAR_JUMP_PRINT_MODE = 'ClearJumpPrintMode',
    /****  偏移续打模式 ****/
    OFFSET_JUMP_PRINT_MODE = 'OffsetJumpPrintMode',

    /***************** 视图 ********************************/
    /**
     * @remark
     * 表单模式 options= {
     *   null 严格表单模式和退出表单模式进行切换
     *   Strict 严格表单
     *   Normal 普通表单
     *   Disable 退出表单
     * }
     *
     *  */
    FORM_VIEW_MODE = 'FormViewMode',
    /****  设计模式 ****/
    DESIGN_MODE = 'DesignMode',
    /****  阅读模式 ****/
    READ_VIEW_MODE = 'ReadViewMode',
    /****  留痕模式 ****/
    COMPLEX_VIEW_MODE = 'ComplexViewMode',
    /****  清洁模式 ****/
    CLEAN_VIEW_MODE = 'CleanViewMode',
    /****  取消内容保护（暂缺） options = 取消内容保护：None 内容保护-可以写：Content 内容保护-不能写入：Range ****/
    CONTENT_PROTECT = 'ContentProtect',
    /****  管理员模式 ****/
    ADMINISTRATOR_VIEW_MODE = 'AdministratorViewMode',
    /****  后台运行模式 ****/
    BACKGROUND_MODE = 'BackgroundMode',

    /***************** 结构化元素 ********************************/

    /**
	 * @name 输入域元素 
	@remark
	```js
      options= {
       AbsLeft	对象在文档中的绝对坐标位置 (左侧)
       AbsTop	对象在文档中的绝对坐标位置（上侧）
       AcceptChildElementTypes	允许接收的内容样式
       AcceptTab	能否接受制表符，默认false
       Alignment	内容对齐方式，包含Near左对齐、Center居中、Far右对齐。
       Attributes	用户自定义属性列表
       AutoFixTextMode	文本自动修复模式
       AutoHideMode	自动隐藏模式
       枚举值：
       None：不做设置  
       HideWhenEmpty：内容为空时自动隐藏  
       HideWhenChildFieldEmpty：子输入域内容为空时自动隐藏  
       BackgroundColor	背景色
       BackgroundText	背景文字
       BackgroundTextColor	背景文字颜色
       BorderElementColor	输入域边框颜色
       BindingPath	数据源绑定路径
       ContentLock	内容锁
       ContentReadonly	内容是否可读
       true：只读
       false：不只读
       Inherit：继承父节点
       ContentReadonlyExpression	元素内容只读性表达式
       CopySource	内容复制来源
       Datasource	数据源
       DefaultEventExpression	默认使用的事件表达式字符串
       Deleteable	对象是否能被删除
       DisPlayFormat	显示的格式化对象，支持自定义显示的格式
       DynamicListItems	动态加载列表项目
       EditorActiveMode	编辑器激活模式，默认双击激活
       MouseDblClick：双击激活
       MouseDClick：单击激活
       EnablePermission	是否启用权限控制 
       EnableValueValidate	是否启用校验
       EndBorderText	结束边框文本
       EventTemplateName	文档元素事件模板名称 
       GetValueOrderByTime	多选时，是否按照勾选的时间排序
       Height	高度
       HiddenPrintWhenEmpty	内容为空时不打印
       ID	元素编号
       InnerEditStyle	输入域类型，包含多种：
       Text：纯文本输入域
       DropDownList：下列列表
       Date：日期类型
       DateTime：日期时间类型
       DateTimeWithoutSecond：不含秒的日期时间类型
       Time：时间类型
       Numeric：数值类型
       InnerID	元素内部ID
       InnerMultiSelect	是否多选
       InnerText	元素内容的文本内容 
       InnerValue	内置的数值
       InnerListSourceName	动态列表
       JavaScriptForClick	单击时执行的javascript脚本
       JavaScriptForDoubleClick	双击时执行的javascript脚本
       LimitedInputChars	输入域可输入的数据类型
       如：’1,2,3,4,5,6,7,8,9,0’，只允许输入数字1,2,3,4,5,6,7,8,9,0
       ListItems	下拉框列表
       LabelText	标签文本
       Left	左端位置
       LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
       ListValueSeparatorChar	列表值之间的分隔字符 
       MoveFocusHotKey	移动焦点使用的快捷键
       MaxInputLength	用户最大可输入的字符数
       Modified	记录内容是否修改
       Name	元素名称
       OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
       OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码 
       PrintVisibility	打印时是否可见
       Visible：显示
       Hidden：隐藏，但占据排版位置
       None：隐藏，而且不占据排版位置
       PrintVisibilityExpression	打印可见性表达式
       StartBorderText	起始边框文本
       SpecifyWidth	输入域固定宽度
       值为正数的时候，输入的内容宽度超过设置的固定宽度，随内容的宽度变化而变化
       值为负数的时候，输入的内容宽度超过设置的固定宽度，内容自动隐藏宽度不变
       Style	元素样式列表
       ToolTip	光标悬浮时的提示文本
       Text	文本内容
       TextColor	文本颜色
       Top	顶端位置
       TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
       TypeName	元素类型
       UnitText	单位（后缀）文本
       UserEditable	用户是否允许编辑
       true：
       false:
       UserFlags	用户标记
       ValidateStyle	内容校验格式，详情看下表
       ValueBinding	数据源
       ValueExpression	数值表达式
       ViewEncryptType	内容脱敏
       None：不加密  
       Partial：部分加密,前面和后面一个字符不加密  
       Both ：全部加密，所有内容加密  
       Visible	元素是否可见
       VisibleExpression	可见性表达式
       Width	宽度

       ValidateStyle：
       属性名称	说明
       BinaryLength	进行的是二进制长度判断
       CheckDecimalDigits	是否需要判断小数位数
       CheckMaxValue	检查数值或者日期值的最大值
       CheckMinValue	检查数值或者日期值的最小值
       CustomMessage	自定义提示信息
       DateTimeMaxValue	最大时间日期值
       DateTimeMinValue	最小时间日期值
       ExcludeKeywords	排除关键字
       IncludeKeywords	允许包含的关键字，各个关键字之间用英文逗号分开。
       Level	校验等级
       MaxDecimalDigits	小数最大位数
       MaxLength	最大文本长度
       MaxValue 	数值最大值
       Message	验证结果
       MinLength  	最小文本长度
       MinValue  	数值最小值
       Range  	数据取值范围
       RegExpression  	正则表达式文字
       Required 	必填数据  
       RequiredInvalidateFlag  	由于必填项而导致的数据校验无效的标记
       ValueName  	数据的名称
       ValueType  	数值类型
	```
    @example
	 options={
           "ID":"field1",
           "Name":"姓名",
           "BackgroundText":"姓名",
        }
    * 
    *  */
    INSERT_INPUT_FIELD = 'InsertInputField',

    /****  将正文没有给用户标记的内容设置成当前用户的痕迹 ****/
    ATTACH_CURRENT_USER_TRACK_TO_BODY_CONTENT = 'AttachCurrentUserTrackToBodyContent',
    /****  清除文档中所有的用户痕迹 ****/
    CLEAR_ALL_USER_TRACE = 'ClearAllUserTrace',
    /****  清除用户选中内容的痕迹 ****/
    CLEAR_USER_TRACE = 'ClearUserTrace',
    /****  清除用户选中内容的痕迹 ****/
    COMMIT_USER_TRACE = 'CommitUserTrace',
    /**
   @remark
   ```js
	// 复选框 
      AbsLeft	对象在文档中的绝对坐标位置 (左侧)
      AbsTop	对象在文档中的绝对坐标位置（上侧）
      Attributes	用户自定义属性列表
      BindingPath	数据源绑定路径
      Caption	复选框后面跟着的文本
      CaptionFlowLayout	流式排版
      CheckAlignLeft	勾选框靠左侧对齐
      Checked	是否勾选
      ContentReadonly	元素只读状态
      Delete	是否允许删除
      Enabled	是否可用
      EventTemplateName	文档元素事件模板名称
      Height	高度
      ID	元素ID
      InnerID	元素内部ID
      InnerText	元素内容的文本内容 
      IsRadio	判断是单选框还是复选框
      JavaScriptForClick	单击时执行的javascript脚本
      JavaScriptForDoubleClick	双击时执行的javascript脚本
      Left	左端位置
      LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
      Modified	元素是否修改
      Multiline	文本多行
      Name	元素名称
      OffsetX	内部属性，暂不开放
      OffsetY	内部属性，暂不开放
      OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
      OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码 
      PrintVisibility	打印时是否可见
      Visible：显示
      Hidden：隐藏，但占据排版位置
      None：隐藏，而且不占据排版位置
      Requried	是否必选
      StringTag	附加数据
      Style	元素样式列表
      Text	元素内容
      ToolTop	元素提示信息
      Top	顶端位置
      TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
      TypeName	元素类型
      UserFlags	用户标记
      Value	内容数值
      PrintVisibilityWhenUnchecked（暂无）	不勾选时的打印设置
      枚举值:
      HiddenCheckBoxOnly：不打印勾选框
      Visible：正常显示
      HiddenAll：不打印
      VisualStyle	显示样式
      ValueBinding	数据源
      ValueExpression	数值表达式
      Visible	元素是否可见
      Width	宽度
      ZOrderStyle	内部属性，暂不开放
   	```
   @example
       options = {
           "Name": "name001", 单选框的Name属性相同 
           "Type": "radio", radio、checkbox 
           "ListItems": [
              {
                 "ID": "chk1",
                 "ToolTip": "提示信息1",
                 "MultiLine": "true",
                 "Checked": "false",
                 "StringTag": "附加数据1",
                 "VisualStyle": "RadioBox", "Default", "CheckBox", "RadioBox", "SystemDefault", "SystemCheckBox", "SystemRadioBox" 
                 "Text": "男性",
                 "Value": "值1",
                 "CaptionFlowLayout": "true"
              },
              {
                 "ID": "chk2",
                 "ToolTip": "提示信息2",
                 "MultiLine": "false",
                 "Checked": "true",
                 "StringTag": "附加数据2",
                 "VisualStyle": "RadioBox", "Default", "CheckBox", "RadioBox", "SystemDefault", "SystemCheckBox", "SystemRadioBox" 
                 "Text": "女性",
                 "Value": "值2",
                 "CaptionFlowLayout": "true"
              }
           ]
        };
   *  */
    INSERT_CHECK_BOX_OR_RADIO = 'InsertCheckBoxOrRadio',
    /** 
	 * @name 条形码元素
	 * @remark
	 * 
	 * 
	   ```js
       AbsLeft	对象在文档中的绝对坐标位置 (左侧)
       AbsTop	对象在文档中的绝对坐标位置（上侧）
       Attributes	用户自定义属性列表
       BarcodeStyle	条码样式
       ContentReadonly	元素只读状态
       Delete	是否允许删除
       Enabled	是否可用
       EventTemplateName	文档元素事件模板名称
       Height	高度
       ID	元素编号
       InnerID	元素内部ID
       InnerText	元素内容的文本内容
       JavaScriptForClick	单击时执行的javascript脚本
       JavaScriptForDoubleClick	双击时执行的javascript脚本
       Left	左端位置
       LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
       Modified	元素是否修改
       Name	元素名称
       OffsetX	内部属性，暂不开放
       OffsetY	内部属性，暂不开放
       OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
       OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码 
       PrintVisibility	打印时是否可见
       Visible：显示
       Hidden：隐藏，但占据排版位置
       None：隐藏，而且不占据排版位置
       ShowText	是否显示文本
       StringTag	附加数据
       Style	元素样式列表
       Text	元素内容
       TextAlignment	内容对齐方式
       Near：居左对齐
       Center：居中对齐
       Far：居右对齐
       ToolTip	元素提示信息
       Top	顶端位置
       TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
       TypeName	元素类型
       UserFlags	用户标记
       ValueExpression	数值表达式
       Visible	元素是否可见
       Width	宽度
       ZOrderStyle	内部属性，暂不开放
       ValueBinding	数据源信息
       DataSource	数据源
       BindingPath	绑定路径
	   ```
	    @example
    	options = {
           ID: "barcode1",
           Text: "1234566",
           Width: "1000",
           Height: "300",
           ShowText: true,
           TextAlignment: "Right",
           ValueBinding: {
              DataSource: "datasourceforbarcode",
              BindingPath: "path1"
           }
        };
    */
    INSERT_BARCODE_ELEMENT = 'InsertBarcodeElement',

    /**
	 * @name  二维码元素
	@remark
	```js 
    
      AbsLeft	对象在文档中的绝对坐标位置 (左侧)
       AbsTop	对象在文档中的绝对坐标位置（上侧）
       Attributes	用户自定义属性列表
       BarcodeStyle	条码样式
       ContentReadonly	元素只读状态
       Delete	是否允许删除
       Enabled	是否可用
       ErroeCorrectionLevel	数据校验等级 
       EventTemplateName	文档元素事件模板名称
       Height	高度
       ID	元素编号
       InnerID	元素内部ID
       InnerText	元素内容的文本内容
       JavaScriptForClick	单击时执行的javascript脚本
       JavaScriptForDoubleClick	双击时执行的javascript脚本
       Left	左端位置
       LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
       Modified	元素是否修改
       Name	元素名称
       OffsetX	内部属性，暂不开放
       OffsetY	内部属性，暂不开放
       OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
       OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码 
       PrintVisibility	打印时是否可见
       Visible：显示
       Hidden：隐藏，但占据排版位置
       None：隐藏，而且不占据排版位置
       StringTag	附加数据
       Style	元素样式列表
       Text	元素内容
       ToolTip	元素提示信息
       Top	顶端位置
       TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
       TypeName	元素类型
       UserFlags	用户标记
       VAlign	垂直对齐方式
       ValueExpression	数值表达式
       Visible	元素是否可见
       Width	宽度
       ZOrderStyle	内部属性，暂不开放
       ValueBinding	数据源信息
       DataSource	数据源
       BindingPath	绑定路径
	```
	   @example
    options = {
           ID: 'tdbarcode1', 元素ID
           Text: "http:www.dcwriter.cn:6788/", //二维码内容文本 
           Width: 300,像素宽度 
           Height: 300, 像素高度 
           ValueBinding: {
              DataSource: "datasourcefortdbarcode",
              BindingPath: "path2"
           }
        }

    */

    INSERT_TDBARCODE_ELEMENT = 'InsertTDBarcodeElement',

    /**
	 *@name 页码
    * @remark
	```js
       AbsLeft	对象在文档中的绝对坐标位置 (左侧)
       AbsTop	对象在文档中的绝对坐标位置（上侧）
       Attributes	用户自定义属性列表
       ContentReadonly	元素只读状态
       Delete	是否允许删除
       Enabled	是否可用
       EventTemplateName	文档元素事件模板名称
       FormatString	格式化字符串，比如“[%PageIndex%] / [%NumOfPages%]”
       Height	高度
       ID	元素编号
       InnerID	元素内部ID
       InnerText	元素内容的文本内容
       JavaScriptForClick	单击时执行的javascript脚本
       JavaScriptForDoubleClick	双击时执行的javascript脚本
       Left	左端位置
       LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
       Modified	元素是否修改
       Name	元素名称
       OffsetX	内部属性，暂不开放
       OffsetY	内部属性，暂不开放
       OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
       OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码 
       PrintVisibility	打印时是否可见
       Visible：显示
       Hidden：隐藏，但占据排版位置
       None：隐藏，而且不占据排版位置
       SpecifyPageIndexTextList	指定的页码编号文本列表，比如“1,2,3,8,9,10,11”，各个编号之间用半角逗号分开
       StringTag	附加数据
       Style	元素样式列表
       Text	元素内容
       ToolTip	元素提示信息
       Top	顶端位置
       TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
       TypeName	元素类型
       UserFlags	用户标记
       ValueExpression	数值表达式
       ValueType	内容样式
       PageIndex：从1开始计算的页码  
       NumOfPages：文档总页数  
       LocalPageIndex： 在本文档中的从1开始计算的页码数 
       当在一个打印预览控件中显示多个文档，或者批量打印文档时，该页码数就是该页 在文档中的页码数，而不是所有文档的文档页集合在一起时的页码数。  
       LocalNumOfPages： 在本文档中的文档总页数  
       Visible	元素是否可见
       Width	宽度
       ZOrderStyle	内部属性，暂不开放
	```
		@example
    options = {
           ID: "pageinfo1", 页码ID，可为空
           Height: "65",    页码元素高度，可为空
           Width: "400",   页码元素宽度，可为空 
           ValueType: "PageIndex", 页码元素类型,PageIndex代表显示为当前页号，NumOfPages显示为总页数，可为空 
           FormatString: "第[%PageIndex%]页 共[%NumOfPages%]页" 页码文本格式化字符串，可为空 
           SpecifyPageIndexTextList: "1,2,3,4"//自定义页码序号列表，可为空 *
        };
    */
    INSERT_PAGE_INFO_ELEMENT = 'InsertPageInfoElement',

    /**
	 * @name  医疗参数
	 *@remark
    ```js
       AbsLeft	对象在文档中的绝对坐标位置 (左侧)
       AbsTop	对象在文档中的绝对坐标位置（上侧）
       Attributes	用户自定义属性列表
       ContentReadonly	元素只读状态
       Delete	是否允许删除
       Enabled	是否可用
       EventTemplateName	文档元素事件模板名称
       ExpressionStyle	医学表达式类型：
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
       Height	高度
       ID	元素编号
       InnerID	元素内部ID
       InnerText	元素内容的文本内容
       JavaScriptForClick	单击时执行的javascript脚本
       JavaScriptForDoubleClick	双击时执行的javascript脚本
       Left	左端位置
       LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
       Modified	元素是否修改
       Name	元素名称
       OffsetX	内部属性，暂不开放
       OffsetY	内部属性，暂不开放
       OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
       OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码 
       PrintVisibility	打印时是否可见
       Visible：显示
       Hidden：隐藏，但占据排版位置
       None：隐藏，而且不占据排版位置
       StringTag	附加数据
       Style	元素样式列表
       Text	元素内容
       ToolTip	元素提示信息
       Top	顶端位置
       TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
       TypeName	元素类型
       UserFlags	用户标记
       ValueExpression	数值表达式
       Values	元素数值
       Visible	元素是否可见
       Width	宽度
	```
 	@example
    // 插入月经史公式元素
    options = {
           "ID": "expression1",
           "ExpressionStyle": "FourValues1",
           "Type": "XTextNewMedicalExpressionElement",
           "FontSize": "12",
           "Width": "112px",
           "Height": "46px",
           "Values": "Value1:14;Value2:14;Value3:14;Value4:14"
        }
    */
    INSERT_MEDICAL_EXPRESSION = 'insertmedicalexpression',
    /**
	 * @插入标签文本元素
	 * @remark
	 ```js
    
    AbsTop	对象在文档中的绝对坐标位置（上侧）
       Alignment	内容对齐方式
       AllowUserEditCurrentPageLabelText	允许用户编辑当前页标签文本
       AttributeNameForContactAction	执行连接动作使用的属性名 （来自于元素的自定义属性值）
       Attributes	用户自定义属性列表
       Bold	是否加粗
       ContactAction	连接模式
       枚举值：
       Disable：禁止文本连接
       Normal：正常模式
       FirstSectionInPage：只显示当前页面中第一个文档节的文本
       LastSectionInPage：只显示当前页面中最后一个文档节的文本
       TableRow：表格行
       FirstTableRowInPage：页面中的第一个表格行
       LastTableRowInPage：页面中的最后一个表格行
       ContentReadonly	元素只读状态
       Delete	是否允许删除
       Enabled	是否可用
       EventTemplateName	文档元素事件模板名称
       Height	高度
       ID	元素编号
       InnerID	元素内部ID
       InnerText	元素内容的文本内容
       JavaScriptForClick	单击时执行的javascript脚本
       JavaScriptForDoubleClick	双击时执行的javascript脚本
       Left	左端位置
       LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
       LinkTextForContactAction	连接字符串
       Modified	元素是否修改
       Name	元素名称
       OffsetX	内部属性，暂不开放
       OffsetY	内部属性，暂不开放
       OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
       OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码 
       PageTexts	各个页面的文本 
       PrintVisibility	打印时是否可见
       Visible：显示
       Hidden：隐藏，但占据排版位置
       None：隐藏，而且不占据排版位置
       StringTag	附加数据
       Style	元素样式列表
       Text	元素内容
       TitleLevel	标题层次,默认值为-1 
       ToolTip	元素提示信息
       Top	顶端位置
       TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
       TypeName	元素类型
       UserFlags	用户标记
       ValueExpression	数值表达式
       Visible	元素是否可见
       Width	宽度
       ZOrderStyle	内部属性，暂不开放
	```
	@example
    options = {
           ID: "label1",        标签ID 
           Text: "测试用标签",   标签文本 
           Bold: true,        标签文本是否加粗，不设置则不加粗 
           Deletable: true,   标签是否可以删除，不设置则可以删除 
           TitleLevel: -1,       标签大纲级别，值从0到7，若不设置则此标签不作为大纲节点
           Attributes: {      自定义属性，直接传JSON对象 
              Name: "张三",
              Sex: "男",
              Age: "20"
           },
           PageTexts: [
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
           ],
           ContactAction: "Normal",    连接模式 
           AttributeNameForContactAction: "科室",     连接模式提取值的来源属性名称
           LinkTextForContactAction: "-"   //连接字符串
		}

    */

    INSERT_LABEL_ELEMENT = 'InsertLabelElement',
    /**
	 * @name 按钮
	 @remark
	```js
    AbsLeft	对象在文档中的绝对坐标位置 (左侧)
       AbsTop	对象在文档中的绝对坐标位置（上侧）
       Attributes	用户自定义属性列表
       AutoSize	是否设置自动大小
       CommandName	命令名称
       ContentReadonly	元素只读状态
       Delete	是否允许删除
       Enabled	是否可用
       EventTemplateName	文档元素事件模板名称
       Height	高度
       ID	元素编号
       ImgBase64	按钮的base64数据图片
       ImgBase64ForDown	鼠标点击按钮的base64数据图片
       ImgBase64ForOver	鼠标悬浮按钮时的base64数据图片
       InnerID	元素内部ID
       InnerText	元素内容的文本内容
       JavaScriptForClick	单击时执行的javascript脚本
       JavaScriptForDoubleClick	双击时执行的javascript脚本
       Left	左端位置
       LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
       Modified	元素是否修改
       Name	元素名称
       OffsetX	内部属性，暂不开放
       OffsetY	内部属性，暂不开放
       OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
       OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码 
       PrintVisibility	打印时是否可见
       Visible：显示
       Hidden：隐藏，但占据排版位置
       None：隐藏，而且不占据排版位置
       PrintAsText	打印时文字打印（按钮样式不参与打印）
       ScriptTextForClick	按钮点击时使用的脚本 
       StringTag	附加数据
       Style	元素样式列表
       Text	元素内容
       ToolTip	元素提示信息
       Top	顶端位置
       TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
       TypeName	元素类型
       UserFlags	用户标记
       ValueExpression	数值表达式
       Visible	元素是否可见
       Width	宽度
       ZOrderStyle	内部属性，暂不开放
    ```
	@example
    options = {
           ID: "button1",
           Height: "100",
           Width: "500",
           Deleteable: false,
           PrintVisibility: "Visible",
            Name: "btnName",
            Enabled: false,
           PrintAsText: false,
           AutoSize: false,
           Text: "按钮文本",
           ScriptTextForClick: "",
           CommandName: "",
           ImgBase64: null,
           ImgBase64ForDown: bluepicbase64data,
           ImgBase64ForOver: null,
           ScriptTextForClick: "alert('哦呵呵呵呵呵')"
        };
    */

    INSERT_BUTTON = 'InsertButton',
    /**
	 * @name 图片
	 * @remark
	```js
	   AbsLeft	对象在文档中的绝对坐标位置 (左侧)
       AbsTop	对象在文档中的绝对坐标位置（上侧）
       Attributes	用户自定义属性列表
       ContentReadonly	元素只读状态
       Delete	是否允许删除
       Enabled	是否可用
       EventTemplateName	文档元素事件模板名称
       Height	高度
       ID	元素编号
       InnerID	元素内部ID
       InnerText	元素内容的文本内容
       JavaScriptForClick	单击时执行的javascript脚本
       JavaScriptForDoubleClick	双击时执行的javascript脚本
       Left	左端位置
       LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
       Modified	元素是否修改
       Name	元素名称
       OffsetX	内部属性，暂不开放
       OffsetY	内部属性，暂不开放
       OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
       OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码 
       PrintVisibility	打印时是否可见
       Visible：显示
       Hidden：隐藏，但占据排版位置
       None：隐藏，而且不占据排版位置
       SaveContentInFile	保存图片数据到文件中
       true：保存图片数据
       false：不保存图片数据
       src	图片来源，或者为base64图片数据
       StringTag	附加数据
       Style	元素样式列表
       Text	元素内容
       ToolTip	元素提示信息
       Top	顶端位置
       TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
       TypeName	元素类型
       UserFlags	用户标记
       ValueBinding	内容绑定对象
       ValueExpression	数值表达式
       Visible	元素是否可见
       Width	宽度
       ZOrderStyle	内部属性，暂不开放
    ```
	@example
	```ts
    options = {
           ID: "img1",
           Width: 200,
           Height: 200,
           SaveContentInFile: true,
           Src: bluepicbase64data
        };
	```
    */
    INSERT_IMAGE = 'InsertImage',
    /**
	 * @name 网络图片
	 * @example
	  {
                ID: "img1",
                Width: 200,
                Height: 200,
                SaveContentInFile: true,
                Src: url
            };
	 */
    INSERT_DC_IMAGE = 'DCInsertImage',

    /**
     * 媒体
     */
    INSERT_MEDIA_ELEMENT = 'insertmediaelement',
    /****  特殊字符 ****/
    INSERT_SPECIFY_CHARACTER = 'InsertSpecifyCharacter',
    /**
	 * @name 添加批注元素
	 * @remark
    ```js
       BackColor	批注背景色
       BorderColor	批注边框色
       ForeColor	批注文本颜色
       Text	批注文本
       author	批注创建者
       AuthorID	批注创建者ID
	```
	@example
    options = {
              BackColor: "#FFFF00",
              BorderColor: "#FFFF00",
              ForeColor: "#000000",
              Text: "请检查这里的内容是否正确",
              author: "李四主任医师",
              AuthorID: "lisi"
          }
    */

    INSERT_COMMENT = 'insertcomment',

    /****  删除批注元素 ****/
    DELETE_COMMENT = 'DeleteComment',
    /**
	 * @name   水平线
	 * @remark
	```js
  
       AbsLeft	对象在文档中的绝对坐标位置 (左侧)
       AbsTop	对象在文档中的绝对坐标位置（上侧）
       Attributes	用户自定义属性列表
       Color	水平线颜色
       ContentReadonly	元素只读状态
       Delete	是否允许删除
       Enabled	是否可用
       EventTemplateName	文档元素事件模板名称
       Height	高度
       ID	元素编号
       InnerID	元素内部ID
       InnerText	元素内容的文本内容
       JavaScriptForClick	单击时执行的javascript脚本
       JavaScriptForDoubleClick	双击时执行的javascript脚本
       Left	左端位置
       LeftInOwnerPage	文档元素在文档页中的距离页面纸张左上角的水平距离
       Modified	元素是否修改
       Name	元素名称
       OffsetX	内部属性，暂不开放
       OffsetY	内部属性，暂不开放
       OwnerLastPageIndex	获得一个从0开始计算的元素下边缘所能到达的页码
       OwnerPageIndex	获得一个从0开始计算的当前元素所在的页码 
       PrintVisibility	打印时是否可见
       Visible：显示
       Hidden：隐藏，但占据排版位置
       None：隐藏，而且不占据排版位置
       StringTag	附加数据
       Style	元素样式列表
       Text	元素内容
       ToolTip	元素提示信息
       Top	顶端位置
       TopInOwnerPage	文档元素在文档页中的距离页面纸张左上角的垂直距离
       TypeName	元素类型
       Unit	内部属性，暂不开放
       UserFlags	用户标记
       ValueExpression	数值表达式
       Visible	元素是否可见
       ZOrderStyle	内部属性，暂不开放
	```
	@example
    options = {
              Length: "100px",
              Width: "10px",
              Color: "red",
              Style: "dashed",
              ID: "hr1"
           };
    */
    INSERT_HORIZONTAL_LINE = 'InsertHorizontalLine',
    /****  图表 ****/
    INSERT_CHART_ELEMENT = 'InsertChartElement',
    /****  元素属性对话框 ****/
    ELEMENT_PROPERTIES = 'elementproperties',
}

/** @enum 文档类型 */
export enum EEditorType {
    XML = 'xml',
    JSON = 'json',
    TEXT = 'text',
    /****  （需要内置方法） ****/
    DOC = 'doc',
    HTML = 'html',
    PDF = 'pdf',
    /****  (RTF 编辑器需要先进行注册) ****/
    RTF = 'rtf',
    /****  （标准版不支持） ****/
    LONG_IMG = 'longimg',
}

/** @enum 文档各部分 */
export enum EDocumentType {
    /****  保存全部文档 ****/
    ALL = 'ALL',
    /****  保存文档体 ****/
    BODY = 'BODY',
    /****  保存页眉 ****/
    HEADER = 'HEADER',
    /****  保存页脚 ****/
    FOOTER = 'FOOTER',
    /****  保存页眉页脚 ****/
    HEADERFOOTER = 'HEADERFOOTER',
}

/** 发布的字段 */
export enum EEditorSubOperateType {
    /****  打开 ****/
    OPEN = 'open',
    /****  新建 ****/
    CREATE = 'create',
    /****  演示 ****/
    ACTION = 'action',
    /****  演示案例 ****/
    ACTION_EXAMPLE = 'action_example',
    /****  页面设置 ****/
    PAGE_SETTING = 'page_setting',
    /****  文档网格线 ****/
    GRID_LINE = 'grid_line',
    /****  水印设置 ****/
    WATER_MARK = 'water_mark',
    /****  装订线设置 ****/
    GUTTER = 'gutter',
    /****  违禁关键字 ****/
    EXCLIDE_WORDKEYS = 'exclude_wordkeys',
    /****  查找替换 ****/
    SEARCH_REPLACE = 'search_replace',
    /****  字体 ****/
    FONT_SETTING = 'font_setting',
    /****  段落 ****/
    PARAGRAPH_FORMAT = 'paragraph_format',
    /****  输入域 ****/
    INPUT = 'input',
}

/** 输入框类型 */
export enum EEditorInputFeildType {
    /****  文本 ****/
    TEXT = 'text',
    /****  下拉框 ****/
    SELECT = 'select',
    /****  时间 ****/
    DATE = 'date',
    /****  省市县 ****/
    PROVINCEN = 'province',
    /****  条形码 ****/
    BARCODE = 'barcode',
    /****  二维码 ****/
    TDBARCODE = 'tdbarcode',
    /****  页码 ****/
    PAGE = 'page',
    /****  月经史公式1 ****/
    FOUR_VALUES1 = 'FourValues1',
    /****  月经史公式2 ****/
    FOUR_VALUES2 = 'FourValues2',
    /****  月经史公式3 ****/
    FOUR_VALUES3 = 'ThreeValues',
    /****  月经史公式4 ****/
    FOUR_VALUES4 = 'FourValues',
    /****  瞳孔图 ****/
    PUPIL = 'Pupil',
    /****  胎心图 ****/
    FETAL_HEART = 'FetalHeart',
    /****  眼球突出度 ****/
    THREE_VALUES = 'ThreeValues2',
    /****  斜视符号 ****/
    STRABISMUS_SYMBOL = 'StrabismusSymbol',
    /****  恒牙牙位图 ****/
    PERMANENT_TEETH_BITMAP = 'PermanentTeethBitmap',
    /****  乳牙牙位图 ****/
    DECIDUOUS_TEECH = 'DeciduousTeech',
    /****  标尺公式 ****/
    PAIN_INDEX = 'PainIndex',
    /****  病变上牙 ****/
    DISEASED_TEETH_TOP = 'DiseasedTeethTop',
    /****  病变下牙 ****/
    DISEASED_TEETH_BOTTOM = 'DiseasedTeethBotton',
    /****  分数公式 ****/
    FRACTION = 'Fraction',
    /****  单选框 ****/
    RADIO = 'radio',
    /****  复选框 ****/
    CHECKBOX = 'checkbox',
    /****  标签文本 ****/
    LABEL = 'label',
    /****  水平线 ****/
    HORIZONTAL_LINE = 'horizontal_line',
    /****  按钮 ****/
    BUTTON = 'button',
    /****  图片 ****/
    IMAGE = 'image',
    /****  网络图片 ****/
    DC_IMAGE = 'dc_image',
    /****  特殊字符 ****/
    INSERT_SPECIFY_CHARACTER = 'insert_specify_character',
    /****  批注 ****/
    INSERT_COMMENT = 'insert_comment',
    /****  媒体 ****/
    MEDIA = 'media',
}

/****  布局模式 ****/
export enum EEditorLayout {
    /** 单列布局 */
    SINGLE_COLUMN = 'SingleColumn',
    /** 多列布局 */
    MULTI_COLUMN = 'MultiColumn',
    /** 水平布局 */
    HORIZONTAL = 'Horizontal',
}

/****  获取当前元素 ****/
export enum EEditorElement {
    /** 单选框 */
    RADIO = 'xtextradioboxelement',
    /** 输入框 */
    INPUT_FIELD = 'xtextinputfieldelement',
    /** 多选框 */
    CHECKBOX = 'xtextcheckboxelement',
    /** 条形码 */
    BARCODE = 'xtextnewbarcodeelement',
    /** 二维码 */
    TDBARCODE = 'xtexttdbarcodeelement',
    /** 标签 */
    LABEL = 'xtextlabelelement',
    /** 水平线 */
    HORIZONTAL = 'xtexthorizontallineelement',
    /** 图片 */
    IMAGE = 'xtextimageelement',
    /** 页码 */
    PAGE = 'xtextpageinfoelement',
    /** 按钮 */
    BUTTON = 'xtextbuttonelement',
    /** 公式 */
    MEDICAL_EXPRESSION = 'xtextnewmedicalexpressionelement',
    /** 媒体 */
    MEDIA = 'xtextmediaelement',
    /** 批注 */
    COMMENT = 'xtextcommentelement',
}
