import { IObject } from 'src/interface';
import {
    EEditorElement,
    EEditorInputFeildType,
    EEditorLayout,
    EEditorSubOperateType,
    EEditorType,
    EExecuteCommand,
    IPrintLocal,
    IPrintPreview,
} from 'src/interface/editor';
import { CEditor } from 'src/utils/editor';
import { SubInfo } from 'src/utils/pubSub';
import { DISABLED, EditConfig, IsYesNo, OperateEvent } from '.';
import { h, reactive, ref } from 'vue';
import { ElRadio, ElRadioGroup } from 'element-plus';
import { getInputFeildOptions } from './editorData';
import { TestData1, TestData2 } from './editorDataSource';
import { router } from 'src/router';
import {
    EditCommentVisibilitySelected,
    EditContentProtectSelected,
    EditFontSelected,
    EditFontSizeSelected,
    EditFormSelected,
    EditPageMarginLineLengthSelected,
    EditPromptProtectedContentSelected,
    EditProtectedContentBackColorSelected,
} from './editorSelected';

const InputConfig = {
    size: 'small',
    style: 'width: 80px',
    clearable: false,
    'controls-position': 'right',
    precision: 0,
    min: 0,
};

// 初始化字体 宋体和12
export const FontInit: IObject<string> = {
    FontSize: '12',
    FontFamily: '宋体',
};

// 字体变量响应式
const fontProxy = reactive<IObject<string | undefined>>({
    FontSize: FontInit.FontSize,
    FontFamily: FontInit.FontFamily,
});

// 初始化颜色
const ColorInit: IObject<string | undefined> = {
    Color: '#000',
    BackColor: '#fff',
};

// 颜色变量响应式
const colorProxy: IObject<string | undefined> = {
    Color: ColorInit.Color,
    BackColor: ColorInit.FontFamily,
};

// 初始化打印页
const PageInit = {
    StartPage: 0,
    EndPage: 0,
    ListPage: '2-4',
    StartElement: '',
    EndElement: '',
    StartPagePosition: 0,
    EndPagePosition: 0,
    StartPosition: 0,
    EndPosition: 0,
    Offset: 0,
};

// 打印模块
const printProxy = reactive<IObject<number | undefined | string>>({
    startPage: PageInit.StartPage,
    endPage: PageInit.EndPage,
    listPage: PageInit.ListPage,
    startElement: PageInit.StartElement,
    endElement: PageInit.EndElement,
    startPagePosition: PageInit.StartPagePosition,
    endPagePosition: PageInit.EndPagePosition,
    startPosition: PageInit.StartPosition,
    endPosition: PageInit.EndPosition,
    offset: PageInit.Offset,
});

// 界面设置
const viewProxy = reactive<IObject<boolean | string>>({});

const DocumentOptions: IObject<any> = EditConfig.DocumentOptions;
// 预览配置
const DocumentOptionsSelect = [
    {
        property: 'ShowParagraphFlag',
        option: 'ViewOptions',
    },
    {
        property: 'EnableEncryptView',
        option: 'ViewOptions',
    },
    {
        property: 'ShowFormButton',
        option: 'ViewOptions',
    },
    {
        property: 'ShowHeaderBottomLine',
        option: 'ViewOptions',
    },
    {
        property: 'ShowInputFieldStateTag',
        option: 'ViewOptions',
    },
    {
        property: 'ShowBackgroundCellID',
        option: 'ViewOptions',
    },
    {
        property: 'ShowExpressionFlag',
        option: 'ViewOptions',
    },
    {
        property: 'PageMarginLineLength',
        option: 'ViewOptions',
    },
    {
        property: 'ProtectedContentBackColor',
        option: 'ViewOptions',
    },
    {
        property: 'TagColorForModifiedField',
        option: 'ViewOptions',
    },
    {
        property: 'TagColorForNormalField',
        option: 'ViewOptions',
    },
    {
        property: 'TagColorForReadonlyField',
        option: 'ViewOptions',
    },
    {
        property: 'TagColorForValueInvalidateField',
        option: 'ViewOptions',
    },
    {
        property: 'FieldBackColor',
        option: 'ViewOptions',
    },
    {
        property: 'FieldBorderColor',
        option: 'ViewOptions',
    },
    {
        property: 'HeaderFooterReadonly',
        option: 'ViewOptions',
    },
    {
        property: 'ParagraphFlagFollowTableOrSection',
        option: 'BehaviorOptions',
    },
    {
        property: 'ThreeClickToSelectParagraph',
        option: 'BehaviorOptions',
    },
    {
        property: 'OutputFormatedXMLSource',
        option: 'BehaviorOptions',
    },
    {
        property: 'DoubleClickToSelectWord',
        option: 'BehaviorOptions',
    },
    {
        property: 'CommentEditableWhenReadonly',
        option: 'BehaviorOptions',
    },
    {
        property: 'PromptProtectedContent',
        option: 'BehaviorOptions',
    },
    {
        property: 'CommentVisibility',
        option: 'BehaviorOptions',
    },
    {
        property: 'FormView',
        option: 'BehaviorOptions',
    },
    {
        property: 'EnablePermission',
        option: 'SecurityOptions',
    },
    {
        property: 'EnableLogicDelete',
        option: 'SecurityOptions',
    },
    {
        property: 'ShowPermissionMark',
        option: 'SecurityOptions',
    },
    {
        property: 'ShowPermissionTip',
        option: 'SecurityOptions',
    },
    {
        property: 'ShowLogicDeletedContent',
        option: 'SecurityOptions',
    },
];
// 预览用户配置
const DocumentOptionsUserSelect = [
    {
        property: 'DeleteLineColor',
        option: 'SecurityOptions',
    },
    {
        property: 'DeleteLineNum',
        option: 'SecurityOptions',
    },
    {
        property: 'UnderLineColor',
        option: 'SecurityOptions',
    },
    {
        property: 'UnderLineColorNum',
        option: 'SecurityOptions',
    },
    {
        property: 'Enabled',
        option: 'SecurityOptions',
    },
    {
        property: 'BackgroundColor',
        option: 'SecurityOptions',
    },
];
// 设置段落初始值
const setDocumentValue = (
    proxy: IObject<string | boolean>,
    property: string,
    option: string,
    user?: string
) => {
    if (!user) {
        proxy[property] = DocumentOptions[option][property];
    } else {
        proxy[property] = DocumentOptions[option][user][property];
    }
};

// 初始化配置
const initDocumentConfig = (editor: CEditor) => {
    DocumentOptionsSelect.forEach((item) => {
        setDocumentValue(viewProxy, item.property, item.option);
    });
    DocumentOptionsUserSelect.forEach((item) => {
        setDocumentValue(user1Proxy1, item.property, item.option, 'TrackVisibleLevel0');
        setDocumentValue(user1Proxy2, item.property, item.option, 'TrackVisibleLevel1');
        setDocumentValue(user1Proxy3, item.property, item.option, 'TrackVisibleLevel2');
    });
    editor.applyDocumentOptions();
};

// 表单模式响应式
const formProxy = ref();

// 数据源加载
const loadDataSource = (editor: CEditor, str: string) => {
    editor.loadDocumentFromString(str);
};

// 编辑一级菜单栏
export const OneMenus = () => [
    {
        value: '1',
        label: '文件',
    },
    {
        value: '2',
        label: '编辑',
    },
    {
        value: '3',
        label: '视图',
    },
    {
        value: '4',
        label: '插入元素',
    },
    {
        value: '5',
        label: '表格',
    },
    {
        value: '6',
        label: '打印',
    },
    {
        value: '7',
        label: '数据源绑定',
    },
    {
        value: '8',
        label: '错误信息查看',
    },
    {
        value: '9',
        label: '界面设置',
    },
    {
        value: '10',
        label: '用户痕迹设计',
    },
];

// editor 文档加载完成后回调字体
const loadFontDocument = (editor: CEditor, property?: string, value?: string) => {
    const font = editor.getFontObject();
    if (property) {
        fontProxy[property] = value || FontInit[property];
    } else {
        fontProxy.FontFamily = (font.FontFamily as string) || FontInit.FontFamily;
        fontProxy.FontSize = (font.FontSize as string) || FontInit.FontSize;
    }
};

// editor 文档加载完成后回调颜色
const loadColorDocument = (property: string, value: string) => {
    colorProxy[property] = value || ColorInit[property];
};

// 重做撤销响应式
const editProxy = reactive({
    redo: DISABLED,
    undo: DISABLED,
});

// 获取撤销和重做
const getRedoUndo = (obj: { redo: boolean; undo: boolean }) => {
    editProxy.redo = obj.redo ? '' : DISABLED;
    editProxy.undo = obj.undo ? '' : DISABLED;
};

// 用户1
const user1Proxy1 = reactive<IObject<boolean | string>>({});
// 用户2
const user1Proxy2 = reactive<IObject<boolean | string>>({});
// 用户3
const user1Proxy3 = reactive<IObject<boolean | string>>({});

