// 纸张类型
export const EditPageSelected = [
    {
        label: 'A3',
        value: 'A3',
        widthmm: 29.6926,
        heightmm: 42.0116,
    },
    {
        label: 'A4',
        value: 'A4',
        widthmm: 21.0058,
        heightmm: 29.6926,
    },
    {
        label: 'A5',
        value: 'A5',
        widthmm: 14.8082,
        heightmm: 21.0058,
    },
    {
        label: 'B4',
        value: 'B4',
        widthmm: 24.9936,
        heightmm: 35.306,
    },
    {
        label: 'B5',
        value: 'B5',
        widthmm: 17.6022,
        heightmm: 24.9936,
    },
    // {
    //     label: "16K(自定义)",
    //     value: "Custom",
    //     widthmm: 19.5,
    //     heightmm: 27,
    // },

    {
        label: 'Prc16K',
        value: 'Prc16K',
        widthmm: 14.61,
        heightmm: 21.49,
    },
    {
        label: 'Prc16KRotated',
        value: 'Prc16KRotated',
        widthmm: 14.61,
        heightmm: 21.49,
    },
    {
        label: '自定义',
        value: 'Custom',
        widthmm: '',
        heightmm: '',
    },
];

// 纸张方向
export const EditPageDistanceSelected = [
    {
        label: '横向',
        value: true,
    },
    {
        label: '纵向',
        value: false,
    },
];
// 水印列表
export const EditWaterMarkSelected = [
    {
        label: '无水印',
        value: 'None',
    },
    {
        label: '文字水印',
        value: 'Text',
    },
    {
        label: '图片水印',
        value: 'Image',
    },
];

// 网格线条样式
export const EditGridLineSelected = [
    {
        value: 'Solid',
        label: '——',
    },
    {
        value: 'Dash',
        label: '-------',
    },
    {
        value: 'Dot',
        label: '▪▪▪▪▪▪▪',
    },
    {
        value: 'DashDot',
        label: '-▪-▪-▪-',
    },
    {
        value: 'DashDotDot',
        label: '-▪▪-▪▪-',
    },
];

// 装订线位置
export const EditGutterSelected = [
    {
        value: 'Left',
        label: '左边',
    },
    {
        value: 'Top',
        label: '顶部',
    },
    {
        value: 'Right',
        label: '右边',
    },
];

// 字体
export const EditFontSelected = [
    {
        value: '宋体',
        label: '宋体',
    },
    {
        value: '黑体',
        label: '黑体',
    },
    {
        value: '微软雅黑',
        label: '微软雅黑',
    },
    {
        value: '微软正黑体',
        label: '微软正黑体',
    },
    {
        value: '楷体',
        label: '楷体',
    },
    {
        value: '新宋体',
        label: '新宋体',
    },
    {
        value: '仿宋',
        label: '仿宋',
    },
];

// 字体大小
export const EditFontSizeSelected = [
    { title: '8', number: '8' },
    { title: '9', number: '9' },
    { title: '10', number: '10' },
    { title: '11', number: '11' },
    { title: '12', number: '12' },
    { title: '14', number: '14' },
    { title: '16', number: '16' },
    { title: '18', number: '18' },
    { title: '20', number: '20' },
    { title: '22', number: '22' },
    { title: '24', number: '24' },
    { title: '26', number: '26' },
    { title: '28', number: '28' },
    { title: '36', number: '36' },
    { title: '48', number: '48' },
    { title: '72', number: '72' },
    { title: '初号', number: '42' },
    { title: '一号', number: '26.25' },
    { title: '二号', number: '21.75' },
    { title: '三号', number: '15.75' },
    { title: '小三', number: '15' },
    { title: '四号', number: '14.25' },
    { title: '五号', number: '10.5' },
    { title: '六号', number: '7.5' },
    { title: '小六', number: '6.75' },
    { title: '七号', number: '5.25' },
].map((item: any) => {
    item.label = item.title;
    item.value = item.number;
    return item;
});

