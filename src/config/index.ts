import { IObject } from '../interface';

// 不可编辑class
export const DISABLED = 'disabled';

// 配置文件发布
export const OperateEvent = 'operateEvent';

// 表单默认配置
export const FormDefaultConfig = {
    'label-width': '80px',
};

// http://localhost:8055
export const AddrUrl = 'http://localhost:82';

// 编辑器地址
export const EditAddr: IObject<string> = {
    jq: `${AddrUrl}/Jquery/jquery-1.7.2.min.js`,
    dcwriter5: `${AddrUrl}/ServicePage.aspx?wasmres=dcwriter5.js`,
};

const UserConfig = {
    BackgroundColor: 'Transparent',
    DeleteLineColor: 'Blue',
    DeleteLineNum: 1,
    Enabled: true,
    UnderLineColor: 'Blue',
    UnderLineColorNum: 1,
};

// 编辑器配置
export const EditConfig = {
    // 类型 必要
    dctype: 'WriterControlForWASM',
    // 注册码
    RegisterCode:
        '05E50E21CF605AE39E17D1D97709A9ED135FA9E22BE686E0E8D71BDC6BCFF1EDE491C95FCFE18003DFE4E6CF75B24995BAEB68D20C99D385EA898FE8CA31D2D89A0B678B707FB24B37D4ADFB929F32126793C01BF3C0A24B9F8B1BADD70B4B5B451491FBB60EEF0C4953F4DEE9F08115984D341B93118A026D364BAA3578EEE29BD1F1F4703CC8AB1C5804444AC32FF500DEB84C4D64A89AA6C6CE1C5467FECD78',
    DoubleBuffer: 'true',
    // PrintServicePageUrl :
    // 编辑器是否显示标尺。
    RuleVisible: 'true',
    // 编辑器下的光标自定义样式。
    RuleBackColor: 'rgb(230, 230, 230)',
    AutoDispose: 'true',
    PageCssString11: 'box-shadow:1px 1px 1px grey',
    PageTitlePosition: 'BottomRight',
    PageBorderColor: 'rgb(230, 230, 230)',
    // 设置编辑器下的输入焦点的样式  焦点粗细、焦点颜色
    CaretCss: '3,Blue',
    GrayingDisabledHeaderFooter: 'false',
    DocumentOptions: {
        BehaviorOptions: {
            PromptJumpBackForSearch: false,
            // 处理换行后默认字体无效的问题
            ResetTextFormatWhenCreateNewLine: true,
            // 全文违禁关键字列表，可包含多个违禁关键字，各个关键字之间用半角逗号分开。
            ExcludeKeywords: '',
            // 表单视图模式。Strict：严格表单模式  Normal：普通表单模式  Disable：退出表单模式
            FormView: 'Disable',
            // 处理“被选中的纯文本包含背景文字”的功能
            SelectionTextIncludeBackgroundText: false,
            // 自动辅助功能
            AutoAssistInsertString: true,
            // 辅助功能输入字符长度
            AutoAssistInsertStringDetectTextLength: 2,
            HandleCommandException: false,
            // 是否输出格式化的XML文本，默认为true。
            OutputFormatedXMLSource: false,
            // 排版时段落符号紧跟在表格或文档节后面
            ParagraphFlagFollowTableOrSection: true,
            // 是否显示文档批注 Auto：自动设置可见性 Visible：一直显示 Hide：一直隐藏
            CommentVisibility: 'Auto',
            // （暂缺）快速录入模式
            FastInputMode: true,
            // （暂缺）当视图删除无法删除的内容时的提示方式，默认为Details。Simple：简单的提示 Details：显示详细信息的提示 Flash：内容闪烁提升
            PromptProtectedContent: 'Details',
            //  （暂缺）即使在只读状态下是否能编辑文档批注
            CommentEditableWhenReadonly: true,
            // 双击选择文字
            DoubleClickToSelectWord: true,
            // 三击选择段落
            ThreeClickToSelectParagraph: true,
        },
        // 视图配置
        ViewOptions: {
            // 页面边界线条长度
            PageMarginLineLength: '15',
            // 受保护的内容颜色
            ProtectedContentBackColor: 'black',
            // 字段域的背景文本颜色，默认为灰色
            BackgroundTextColor: 'Gray',
            // 打印的时候前景色全部强制为黑色
            BothBlackWhenPrint: true,
            // 文档批注字体名称
            CommentFontName: '宋体',
            // 文档批注字体大小，默认为10
            CommentFontSize: 10,
            // 是否启用输入域文字颜色，默认为false
            EnableFieldTextColor: false,
            // 文本输入域的默认背景颜色，默认为浅蓝色
            FieldBackColor: 'AliceBlue',
            // 输入域边框元素颜色，默认为空颜色
            FieldBorderColor: 'Transparent',
            // 文本输入域获得输入焦点时的高亮度背景颜色,默认为淡蓝色
            FieldFocusedBackColor: 'AliceBlue',
            // 鼠标悬浮在文本输入域时文本输入域的高亮度背景颜色，默认为淡蓝色。
            FieldHoverBackColor: 'AliceBlue',
            // 文本输入域数据异常时的高亮度背景色，默认为全透明
            FieldInvalidateValueBackColor: 'Transparent',
            // 文本输入域数据异常时的高亮度文本色，默认为淡红色。
            FieldInvalidateValueForeColor: 'Red',
            // 输入域文字颜色，和EnableFieldTextColor搭配使用，默认为黑色
            FieldTextColor: 'Black',
            // 页眉下边框线的宽度，默认值是1
            HeaderBottomLineWidth: 1,
            // 输入域失去焦点时隐藏边框元素
            HiddenFieldBorderWhenLostFocus: true,
            // 打印的时候忽略掉输入域边界元素,是其不占据位置，默认为true
            IgnoreFieldBorderWhenPrint: true,
            // 绘制隐藏的边框线（虚边框）使用的颜色。默认淡灰色。
            NoneBorderColor: 'LightGray',
            // 常规的输入域的边界元素颜色，用户可以在常规的输入域中直接输入内容。该属性值默认为蓝色
            NormalFieldBorderColor: 'Blue',
            // 打印时是否显示输入域的背景文字，默认为false。
            PrintBackgroundText: false,
            // 只读输入域的边界元素颜色，默认为灰色
            ReadonlyFieldBorderColor: 'Gray',
            // 描述：作为背景显示单元格编号，默认为false。
            ShowBackgroundCellID: false,
            // 是否显示输入域边框元素,默认为true。
            ShowFieldBorderElement: true,
            // 当页眉有内容时显示页眉下边框线。若为false，则页眉和正文之间就没有分隔横线。默认值为true。
            ShowHeaderBottomLine: true,
            // 是否显示行号
            ShowLineNumber: false,
            // 述：显示段落标记。不影响打印，默认为true。
            ShowParagraphFlag: true,
            EnableEncryptView: true,
            // 内容不能被用户直接录入修改的输入域的边界元素颜色，默认为红
            UnEditableFieldBorderColor: 'Yellow',
            // （暂缺）下拉列表字体名称，默认为空。
            DropdownListFontName: '宋体',
            // （暂缺）下拉列表字体大小，小于等于0则不设置，默认为0.
            DropdownListFontSize: 0,
            // （暂缺）打印时输入域边界元素的可见性设置，默认为Default。 None：不打印，不占据位置，Hidden：不打印，占据位置，Visible：打印，Default：不显示不占据位置
            FieldBorderPrintVisibility: 'hidden',
            // （暂缺）文档域打印时文字颜色值
            FieldTextPrintColor: 'Red',
            // （暂缺）在打印的时候保留背景文字的位置，但不打印背景文字。
            PreserveBackgroundTextWhenPrint: true,
            // （暂缺）当单元格设置了表达式，则在右下角显示表达式标记，默认为true。
            ShowExpressionFlag: false,
            // （暂缺）是否显示输入域状态标签
            ShowInputFieldStateTag: true,
            // （暂缺）内容修改的输入域的标记点颜色，默认为蓝色。
            TagColorForModifiedField: 'Blue',
            // （暂缺）普通输入域的标记点颜色，默认为蓝。
            TagColorForNormalField: 'Green',
            // （暂缺）读的输入域的标记点颜色，默认为透明色
            TagColorForReadonlyField: 'Gray',
            // （暂缺）数据不正确的输入域的标记点颜色，默认为蓝色。
            TagColorForValueInvalidateField: 'Blue',
        },
        // 安全配置
        SecurityOptions: {
            // 能否修改或删除同授权等级的内容。默认为true
            CanModifyDeleteSameLevelContent: true,
            // (暂缺）执行逻辑删除。默认为false。
            EnableLogicDelete: true,
            // （暂缺）启用文档内容安全和权限控制。若为false则不启用，文档内容可任意编辑。默认为false。
            EnablePermission: true,
            // （暂缺）显示被逻辑删除的元素。默认为false。
            ShowLogicDeletedContent: true,
            // （暂缺）是否显示授权相关的提示信息，若为true，则在编辑器中当鼠标移动到 文档内容时，会以提示文本的方式显示文档内容权限和痕迹信息
            ShowPermissionTip: true,
            // （暂缺）是否显示授权标记。若为true，则用蓝色下划线标记出高权限用户输入 的内容，使用删除线标记出被逻辑删除的内容。 默认为false。
            ShowPermissionMark: true,
            // （暂缺）等级0的用户痕迹可视化选项
            TrackVisibleLevel0: { ...UserConfig },
            TrackVisibleLevel1: { ...UserConfig },
            TrackVisibleLevel2: { ...UserConfig },
        },
        // 编辑配置
        EditOptions: {
            // 在插入和删除表格列时是否保持表格的总宽度不变。默认true。
            KeepTableWidthWhenInsertDeleteColumn: true,
            // （暂缺）文档数据校验模式，默认为LostFocus。None：禁止数据校验 Dynamic：实时的数据校验 LostFocus：当文本输入域失去输入焦点校验 Program：编辑器不自动进行数据校验
            ValueValidateMode: 'LostFocus',
        },
    },
};

// 是否
export const IsYesNo = [
    {
        label: '是',
        value: true,
    },
    {
        label: '否',
        value: false,
    },
];

// 名字重复得替换Enabled
export const DataEnabled = 'DataEnabled';

// 数据源默认值
export const EditValueBindingDefaultValue = {
    FormatString: '',
    Readonly: false,
    AutoUpdate: false,
    DataSource: '',
    BindingPath: '',
    BindingPathForText: '',
    // 名字重复得替换Enabled
    [DataEnabled]: false,
    ProcessState: 'Always',
};

// 数据源数组
export const EditValueBindingArr = [
    'FormatString',
    'Readonly',
    'AutoUpdate',
    'DataSource',
    'BindingPath',
    'BindingPathForText',
    // 名字重复得替换Enabled
    DataEnabled,
    'ProcessState',
];