// 用户痕迹配置
const setUserTrackOption = (editor: CEditor, proxy: IObject<string | boolean>, user: string) => {
    return [
        [
            {
                label: '删除线颜色：',
                type: 'Auto',
                value: proxy.DeleteLineColor,
                others: InputConfig,
                options: EditProtectedContentBackColorSelected,
                events: {
                    change: (e: string) => {
                        proxy.DeleteLineColor = e;
                        editor.setDocumentOptions('DeleteLineColor', e, 'SecurityOptions', user);
                    },
                    select: (e: { value: string | boolean }) => {
                        proxy.DeleteLineColor = e.value;
                        editor.setDocumentOptions(
                            'DeleteLineColor',
                            e.value,
                            'SecurityOptions',
                            user
                        );
                    },
                },
            },
            {
                label: '删除线数量：',
                type: 'InputNumber',
                value: proxy.DeleteLineNum,
                others: InputConfig,
                events: {
                    change: (e: string) => {
                        proxy.DeleteLineNum = e;
                        editor.setDocumentOptions('DeleteLineNum', e, 'SecurityOptions', user);
                    },
                },
            },
        ],
        [
            {
                label: '下划线颜色：',
                type: 'Auto',
                value: proxy.UnderLineColor,
                others: InputConfig,
                options: EditProtectedContentBackColorSelected,
                events: {
                    change: (e: string) => {
                        proxy.UnderLineColor = e;
                        editor.setDocumentOptions('UnderLineColor', e, 'SecurityOptions', user);
                    },
                    select: (e: { value: string | boolean }) => {
                        proxy.UnderLineColor = e.value;
                        editor.setDocumentOptions(
                            'UnderLineColor',
                            e.value,
                            'SecurityOptions',
                            user
                        );
                    },
                },
            },
            {
                label: '下划线数量：',
                type: 'InputNumber',
                value: proxy.UnderLineColorNum,
                others: InputConfig,
                events: {
                    change: (e: string) => {
                        proxy.UnderLineColorNum = e;
                        editor.setDocumentOptions('UnderLineColorNum', e, 'SecurityOptions', user);
                    },
                },
            },
        ],
        [
            {
                label: '是否可用：',
                type: 'Select',
                value: proxy.Enabled,
                others: InputConfig,
                options: IsYesNo,
                events: {
                    change: (e: string) => {
                        proxy.Enabled = e;
                        editor.setDocumentOptions('Enabled', e, 'SecurityOptions', user);
                    },
                },
            },
            {
                label: '背景颜色：',
                type: 'Auto',
                value: proxy.BackgroundColor,
                others: InputConfig,
                options: EditProtectedContentBackColorSelected,
                events: {
                    change: (e: string) => {
                        proxy.BackgroundColor = e;
                        editor.setDocumentOptions('BackgroundColor', e, 'SecurityOptions', user);
                    },
                    select: (e: { value: string | boolean }) => {
                        proxy.BackgroundColor = e.value;
                        editor.setDocumentOptions(
                            'BackgroundColor',
                            e.value,
                            'SecurityOptions',
                            user
                        );
                    },
                },
            },
        ],
    ];
};

