import { EEditorInputFeildType, EExecuteCommand } from 'src/interface/editor';
const bluepicbase64data =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR8AAADeCAIAAACL9pO/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKWSURBVHhe7dOhDcAwEARBdxaaxtyLi3FRCQ6xApaNNOjh63Zc9wYK6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqAsq6oKKuqCiLqioCyrqgoq6oKIuqKgLKuqCirqgoi6oqIuztdac83PkSF2cvWmNYSq/eRlU1AUVdUFFXVBRF1TUBRV1QUVdUFEXVNQFFXVBRV1QURdU1AUVdUFFXVBRF1TUBRV1QUVdUFEXVNQFFXVBRV1QURdU1AUVdUFFXVBRF1TUBRV1QUVdUFEXVNQFFXVBRV1QURdU1AUVdUFFXVBRF1TUBRV1QUVdUFEXVNQFFXVBRV1QURdU1AUVdUFFXVBRF1TUBRV1QUVdUFEXVNQFFXVBRV1QURdU1AUVdUFFXVBRF1TUBRV1QUVdUFEXVNQFFXVBRV1QURdU1AUVdUFFXdC49wNy06ZYIL3nJAAAAABJRU5ErkJggg==';

// 输入框，下拉框，时间框的配置
export const getInputFeildOptions = (options?: any) => ({
    [EEditorInputFeildType.TEXT]: {
        type: EExecuteCommand.INSERT_INPUT_FIELD,
        data: {
            ContentReadonly: null,
            UserEditable: true,
            Deleteable: true,
            ToolTip: '请输入年龄',
            BackgroundText: '年龄',
            Text: '30',
            InnerValue: '30',
            InnerEditStyle: 'Text',
            ValidateStyle: {
                BinaryLength: false,
                CheckDecimalDigits: false,
                CheckMaxValue: true,
                CheckMinValue: false,
                CustomMessage: '',
                DateTimeMaxValue: '1980/1/1 上午12:00:00',
                DateTimeMinValue: '1980/1/1 上午12:00:00',
                ExcludeKeywords: '',
                IncludeKeywords: '',
                Level: 'Error',
                MaxDecimalDigits: 0,
                MaxLength: 10,
                MaxValue: 0,
                Message: null,
                MinLength: 0,
                MinValue: 0,
                Range: null,
                RegExpression: '',
                Required: false,
                RequiredInvalidateFlag: false,
                ValueName: null,
                ValueType: 'Text',
            },
            EnableValueValidate: true,
            Name: '年龄',
            ID: 'txtAge',
            Alignment: 'Near',
            BackgroundTextColor: '#000',
            TextColor: '#000',
            SpecifyWidth: 0,
            BackgroundColor: 'yellow',
            StartBorderText: '【',
            EndBorderText: '】',
            LabelText: '年龄：',
            UnitText: '岁',
            EditorActiveMode: 'F2, MouseDblClick, MouseClick',
            ...options,
        },
    },
    [EEditorInputFeildType.SELECT]: {
        type: EExecuteCommand.INSERT_INPUT_FIELD,
        data: {
            ToolTip: '请双击',
            BackgroundText: '下拉域',
            ID: 'txtList',
            Alignment: 'Far',
            BackgroundTextColor: 'blue',
            TextColor: null,
            SpecifyWidth: '300',
            InnerEditStyle: 'DropDownList',
            BackgroundColor: 'yellow',
            ListItems: [
                {
                    Text: '男',
                    Value: '0',
                },
                {
                    Text: '女',
                    Value: '1',
                },
                {
                    Text: '未知',
                    Value: '3',
                },
            ],
            EditorActiveMode: 'F2, MouseDblClick, MouseClick',
            ...options,
        },
    },
    [EEditorInputFeildType.DATE]: {
        type: EExecuteCommand.INSERT_INPUT_FIELD,
        data: {
            ToolTip: '请双击',
            BackgroundText: '时间域',
            ID: 'txtDate',
            Alignment: 'Far',
            DisplayFormat: {
                Format: 'yyyy年MM月dd日',
                Style: 'DateTime',
            },
            BackgroundTextColor: 'blue',
            TextColor: 'red',
            SpecifyWidth: '300',
            InnerEditStyle: 'DateTime',
            BackgroundColor: 'yellow',
            EditorActiveMode: 'F2, MouseDblClick, MouseClick',
            ...options,
        },
    },
    // 省市县
    [EEditorInputFeildType.PROVINCEN]: {
        type: EExecuteCommand.INSERT_INPUT_FIELD,
        data: [
            {
                ID: 'province',
                Attributes: {
                    childElement: 'city',
                },
                //"UserEditable": "false",
                BackgroundText: '省',
                InnerEditStyle: 'DropDownList',
                DynamicListItems: 'true',
            },
            {
                ID: 'city',
                Attributes: {
                    fatherElement: 'province',
                    childElement: 'county',
                }, //属性名可自定义
                //"UserEditable": "false",
                BackgroundText: '市',
                InnerEditStyle: 'DropDownList',
                DynamicListItems: 'true',
            },
            {
                ID: 'county',
                Attributes: {
                    fatherElement: 'city',
                },
                //"UserEditable": "false",
                BackgroundText: '县',
                InnerEditStyle: 'DropDownList',
                DynamicListItems: 'true',
            },
        ],
    },
    // 条形码
    [EEditorInputFeildType.BARCODE]: {
        type: EExecuteCommand.INSERT_BARCODE_ELEMENT,
        data: {
            ID: 'barcode1',
            Text: '1234566',
            Width: '1000',
            Height: '300',
            ShowText: true,
            TextAlignment: 'Right',
            ValueBinding: {
                DataSource: 'datasourceforbarcode',
                BindingPath: 'path1',
            },
        },
    },
    // 二维码
    [EEditorInputFeildType.TDBARCODE]: {
        type: EExecuteCommand.INSERT_TDBARCODE_ELEMENT,
        data: {
            ID: 'tdbarcode1', //元素ID
            Text: 'http://www.dcwriter.cn:6788/', //二维码内容文本
            Width: 300, //像素宽度
            Height: 300, //像素高度
            ValueBinding: {
                DataSource: 'datasourcefortdbarcode',
                BindingPath: 'path2',
            },
        },
    },
    // 页码
    [EEditorInputFeildType.PAGE]: {
        type: EExecuteCommand.INSERT_PAGE_INFO_ELEMENT,
        data: {
            ID: 'pageinfo1', //页码ID，可为空
            Height: 65, //页码元素高度，可为空
            Width: 400, //页码元素宽度，可为空
            ValueType: 'PageIndex', //页码元素类型,PageIndex代表显示为当前页号，NumOfPages显示为总页数，可为空
            FormatString: '第[%PageIndex%]页 共[%NumOfPages%]页', //页码文本格式化字符串，可为空
            //SpecifyPageIndexTextList: "1,2,3,4"//自定义页码序号列表，可为空
        },
    },
    // 月经史公式1
    [EEditorInputFeildType.FOUR_VALUES1]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression1',
            ExpressionStyle: 'FourValues1',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:14;Value2:14;Value3:14;Value4:14',
            // 取消双击打开
            // ContentReadonly: 'true',
        },
    },
    // 月经史公式2
    [EEditorInputFeildType.FOUR_VALUES2]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression2',
            ExpressionStyle: 'FourValues2',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:14;Value2:14;Value3:14;Value4:14',
            // 取消双击打开
            // ContentReadonly: 'true',
        },
    },
    // 月经史公式3
    [EEditorInputFeildType.FOUR_VALUES3]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression3',
            ExpressionStyle: 'ThreeValues',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:14;Value2:14;Value3:14',
            // 取消双击打开
            // ContentReadonly: 'true',
        },
    },
    // 月经史公式4
    [EEditorInputFeildType.FOUR_VALUES4]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression4',
            ExpressionStyle: 'FourValues',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:14;Value2:14;Value3:14;Value4:14',
            // 取消双击打开
            // ContentReadonly: 'true',
        },
    },
    // 瞳孔图
    [EEditorInputFeildType.PUPIL]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression5',
            ExpressionStyle: 'Pupil',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:14;Value2:14;Value3:14;Value4:14;Value5:14;Value6:14;Value7:14;',
        },
    },
    // 胎心图
    [EEditorInputFeildType.FETAL_HEART]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression6',
            ExpressionStyle: 'FetalHeart',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:14;Value2:14;Value3:14;Value4:14;Value5:14;Value6:14;',
        },
    },
    // 眼球突出度
    [EEditorInputFeildType.THREE_VALUES]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression7',
            ExpressionStyle: 'ThreeValues2',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:0;Value2:1;Value3:2;',
        },
    },
    // 斜视符号
    [EEditorInputFeildType.STRABISMUS_SYMBOL]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression8',
            ExpressionStyle: 'StrabismusSymbol',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:L;',
        },
    },
    // 恒牙牙位图
    [EEditorInputFeildType.PERMANENT_TEETH_BITMAP]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression10',
            ExpressionStyle: 'PermanentTeethBitmap',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:8;Value2:7;Value3:6;Value4:5;Value5:4;Value6:3;Value7:2;Value8:1;Value9:1;Value10:2;Value11:3;Value12:4;Value13:5;Value14:6;Value15:7;Value16:8;Value17:8;Value18:7;Value19:6;Value20:5;Value21:;Value22:;Value23:;Value24:;Value25:;Value26:;Value27:;Value28:;Value29:;Value30:;Value31:;Value32:',
        },
    },
    // 乳牙牙位图
    [EEditorInputFeildType.DECIDUOUS_TEECH]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression11',
            ExpressionStyle: 'DeciduousTeech',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:8;Value2:7;Value3:6;Value4:5;Value5:4;Value6:3;Value7:2;Value8:1;Value9:1;Value10:2;Value11:3;Value12:4;Value13:5;Value14:6;Value15:7;Value16:8;Value17:8;Value18:7;Value19:6;Value20:5;Value21:;Value22:;Value23:;Value24:;Value25:;Value26:;Value27:;Value28:;Value29:;Value30:;Value31:;Value32:',
        },
    },
    // 标尺公式
    [EEditorInputFeildType.PAIN_INDEX]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression9',
            ExpressionStyle: 'PainIndex',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:14;',
        },
    },
    // 病变上牙
    [EEditorInputFeildType.DISEASED_TEETH_TOP]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression13',
            ExpressionStyle: 'DiseasedTeethTop',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:1;Value2:2;Value3:2;',
        },
    },
    // 病变下牙
    [EEditorInputFeildType.DISEASED_TEETH_BOTTOM]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression14',
            ExpressionStyle: 'DiseasedTeethBotton',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:1;Value2:2;Value3:2;',
        },
    },
    // 分数公式
    [EEditorInputFeildType.FRACTION]: {
        type: EExecuteCommand.INSERT_MEDICAL_EXPRESSION,
        data: {
            ID: 'expression12',
            ExpressionStyle: 'Fraction',
            Type: 'XTextNewMedicalExpressionElement',
            FontSize: '12',
            Width: '112px',
            Height: '46px',
            Values: 'Value1:1;Value2:2;',
        },
    },
    // 单选框
    [EEditorInputFeildType.RADIO]: {
        type: EExecuteCommand.INSERT_CHECK_BOX_OR_RADIO,
        data: {
            Name: 'name001', //单选框的Name属性相同
            Type: 'radio', //radio、checkbox
            ListItems: [
                {
                    ID: 'chk1',
                    ToolTip: '提示信息1',
                    MultiLine: 'true',
                    Checked: 'false',
                    StringTag: '附加数据1',
                    VisualStyle: 'RadioBox', //"Default", "CheckBox", "RadioBox", "SystemDefault", "SystemCheckBox", "SystemRadioBox"
                    Text: '男性',
                    Value: '值1',
                    CaptionFlowLayout: 'true',
                },
                {
                    ID: 'chk2',
                    ToolTip: '提示信息2',
                    MultiLine: 'false',
                    Checked: 'true',
                    StringTag: '附加数据2',
                    VisualStyle: 'RadioBox', //"Default", "CheckBox", "RadioBox", "SystemDefault", "SystemCheckBox", "SystemRadioBox"
                    Text: '女性',
                    Value: '值2',
                    CaptionFlowLayout: 'true',
                },
            ],
        },
    },
    // 多选框
    [EEditorInputFeildType.CHECKBOX]: {
        type: EExecuteCommand.INSERT_CHECK_BOX_OR_RADIO,
        data: {
            Name: 'name001', //单选框的Name属性相同
            Type: 'checkbox', //radio、checkbox
            ListItems: [
                {
                    ID: 'chk1',
                    ToolTip: '提示信息1',
                    MultiLine: 'true',
                    Checked: 'false',
                    StringTag: '附加数据1',
                    VisualStyle: 'CheckBox', //"Default", "CheckBox", "RadioBox", "SystemDefault", "SystemCheckBox", "SystemRadioBox"
                    Text: '高血压',
                    Value: '值1',
                    CaptionFlowLayout: 'true',
                },
                {
                    ID: 'chk2',
                    ToolTip: '提示信息2',
                    MultiLine: 'false',
                    Checked: 'true',
                    StringTag: '附加数据2',
                    VisualStyle: 'CheckBox', //"Default", "CheckBox", "RadioBox", "SystemDefault", "SystemCheckBox", "SystemRadioBox"
                    Text: '冠心病',
                    Value: '值2',
                    CaptionFlowLayout: 'true',
                },
            ],
        },
    },
    // 标签文本
    [EEditorInputFeildType.LABEL]: {
        type: EExecuteCommand.INSERT_LABEL_ELEMENT,
        data: {
            ID: 'label1', //标签ID
            Text: '测试用标签', //标签文本
            Bold: true, //标签文本是否加粗，不设置则不加粗
            Deletable: false, //标签是否可以删除，不设置则可以删除
            TitleLevel: -1, //标签大纲级别，值从0到7，若不设置则此标签不作为大纲节点
            Attributes: {
                //自定义属性，直接传JSON对象
                Name: '张三',
                Sex: '男',
                Age: '20',
            },
            PageTexts: [],
            ContactAction: 'Normal', //连接模式
            AttributeNameForContactAction: '科室', //连接模式提取值的来源属性名称
            LinkTextForContactAction: '-', //连接字符串
        },
    },
    // 水平线
    [EEditorInputFeildType.HORIZONTAL_LINE]: {
        type: EExecuteCommand.INSERT_HORIZONTAL_LINE,
        data: {
            LineLengthInCM: 100,
            LineSize: 10,
            Color: 'red',
            LineStyle: 'Dash',
            ID: 'hr1',
        },
    },
    // 按钮
    [EEditorInputFeildType.BUTTON]: {
        type: EExecuteCommand.INSERT_BUTTON,
        data: {
            ID: 'button1',
            Height: 100,
            Width: 500,
            Deleteable: false,
            PrintVisibility: 'Visible',
            Name: 'btnName',
            Enabled: true,
            PrintAsText: false,
            AutoSize: false,
            Text: '按钮文本',
            CommandName: '',
            ImgBase64: null,
            ImgBase64ForDown: bluepicbase64data,
            ImgBase64ForOver: null,
        },
    },
    // 图片
    [EEditorInputFeildType.IMAGE]: {
        // 引入文件
        file: true,
        type: EExecuteCommand.INSERT_IMAGE,
        data: {
            ID: 'img1',
            Width: 200,
            Height: 200,
            SaveContentInFile: true,
            Src: bluepicbase64data,
        },
    },
    // 网络图片
    [EEditorInputFeildType.DC_IMAGE]: {
        type: EExecuteCommand.INSERT_DC_IMAGE,
        data: {
            ID: 'img1',
            Width: 200,
            Height: 200,
            SaveContentInFile: true,
            // Src: url
        },
    },
    // 特殊字符
    [EEditorInputFeildType.INSERT_SPECIFY_CHARACTER]: {
        type: EExecuteCommand.INSERT_SPECIFY_CHARACTER,
        data: {},
    },
    // 批注
    [EEditorInputFeildType.INSERT_COMMENT]: {
        type: EExecuteCommand.INSERT_COMMENT,
        data: {
            BackColor: '#FFFF00',
            BorderColor: '#FFFF00',
            ForeColor: '#000000',
            Text: '请检查这里的内容是否正确',
            author: '李四主任医师',
            AuthorID: 'lisi',
        },
    },
    // 视频
    [EEditorInputFeildType.MEDIA]: {
        type: EExecuteCommand.INSERT_MEDIA_ELEMENT,
        data: {
            Width: '1871',
            Height: '1000',
            PrintVisibility: 'none',
            FileName: 'http://www.dcwriter.cn/static/images/websiteexplain.mp4',
        },
    },
});