//段落
export const EditParagraphSelected = [
    {
        data: '无',
        title: 'None',
        value: 0,
    },
    {
        data: '1.2.3.4',
        title: 'ListNumberStyle',
        value: 1,
    },
    {
        data: '1,2,3,4',
        title: 'ListNumberStyleArabic1',
        value: 2,
    },
    {
        data: '1）2）3）4）',
        title: 'ListNumberStyleArabic2',
        value: 3,
    },
    {
        data: 'a）b）c）d）',
        title: 'ListNumberStyleLowercaseLetter',
        value: 4,
    },
    {
        data: 'i）ii）iii）iv）',
        title: 'ListNumberStyleLowercaseRoman',
        value: 5,
    },
    {
        data: '① ② ③ ④',
        title: 'ListNumberStyleNumberInCircle',
        value: 6,
    },
    {
        data: '一.二.三.四',
        title: 'ListNumberStyleSimpChinNum1',
        value: 7,
    },
    {
        data: '一）二）三）四',
        title: 'ListNumberStyleSimpChinNum2',
        value: 8,
    },
    {
        data: '壹.贰.叁.肆',
        title: 'ListNumberStyleTradChinNum1',
        value: 9,
    },
    {
        data: '壹）贰）叁）肆',
        title: 'ListNumberStyleTradChinNum2',
        value: 10,
    },
    {
        data: 'A）B）C）D',
        title: 'ListNumberStyleUppercaseLetter',
        value: 11,
    },
    {
        data: 'Ⅰ）Ⅱ）Ⅲ）Ⅳ',
        title: 'ListNumberStyleUppercaseRoman',
        value: 12,
    },
    {
        data: '甲,乙,丙,丁',
        title: 'ListNumberStyleZodiac1',
        value: 13,
    },
    {
        data: '子,丑,寅,卯',
        title: 'ListNumberStyleZodiac2',
        value: 14,
    },
    {
        data: '● Bulletedlist',
        title: 'BulletedList',
        value: 10000,
    },
    {
        data: '■ Bulletedlistblock',
        title: 'BulletedListBlock',
        value: 10001,
    },
    {
        data: '◆ Bulletedlistdiamond',
        title: 'BulletedListDiamond',
        value: 10002,
    },
    {
        data: '✔ BulletedListCheck ',
        title: 'BulletedListCheck ',
        value: 10003,
    },
    {
        data: '➢ BulletedListRightArrow',
        title: 'BulletedListRightArrow',
        value: 10004,
    },
    {
        data: '◇ BulletedListHollowStar',
        title: 'BulletedListHollowStar',
        value: 10005,
    },
].map((item: any) => {
    item.label = item.data;
    item.value = item.title;
    return item;
});

// 行距
export const EditSpaceDistanceSelected = [
    {
        value: 'SpaceSingle',
        label: '单倍行距',
    },
    {
        value: 'Space1pt5',
        label: '1.5倍行距',
    },
    {
        value: 'SpaceDouble',
        label: '2倍行距',
    },
    {
        value: 'SpaceExactly',
        label: '最小值',
    },
    {
        value: 'SpaceSpecify',
        label: '固定值',
    },
    {
        value: 'SpaceMultiple',
        label: '多倍行距',
    },
];

// 表单模式
export const EditFormSelected = [
    {
        value: 'Disable',
        label: '不处于表单视图模式',
    },
    {
        value: 'Normal',
        label: '普通表单视图模式',
    },
    {
        value: 'Strict',
        label: '严格表单视图模式',
    },
];

// 内容保护
export const EditContentProtectSelected = [
    {
        value: 'None',
        label: '不保护内容',
    },
    {
        value: 'Content',
        label: '保护内容，但可以在中间插入新内容',
    },
    {
        value: 'Range',
        label: '保护区域，中间不能插入新内容',
    },
];