// 编辑一级对于的二级菜单
export const TwoMenus = (editor: CEditor): IObject<any> => {
    const instance = editor && editor.instance;
    if (editor) {
        if (!SubInfo.isSubscribe(editor.id + '_Font', loadFontDocument)) {
            // 订阅字体，editor 加载完成后执行
            SubInfo.subscribe(editor.id + '_Font', loadFontDocument);
        }
        if (!SubInfo.isSubscribe(editor.id + '_Edit', getRedoUndo)) {
            // 订阅撤销/重做，editor 加载完成后执行
            SubInfo.subscribe(editor.id + '_Edit', getRedoUndo);
        }

        // 订阅文档设置 所有editort 共用
        if (!SubInfo.isSubscribe('DocumentConfig', initDocumentConfig)) {
            // 订阅撤销/重做，editor 加载完成后执行
            SubInfo.subscribe('DocumentConfig', initDocumentConfig);
        }
    }

    // 打开配置
    const openConfig = (type: EEditorInputFeildType, bool = true, options = {}) => {
        const result = getInputFeildOptions()[type];
        editor.executeCommand(result.type, bool, {
            ...result.data,
            ...options,
        });
    };

    // 拖拽配置
    const dragConfig = (e: DragEvent, type: EEditorInputFeildType, options = {}) => {
        const result = getInputFeildOptions()[type];
        e.dataTransfer?.setData('text/plain', JSON.stringify({ ...result, ...(options || {}) }));
    };

    return {
        '1': {
            文件: [
                [
                    {
                        value: '关于',
                        label: '关于',
                        events: {
                            click: () => {
                                instance.ShowAboutDialog();
                            },
                        },
                    },
                    {
                        value: '打开',
                        label: '打开',
                        events: {
                            click: () => {
                                SubInfo.publish(OperateEvent, EEditorSubOperateType.OPEN);
                            },
                        },
                    },
                    {
                        value: '新建',
                        label: '新建',
                        events: {
                            click: () => {
                                SubInfo.publish(OperateEvent, EEditorSubOperateType.CREATE);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '保存XML',
                        label: '保存XML',
                        events: {
                            click: () => {
                                editor.saveXmlString();
                            },
                        },
                    },
                    {
                        value: '保存JSON',
                        label: '保存JSON',
                        events: {
                            click: () => {
                                editor.saveJsonString();
                            },
                        },
                    },
                    {
                        value: '演示文档',
                        label: '演示文档',
                        events: {
                            click: () => {
                                SubInfo.publish(OperateEvent, EEditorSubOperateType.ACTION);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '下载XML',
                        label: '下载XML',
                        events: {
                            click: () => {
                                editor.downLoadFile(EEditorType.XML);
                            },
                        },
                    },
                    {
                        value: '下载JSON',
                        label: '下载JSON',
                        events: {
                            click: () => {
                                editor.downLoadFile(EEditorType.JSON);
                            },
                        },
                    },
                    {
                        value: '下载TXT',
                        label: '下载TXT',

                        events: {
                            click: () => {
                                editor.downLoadFile(EEditorType.TEXT);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '下载PDF',
                        label: '下载PDF',

                        events: {
                            click: () => {
                                editor.downLoadFile(EEditorType.PDF);
                            },
                        },
                    },
                    {
                        value: '下载HTML',
                        label: '下载HTML',

                        events: {
                            click: () => {
                                editor.downLoadFile(EEditorType.HTML);
                            },
                        },
                    },
                    {
                        value: '下载长图片',
                        label: '下载长图片',

                        events: {
                            click: () => {
                                editor.downLoadFile(EEditorType.LONG_IMG);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '下载RTF',
                        label: '下载RTF',

                        events: {
                            click: () => {
                                editor.downLoadFile(EEditorType.RTF);
                            },
                        },
                    },
                    {
                        value: '下载DOC',
                        label: '下载DOC',

                        events: {
                            click: () => {
                                editor.downLoadFile(EEditorType.DOC);
                            },
                        },
                    },
                    {
                        value: '刷新',
                        label: '刷新',

                        events: {
                            click: () => {
                                editor.refreshDocument();
                            },
                        },
                    },
                ],
                [
                    {
                        value: '选择内容保存为JSON',
                        label: '选择内容保存为JSON',

                        events: {
                            click: () => {
                                editor.saveSelection(EEditorType.JSON);
                            },
                        },
                    },
                    {
                        value: '选择内容保存为TXT',
                        label: '选择内容保存为TXT',

                        events: {
                            click: () => {
                                editor.saveSelection(EEditorType.TEXT);
                            },
                        },
                    },
                    {
                        value: '选择内容保存为XML',
                        label: '选择内容保存为XML',

                        events: {
                            click: () => {
                                editor.saveSelection(EEditorType.XML);
                            },
                        },
                    },
                ],
            ],

            页面设置: [
                [
                    {
                        value: '页面设置',
                        label: '页面设置',

                        events: {
                            click: () => {
                                SubInfo.publish(OperateEvent, EEditorSubOperateType.PAGE_SETTING);
                            },
                        },
                    },
                    {
                        value: '文档网格线',
                        label: '文档网格线',

                        events: {
                            click: () => {
                                SubInfo.publish(OperateEvent, EEditorSubOperateType.GRID_LINE);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '水印设置',
                        label: '水印设置',

                        events: {
                            click: () => {
                                SubInfo.publish(OperateEvent, EEditorSubOperateType.WATER_MARK);
                            },
                        },
                    },
                    {
                        value: '装订线设置',
                        label: '装订线设置',

                        events: {
                            click: () => {
                                SubInfo.publish(OperateEvent, EEditorSubOperateType.GUTTER);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '设置违禁关键字',
                        label: '设置违禁关键字',

                        events: {
                            click: () => {
                                const keysword = editor.getExcludeKeywords();
                                ElMessageBox.prompt('多个词以英文逗号分割：', '违禁关键词', {
                                    confirmButtonText: '提交',
                                    cancelButtonText: '取消',
                                    inputType: 'text',
                                    inputValue: keysword,
                                })
                                    .then(({ value }) => {
                                        editor.setExcludeKeywords(value);
                                    })
                                    .catch(() => {});
                            },
                        },
                    },
                    {
                        value: '获取违禁关键字',
                        label: '获取违禁关键字',

                        events: {
                            click: () => {
                                ElMessage({
                                    type: 'info',
                                    message: editor.getExcludeKeywords(),
                                });
                            },
                        },
                    },
                    {
                        value: '批注校验',
                        label: '批注校验',
                        onClick: () => {},
                        events: {
                            click: () => {
                                const result = editor.executeCommand(
                                    EExecuteCommand.DOCUMENT_VALUE_VALIDATE_WITH_CREATE_DOCUMENT_COMMENTS,
                                    false,
                                    null
                                );
                                if (result == null || result.length == 0) {
                                    ElMessage({
                                        type: 'success',
                                        message: '校验通过，病历中未发现违禁关键词。',
                                    });
                                } else {
                                    ElMessage({
                                        type: 'warning',
                                        message: '校验未通过，病历中发现违禁关键词。',
                                    });
                                }
                            },
                        },
                    },
                ],
            ],
            其他功能演示: [
                [
                    // {
                    //   value: "护理记录单",
                    //   label: "护理记录单",
                    // },
                    {
                        value: '病程',
                        label: '病程',
                        events: {
                            click: () => {
                                router.push('/record');
                            },
                        },
                    },
                    // {
                    //   value: "快捷辅助录入",
                    //   label: "快捷辅助录入",
                    // },
                ],
                // [

                // {
                //   value: "查看性能",
                //   label: "查看性能",
                // },
                // {
                //   value: "测试API",
                //   label: "测试API",
                // },
                // ],
                // [
                //   {
                //     value: "事件",
                //     label: "事件",
                //   },
                //   {
                //     value: "设置",
                //     label: "设置",
                //   },
                //   {
                //     value: "接口管理",
                //     label: "接口管理",
                //   },
                // ],
                // [
                //   {
                //     value: "护理记录单",
                //     label: "护理记录单",
                //   },
                //   {
                //     value: "错误信息查看",
                //     label: "错误信息查看",
                //   },
                //   {
                //     value: "播放API日志",
                //     label: "播放API日志",
                //   },
                // ],
                // [
                //   {
                //     value: "启动/停用API日志",
                //     label: "启动/停用API日志",
                //   },
                //   {
                //     value: "下载API日志",
                //     label: "下载API日志",
                //   },
                // ],
                // [
                //   {
                //     value: "iframe内部创建编译器",
                //     label: "iframe内部创建编译器",
                //   },

                //   {
                //     value: "iframe外部创建编译器",
                //     label: "iframe外部创建编译器",
                //   },
                // ],
            ],
        },
        '2': {
            常规: [
                [
                    {
                        value: '复制（Ctrl+C）',
                        label: '复制（Ctrl+C）',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.COPY, false, null);
                            },
                        },
                    },
                    {
                        value: '粘贴（Ctrl+V）',
                        label: '粘贴（Ctrl+V）',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.PASTE, false, null);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '纯文本复制',
                        label: '纯文本复制',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.COPY_AS_TEXT, false, null);
                            },
                        },
                    },
                    {
                        value: '纯文本粘贴',
                        label: '纯文本粘贴',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.PASTE_AS_TEXT, false, null);
                            },
                        },
                    },
                    {
                        value: '剪切',
                        label: '剪切',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.CUT, false, null);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '撤销',
                        label: '撤销',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.UNDO, false, null);
                            },
                        },
                        others: {
                            class: editProxy.undo,
                        },
                    },
                    {
                        value: '重做',
                        label: '重做',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.REDO, false, null);
                            },
                        },
                        others: {
                            class: editProxy.redo,
                        },
                    },
                    {
                        value: '查找',
                        label: '查找',
                        events: {
                            click: () => {
                                SubInfo.publish(OperateEvent, EEditorSubOperateType.SEARCH_REPLACE);
                            },
                        },
                    },
                ],
            ],
            字体: [
                [
                    {
                        value: '字体',
                        label: '字体',
                        events: {
                            click: () => {
                                SubInfo.publish(OperateEvent, EEditorSubOperateType.FONT_SETTING);
                            },
                        },
                    },
                    {
                        label: 'FontFamily',
                        hiddenLabel: true,
                        type: 'Select',
                        value: fontProxy.FontFamily,
                        options: EditFontSelected,
                        others: InputConfig,
                        events: {
                            change: (e: string) => {
                                const font = editor.getFontObject();
                                editor.setFontObject({
                                    ...font,
                                    FontFamily: e,
                                });
                                loadFontDocument(editor, 'FontFamily', e);
                            },
                        },
                    },
                    {
                        label: 'FontSize',
                        hiddenLabel: true,
                        value: fontProxy.FontSize,
                        type: 'Select',
                        options: EditFontSizeSelected,
                        others: InputConfig,
                        events: {
                            change: (e: string) => {
                                const font = editor.getFontObject();
                                editor.setFontObject({
                                    ...font,
                                    FontSize: e,
                                });
                                loadFontDocument(editor, 'FontSize', e);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '斜体',
                        label: '斜体',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.ITALIC, false, null);
                            },
                        },
                    },
                    {
                        value: '粗体',
                        label: '粗体',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.BOLD, false, null);
                            },
                        },
                    },
                    {
                        value: '格式刷',
                        label: '格式刷',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.FORMAT_BRUSH, false, null);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '下划线',
                        label: '下划线',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.UNDER_LINE, false, null);
                            },
                        },
                    },
                    {
                        value: '删除线',
                        label: '删除线',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.STRIKE_OUT, false, null);
                            },
                        },
                    },
                    {
                        value: '字体边框',
                        label: '字体边框',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.FONT_BORDER, false, null);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '上标',
                        label: '上标',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.SUPER_SCRIPT, false, null);
                            },
                        },
                    },
                    {
                        value: '下标',
                        label: '下标',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.SUB_SCRIPT, false, null);
                            },
                        },
                    },
                    {
                        value: '文本套圈',
                        label: '文本套圈',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.CHARACTER_CIRCLE,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        label: '前景色：',
                        value: colorProxy.Color,
                        type: 'Color',
                        events: {
                            change: (e: string) => {
                                editor.executeCommand(EExecuteCommand.COLOR, false, e);
                                loadColorDocument('Color', e);
                            },
                        },
                    },
                    {
                        label: '背景色：',
                        value: colorProxy.BackColor,
                        type: 'Color',
                        events: {
                            change: (e: string) => {
                                editor.executeCommand(EExecuteCommand.BACK_COLOR, false, e);
                                loadColorDocument('BackColor', e);
                            },
                        },
                    },
                ],
            ],
            段落: [
                [
                    {
                        value: '居左',
                        label: '居左',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.ALIGN_LEFT, false, null);
                            },
                        },
                    },
                    {
                        value: '居右',
                        label: '居右',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.ALIGN_RIGHT, false, null);
                            },
                        },
                    },
                    {
                        value: '居中',
                        label: '居中',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.ALIGN_CENTER, false, null);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '分散对齐',
                        label: '分散对齐',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.ALIGN_DISTRIBUTE,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '段落',
                        label: '段落',
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.PARAGRAPH_FORMAT
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        value: '首行缩进',
                        label: '首行缩进',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.INDENT, false, null);
                            },
                        },
                    },
                    {
                        value: '悬挂缩进',
                        label: '悬挂缩进',
                        events: {
                            click: () => {
                                var options = {
                                    firstlineindent: '-88',
                                    leftindent: '236',
                                };
                                editor.executeCommand(EExecuteCommand.INDENT, false, options);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '有序列表',
                        label: '有序列表',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.INSERT_ORDERED_LIST,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '无序列表',
                        label: '无序列表',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.INSERT_UNORDERED_LIST,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        value: '行间距',
                        label: '行间距',
                        events: {
                            click: () => {
                                ElMessageBox.prompt(undefined, '行间距', {
                                    confirmButtonText: '提交',
                                    cancelButtonText: '取消',
                                    inputType: 'number',
                                })
                                    .then(({ value }) => {
                                        editor.executeCommand(
                                            EExecuteCommand.LINE_HEIGHT,
                                            false,
                                            value
                                        );
                                    })
                                    .catch(() => {});
                            },
                        },
                    },
                    {
                        value: '段前距',
                        label: '段前距',
                        events: {
                            click: () => {
                                ElMessageBox.prompt(undefined, '段前距', {
                                    confirmButtonText: '提交',
                                    cancelButtonText: '取消',
                                    inputType: 'number',
                                })
                                    .then(({ value }) => {
                                        editor.executeCommand(
                                            EExecuteCommand.ROW_SPACING,
                                            false,
                                            value + ',top'
                                        );
                                    })
                                    .catch(() => {});
                            },
                        },
                    },
                    {
                        value: '段后距',
                        label: '段后距',
                        events: {
                            click: () => {
                                ElMessageBox.prompt(undefined, '段后距', {
                                    confirmButtonText: '提交',
                                    cancelButtonText: '取消',
                                    inputType: 'number',
                                })
                                    .then(({ value }) => {
                                        editor.executeCommand(
                                            EExecuteCommand.ROW_SPACING,
                                            false,
                                            value + ',bottom'
                                        );
                                    })
                                    .catch(() => {});
                            },
                        },
                    },
                ],
            ],
        },
        '3': {
            视图: [
                [
                    {
                        value: '阅读模式',
                        label: '阅读模式',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.READ_VIEW_MODE, false, null);
                            },
                        },
                    },
                    {
                        value: '只读切换',
                        label: '只读切换',
                        events: {
                            click: () => {
                                let result = editor.instance.Readonly;
                                editor.instance.Readonly = !result;
                            },
                        },
                    },
                ],
                [
                    {
                        value: '表单模式',
                        label: '表单模式',
                        events: {
                            click: () => {
                                // editor.executeCommand(
                                // 	EExecuteCommand.READ_VIEW_MODE,
                                // 	false,
                                // 	null
                                // );
                                formProxy.value = editor.getFormView();
                                ElMessageBox({
                                    showCancelButton: true,
                                    title: '表单模式',
                                    confirmButtonText: '提交',
                                    cancelButtonText: '取消',
                                    // Should pass a function if VNode contains dynamic props
                                    message: () =>
                                        h(
                                            ElRadioGroup,
                                            {
                                                modelValue: formProxy.value,
                                                style: {
                                                    display: 'block',
                                                },
                                                onChange: (values: any) => {
                                                    formProxy.value = values;
                                                },
                                            },
                                            () =>
                                                EditFormSelected.map((item) => {
                                                    return h(
                                                        'div',
                                                        {
                                                            style: {
                                                                marginBottom: '15px',
                                                            },
                                                        },
                                                        h(
                                                            ElRadio,
                                                            {
                                                                label: item.value,
                                                            },
                                                            () => item.label
                                                        )
                                                    );
                                                })
                                        ),
                                }).then(() => {
                                    editor.executeCommand(
                                        EExecuteCommand.FORM_VIEW_MODE,
                                        false,
                                        formProxy.value
                                    );
                                });
                            },
                        },
                    },
                    {
                        value: '内容保护',
                        label: '内容保护',
                        events: {
                            click: () => {
                                formProxy.value = editor.getProtectType();

                                ElMessageBox({
                                    showCancelButton: true,
                                    title: '内容保护',
                                    confirmButtonText: '提交',
                                    cancelButtonText: '取消',
                                    // Should pass a function if VNode contains dynamic props
                                    message: () =>
                                        h(
                                            ElRadioGroup,
                                            {
                                                modelValue: formProxy.value,
                                                onChange: (values: any) => {
                                                    formProxy.value = values;
                                                },
                                                style: {
                                                    display: 'block',
                                                },
                                            },
                                            () =>
                                                EditContentProtectSelected.map((item) => {
                                                    return h(
                                                        'div',
                                                        {
                                                            style: {
                                                                marginBottom: '15px',
                                                            },
                                                        },
                                                        h(
                                                            ElRadio,
                                                            {
                                                                label: item.value,
                                                            },
                                                            () => item.label
                                                        )
                                                    );
                                                })
                                        ),
                                }).then(() => {
                                    editor.executeCommand(
                                        EExecuteCommand.CONTENT_PROTECT,
                                        false,
                                        formProxy.value
                                    );
                                });
                            },
                        },
                    },
                    {
                        value: '管理员模式',
                        label: '剪切',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.ADMINISTRATOR_VIEW_MODE,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        value: '续打模式',
                        label: '续打模式',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.JUMP_PRINT_MODE, false, null);
                            },
                        },
                    },
                    {
                        value: '偏移续打模式',
                        label: '偏移续打模式',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.OFFSET_JUMP_PRINT_MODE,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        value: '设置模式',
                        label: '设置模式',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.DESIGN_MODE, false, null);
                            },
                        },
                    },
                    {
                        value: '留痕模式',
                        label: '留痕模式',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.COMPLEX_VIEW_MODE,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '清洁模式',
                        label: '清洁模式',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.CLEAN_VIEW_MODE, false, null);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '清除所有痕迹',
                        label: '清除所有痕迹',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.CLEAR_ALL_USER_TRACE,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '清除当前用户痕迹',
                        label: '清除当前用户痕迹',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.CLEAR_USER_TRACE,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '提交用户痕迹',
                        label: '提交用户痕迹',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.COMMIT_USER_TRACE,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
            ],
            用户登录: [
                [
                    {
                        value: '张三主任医师',
                        label: '张三主任医师',
                        events: {
                            click: () => {
                                editor.setUserLoginByUserLoginInfo({
                                    ID: '009', // 用户编号
                                    Name: '张三主任医师', // 用户名
                                    ClientName: '192.103.1.123', // 客户端电脑名称
                                    PermissionLevel: 2, // 用户授权等级
                                    Description: '觉得有问题', // 其他说明
                                });
                                ElMessage({
                                    type: 'success',
                                    message: '张三主任医师登录成功',
                                });
                            },
                        },
                    },
                    {
                        value: '李四主治医师',
                        label: '李四主治医师',
                        events: {
                            click: () => {
                                editor.setUserLoginByUserLoginInfo({
                                    ID: '011', // 用户编号
                                    Name: '李四主治医师', // 用户名
                                    ClientName: '192.103.1.122', // 客户端电脑名称
                                    PermissionLevel: 1, // 用户授权等级
                                    Description: '觉得有问题', // 其他说明
                                });
                                ElMessage({
                                    type: 'success',
                                    message: '李四主治医师登录成功',
                                });
                            },
                        },
                    },
                    {
                        value: '王五住院医师',
                        label: '王五住院医师',
                        events: {
                            click: () => {
                                editor.setUserLoginByUserLoginInfo({
                                    ID: '0019', // 用户编号
                                    Name: '王五住院医师', // 用户名
                                    ClientName: '192.103.1.125', // 客户端电脑名称
                                    PermissionLevel: 0, // 用户授权等级
                                    Description: '觉得有问题', // 其他说明
                                });
                                ElMessage({
                                    type: 'success',
                                    message: '王五住院医师登录成功',
                                });
                            },
                        },
                    },
                ],
            ],
            页面布局: [
                [
                    {
                        value: '单栏展示',
                        label: '单栏展示',
                        events: {
                            click: () => {
                                editor.setPageLayoutMode(EEditorLayout.SINGLE_COLUMN);
                            },
                        },
                    },
                    {
                        value: '多栏展示',
                        label: '多栏展示',
                        events: {
                            click: () => {
                                editor.setPageLayoutMode(EEditorLayout.MULTI_COLUMN);
                            },
                        },
                    },
                    {
                        value: '水平铺开',
                        label: '水平铺开',
                        events: {
                            click: () => {
                                editor.setPageLayoutMode(EEditorLayout.HORIZONTAL);
                            },
                        },
                    },
                ],
            ],
            痕迹关闭: [
                [
                    {
                        value: '关闭痕迹',
                        label: '关闭痕迹',
                        events: {
                            click: () => {
                                editor.closeUserLogin();
                            },
                        },
                    },
                ],
            ],
        },
        '4': {
            输入域: [
                [
                    {
                        value: '插入文本输入域',
                        label: '插入文本输入域',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.TEXT
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.TEXT);
                            },
                        },
                    },
                    {
                        value: '插入下拉输入域',
                        label: '插入下拉输入域',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.SELECT
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.SELECT);
                            },
                        },
                    },
                    {
                        value: '插入时间输入域',
                        label: '插入时间输入域',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.DATE
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.DATE);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '插入省市县输入域',
                        label: '插入省市县输入域',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.PROVINCEN
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.PROVINCEN);
                            },
                        },
                    },
                ],
            ],
            条形码: [
                [
                    {
                        value: '插入条形码',
                        label: '插入条形码',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.BARCODE
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.BARCODE);
                            },
                        },
                    },
                    {
                        value: '插入二维码',
                        label: '插入二维码',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.TDBARCODE
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.TDBARCODE);
                            },
                        },
                    },
                    {
                        value: '插入页码',
                        label: '插入页码',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.PAGE
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.PAGE);
                            },
                        },
                    },
                ],
            ],
            医学表达式: [
                [
                    {
                        value: '月经史公式1',
                        label: '月经史公式1',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.FOUR_VALUES1
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.FOUR_VALUES1);
                            },
                        },
                    },
                    {
                        value: '月经史公式2',
                        label: '月经史公式2',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.FOUR_VALUES2
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.FOUR_VALUES2);
                            },
                        },
                    },
                    {
                        value: '月经史公式3',
                        label: '月经史公式3',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.FOUR_VALUES3
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.FOUR_VALUES3);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '月经史公式4',
                        label: '月经史公式4',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.FOUR_VALUES4
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.FOUR_VALUES4);
                            },
                        },
                    },
                    {
                        value: '眼球突出度',
                        label: '眼球突出度',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.THREE_VALUES
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.THREE_VALUES);
                            },
                        },
                    },
                    {
                        value: '斜视符号',
                        label: '斜视符号',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.STRABISMUS_SYMBOL
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.STRABISMUS_SYMBOL);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '胎心图',
                        label: '胎心图',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.FETAL_HEART
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.FETAL_HEART);
                            },
                        },
                    },
                    {
                        value: '瞳孔图',
                        label: '瞳孔图',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.PUPIL
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.PUPIL);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '恒牙牙位图',
                        label: '恒牙牙位图',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                // openConfig(EEditorInputFeildType.PERMANENT_TEETH_BITMAP);
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.PERMANENT_TEETH_BITMAP
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.PERMANENT_TEETH_BITMAP);
                            },
                        },
                    },
                    {
                        value: '乳牙牙位图',
                        label: '乳牙牙位图',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.DECIDUOUS_TEECH
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.DECIDUOUS_TEECH);
                            },
                        },
                    },
                    {
                        value: '标尺公式',
                        label: '标尺公式',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.PAIN_INDEX
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.PAIN_INDEX);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '病变上牙',
                        label: '病变上牙',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.DISEASED_TEETH_TOP
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.DISEASED_TEETH_TOP);
                            },
                        },
                    },
                    {
                        value: '病变下牙',
                        label: '病变下牙',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.DISEASED_TEETH_BOTTOM
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.DISEASED_TEETH_BOTTOM);
                            },
                        },
                    },
                    {
                        value: '分数公式',
                        label: '分数公式',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.FRACTION
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.FRACTION);
                            },
                        },
                    },
                ],
            ],
            其他: [
                [
                    {
                        value: '插入单选框',
                        label: '插入单选框',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.RADIO
                                );
                                // openConfig(EEditorInputFeildType.RADIO);
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.RADIO);
                            },
                        },
                    },
                    {
                        value: '插入复选框',
                        label: '插入复选框',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                // openConfig(EEditorInputFeildType.CHECKBOX);
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.CHECKBOX
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.CHECKBOX);
                            },
                        },
                    },
                    {
                        value: '单复选框属性',
                        label: '单复选框属性',

                        events: {
                            click: () => {
                                let element = editor.getCurrentElement();
                                const result = editor.getElementProperties(element);
                                if (!result) return;
                                const ele = result.IsRadio
                                    ? editor.getCurrentElement(EEditorElement.RADIO)
                                    : editor.getCurrentElement(EEditorElement.CHECKBOX);
                                console.log(ele, element);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '插入标签文本',
                        label: '插入标签文本',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.LABEL
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.LABEL);
                            },
                        },
                    },
                    {
                        value: '插入水平线',
                        label: '插入水平线',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                // openConfig(EEditorInputFeildType.HORIZONTAL_LINE);
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.HORIZONTAL_LINE
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.HORIZONTAL_LINE);
                            },
                        },
                    },
                    {
                        value: '插入按钮',
                        label: '插入按钮',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                // openConfig(EEditorInputFeildType.BUTTON);
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.BUTTON
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.BUTTON);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '插入图片',
                        label: '插入图片',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                openConfig(EEditorInputFeildType.IMAGE);
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.IMAGE);
                            },
                        },
                    },
                    {
                        value: '插入网络图片',
                        label: '插入网络图片',
                        events: {
                            click: () => {
                                ElMessageBox.prompt('插入图片', '输入图片地址', {
                                    confirmButtonText: '提交',
                                    cancelButtonText: '取消',
                                    inputType: 'text',
                                })
                                    .then(({ value }) => {
                                        openConfig(EEditorInputFeildType.DC_IMAGE, false, {
                                            Src: value,
                                        });
                                    })
                                    .catch(() => {});
                            },
                        },
                    },
                    {
                        value: '插入特殊字符',
                        label: '插入特殊字符',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                // openConfig(EEditorInputFeildType.INSERT_SPECIFY_CHARACTER);
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.INSERT_SPECIFY_CHARACTER
                                );
                            },
                        },
                    },
                ],
            ],
            批注: [
                [
                    {
                        value: '插入批注',
                        label: '插入批注',
                        others: {
                            draggable: 'true',
                        },
                        events: {
                            click: () => {
                                // openConfig(EEditorInputFeildType.INSERT_COMMENT);
                                SubInfo.publish(
                                    OperateEvent,
                                    EEditorSubOperateType.INPUT,
                                    EEditorInputFeildType.INSERT_COMMENT
                                );
                            },
                            dragstart: function (e: DragEvent) {
                                dragConfig(e, EEditorInputFeildType.INSERT_COMMENT);
                            },
                        },
                    },
                    {
                        value: '删除当前批注',
                        label: '删除当前批注',
                        events: {
                            click: () => {
                                let result = editor.getCurrentComment();
                                if (result != null && result.Index != null && result.Index >= 0) {
                                    ElMessageBox({
                                        showCancelButton: true,
                                        title: '删除批注',
                                        confirmButtonText: '提交',
                                        cancelButtonText: '取消',
                                        // Should pass a function if VNode contains dynamic props
                                        message: '确定删除该批注？',
                                    }).then(() => {
                                        editor.executeCommand(
                                            EExecuteCommand.DELETE_COMMENT,
                                            false,
                                            null
                                        );
                                        editor.refreshDocument();
                                    });
                                }
                            },
                        },
                    },
                    {
                        value: '显示或隐藏批注',
                        label: '显示或隐藏批注',
                        events: {
                            click: () => {
                                let cv =
                                    editor.instance.DocumentOptions.BehaviorOptions
                                        .CommentVisibility;
                                if (cv.toLowerCase() == 'auto' || cv.toLowerCase() == 'visible') {
                                    editor.instance.DocumentOptions.BehaviorOptions.CommentVisibility =
                                        'Hide';
                                } else {
                                    editor.instance.DocumentOptions.BehaviorOptions.CommentVisibility =
                                        'Auto';
                                }
                                editor.applyDocumentOptions();
                                editor.refreshDocument();
                            },
                        },
                    },
                ],
            ],
            媒体: [
                [
                    {
                        value: '插入视频',
                        label: '插入视频',
                        events: {
                            click: () => {
                                ElMessageBox.prompt('插入视频', '输入视频地址', {
                                    confirmButtonText: '提交',
                                    cancelButtonText: '取消',
                                    inputType: 'text',
                                })
                                    .then(({ value }) => {
                                        openConfig(EEditorInputFeildType.MEDIA, false, {
                                            FileName: value,
                                        });
                                    })
                                    .catch(() => {});
                            },
                        },
                    },
                    // {
                    //     value: '获取属性',
                    //     label: '获取属性',
                    //     events: {
                    //         click: () => {
                    //             const ele = editor.getCurrentElement();
                    //             const result = editor.getElementProperties(ele);
                    //             console.log(result);
                    //         },
                    //     },
                    // },
                ],
            ],
        },
        '5': {
            表格: [
                [
                    {
                        value: '插入表格',
                        label: '插入表格',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.INSERT_TABLE, true, null);
                            },
                        },
                    },
                    {
                        value: '删除表格',
                        label: '删除表格',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_DELETE_TABLE,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
            ],
            删除: [
                [
                    {
                        value: '删除行',
                        label: '删除行',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_DELETE_ROW,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '删除列',
                        label: '删除列',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_DELETE_COLUMN,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
            ],
            插入: [
                [
                    {
                        value: '在上面插入行',
                        label: '在上面插入行',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_INSERT_ROW_UP,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '在下面插入行',
                        label: '在下面插入行',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_INSERT_ROW_DOWN,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        value: '在左边插入列',
                        label: '在左边插入列',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_INSERT_COLUMN_LEFT,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '在右边插入列',
                        label: '在右边插入列',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_INSERT_COLUMN_RIGHT,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
            ],
            单元格: [
                [
                    {
                        value: '合并单元格',
                        label: '合并单元格',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_MERGE_CELL,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '拆分单元格',
                        label: '拆分单元格',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_SPLIT_CELL_EXT,
                                    true,
                                    '2,3'
                                );
                            },
                        },
                    },
                ],
            ],
            设置: [
                [
                    {
                        value: '背景编号',
                        label: '背景编号',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.SHOW_BACKGROUND_CELL_ID,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '单元格网格线',
                        label: '单元格网格线',
                        events: {
                            click: () => {
                                editor.instance.cellGridlineDialog(null, editor.instance);
                            },
                        },
                    },
                    {
                        value: '单元格斜分线',
                        label: '单元格斜分线',
                        events: {
                            click: () => {
                                editor.instance.cellDiagonalLineDialog(null, editor.instance);
                            },
                        },
                    },
                ],
                [
                    {
                        value: '表格边框',
                        label: '表格边框',
                        events: {
                            click: () => {
                                editor.instance.bordersShadingDialog();
                            },
                        },
                    },
                    {
                        value: '单元格边框',
                        label: '单元格边框',
                        events: {
                            click: () => {
                                editor.instance.borderShadingcellDialog();
                            },
                        },
                    },
                    {
                        value: '自适应宽度',
                        label: '自适应宽度',
                        events: {
                            click: () => {
                                editor.instance.AutoFixTableWidth();
                            },
                        },
                    },
                ],
            ],
            对齐方式: [
                [
                    {
                        value: '顶端左对齐',
                        label: '顶端左对齐',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.ALIGN_TOP_LEFT, false, null);
                            },
                        },
                    },
                    {
                        value: '顶端右对齐',
                        label: '顶端右对齐',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.ALIGN_TOP_RIGHT, false, null);
                            },
                        },
                    },
                    {
                        value: '顶端中间对齐',
                        label: '顶端中间对齐',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.ALIGN_TOP_CENTER,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        value: '垂直居中水平左对齐',
                        label: '垂直居中水平左对齐',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.ALIGN_MIDDLE_LEFT,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '垂直居中水平右对齐',
                        label: '垂直居中水平右对齐',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.ALIGN_MIDDLE_RIGHT,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '垂直居中水平中间对齐',
                        label: '垂直居中水平中间对齐',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.ALIGN_MIDDLE_CENTER,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        value: '底端左对齐',
                        label: '底端左对齐',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.ALIGN_BOTTOM_LEFT,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '底端右对齐',
                        label: '底端右对齐',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.ALIGN_BOTTOM_RIGHT,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '底端中间对齐',
                        label: '底端中间对齐',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.ALIGN_BOTTOM_CENTER,
                                    false,
                                    null
                                );
                            },
                        },
                    },
                ],
            ],
            属性: [
                [
                    {
                        value: '表格属性',
                        label: '表格属性',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.TABLE_PROPERTIES, true, null);
                            },
                        },
                    },
                    {
                        value: '单元格属性',
                        label: '单元格属性',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_CELL_PROPERTIES,
                                    true,
                                    null
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        value: '表格行属性',
                        label: '表格行属性',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_ROW_PROPERTIES,
                                    true,
                                    null
                                );
                            },
                        },
                    },
                    {
                        value: '表格列属性',
                        label: '表格列属性',
                        events: {
                            click: () => {
                                editor.executeCommand(
                                    EExecuteCommand.TABLE_COLUMN_PROPERTIES,
                                    true,
                                    null
                                );
                            },
                        },
                    },
                ],
            ],
        },
        '6': {
            预览: [
                [
                    {
                        value: '关闭打印预览',
                        label: '关闭打印预览',
                        events: {
                            click: () => {},
                        },
                    },
                    {
                        value: '打印预览',
                        label: '打印预览',
                        events: {
                            click: () => {
                                editor.loadPrintPreview({
                                    PrintTableCellBorder: true,
                                });
                            },
                        },
                    },
                    {
                        value: '预览当前页',
                        label: '预览当前页',
                        events: {
                            click: () => {
                                editor.loadPrintPreview({
                                    PrintRange: 'CurrentPage',
                                });
                            },
                        },
                    },
                ],
            ],
            打印页: [
                [
                    {
                        value: '全部打印',
                        label: '全部打印',
                        events: {
                            click: () => {
                                editor.printDocument();
                            },
                        },
                    },
                    {
                        value: '打印当前页',
                        label: '打印当前页',
                        events: {
                            click: () => {
                                editor.printDocument({
                                    PrintRange: 'CurrentPage',
                                });
                            },
                        },
                    },
                    {
                        value: '打印指定页',
                        label: '打印指定页',
                        events: {
                            click: () => {
                                ElMessageBox.prompt('打印指定页', '输入页码', {
                                    confirmButtonText: '提交',
                                    cancelButtonText: '取消',
                                    inputType: 'text',
                                    inputValue: '1',
                                })
                                    .then(({ value }) => {
                                        editor.printDocument({
                                            PrintRange: 'SomePages',
                                            SpecifyPageIndexs: value,
                                            CleanMode: true,
                                        });
                                    })
                                    .catch(() => {});
                            },
                        },
                    },
                ],
            ],
            打印内容: [
                [
                    {
                        value: '打印选择的内容',
                        label: '打印选择的内容',
                        events: {
                            click: () => {
                                editor.printDocument({
                                    PrintRange: 'Selection', //打印被选中的内容
                                    CleanMode: true,
                                });
                            },
                        },
                    },
                    {
                        value: '打印奇数页',
                        label: '打印奇数页',
                        events: {
                            click: () => {
                                editor.printDocument({
                                    PrintMode: 'EvenPage', //由于是0开始，所以奇偶数颠倒
                                    CleanMode: true,
                                });
                            },
                        },
                    },
                    {
                        value: '打印偶数页',
                        label: '打印偶数页',
                        events: {
                            click: () => {
                                editor.printDocument({
                                    PrintMode: 'OddPage', //由于是0开始，所以奇偶数颠倒
                                    CleanMode: true,
                                });
                            },
                        },
                    },
                ],
            ],
            打印类型: [
                [
                    {
                        value: '打印为PDF',
                        label: '打印为PDF',
                        events: {
                            click: () => {
                                editor.downloadPrintAsPDF();
                            },
                        },
                    },
                    {
                        value: '打印为HTML',
                        label: '打印为HTML',
                        events: {
                            click: () => {
                                editor.downloadPrintAsHtml();
                            },
                        },
                    },
                    {
                        value: '本地打印',
                        label: '本地打印',
                        events: {
                            click: () => {
                                ElMessageBox.prompt('本地打印', '请输入本地打印服务地址：', {
                                    confirmButtonText: '提交',
                                    cancelButtonText: '取消',
                                    inputType: 'text',
                                    inputValue: 'http://localhost:8181',
                                })
                                    .then(({ value }) => {
                                        if (value) {
                                            const options: IPrintLocal = {
                                                ShowUI: false, //是否弹出打印对话框
                                                PrinterName: null, //自定义打印机名称，若为空则选择默认打印机
                                                PrintPageRange: 'all', //支持格式"2,5-7,9"等混合格式
                                                OffsetY: 0,
                                                AutoFitPageSize: true,
                                                CleanMode: true,
                                                ManualDuplex: false,
                                                Files: null, //为空则打印当前文档，可设为二维数组支持混合合并文档打印
                                                JumpPrintPosition: null,
                                                JumpPrintEndPosition: null,
                                                PrintServicePageUrl: value,
                                            };

                                            editor.setLocalPrintDocuments(options);
                                        }
                                    })
                                    .catch(() => {});
                            },
                        },
                    },
                ],
            ],
            打印范围: [
                [
                    {
                        label: '开始页：',
                        type: 'InputNumber',
                        value: printProxy.startPage,
                        others: InputConfig,
                        events: {
                            change: (e: number) => {
                                printProxy.startPage = e;
                            },
                        },
                    },
                    {
                        label: '结束页：',
                        type: 'InputNumber',
                        value: printProxy.endPage,
                        others: InputConfig,
                        events: {
                            change: (e: number) => {
                                printProxy.endPage = e;
                            },
                        },
                    },
                    {
                        value: '打印页面范围',
                        label: '打印页面范围',
                        events: {
                            click: () => {
                                if (
                                    (printProxy.startPage as number) >=
                                    (printProxy.endPage as number)
                                ) {
                                    ElMessage({
                                        type: 'warning',
                                        message: '页面范围有错，请重新设置开始/结束页',
                                    });
                                    return;
                                }

                                let CreatePrintOptions: IPrintPreview = {
                                    PrintRange: 'SomePages',
                                    FromPage: printProxy.startPage as number, // 默认0，从0开始计算的打印开始页码
                                    ToPage: printProxy.endPage as number, //默认为总页数, 从0开始计算的打印结束开始页码
                                    CleanMode: true,
                                };
                                editor.printDocument(CreatePrintOptions);
                            },
                        },
                    },
                ],
            ],
            打印列表: [
                [
                    {
                        label: '指定页面列表：',
                        type: 'Input',
                        value: printProxy.listPage,
                        others: InputConfig,
                        events: {
                            input: (e: string) => {
                                printProxy.listPage = e;
                            },
                        },
                    },
                    {
                        value: '打印页码列表',
                        label: '打印页码列表',
                        events: {
                            click: () => {
                                let CreatePrintOptions: IPrintPreview = {
                                    PrintRange: 'SomePages',
                                    SpecifyPageIndexs: printProxy.listPage as string,
                                    CleanMode: true,
                                };
                                editor.printDocument(CreatePrintOptions);
                            },
                        },
                    },
                ],
            ],
            续打: [
                [
                    {
                        value: '鼠标续打',
                        label: '鼠标续打',
                        events: {
                            click: () => {
                                editor.executeCommand(EExecuteCommand.JUMP_PRINT_MODE, false, null);
                            },
                        },
                    },
                ],
            ],
            元素续打: [
                [
                    {
                        label: '开始元素编号：',
                        type: 'Input',
                        value: printProxy.startElement,
                        others: {
                            ...InputConfig,
                            placeholder: '开始编号',
                        },
                        events: {
                            input: (e: number) => {
                                printProxy.startElement = e;
                            },
                        },
                    },
                    {
                        label: '结束元素编号：',
                        type: 'Input',
                        value: printProxy.endElemen,
                        others: {
                            ...InputConfig,
                            placeholder: '结束编号',
                        },
                        events: {
                            input: (e: number) => {
                                printProxy.endElement = e;
                            },
                        },
                    },
                    {
                        value: '元素编号续打',
                        label: '元素编号续打',
                        events: {
                            click: () => {
                                if (printProxy.endElement && printProxy.startElement) {
                                    let CreatePrintOptions: IPrintPreview = {
                                        JumpPrintStartElementID: printProxy.startElement as string, // 续打开始处的文档元素编号，若该属性值有效，则续打开始位置为该指定ID的元素的上边缘。
                                        JumpPrintEndElementID: printProxy.endElement as string, // 续打结束处元素编号，若该属性值有效，则结束处续打的开始位置为指定ID的元素的下边缘。
                                        CleanMode: true,
                                    };
                                    editor.printDocument(CreatePrintOptions);
                                } else {
                                    ElMessage({
                                        type: 'warning',
                                        message: '请输入元素编号',
                                    });
                                }
                            },
                        },
                    },
                ],
            ],
            位置续打: [
                [
                    {
                        label: '开始页码：',
                        type: 'InputNumber',
                        value: printProxy.startPagePosition,
                        others: InputConfig,
                        events: {
                            change: (e: number) => {
                                printProxy.startPagePosition = e;
                            },
                        },
                    },
                    {
                        label: '开始位置：',
                        type: 'InputNumber',
                        value: printProxy.startPositio,
                        others: InputConfig,
                        events: {
                            change: (e: number) => {
                                printProxy.startPosition = e;
                            },
                        },
                    },
                ],
                [
                    {
                        label: '结束页码：',
                        type: 'InputNumber',
                        value: printProxy.endPagePosition,
                        others: InputConfig,
                        events: {
                            change: (e: number) => {
                                printProxy.endPagePosition = e;
                            },
                        },
                    },
                    {
                        label: '开始位置：',
                        type: 'InputNumber',
                        value: printProxy.endPosition,
                        others: InputConfig,
                        events: {
                            change: (e: number) => {
                                printProxy.endPosition = e;
                            },
                        },
                    },
                    {
                        value: '位置续打',
                        label: '位置续打',
                        events: {
                            click: () => {
                                if (
                                    (printProxy.startPagePosition as number) >
                                    (printProxy.endPagePosition as number)
                                ) {
                                    ElMessage({
                                        type: 'warning',
                                        message: '开始页码不可比结束页面大',
                                    });
                                    return;
                                }

                                let options: IPrintPreview = {
                                    JumpPrint: {
                                        // 续打信息
                                        PageIndex: printProxy.startPagePosition as number, // 从0开始计算的续打开始的页码
                                        Position: printProxy.startPosition as number, // 开始续打的位置
                                        EndPageIndex: printProxy.endPagePosition as number, // 从0开始计算的下端续打的页码
                                        EndPosition: printProxy.endPosition as number, // 下端续打的位置
                                    },
                                    CleanMode: true,
                                };
                                editor.printDocument(options);
                            },
                        },
                    },
                ],
            ],
            偏移量续打: [
                [
                    {
                        label: '纵向偏移量：',
                        type: 'InputNumber',
                        value: printProxy.offset,
                        others: InputConfig,
                        events: {
                            change: (e: number) => {
                                printProxy.offset = e;
                            },
                        },
                    },
                    {
                        value: '偏移量续打',
                        label: '偏移量续打',
                        events: {
                            click: () => {
                                let options: IPrintPreview = {
                                    BodyLayoutOffset: printProxy.offset as number,
                                    CleanMode: true,
                                };
                                editor.printDocument(options);
                            },
                        },
                    },
                ],
            ],
        },
        '7': {
            加载: [
                [
                    {
                        value: '加载带有数据源信息的文档',
                        label: '加载带有数据源信息的文档',
                        events: {
                            click: () => {
                                loadDataSource(editor, TestData1);
                            },
                        },
                    },
                    {
                        value: '加载带有数据源信息的护理记录单文档',
                        label: '加载带有数据源信息的护理记录单文档',
                        events: {
                            click: () => {
                                loadDataSource(editor, TestData2);
                            },
                        },
                    },
                ],
            ],
            绑定: [
                [
                    {
                        value: '数据源绑定',
                        label: '数据源绑定',
                        events: {
                            click: () => {
                                const values = {
                                    Name: '张三',
                                    //病人id
                                    BirthPlace: '112233',
                                    sex: '女',
                                    Job: '护士',
                                    Age: '33',
                                    // 住院次数
                                    indate: '2019-3-27',
                                    //门诊号
                                    mingzu: '汉族',
                                    //一卡通号
                                    recorddate: '2019-3-28',
                                    //住院号
                                    marriage: '3333',
                                    //住院病区号（病室）
                                    patientname: '004',
                                    name: '战三国',
                                    age: '11',
                                };

                                return editor.setDocumentParameterValue('EMR_Patients', values);
                            },
                        },
                    },
                    {
                        value: '表格数据源绑定',
                        label: '表格数据源绑定',
                        events: {
                            click: () => {
                                const options = [
                                    {
                                        Data: '2022-08-21',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '张三',
                                    },
                                    {
                                        Data: '2022-08-22',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-08-23',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '王五',
                                    },
                                    {
                                        Data: '2022-08-24',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-08-25',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                    },
                                    {
                                        Data: '2022-08-26',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '王五',
                                    },
                                    {
                                        Data: '2022-08-27',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '张三',
                                    },
                                    {
                                        Data: '2022-08-28',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-08-29',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '张三',
                                    },
                                    {
                                        Data: '2022-08-30',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '王五',
                                    },
                                    {
                                        Data: '2022-08-31',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-01',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '张三',
                                    },
                                    {
                                        Data: '2022-09-02',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '王五',
                                    },
                                    {
                                        Data: '2022-09-03',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-04',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '张三',
                                    },
                                    {
                                        Data: '2022-09-05',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-06',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '王五',
                                    },
                                    {
                                        Data: '2022-09-07',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '张三',
                                    },
                                    {
                                        Data: '2022-09-08',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '张三',
                                    },
                                    {
                                        Data: '2022-09-09',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '王五',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                    {
                                        Data: '2022-09-10',
                                        Time: '09:31',
                                        Consciousness: '清醒',
                                        Temperature: '36',
                                        Pulse: '120',
                                        Breathe: '25',
                                        Blutdruck: '150/89',
                                        Saturation: '95',
                                        Oxygen: '3',
                                        DRIsName: '0.9%氯化钠注射液（软袋',
                                        DRIsMl: '100',
                                        OutputName: '尿量',
                                        OutputMl: '100',
                                        OutputColor: '黄色',
                                        Skin: '2√',
                                        LimbsLeft: '行动正常',
                                        LimbsRight: '行动正常',
                                        PupilLeft: '2/3',
                                        PupilRight: '2/3',
                                        Nursing: '通畅',
                                        Measure:
                                            '健康状况：良好。疾病史：否认冠心病史,否认高血压病史,否认糖尿病病史,否认支气管哮喘病史,否认鼻窦炎病史。...',
                                        Signature: '李四',
                                    },
                                ];
                                return editor.setDocumentParameterValue(
                                    'peopledatasource',
                                    options
                                );
                            },
                        },
                    },
                ],
            ],
            获取: [
                [
                    {
                        value: '获取数据源绑定的数据',
                        label: '获取数据源绑定的数据',
                        events: {
                            click: () => {
                                const data = editor.getDocumentParameterValue('EMR_Patients'); //T_DA_0001
                                if (data != null) {
                                    const json = JSON.stringify(data);
                                    console.log(json);
                                }
                            },
                        },
                    },
                    {
                        value: '获取表格数据源绑定的数据',
                        label: '获取表格数据源绑定的数据',
                        events: {
                            click: () => {
                                const data = editor.getDocumentParameterValue('peopledatasource'); //T_DA_0001
                                if (data != null) {
                                    const json = JSON.stringify(data);
                                    console.log(json);
                                }
                            },
                        },
                    },
                ],
            ],
            插入: [
                [
                    {
                        value: '插入小节行',
                        label: '插入小节行',
                        events: {
                            click: () => {
                                const property = editor.getElementProperties();

                                console.log(
                                    property,
                                    editor.getCurrentTable(),
                                    editor.getCurrentTableCell(),
                                    editor.getCurrentTableRow()
                                );
                                // editor.executeCommand(
                                //   EExecuteCommand.TABLE_INSERT_ROW_DOWN,
                                //   false,
                                //   null
                                // );
                                var ctl = editor.instance;
                                var cell = ctl.GetTableCell('table1', 0, 0); //先通过单元格所在的行索引列索引获取到单元格的.net对象
                                console.log(cell, 'cell');
                                ctl.FocusElement(cell); //把光标定位到单元格中
                                var newcell = ctl.DCExecuteCommand(
                                    'Table_InsertRowDown',
                                    false,
                                    null
                                );
                                //var opts = {
                                //    tableID: "3",
                                //    columnIndex: "4",
                                //    rowIndex: "1",
                                //    rowSpan: "3",
                                //};
                                //var result = ctl.DCExecuteCommand("table_mergecell", false, opts);
                                // var newcell = ctl.GetTableCell('3', 7, 0);

                                var newcellele = ctl.GetElementProperties(newcell) || {};
                                console.log(newcellele, newcell, 'newcellele');
                                newcellele.ColSpan = 22;
                                newcellele.Text =
                                    '分类小结: 2017-01-11 07:00至2017-01-12 07:00内小结总出量：2100ml,尿量2100ml';
                                //newcellele.Style.Align = "Center";
                                ctl.SetElementProperties(newcell, newcellele);
                                ctl.DCExecuteCommand('AlignMiddleCenter', false, null);
                                ctl.RefreshDocument();
                            },
                        },
                    },
                ],
            ],
        },
        '8': {
            API: [
                [
                    {
                        value: 'API调用失败',
                        label: 'API调用失败',
                        events: {
                            click: () => {
                                editor.loadDocumentFromString('');
                            },
                        },
                    },
                    {
                        value: 'API方法参数错误',
                        label: 'API方法参数错误',
                        events: {
                            click: () => {
                                editor.instance.AppendBody();
                            },
                        },
                    },
                    {
                        value: '错误信息查看',
                        label: '错误信息查看',
                        events: {
                            click: () => {
                                editor.instance.ReportExceptionDialog();
                            },
                        },
                    },
                ],
            ],
        },
        '9': {
            预览配置: [
                [
                    {
                        label: '段落标记',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ShowParagraphFlag,
                        others: InputConfig,
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ShowParagraphFlag = e;
                                editor.setDocumentOptions('ShowParagraphFlag', e);
                            },
                        },
                    },
                    {
                        label: '加密显示',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.EnableEncryptView,
                        others: InputConfig,
                        events: {
                            change: (e: boolean) => {
                                viewProxy.EnableEncryptView = e;
                                editor.setDocumentOptions('EnableEncryptView', e);
                            },
                        },
                    },
                    {
                        label: '表单按钮',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ShowFormButton,
                        others: InputConfig,
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ShowFormButton = e;
                                editor.setDocumentOptions('ShowFormButton', e);
                            },
                        },
                    },
                ],
                [
                    {
                        label: '页眉页脚下划线',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ShowHeaderBottomLine,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ShowHeaderBottomLine = e;
                                editor.setDocumentOptions('ShowHeaderBottomLine', e);
                            },
                        },
                    },
                    {
                        label: '输入域状态标记',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ShowInputFieldStateTag,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ShowInputFieldStateTag = e;
                                editor.setDocumentOptions('ShowInputFieldStateTag', e);
                            },
                        },
                    },
                    {
                        label: '单元格背景编号',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ShowBackgroundCellID,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ShowBackgroundCellID = e;
                                editor.setDocumentOptions('ShowBackgroundCellID', e);
                            },
                        },
                    },
                ],
                [
                    {
                        label: '单元格的表达式标记',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ShowExpressionFlag,
                        others: InputConfig,
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ShowExpressionFlag = e;
                                editor.setDocumentOptions('ShowExpressionFlag', e);
                            },
                        },
                    },
                    {
                        label: '页面边界线条长度：',
                        type: 'Select',
                        value: viewProxy.PageMarginLineLength,
                        others: InputConfig,
                        options: EditPageMarginLineLengthSelected,
                        events: {
                            change: (e: string) => {
                                viewProxy.PageMarginLineLength = e;
                                editor.setDocumentOptions('PageMarginLineLength', e);
                            },
                        },
                    },
                    {
                        label: '受保护的内容颜色：',
                        type: 'Auto',
                        value: viewProxy.ProtectedContentBackColor,
                        others: InputConfig,
                        options: EditProtectedContentBackColorSelected,
                        events: {
                            change: (e: string) => {
                                viewProxy.ProtectedContentBackColor = e;
                                editor.setDocumentOptions('ProtectedContentBackColor', e);
                            },
                            select: (e: { value: string | boolean }) => {
                                viewProxy.ProtectedContentBackColor = e.value;
                                editor.setDocumentOptions('ProtectedContentBackColor', e.value);
                            },
                        },
                    },
                ],
                [
                    {
                        label: '内容修改过的状态颜色：',
                        type: 'Auto',
                        value: viewProxy.TagColorForModifiedField,
                        others: InputConfig,
                        options: EditProtectedContentBackColorSelected,
                        events: {
                            change: (e: string) => {
                                viewProxy.TagColorForModifiedField = e;
                                editor.setDocumentOptions('TagColorForModifiedField', e);
                            },
                            select: (e: { value: string | boolean }) => {
                                viewProxy.TagColorForModifiedField = e.value;
                                editor.setDocumentOptions('TagColorForModifiedField', e.value);
                            },
                        },
                    },
                    {
                        label: '普通输入域的状态颜色：',
                        type: 'Auto',
                        value: viewProxy.TagColorForNormalField,
                        others: InputConfig,
                        options: EditProtectedContentBackColorSelected,
                        events: {
                            change: (e: string) => {
                                viewProxy.TagColorForNormalField = e;
                                editor.setDocumentOptions('TagColorForNormalField', e);
                            },
                            select: (e: { value: string | boolean }) => {
                                viewProxy.TagColorForNormalField = e.value;
                                editor.setDocumentOptions('TagColorForNormalField', e.value);
                            },
                        },
                    },
                    {
                        label: '只读输入域的状态颜色：',
                        type: 'Auto',
                        value: viewProxy.TagColorForReadonlyField,
                        others: InputConfig,
                        options: EditProtectedContentBackColorSelected,
                        events: {
                            change: (e: string) => {
                                viewProxy.TagColorForReadonlyField = e;
                                editor.setDocumentOptions('TagColorForReadonlyField', e);
                            },
                            select: (e: { value: string | boolean }) => {
                                viewProxy.TagColorForReadonlyField = e.value;
                                editor.setDocumentOptions('TagColorForReadonlyField', e.value);
                            },
                        },
                    },
                ],
                [
                    {
                        label: '校验失败的标记颜色：',
                        type: 'Auto',
                        value: viewProxy.TagColorForValueInvalidateField,
                        others: InputConfig,
                        options: EditProtectedContentBackColorSelected,
                        events: {
                            change: (e: string) => {
                                viewProxy.TagColorForValueInvalidateField = e;
                                editor.setDocumentOptions('TagColorForValueInvalidateField', e);
                            },
                            select: (e: { value: string | boolean }) => {
                                viewProxy.TagColorForValueInvalidateField = e.value;
                                editor.setDocumentOptions(
                                    'TagColorForValueInvalidateField',
                                    e.value
                                );
                            },
                        },
                    },
                    {
                        label: '输入域背景颜色：',
                        type: 'Auto',
                        value: viewProxy.FieldBackColor,
                        others: InputConfig,
                        options: EditProtectedContentBackColorSelected,
                        events: {
                            change: (e: string) => {
                                viewProxy.FieldBackColor = e;
                                editor.setDocumentOptions('FieldBackColor', e);
                            },
                            select: (e: { value: string | boolean }) => {
                                viewProxy.FieldBackColor = e.value;
                                editor.setDocumentOptions('FieldBackColor', e.value);
                            },
                        },
                    },
                    {
                        label: '输入域边框颜色：',
                        type: 'Auto',
                        value: viewProxy.FieldBorderColor,
                        others: InputConfig,
                        options: EditProtectedContentBackColorSelected,
                        events: {
                            change: (e: string) => {
                                viewProxy.FieldBorderColor = e;
                                editor.setDocumentOptions('FieldBorderColor', e);
                            },
                            select: (e: { value: string | boolean }) => {
                                viewProxy.FieldBorderColor = e.value;
                                editor.setDocumentOptions('FieldBorderColor', e.value);
                            },
                        },
                    },
                ],
            ],
            页眉页脚: [
                [
                    {
                        label: '页眉页脚只读',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.HeaderFooterReadonly,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.HeaderFooterReadonly = e;
                                editor.setDocumentOptions('HeaderFooterReadonly', e);
                            },
                        },
                    },
                ],
            ],
            表现配置: [
                [
                    {
                        label: '段落符号紧跟表格',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ParagraphFlagFollowTableOrSection,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ParagraphFlagFollowTableOrSection = e;
                                editor.setDocumentOptions(
                                    'ParagraphFlagFollowTableOrSection',
                                    e,
                                    'BehaviorOptions'
                                );
                            },
                        },
                    },
                    {
                        label: '鼠标三击选择段落',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ThreeClickToSelectParagraph,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ThreeClickToSelectParagraph = e;
                                editor.setDocumentOptions(
                                    'ThreeClickToSelectParagraph',
                                    e,
                                    'BehaviorOptions'
                                );
                            },
                        },
                    },
                    {
                        label: '输出格式化的XML',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.OutputFormatedXMLSource,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.OutputFormatedXMLSource = e;
                                editor.setDocumentOptions(
                                    'OutputFormatedXMLSource',
                                    e,
                                    'BehaviorOptions'
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        label: '双击选择文字',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.DoubleClickToSelectWord,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.DoubleClickToSelectWord = e;
                                editor.setDocumentOptions(
                                    'DoubleClickToSelectWord',
                                    e,
                                    'BehaviorOptions'
                                );
                            },
                        },
                    },
                    {
                        label: '只读下编辑批注',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.CommentEditableWhenReadonly,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.CommentEditableWhenReadonly = e;
                                editor.setDocumentOptions(
                                    'CommentEditableWhenReadonly',
                                    e,
                                    'BehaviorOptions'
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        label: '无法删除内容提示：',
                        type: 'Select',
                        value: viewProxy.PromptProtectedContent,
                        others: InputConfig,
                        options: EditPromptProtectedContentSelected,
                        events: {
                            change: (e: boolean) => {
                                viewProxy.PromptProtectedContent = e;
                                editor.setDocumentOptions(
                                    'PromptProtectedContent',
                                    e,
                                    'BehaviorOptions'
                                );
                            },
                        },
                    },
                    {
                        label: '显示批注：',
                        type: 'Select',
                        value: viewProxy.CommentVisibility,
                        others: InputConfig,
                        options: EditCommentVisibilitySelected,
                        events: {
                            change: (e: boolean) => {
                                viewProxy.CommentVisibility = e;
                                editor.setDocumentOptions(
                                    'CommentVisibility',
                                    e,
                                    'BehaviorOptions'
                                );
                            },
                        },
                    },
                    {
                        label: '表单模式：',
                        type: 'Select',
                        value: viewProxy.FormView,
                        others: InputConfig,
                        options: EditFormSelected,
                        events: {
                            change: (e: boolean) => {
                                viewProxy.FormView = e;
                                editor.setDocumentOptions('FormView', e, 'BehaviorOptions');
                            },
                        },
                    },
                ],
            ],
            安全配置: [
                [
                    {
                        label: '启用授权控制',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.EnablePermission,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.EnablePermission = e;
                                editor.setDocumentOptions('EnablePermission', e, 'SecurityOptions');
                            },
                        },
                    },
                    {
                        label: '执行逻辑删除',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.EnableLogicDelete,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.EnableLogicDelete = e;
                                editor.setDocumentOptions(
                                    'EnableLogicDelete',
                                    e,
                                    'SecurityOptions'
                                );
                            },
                        },
                    },
                    {
                        label: '显示授权标记',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ShowPermissionMark,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ShowPermissionMark = e;
                                editor.setDocumentOptions(
                                    'ShowPermissionMark',
                                    e,
                                    'SecurityOptions'
                                );
                            },
                        },
                    },
                ],
                [
                    {
                        label: '显示授权相关的提示信息',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ShowPermissionTip,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ShowPermissionTip = e;
                                editor.setDocumentOptions(
                                    'ShowPermissionTip',
                                    e,
                                    'SecurityOptions'
                                );
                            },
                        },
                    },
                    {
                        label: '显示逻辑删除的内容',
                        hiddenLabel: true,
                        type: 'CheckBox',
                        value: viewProxy.ShowLogicDeletedContent,
                        others: {
                            ...InputConfig,
                            style: { width: '120px' },
                        },
                        events: {
                            change: (e: boolean) => {
                                viewProxy.ShowLogicDeletedContent = e;
                                editor.setDocumentOptions(
                                    'ShowLogicDeletedContent',
                                    e,
                                    'SecurityOptions'
                                );
                            },
                        },
                    },
                ],
            ],
        },
        '10': {
            等级0的用户: setUserTrackOption(editor, user1Proxy1, 'TrackVisibleLevel0'),
            等级1的用户: setUserTrackOption(editor, user1Proxy2, 'TrackVisibleLevel1'),
            等级2的用户: setUserTrackOption(editor, user1Proxy3, 'TrackVisibleLevel2'),
        },
    };
};