// 功能函数
export const getEditorFunction = () => [
    {
        function: 'ABS(V)',
        description: '获得绝对值',
        example: 'ABS(V)',
    },
    {
        function: 'ACOS(V)',
        description: '计算反余弦值。',
        example: 'ACOS(V)',
    },
    {
        function: 'ASIN(V)',
        description: '计算反正弦值。',
        example: 'ASIN(V)',
    },
    {
        function: 'ATAN(V)',
        description: '计算反正切值。',
        example: 'ATAN(V)',
    },
    {
        function: 'ATAN2(X,Y)',
        description: '计算反正切值。',
        example: 'ATAN2(X,Y)',
    },
    {
        function: 'AVERAGE(X1，X2...)',
        description: '计算算术平均值。',
        example:
            'AVERAGE([field1],[field2])--代表当前输入域值为输入域ID为field1和ID为field2之和的平均值。（10、20=15）',
    },
    {
        function: 'CDOUBLE(V,DefaultValue)',
        description: '将指定数据转换为浮点数，第二个参数为转换失败后的返回的默认值。',
        example: 'CDOUBLE(V,DefaultValue)',
    },
    {
        function: 'CEILING(V)',
        description: '获得大于等于指定数值的最小整数。',
        example: 'CEILING(V)',
    },
    {
        function: 'CINT(V,DefaultValue)',
        description: '将指定数据转换为整数，第二个参数为转换失败后返回的默认值。',
        example: 'CINT(V,DefaultValue)',
    },
    {
        function: 'COS(V)',
        description: '返回指定角度的余弦值。',
        example: 'COS(V)',
    },
    {
        function: 'COUNT(X1,X2...)',
        description: '返回参数的个数',
        example: 'COUNT([field1],[field3])--代表当前输入域值为该函数里面的个数（10,11,12=3）',
    },
    {
        function: 'EXP(V)',
        description: '返回e的n次方。',
        example: 'EXP(V)',
    },
    {
        function: 'FLOOR(V)',
        description: '返回小于等于指定数字的整数。',
        example: 'FLOOR(V)',
    },
    {
        function: 'INT(V)',
        description: '四舍五入的数字取整。',
        example: 'INT([field1])--代表当前输入域值为输入域ID-field1的整数值(12.4=12)',
    },
    {
        function: 'LOG(A,BASE)',
        description: '返回指定底数的对数值。',
        example: 'LOG(A,BASE)',
    },
    {
        function: 'LOG(V)',
        description: '返回以10为底数的对数值。',
        example: 'LOG(V)',
    },
    {
        function: 'MAX(V1，V2...)',
        description: '返回最大值。',
        example:
            'MAX([field1],[field2])--代表当前输入域值为输入域ID为field1、ID为field2值的最大值（20、40=40）',
    },
    {
        function: 'MIN(V1，V2...)',
        description: '返回最小值。',
        example:
            'MIN([field1],[field2])--代表当前输入域值为输入域ID为field1、ID为field2值的最小值(20、40=20)',
    },
    {
        function: 'MOD(V,DIVISOR)',
        description: '返回两数相除的余数。',
        example:
            'MOD([field1],[field2])--代表当前输入域值为输入域ID为field1和ID为field2相除的余数（20/6=2）',
    },
    {
        function: 'ODD(V)',
        description: '将正（负）数向上（下）舍入到最接近的奇数。',
        example: 'ODD(V)',
    },
    {
        function: 'POW(NUMER,POWER)',
        description: '返回某数的乘幂。',
        example:
            'POW([field1],[field2])--代表当前输入域值为输入域ID为field1的乘幂、ID为field2的输入域值为底数（6^2=64）',
    },
    {
        function: 'PRODUCT(V1,V2,V3...)',
        description: '返回所有参数的乘积。',
        example:
            'PRODUCT([field1],[field2])--代表当前输入域值为输入域ID为field1、输入域ID为field2的乘积。（3*4=12）',
    },
    {
        function: 'RADIANS(V)',
        description: '将角度转换为弧度。',
        example: 'RADIANS(V)',
    },
    {
        function: 'RAND()',
        description: '返回一个介于0到1之间的随机数。',
        example: 'RAND()',
    },
    {
        function: 'ROUND(V)',
        description: '进行四舍五入计算。',
        example:
            'ROUND([field1])--代表当前输入域值为输入域ID为field1进行四舍五入。（11.3=11）（11.5=12）',
    },
    {
        function: 'ROUNDDOWN(V)',
        description: '向下舍入数字。',
        example:
            'ROUNDDOWN([field1])--代表当前输入域值为输入域ID为field1的值小数位去掉（11.3=11）（11.899=11）',
    },
    {
        function: 'ROUNDUP(V)',
        description: '向上舍入数字。',
        example:
            'ROUNDDOWN([field1])--代表当前输入域值为输入域ID为field1的值小数位向上加一（11.011=12）（11.899=12）',
    },
    {
        function: 'SIGN(V)',
        description: '为正数返回1，为零返回0，为负数返回-1。',
        example:
            'ROUNDDOWN([field1])--代表当前输入域值为输入域ID为field1的值小数位向上加一（11.011=1）（0=0）(-12=-1)',
    },
    {
        function: 'SIN(V)',
        description: '返回指定角度的正弦值。',
        example: 'SIN(V)',
    },
    {
        function: 'SQRT(V)',
        description: '返回数值的平方根。',
        example: 'ROUNDDOWN([field1])--代表当前输入域值为输入域ID为field1的平方根（√4=2）',
    },
    {
        function: 'SUM(V1,V2...)',
        description: '返回所有参数的和。',
        example:
            'POW([field1],[field2])--代表当前输入域值为输入域ID为field1、ID为field2的输入域值之和（1+2=3）单元格数值表达式：SUM([C1:C3])--代表单元格背景编号C1-C3值之和',
    },
    {
        function: 'TAN(V)',
        description: '返回指定角度的正切值。',
        example: 'TAN(V)',
    },
    {
        function: 'PARAMETER',
        description: '',
        example: 'PARAMETER',
    },
    {
        function: 'CINT',
        description: '将数据转换为一个整数',
        example: 'CINT',
    },
    {
        function: 'CDOUBLE',
        description: '将数据转换为一个双精度浮点数',
        example: 'CDOUBLE',
    },
    {
        function: 'LEN',
        description: '',
        example: 'LEN',
    },
    {
        function: 'FIND',
        description: '函数FIND和FINDB用于在第二个文本串中定位第一个文本串，并返回第一个文本串的',
        example:
            "FIND('男',[field1])>=0--代表当前输入域值为多选下拉输入域ID为field1值包含男，该输入域就显示，否则隐藏.",
    },
    {
        function: 'LOOKUP',
        description: '进行数组比较，返回比较结果。',
        example:
            "LOOKUP([field1],0,'不及格',60,'及格',70,'中',80,'良',90,'优')--代表当前输入域值为输入域ID为field1值所属某个区间的值（45=不及格）（81=良）",
    },
    {
        function: 'IF',
        description:
            '对一个参数值转换为布尔值，如果为true则返回第二个参数值，如果为false则返回第三个参数值。',
        example:
            "if([field1]='',true,false)--代表输入域ID为field1值为空时，当前输入域显示，不为空的时候，当前输入域隐藏。示例：输入域数值表达式if([field1]='',0,2)--代表当前输入域值为输入域ID为field1值为空时显示0，否则显示2",
    },
    {
        function: 'AGE(V)',
        description: '计算周岁年龄。参数为表示时间日期数值。',
        example: 'AGE([field1])--代表当前输入域值为输入域id为field1日期值的周岁（20201122=3）',
    },
    {
        function: 'AGEMONTH(V)',
        description: '计算月龄。参数为表示时间日期的数值。',
        example:
            'AGEMONTH([field1])--代表当前输入域值为输入域id为field1日期值的月龄（2020-12-31=34）',
    },
    {
        function: 'AGEWEEK(V)',
        description: '计算周龄。参数为表示时间日期的数值。',
        example:
            'AGEWEEK([field1])--代表当前输入域值为输入域id为field1日期值的月龄（2020-11-01=157）',
    },
    {
        function: 'AGEHOUR(V)',
        description: '计算小时龄。参数为表示时间日期的数值。',
        example:
            'AGEHOUR([field1])--代表当前输入域值为输入域id为field1日期值的月龄（2020-11-30=25724）',
    },
    {
        function: 'SUNINNERVALUE(V1,V2)',
        description: '返回所有参数的INNERVALUE之和',
        example: 'SUNINNERVALUE([aa])--代表当前输入域值为复选框组name值为aa的勾选之和。',
    },
    {
        function: '性别-月经史级联',
        description: '',
        example: "'男'--当输入域id为男的时候，该输入域显示，否则隐藏",
    },
];