//内容对齐放松 Near左对齐、Center居中、Far右对齐
export const EditAlignmentSelected = [
    {
        value: 'Near',
        label: '左对齐',
    },
    {
        value: 'Center',
        label: '居中',
    },
    {
        value: 'Far',
        label: '右对齐',
    },
];

// 焦点快捷键 下拉框
export const EditFocusSelected = [
    {
        value: 'None',
        label: '无',
    },
    {
        value: 'Default',
        label: '默认',
    },
    {
        value: 'Tab',
        label: 'Tab',
    },
    {
        value: 'Enter',
        label: 'Enter',
    },
];

// 高亮状态 下拉框
export const EditHighLightSelected = [
    {
        value: 'Default',
        label: '默认',
    },
    {
        value: 'Enabled',
        label: '允许',
    },
    {
        value: 'Disabled',
        label: '禁止',
    },
];

// 打印显示
export const EditPrintVisibleSelected = [
    {
        value: 'Visible',
        label: '显示',
    },
    {
        value: 'Hidden',
        label: '隐藏（占排版）',
    },
    {
        value: 'None',
        label: '隐藏（不占排版）',
    },
];

// 边框是否可见
export const EditBorderVisibleSelected = [
    {
        value: 'Default',
        label: '默认',
    },
    {
        value: 'Visible',
        label: '可见',
    },
    {
        value: 'Hidden',
        label: '隐藏',
    },
    {
        value: 'AlwaysVisible',
        label: '始终可见',
    },
];

// 是否只读
export const EditReadonlySelected = [
    {
        value: 'Inherit',
        label: '继承父级元素',
    },
    {
        value: 'True',
        label: '是',
    },
    {
        value: 'False',
        label: '否',
    },
];

// 是否加密
export const EditEncryptSelected = [
    {
        value: 'None',
        label: '不加密',
    },
    {
        value: 'Partial',
        label: '部分加密',
    },
    {
        value: 'Both',
        label: '全部加密',
    },
];

// 激活模式
export const EditActiveSelected = [
    {
        value: 'Default',
        label: '默认激活模式，由文档对象的BehaviorOptions,DefaultEditorActiveMode属性值指定',
    },
    {
        value: 'Program',
        label: '应用程序激活',
    },
    {
        value: 'F2',
        label: '按下F2键激活',
    },
    {
        value: 'GotFocus',
        label: '获得输入焦点时就激活',
    },
    {
        value: 'MouseDblClick',
        label: '鼠标双击就激活',
    },
    {
        value: 'MouseClick',
        label: '鼠标单击就激活',
    },
    {
        value: 'MouseRightClick',
        label: '鼠标右击就激活',
    },
    {
        value: 'Enter',
        label: '键盘Enter键激活',
    },
];

// 文本格式
export const EditInputFeildSelected = [
    {
        value: 'Text',
        label: '纯文本元素',
    },
    {
        value: 'DropDownList',
        label: '下拉列表方式',
    },
    {
        value: 'DateTime',
        label: '日期时间格式',
    },
    {
        value: 'Date',
        label: '日期格式',
    },
    {
        value: 'Numeric',
        label: '数字格式',
    },
    {
        value: 'Time',
        label: '时间格式',
    },
    {
        value: 'DateTimeWithoutSecond',
        label: '日期时间格式（不含秒）',
    },
];

// 字符串分隔符
export const EditSeparatorSelected = [
    {
        value: ',',
        label: ',',
    },
    {
        value: '、',
        label: '、',
    },
    {
        value: '|',
        label: '|',
    },
    {
        value: '#',
        label: '#',
    },
    {
        value: '*',
        label: '*',
    },
];

// 静态内容选择
export const EditStaticContentSelected = [
    {
        value: 'InnerListSourceName',
        label: '字典来源',
    },
    {
        value: 'ListItems',
        label: '静态列表',
    },
];

//输入域列表格式
export const EditInputListSelected = [
    { id: '1', text: 'None', Child: [] },
    {
        id: '2',
        text: 'Numeric',
        Child: [
            { id: '2-1', text: '0.00' },
            { id: '2-2', text: '#.00' },
            { id: '2-3', text: 'c' },
            { id: '2-4', text: 'e' },
            { id: '2-5', text: 'f' },
            { id: '2-6', text: 'g' },
            { id: '2-7', text: 'r' },
            { id: '2-8', text: 'FormatedSize' },
        ],
    },
    {
        id: '3',
        text: 'Currency',
        Child: [
            { id: '3-1', text: '00.00' },
            { id: '3-2', text: '大写中文' },
            { id: '3-3', text: '小写中文' },
            { id: '3-4', text: '#.00' },
            { id: '3-5', text: 'c' },
        ],
    },
    {
        id: '4',
        text: 'DateTime',
        Child: [
            { id: '4-1', text: 'yyyy-MM-dd HH:mm:ss' },
            { id: '4-2', text: 'yyyy-MM-dd' },
            { id: '4-3', text: 'yyyy-MM-dd hh:mm:ss' },
            { id: '4-4', text: 'HH:mm:ss' },
            { id: '4-5', text: 'yyyy年MM月dd日' },
            { id: '4-6', text: 'yyyy年MM月dd日 HH时mm分ss秒' },
            { id: '4-7', text: 'd' },
            { id: '4-7', text: 'D' },
            { id: '4-8', text: 'f' },
            { id: '4-9', text: 'F' },
        ],
    },
];

// 文档元素类型
export const EditDocumentElementSelected = [
    {
        label: '文本类型',
        value: 'Text',
    },
    {
        label: '换行',
        value: 'LineBreak',
    },
    {
        label: '文本域类型',
        value: 'Field',
    },
    {
        label: '分页符',
        value: 'PageBreak',
    },
    {
        label: '输入域类型',
        value: 'InputField',
    },
    {
        label: '段落',
        value: 'ParagraphFlag',
    },
    {
        label: '表格类型',
        value: 'Table',
    },
    {
        label: '单/复选框',
        value: 'CheckBox',
    },
    {
        label: '对象类型',
        value: 'Object',
    },
    {
        label: '图片',
        value: 'Image',
    },
    {
        label: '按钮',
        value: 'Button',
    },
];

// 页面边界线条长度
export const EditPageMarginLineLengthSelected = [
    {
        label: '15',
        value: '15',
    },
    {
        label: '20',
        value: '20',
    },
    {
        label: '30',
        value: '30',
    },
    {
        label: '40',
        value: '40',
    },
    {
        label: '50',
        value: '50',
    },
    {
        label: '60',
        value: '60',
    },
];

// 受保护的内容颜色
export const EditProtectedContentBackColorSelected = [
    {
        label: 'black',
        value: 'black',
    },
    {
        label: 'blue',
        value: 'blue',
    },
    {
        label: 'red',
        value: 'red',
    },
    {
        label: 'green',
        value: 'green',
    },
    {
        label: 'yellow',
        value: 'yellow',
    },
    {
        label: 'orange',
        value: 'orange',
    },
    {
        label: 'purple',
        value: 'purple',
    },
    {
        label: 'pink',
        value: 'pink',
    },
    {
        label: 'brown',
        value: 'brown',
    },
    {
        label: 'gray',
        value: 'gray',
    },
    {
        label: 'white',
        value: 'white',
    },
    {
        label: 'cyan',
        value: 'cyan',
    },
    {
        label: 'magenta',
        value: 'magenta',
    },
    {
        label: 'lime',
        value: 'lime',
    },
    {
        label: 'teal',
        value: 'teal',
    },
    {
        label: 'olive',
        value: 'olive',
    },
    {
        label: 'maroon',
        value: 'maroon',
    },
    {
        label: 'navy',
        value: 'navy',
    },
    {
        label: 'silver',
        value: 'silver',
    },
    {
        label: 'gold',
        value: 'gold',
    },
    {
        label: 'transparent',
        value: 'transparent',
    },
];

// 受保护的内容
export const EditPromptProtectedContentSelected = [
    {
        label: '不提示',
        value: 'None',
    },
    {
        label: '简单的提示',
        value: 'Simple',
    },
    {
        label: '显示详细信息的提示',
        value: 'Details',
    },
    {
        label: '内容闪烁提升',
        value: 'Flash',
    },
];

// 批注是否显示
export const EditCommentVisibilitySelected = [
    {
        label: '自动设置可见性',
        value: 'Auto',
    },
    {
        label: '一直显示',
        value: 'Visible',
    },
    {
        label: '一直隐藏',
        value: 'Hide',
    },
];

// 条码样式
export const EditBarcodeStyleSelected = [
    { Text: 'UPCA' },
    { Text: 'UPCE' },
    { Text: 'SUPP2' },
    { Text: 'SUPP5' },
    { Text: 'EAN13' },
    { Text: 'EAN8' },
    { Text: 'Interleaved2of5' },
    { Text: 'I2of5' },
    { Text: 'Standard2of5' },
    { Text: 'Code39' },
    { Text: 'Code39Extended' },
    { Text: 'Code93' },
    { Text: 'Codabar' },
    { Text: 'PostNet' },
    { Text: 'BOOKLAND' },
    { Text: 'ISBN' },
    { Text: 'JAN13' },
    { Text: 'MSI_Mod10' },
    { Text: 'MSI_2Mod10' },
    { Text: 'MSI_Mod11' },
    { Text: 'MSI_Mod11_Mod10' },
    { Text: 'Modified_Plessey' },
    { Text: 'CODE11' },
    { Text: 'USD8' },
    { Text: 'UCC12' },
    { Text: 'UCC13' },
    { Text: 'LOGMARS' },
    { Text: 'Code128A' },
    { Text: 'Code128B' },
    { Text: 'Code128C' },
].map((item) => ({
    value: item.Text,
    label: item.Text,
}));

// 执行状态
export const EditProcessStateSelected = [
    {
        value: 'Always',
        label: '总是执行',
    },
    {
        value: 'Once',
        label: '只执行一次',
    },
    {
        value: 'Never',
        label: '不执行',
    },
];

// 纠错能力
export const EditErroeCorrectionLevelSelected = [
    {
        value: 'L',
        label: 'L:7%的字码可被修正',
    },
    {
        value: 'M',
        label: 'M:15%的字码可被修正',
    },
    {
        value: 'Q',
        label: 'Q:25%的字码可被修正',
    },
    {
        value: 'H',
        label: 'H:30%的字码可被修正',
    },
];

// 页码内容显示
export const EditPaginationContentSelected = [
    {
        value: 'PageIndex',
        label: '页码',
    },
    {
        value: 'NumOfPages',
        label: '总页码',
    },
    {
        value: 'LocalPageIndex',
        label: '本地页码',
    },
    {
        value: 'LocalNumOfPages',
        label: '本地总页码',
    },
];

// 页码格式化字符串
export const EditPaginationFormatStringSelected = [
    {
        value: '第[%PageIndex%]页 共[%NumOfPages%]页',
        label: '第[%PageIndex%]页 共[%NumOfPages%]页',
    },
    {
        value: '[%PageIndex%]/[%NumOfPages%]',
        label: '[%PageIndex%]/[%NumOfPages%]',
    },
];

// 单复选框
export const EditRadioCheckboxSelected = [
    {
        label: '单选框',
        value: 'radio',
    },
    {
        label: '复选框',
        value: 'checkbox',
    },
];

// 单复选框
export const EditRadioCheckboxStyleSelected = [
    {
        label: '默认样式',
        value: 'Default',
    },
    {
        label: '单选框样式',
        value: 'RadioBox',
    },
    {
        label: '复选框样式',
        value: 'CheckBox',
    },
];

// 连接模式设置
export const EditContactActionSelected = [
    {
        label: 'Disable',
        value: 'Disable',
    },
    {
        label: 'Normal',
        value: 'Normal',
    },
    {
        label: 'FirstTableRowInPage',
        value: 'FirstTableRowInPage',
    },
    {
        label: 'LasrSectioInpage',
        value: 'LasrSectioInpage',
    },
    {
        label: 'TableRow',
        value: 'TableRow',
    },
    {
        label: 'FirstTableRowInpage',
        value: 'FirstTableRowInpage',
    },
    {
        label: 'LastTableRowInpage',
        value: 'LastTableRowInpage',
    },
];

// 图片布局方式
export const EditImageLayoutSelected = [
    {
        label: '普通',
        value: 'Normal',
    },
    {
        label: '文本下方',
        value: 'UnderText',
    },
    {
        label: '文本上方',
        value: 'InFrontOfText',
    },
];

// 垂直对齐方式
export const EditVerticalAlignSelected = [
    {
        label: '上',
        value: 'Top',
    },
    {
        label: '中',
        value: 'Middle',
    },
    {
        label: '下',
        value: 'Bottom',
    },
];

//特殊字符
export const EditSpecialCharSelected = [
    '、',
    '。',
    '·',
    'ˉ',
    'ˇ',
    '¨',
    '〃',
    '々',
    '—',
    '～',
    '‖',
    '…',
    '‘',
    '’',
    '“',
    '”',
    '〔',
    '〕',
    '〈',
    '〉',
    '《',
    '》',
    '「',
    '」',
    '『',
    '』',
    '〖',
    '〗',
    '【',
    '】',
    '±',
    '×',
    '÷',
    '∶',
    '∧',
    '∨',
    '∑',
    '∏',
    '∪',
    '∩',
    '∈',
    '∷',
    '√',
    '⊥',
    '∥',
    '∠',
    '⌒',
    '⊙',
    '∫',
    '∮',
    '≡',
    '≌',
    '≈',
    '∽',
    '∝',
    '≠',
    '≮',
    '≯',
    '≤',
    '≥',
    '∞',
    '∵',
    '∴',
    '♂',
    '♀',
    '°',
    '′',
    '″',
    '℃',
    '＄',
    '¤',
    '￠',
    '￡',
    '‰',
    '§',
    '№',
    '☆',
    '★',
    '○',
    '●',
    '◎',
    '◇',
    '◆',
    '□',
    '■',
    '△',
    '▲',
    '※',
    '→',
    '←',
    '↑',
    '↓',
    '〓',
    '〡',
    '〢',
    '〣',
    '〤',
    '〥',
    '〦',
    '〧',
    '〨',
    '〩',
    '㊣',
    '㎎',
    '㎏',
    '㎜',
    '㎝',
    '㎞',
    '㎡',
    '㏄',
    '㏎',
    '㏑',
    '㏒',
    '㏕',
    '︰',
].map((item) => ({
    label: item,
    value: item,
}));

//罗马字符
export const EditRomanCharSelected = [
    'ⅰ',
    'ⅱ',
    'ⅲ',
    'ⅳ',
    'ⅴ',
    'ⅵ',
    'ⅶ',
    'ⅷ',
    'ⅸ',
    'ⅹ',
    'Ⅰ',
    'Ⅱ',
    'Ⅲ',
    'Ⅳ',
    'Ⅴ',
    'Ⅵ',
    'Ⅶ',
    'Ⅷ',
    'Ⅸ',
    'Ⅹ',
    'Ⅺ',
    'Ⅻ',
].map((item) => ({
    label: item,
    value: item,
}));

//数字字符
export const EditNumericCharSelected = [
    '⒈',
    '⒉',
    '⒊',
    '⒋',
    '⒌',
    '⒍',
    '⒎',
    '⒏',
    '⒐',
    '⒑',
    '⒒',
    '⒓',
    '⒔',
    '⒕',
    '⒖',
    '⒗',
    '⒘',
    '⒙',
    '⒚',
    '⒛',
    '⑴',
    '⑵',
    '⑶',
    '⑷',
    '⑸',
    '⑹',
    '⑺',
    '⑻',
    '⑼',
    '⑽',
    '⑾',
    '⑿',
    '⒀',
    '⒁',
    '⒂',
    '⒃',
    '⒄',
    '⒅',
    '⒆',
    '⒇',
    '①',
    '②',
    '③',
    '④',
    '⑤',
    '⑥',
    '⑦',
    '⑧',
    '⑨',
    '⑩',
    '㈠',
    '㈡',
    '㈢',
    '㈣',
    '㈤',
    '㈥',
    '㈦',
    '㈧',
    '㈨',
    '㈩',
].map((item) => ({
    label: item,
    value: item,
}));

//医学字符
export const EditMedicalCharSelected = [
    'RP',
    'P.O',
    'INJ.',
    'MIXT.',
    'TAD.',
    'SOL.',
    'CO.',
    'PR.',
    'I.D',
    'I.V',
    'I.V.GTT.',
    'IH',
    'IM',
    'O.M',
    'O.N',
    'HS.',
    'AM.',
    'PM.',
    'A.C.',
    'P.C.',
    'SOS.',
    'ST.',
    'QD',
    'BID',
    'TID',
    'QOD',
    'QH',
    'Q2H',
    'Q3H',
    'MCG',
    'MG',
    'G',
    'ML',
    'sig',
    'qd',
    'bid',
    'tid',
    'qid',
    'qh',
    'q2h',
    'q4h',
    'q6h',
    'qn',
    'qod',
    'biw',
    'hs',
    'am',
    'pm',
    'St',
    'DC',
    'prn',
    'sos',
    'ac',
    'pc',
    '12n',
    '12mn',
    'gtt',
    'ID',
    'IH',
    'IM',
    'IV',
    'aa',
    'et',
    'Rp.',
    'sig./S.',
    'St./Stat.',
    'Cit.',
    's.o.s.',
    'p.r.n',
    'a.c.',
    'p.c.',
    'a.m.',
    'p.m.',
    'q.n.',
    'h.s.',
    'q.h.',
    'q.d.',
    'B.i.d.',
    'T.i.d.',
    'Q.i.d.',
    'q.4h.',
    'p.o.',
    'adus.int.',
    'adus.ext.',
    'H.',
    'im./M.',
    'iv./V.',
    'ivgtt.',
    'Inhal.',
    'O.D.',
    'O.L.',
    'O.S.',
    'O.U.',
    'No./N.',
    's.s',
    'ug.',
    'mg.',
    'g.',
    'kg.',
    'ml.',
    'L.',
    'q.s',
    'Ad.',
    'Aq.',
    'Aq.dest.',
    'Ft.',
    'Dil',
    'M.D.S.',
    'Co./Comp.',
    'Mist',
    'Pulv.',
    'Amp.',
    'Emul.',
    'Syr.',
    'Tr.',
    'Neb.',
    'Garg.',
    'rtt./gutt.',
    'collyr.',
    'Ocul.',
    'Liq.',
    'Sol.',
    'Lot.',
    'Linim.',
    'Crem.',
    'Ung.',
    'Past.',
    'Ol.',
    'Enem.',
    'Supp.',
    'Tab.',
    'Pil.',
    'Caps.',
    'Inj.',
    'po',
    'im',
    'iv',
    'ivgtt',
    'qd',
    'bid',
    'tid',
    'qid',
    'q8h',
    'qn',
    'Rp',
    'sig',
    'prn',
].map((item) => ({
    label: item,
    value: item,
}));
