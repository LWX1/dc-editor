import { EditConfig, OperateEvent } from 'src/config';
import { ajax, changeObjectToStr, importFile } from './index';
import {
    EEditorElement,
    EEditorLayout,
    EEditorSubOperateType,
    EEditorType,
    EExecuteCommand,
    ICAS,
    IEditor,
    IFont,
    IGridLine,
    IGutter,
    IImage,
    IPageSetting,
    IParagraph,
    IPrintLocal,
    IPrintPreview,
    ISaveDocumentOptions,
    ISearchReplace,
    IUserLogin,
    IWaterMark,
    IXMLInput,
} from '../interface/editor';
import { Handle_EventShowContextMenu, Handle_EventUpdateToolarState } from './contextMenu';
import { SubInfo } from './pubSub';
import { EditorAssistData } from 'src/assets/json/editorAssist';
import { ICellGrid, ITableBorder } from 'src/interface/editorTable';
import { ISubRecord, ISubRecordString, ISubRecordXML } from 'src/interface/editorRecord';

/**** 快速输入定时器 ****/
let timerAssist: string | number | NodeJS.Timeout | null | undefined = null;

/**** window 事件 ****/
const WindowEvent = {
    /**** 焦点集中 ****/
    eventElementGotFocusCallback: 'WriterControl_EventElementGotFocus',
    /**** 失去焦点 ****/
    eventElementLostFocusCallback: 'WriterControl_EventElementLostFocus',
    /**** 鼠标点击 ****/
    eventElementMouseClickCallback: 'WriterControl_EventElementMouseClick',
    /**** 鼠标双击 ****/
    eventElementMouseDblClickCallback: 'WriterControl_EventElementMouseDblClick',
};

/**** rootElement 方法 ****/
const RootEvent: {
    [key: string]: string;
} = {
    /**** 错误事件 ****/
    exceptionEventCallback: 'EventReportException',
    /**** 文档加载完成 ****/
    /**** documentLoadCallback: "DocumentLoad", ****/
    /**** page 改变 ****/
    eventPageResizeCallback: 'EventPageResize',
    /**** resize ****/
    eventResizeCallback: 'EventResize',
    /**** EventOnError ****/
    eventOnErrorCallback: 'EventOnError',
    /**** 命令函数执行之前 返回true:阻止命令执行，fales：不阻止 （默认返回false，不阻止） ****/
    eventBeforeExecuteCommandCallback: 'EventBeforeExecuteCommand',
    /**** 保存文档格式校验的错误回调 ****/
    eventSaveDocumentToStringValidateCallback: 'EventSaveDocumentToStringValidate',
    /**** 剪切之前 ****/
    eventBeforeCutCallback: 'EventSaveDocumentToStringValidate',
    /**** 复制之前 ****/
    eventBeforeCopyCallback: 'EventBeforeCopy',
    /**** 粘贴之前 ****/
    eventBeforePasteCallback: 'EventBeforePaste',
    /**** 打印预览之前 ****/
    eventBeforePrintPreviewCallback: 'EventBeforePrintPreview ',
    /**** 打印预览之后 ****/
    eventAfterPrintPreviewCallback: 'EventAfterPrintPreview',
    /**** 打印之前 ****/
    eventBeforePrintCallback: 'EventBeforePrint',
    /**** 打印HTML 之前 ****/
    eventBeforePrintToGetHtmlCallback: 'EventBeforePrintToGetHtml',
    /**** 鼠标点击 ****/
    onDocumentClickCallback: 'ondocumentclick',
    /**** 双击鼠标 ****/
    onDocumentDBLClickCallback: 'ondocumentdblclick',
    /**** 鼠标按下 ****/
    onDocumentMousedownCallback: 'ondocumentmousedown',
    /**** 鼠标弹起 ****/
    onDocumentMouseupCallback: 'ondocumentmouseup',
    /**** 动态下拉列表 ****/
    queryListItemsCallback: 'QueryListItems',
    /**** 下拉列表搜索 ****/
    eventChangeSearchInputSpellCodeCallback: 'EventChangeSearchInputSpellCode',
    /**** 插入病例 ****/
    eventAfterInsertSubDocumentsCallback: 'EventAfterInsertSubDocuments',
};

export class CEditor {
    /**** 节点 ****/
    id: string;
    /**** 实例 ****/
    instance: HTMLElement;
    /****** window 事件 */

    /**** 控件加载完成回调 ****/
    controlOnLoadCallback?: Function;
    /**** 内容改变 ****/
    documentContentChangedCallback?: Function;
    /**** 失去焦点回调 ****/
    eventElementLostFocusCallback?: Function;
    /**** 获取焦点回调 ****/
    eventElementGotFocusCallback?: Function;
    /**** 鼠标点击 ****/
    eventElementMouseClickCallback?: Function;
    /**** 鼠标双击 ****/
    eventElementMouseDblClickCallback?: Function;

    /****** rootElement 事件 */

    /**** 文档加载完成回调 ****/
    documentLoadCallback?: Function;
    /**** 错误回调 ****/
    exceptionEventCallback?: Function;
    /**** page 回调 ****/
    eventPageResizeCallback?: Function;
    /**** resize 事件 ****/
    eventResizeCallback?: Function;
    /**** 错误事件回调 ****/
    eventOnErrorCallback?: Function;
    /**** 命令执行阻止回调 ****/
    eventBeforeExecuteCommandCallback?: Function;
    /**** 保存文档格式校验的错误回调 ****/
    eventSaveDocumentToStringValidateCallback?: Function;
    /**** 剪切之前 ****/
    eventBeforeCutCallback?: Function;
    /**** 复制之前 ****/
    eventBeforeCopyCallback?: Function;
    /**** 粘贴之前 ****/
    eventBeforePasteCallback?: Function;
    /**** 打印预览之前 ****/
    eventBeforePrintPreviewCallback?: Function;
    /**** 打印预览之后 ****/
    eventAfterPrintPreviewCallback?: Function;
    /**** 打印之前 ****/
    eventBeforePrintCallback?: Function;
    /**** 打印HTML 之前 ****/
    eventBeforePrintToGetHtmlCallback?: Function;
    /**** 点击鼠标 ****/
    onDocumentClickCallback?: Function;
    /**** 双击鼠标 ****/
    onDocumentDBLClickCallback?: Function;
    /**** 鼠标按下 ****/
    onDocumentMousedownCallback?: Function;
    /**** 鼠标弹起 ****/
    onDocumentMouseupCallback?: Function;
    /**** 动态下拉列表事件 ****/
    queryListItemsCallback?: Function;
    /**** 下拉列表搜索 ****/
    eventChangeSearchInputSpellCodeCallback?: Function;
    /**** 插入病例 ****/
    eventAfterInsertSubDocumentsCallback?: Function;

    /**** 控件是否加载过 ****/
    static isRender?: boolean = false;

    constructor(params: IEditor) {
        this.id = params.id;
        this.instance = document.getElementById(params.id) as HTMLElement;
        this.documentLoadCallback = params.documentLoadCallback;
        this.controlOnLoadCallback = params.controlOnLoadCallback;
        this.documentContentChangedCallback = params.documentContentChangedCallback;
        for (let i in params) {
            (this as any)[i] = params[i];
        }

        /**** 设置属性 ****/
        if (this.instance) {
            let obj = changeObjectToStr(EditConfig);
            for (let i in obj) {
                this.instance.setAttribute(i, obj[i]);
            }
        }

        this.init();
    }

    /**
     * 设置节点成为控件
     * @param instance
     */
    setElementToWriterControl(element: Element | HTMLElement) {
        console.log(
            'window.CreateWriterControlForWASM',
            window.CreateWriterControlForWASM,
            CEditor.isRender
        );

        if (window.CreateWriterControlForWASM && CEditor.isRender) {
            window.CreateWriterControlForWASM(element);
        }
    }

    /**** rootElement初始化 ****/
    init() {
        /**** 监听放大缩小事件 ****/
        SubInfo.subscribe('componentToEditorScale', (rate: number, id: string) => {
            if (id === this.id) {
                this.instance.SetZoomRate(rate);
            }
        });
        this.instance.DocumentLoad = (args: any) => {
            this.documentLoadCallback && this.documentLoadCallback(args);
        };
        /**** 注册所有Root事件 ****/
        for (let i in RootEvent) {
            if ((this as any)[i]) {
                this.instance[RootEvent[i]] = (...args: any) => {
                    return (this as any)[i](...args);
                };
            }
        }
        this.onWriterControlOnLoad();
    }

    /**** window 事件初始化 ****/
    onWriterControlOnLoad() {
        /**** 注册所有Window事件 ****/
        for (let i in WindowEvent) {
            if ((this as any)[i]) {
                window[RootEvent[i]] = (...args: any) => {
                    return (this as any)[i](...args);
                };
            }
        }
        /**** // 失去焦点 ****/
        /**** if (this.eventElementLostFocusCallback) { ****/
        /**** 	window.WriterControl_EventElementLostFocus = (...args: any) => { ****/
        /**** 		// console.log("eventElementLostFocusCallback", args); ****/
        /**** 		(this.eventElementLostFocusCallback as Function)(...args); ****/
        /**** 	}; ****/
        /**** } ****/
        /**** // 获取焦点 ****/
        /**** if (this.eventElementGotFocusCallback) { ****/
        /**** 	window.WriterControl_EventElementGotFocus = (...args: any) => { ****/
        /**** 		// console.log("eventElementLostFocusCallback", args); ****/
        /**** 		(this.eventElementGotFocusCallback as Function)(...args); ****/
        /**** 	}; ****/
        /**** } ****/
        const self = this;

        /**** 辅助快捷输入 ****/
        window.WriterControl_EventQueryAssistInputItems = function (
            rootElement: any,
            args: {
                Items: string[];
                PreWord: any;
                Async: boolean;
                Complete: () => void;
            }
        ) {
            /**** 添加这个是因为这个事件会触发两次，需要检查 ****/
            if (!args || typeof args != 'object' || !args.Items) {
                return;
            }
            var PreWord = args.PreWord; //获取的前面几个文字
            if (PreWord && PreWord.length > 0) {
                console.log(args.Items, args);
                /**** 异步加载数据 ****/
                args.Async = true;
                timerAssist && clearTimeout(timerAssist);
                timerAssist = setTimeout(function () {
                    /**** 赋值 ****/
                    /****  辅助录入项的过滤 ****/
                    args.Items = EditorAssistData.filter(function (item) {
                        return item && typeof item == 'string' && item.indexOf(PreWord) == 0;
                    });

                    args.Complete();
                }, 100);
            }
        };

        /**** 文档改变 撤销和重做 ****/
        window.WriterControl_DocumentContentChanged = function (rootElement: HTMLElement) {
            self.documentContentChangedCallback && self.documentContentChangedCallback(rootElement);
            const redo = self.getCommandStatus('Redo');
            const undo = self.getCommandStatus('Undo');
            /**** 发布操作 ****/
            SubInfo.publish(self.id + '_Edit', {
                redo,
                undo,
            });
        };

        window.WriterControlForWASM = function () {
            console.log('window.WriterControlForWASM');
        };

        window.DCWriter5Started = function () {
            console.log('window.DCWriter5Started');
        };

        function WriterControl_OnLoad(rootElement: HTMLElement) {
            // 控制加载则执行清除定时器
            onLoadTimer && clearTimeout(onLoadTimer);
            console.log('WriterControl_OnLoad');
            CEditor.isRender = true;
            /**** 发布字体 ****/
            SubInfo.publish(self.id + '_Font', self);
            /**** 发布配置 ****/
            SubInfo.publish('DocumentConfig', self);

            /**** 获取不支持的字体 ****/
            if (rootElement.GetNotSupportFontNames) {
                let strNotSupportFontNames = rootElement.GetNotSupportFontNames();
                if (strNotSupportFontNames != null && strNotSupportFontNames.length > 0) {
                    console.log('该文档中包含不支持的字体:' + strNotSupportFontNames);
                }
            }

            rootElement.SelectionChanged = function (eventSender: any, args: any) {
                let txt =
                    '第' +
                    (this.FocusedPageIndexBase0 + 1) +
                    '页,第' +
                    this.CurrentLineIndexInPage +
                    '行，第' +
                    this.CurrentColumnIndex +
                    '列.';
                if (this.SelectionLength != 0) {
                    txt = txt + '选择了' + Math.abs(this.SelectionLength) + '个元素';
                }
                let p = this.SelectionStartPosition;
                txt = txt + ' X:' + p.X + ' Y:' + p.Y;
                (document.getElementById('lblStatus') as HTMLElement).innerText =
                    txt + ' 当前字体:' + this.CurrentFontName + ',' + this.CurrentFontSize;

                SubInfo.publish(self.id + '_Font', self, 'FontFamily', this.CurrentFontName);
                SubInfo.publish(self.id + '_Font', self, 'FontSize', this.CurrentFontSize);
                /**** let fontfamilySelect = document.getElementById("fontfamilySelect") as HTMLElement; ****/
                /**** fontfamilySelect.value = this.CurrentFontName; ****/
                /**** let fontSizeSelect = document.getElementById("fontSizeSelect") as HTMLElement; ****/
                /**** fontSizeSelect.value = this.CurrentFontSize; ****/
            };

            /**** rootElement.EventPageResize = function (args: any) { ****/
            /**** 	console.log("EventPageResize事件", this.id); ****/
            /**** }; ****/
            /**** rootElement.EventResize = function (args: any) { ****/
            /**** 	console.log("EventResize事件", this.id); ****/
            /**** }; ****/
            /**** rootElement.EventOnError = function ( ****/
            /**** 	message: any, ****/
            /**** 	source: any, ****/
            /**** 	lineno: any, ****/
            /**** 	colno: any, ****/
            /**** 	error: any ****/
            /**** ) { ****/
            /**** 	console.log("message:", message); ****/
            /**** 	console.log("source:", source); ****/
            /**** 	console.log("lineno:", lineno); ****/
            /**** 	console.log("colno:", colno); ****/
            /**** 	console.log("error:", error); ****/
            /**** }; ****/
            /** lxy20230714 兼容四代接口EventBeforeExecuteCommand，获取命令的名称，可以阻止命令的执行
             * 执行编辑器命令
             * @param {string} CommandName 命令名称
             * @return {boolen} true:阻止命令执行，fales：不阻止 （默认返回false，不阻止）
             */
            /**** rootElement.EventBeforeExecuteCommand = function ( ****/
            /**** 	CommandName: any ****/
            /**** ) { ****/
            /**** 	// // 例： ****/
            /**** 	// if (CommandName === 'ComplexViewMode') { ****/
            /**** 	//     return true ****/
            /**** 	// } ****/
            /**** 	return false; ****/
            /**** }; ****/

            //保存文档格式校验的错误回调
            /**** rootElement.EventSaveDocumentToStringValidate = function ( ****/
            /**** 	validate: any ****/
            /**** ) { ****/
            /**** 	console.log( ****/
            /**** 		validate, ****/
            /**** 		"=============保存时SaveDocumentToString，对结果进行校验，判定是否是合法的XML和JSON，给与错误回调。" ****/
            /**** 	); ****/
            /**** }; ****/
            /**** 右键 ****/
            rootElement.EventShowContextMenu = Handle_EventShowContextMenu;
            /**** 工具的状态 ****/
            rootElement.EventUpdateToolarState = (eventSender: any, args: any) => {
                return Handle_EventUpdateToolarState(rootElement, eventSender, args);
            };
            /**** rootElement.EventCanInsertObject = function (eventSender: any, eventArgs: { Result: boolean; }) { ****/
            /****     eventArgs.Result = true; ****/
            /**** }; ****/
            //拖拽输入域功能
            rootElement.EventInsertObject = function (
                eventSender: any,
                eventArgs: {
                    GetDataPresent: (arg0: string) => any;
                    InputSource: string;
                    GetData: (arg0: string) => any;
                    Handled: boolean;
                }
            ) {
                /**** console.log(eventSender, eventArgs) ****/
                if (eventArgs.GetDataPresent('Text')) {
                    const txt = eventArgs.GetData('Text');
                    const result = JSON.parse(txt);
                    if (result.file) {
                        importFile(rootElement, undefined, (imgFile: Blob) => {
                            let reader = new FileReader();
                            reader.readAsDataURL(imgFile);
                            reader.onload = function () {
                                let base64 = reader.result;
                                let options = {
                                    Src: base64,
                                };
                                return rootElement.DCExecuteCommand(result.type, false, {
                                    ...result.data,
                                    ...options,
                                });
                            };
                        });
                    } else if (Array.isArray(result.data)) {
                        result.data.forEach((item: any) => {
                            rootElement.DCExecuteCommand(result.type, false, item);
                        });
                    } else {
                        rootElement.DCExecuteCommand(result.type, false, result.data);
                    }

                    eventArgs.Handled =
                        true; /**** 设置Handle=true,表示事件已经处理了，不需要后续的默认处理。 ****/
                }

                /**** 这个eventArgs 类型定义在WriterControl_Event.js中的InsertObjectEventArgs类中。 ****/
                /**** if ( ****/
                /**** 	eventArgs.GetDataPresent("Text") && ****/
                /**** 	eventArgs.InputSource == "DragDrop" ****/
                /**** ) { ****/
                /**** 	var txt = eventArgs.GetData("Text"); ****/
                /**** 	rootElement.DCExecuteCommand( ****/
                /**** 		"InsertInputField", ****/
                /**** 		false, ****/
                /**** 		{ ****/
                /**** 			ContentReadonly: "Inherit", ****/
                /**** 			UserEditable: true, ****/
                /**** 			ToolTip: txt, ****/
                /**** 			BackgroundText: txt, ****/
                /**** 			Text: "", ****/
                /**** 			InnerValue: null, ****/
                /**** 			ValidateStyle: null, ****/
                /**** 			EnableValueValidate: true, ****/
                /**** 			Name: "", ****/
                /**** 			ID: new Date().valueOf(), ****/
                /**** 			Alignment: "Near", ****/
                /**** 			BackgroundTextColor: null, ****/
                /**** 			TextColor: null, ****/
                /**** 			SpecifyWidth: 0, ****/
                /**** 			StartBorderText: null, ****/
                /**** 			EndBorderText: null, ****/
                /**** 			UnitText: null, ****/
                /**** 		} ****/
                /**** 	); ****/
                /**** 	eventArgs.Handled = true; //设置Handle=true,表示事件已经处理了，不需要后续的默认处理。 ****/
                /**** } ****/
            };
            /**** 动态加载数据 ****/
            /**** rootElement.QueryListItems = function ( ****/
            /**** 	ele: any, ****/
            /**** 	args: { ****/
            /**** 		Async: boolean; ****/
            /**** 		ElementID: any; ****/
            /**** 		AddResultItemByTextValue: ( ****/
            /**** 			arg0: string, ****/
            /**** 			arg1: string ****/
            /**** 		) => void; ****/
            /**** 	} ****/
            /**** ) { ****/
            //console.log(sender.__DCWriterReference.invokeMethod("GetPrintResult"));
            /**** eventObject.Async = true; ****/
            /**** window.setTimeout(function () { ****/
            /****     // 异步加载数据 ****/
            /****     console.log("QueryListItems获取的编号：" + eventObject.ElementID + "，获取的数据来源名称：" + eventObject.ListSourceName); ****/
            /****     eventObject.AddResultItemByTextValue("刘一", "liuyi"); ****/
            /****     eventObject.AddResultItemByTextValue("陈二", "chener"); ****/
            /****     eventObject.AddResultItemByTextValue("张三", "zhangsan"); ****/
            /****     eventObject.AddResultItemByTextValue("李四", "lisi"); ****/
            /****     eventObject.AddResultItemByTextValue("王五", "wangwu"); ****/
            /****     eventObject.AddResultItemByTextValue("赵六", "zhaoliu"); ****/
            /****     eventObject.AddResultItemByTextValue("孙七", "sunqi"); ****/
            /****     eventObject.AddResultItemByTextValue("周八", "zhouba"); ****/
            /****     eventObject.AddResultItemByTextValue("吴九", "wujiu"); ****/
            /****     eventObject.AddResultItemByTextValue("郑十", "zhengshi"); ****/
            /****     eventObject.Completed(); ****/
            /**** }, 100); ****/
            /**** }; ****/
            /**** 输入信息改变 ****/
            /**** rootElement.EventChangeSearchInputSpellCode = function ( ****/
            /**** 	eventSender: any, ****/
            /**** 	eventObj: any ****/
            /**** ) { ****/
            /**** 	console.log( ****/
            /**** 		"EventChangeSearchInputSpellCode获取的用户输入信息：" + ****/
            /**** 			eventObj ****/
            /**** 	); ****/
            /**** 	for (var i = 0; i < 10; i++) { ****/
            /**** 		eventObj.AddResultItemByTextValue( ****/
            /**** 			eventObj.Value + i, ****/
            /**** 			i ****/
            /**** 		); ****/
            /**** 	} ****/
            /**** 	eventObj.ChangeSpellCode(); //不使用该接口，将始终在QueryListItems已添加的数据中赛选文本；添加后将在EventChangeSearchInputSpellCode中动态添加 ****/
            /**** }; ****/

            /**** 缩放toobar ****/
            /**** var progress = document.getElementById('progress') as HTMLElement; ****/
            /**** var progress_pill = document.getElementById('progress_pill') as HTMLElement; ****/
            /**** var progress_text = document.getElementById('progress_text') as HTMLElement; ****/
            /**** var bar = progress.children[1] as HTMLElement; ****/
            /**** var moveWidth = progress.offsetWidth - bar.offsetWidth ****/
            /**** bar.onmousedown = function (event: { clientX: number; }) { ****/
            /****     var e = window.event || event ****/
            /****     var clientX = event.clientX - bar.offsetLeft ****/
            /****     console.log(progress.offsetWidth) ****/
            /****     document.body.onmousemove = function (event) { ****/
            /****         event = event || window.event; ****/
            /****         var moveX = event.clientX - clientX ****/
            /****         if (moveX <= 0) { ****/
            /****             moveX = 0 ****/
            /****         } else if (moveX >= moveWidth) { ****/
            /****             moveX = moveWidth ****/
            /****         } ****/
            /****         bar.style.left = moveX + 'px' ****/
            /****         progress_pill.style.width = moveX + 'px' ****/
            /****         progress_text.innerHTML = '当前:' + (moveX / moveWidth * 5).toFixed(1) ****/
            /****         rootElement.SetZoomRate((moveX / moveWidth * 5).toFixed(1)) ****/
            /****         return false ****/
            /****     } ****/
            /****     document.body.onmouseup = function () { ****/
            /****         document.body.onmousemove = null ****/
            /****     } ****/
            /**** } ****/
            /**** 滑轮控制缩放 ****/
            /**** document.onmousewheel = function () { ****/
            /****     SetMouseWheelScaleChange() ****/
            /**** } ****/
            /** 拦截命令 */
            rootElement.EventBeforeExecuteCommand = function (CommandName) {
                // // 例：
                // 阻止医学表达式双击弹框，并自定义自己的弹框
                if (CommandName === EExecuteCommand.ELEMENT_PROPERTIES) {
                    let element = self.getCurrentElement();
                    const result = self.getElementProperties(element);
                    SubInfo.publish(OperateEvent, EEditorSubOperateType.INPUT, result);
                    return true;
                }
                return false;
            };

            // 重写双击图片弹框
            rootElement.imgEditDialog = (options) => {
                SubInfo.publish(OperateEvent, EEditorSubOperateType.INPUT, {
                    selfImageEdit: true,
                    ...(options || {}),
                });
            };

            // 重写批注
            // const WriterControl_Dialog = window.WriterControl_Dialog.EditDocumentCommentsDialog;
            window.WriterControl_Dialog.EditDocumentCommentsDialog = (options, rootElement) => {
                SubInfo.publish(OperateEvent, EEditorSubOperateType.INPUT, {
                    selfAttr: EEditorElement.COMMENT,
                    ...(options || {}),
                });
            };
            self.controlOnLoadCallback && self.controlOnLoadCallback();
        }

        let onLoadTimer;
        /**** 控件加载完成 ****/
        window.WriterControl_OnLoad = WriterControl_OnLoad;

        onLoadTimer && clearTimeout(onLoadTimer);
        // 启动定时器，防止控制不加载，手动加载
        onLoadTimer = setTimeout(() => {
            window.location.reload();
        }, 10000);

        this.setElementToWriterControl(this.instance);
    }

    /**
     * 执行命令
     * @param instance 实例element
     * @param type 命令类型
     * @param showUI 弹框
     * @param options 配置参数
     *
     */
    executeCommand(
        type: EExecuteCommand,
        showUI: boolean = false,
        options: object | string | null = null,
        instance?: HTMLElement
    ) {
        instance = instance || this.instance;
        return instance.DCExecuteCommand(type, showUI, options);
    }

    /**
     * 刷新页面
     * @param instance Elment
     * @returns
     */
    refreshDocument(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.RefreshDocument();
    }

    /**
     * 清空内容
     * @param instance Element
     * @returns
     */
    clearContent(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.ClearContent();
    }

    /**
     * 获取状态是否可以撤销或者重做
     * @param instance Element
     * @returns ture 可以撤销，false 不可以
     */
    getCommandStatus(type: 'Redo' | 'Undo', instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetCommandStatus(type).Enabled;
    }

    /**
     * 获取缩放
     * @param instance Elment
     * @returns
     */
    getZoomRate(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetZoomRate();
    }

    /**
     * 缩放
     * @param rate 缩放数值
     * @param instance Elment
     * @returns
     */
    setZoomRate(rate: number, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetZoomRate(rate);
    }

    /**
     * 文档是否有修改没有保存
     * @param instance Element
     * @returns true 为修改还没保存，false 为保存了
     */

    getModified(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.getModified();
    }

    /**
     * 文档是否打印预览模式
     * @param instance Element
     * @returns true 是
     */
    isPrintPreview(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.IsPrintPreview();
    }

    /**
     * 获得指定ID号的文档元素对象, 查找时ID值区分大小写的
     * @param id 输入域id
     * @param instance Element
     * @returns
     */
    getElementById(id: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetElementById(id);
    }

    /**
     * 获取id 元素
     * @param id 通过id 获取实例
     * @param instance Element
     * @returns
     */
    getElementByIdExt(id: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetElementByIdExt(id);
    }

    /**
     * 获得文档中所有指定编号的元素对象列表, 查找时ID值区分大小写的
     * @param id 输入域id
     * @param instance Element
     * @returns
     */
    getElementsById(id: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetElementsById(id);
    }

    /**
     * 获得文档中指定name值的元素对象, 查找时name值区分大小写的
     * @param name 输入域name
     * @param instance Element
     * @returns
     */
    getElementsByName(name: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetElementsByName(name);
    }

    /**
     * 同类型元素的获取
     * @param id 输入域id
     * @param instance Element
     * @returns
     */
    getElementsByTypeName(tag: EEditorElement, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetElementsByTypeName(tag);
    }

    /**
     * 获取当前光标的元素
     * @param elementName 当前元素名字
     * @param instance Element
     * @returns
     */
    getCurrentElement(elementName?: EEditorElement, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.CurrentElement(elementName);
    }

    /**
     * 获取当前input Id
     * @param instance Element
     * @returns
     */
    getCurrentInputField(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.CurrentInputField();
    }

    /**
     * 获取到当前单、复选框元素
     * @param instance Eldment
     * @returns
     */
    getCurrentCheckboxOrRadio(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.CurrentCheckboxOrRadio();
    }

    /**
     * 通过输入域元素的ID（元素本身）获取到Value值
     * @param id 输入域id/输入域对象
     * @param instance Element
     * @returns
     */
    getElementInnerValueStringByID(id: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetElementInnerValueStringByID(id);
    }

    /**
     * 通过id 获取输入域的数据
     * @param id 输入框ID
     * @param specifySubDocID 病程元素ID
     * @param callback 对返回值过滤
     * @param instance Element
     * @returns
     */
    getElementTextByID(
        id: string,
        specifySubDocID?: string,
        callback?: Function,
        instance?: HTMLElement
    ) {
        instance = instance || this.instance;
        return instance.GetElementTextByID(id, specifySubDocID, callback);
    }

    /**
     * 给输入域赋值
     * @param id 输入域ID
     * @param text 赋值的数
     * @param instance Element
     * @returns
     */
    setElementTextByID(id: string, text: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetElementTextByID(id, text);
    }

    /**
     * 通过元素ID给输入域的Text和Value赋值 下拉框
     * @param id 输入域id
     * @param text 输入域显示的值
     * @param value 获取到的value值
     * @param instance Element
     * @returns
     */
    setElementInnerValueStringByID(
        id: string,
        text: string,
        value: string,
        instance?: HTMLElement
    ) {
        instance = instance || this.instance;
        return instance.SetElementInnerValueStringByID(id, text, value);
    }

    /**
     *
     * @param id 输入域id
     * @param instance Element
     * @returns
     */
    getElementInnerXmlByID(id: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetElementInnerXmlByID(id);
    }

    /**
     * 获取到文档里面所有输入域元素
     * @param excludeReadonly 是否排除只读输入域
     * @param excludeHiddenElement 是否排除隐藏输入域
     * @param specifyRootElement 指定父节点下查找所有输入域
     * @param nestNode 获取到的节点是否嵌套显示
     * @returns
     */
    getAllInputFields(
        excludeReadonly?: boolean,
        excludeHiddenElement?: boolean,
        specifyRootElement?: boolean,
        nestNode?: boolean,
        instance?: HTMLElement
    ) {
        instance = instance || this.instance;
        return instance.GetAllInputFields(
            excludeReadonly,
            excludeHiddenElement,
            specifyRootElement,
            nestNode
        );
    }

    /**
     * 通过xml数据给输入域赋值
     * @param id 元素id
     * @param options xml 配置
     * @param async 是否为异步，默认为true
     * @param instance Element
     * @returns
     */
    insertXmlById(id: string, options: IXMLInput, async: boolean = true, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.InsertXmlById(options, id, async);
    }

    /**
     * 通过元素ID勾选单复选框
     * @param id 复/单选框id
     * @param checked 是否选择
     * @param instance Element
     * @returns
     */
    setElementCheckedByID(type: 'radio' | 'checkbox', name: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetElementCheckedByID(type, name);
    }

    /**
     * 获取文档里面所有的单、复选框元素
     * @param id 单、复选框元素id
     * @param checked 为空时获取所有
     * @param instance Element
     * @returns
     */
    getAllCheckboxOrRadio(id: string, field?: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetAllCheckboxOrRadio(id, field);
    }

    /**
     * 获取当前光标的元素的属性
     * @param element 获取属性的组件
     * @param instance Element
     * @returns
     */
    getElementProperties(element?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!element) {
            let result = this.getCurrentElement();
            return instance.GetElementProperties(result);
        }
        return instance.GetElementProperties(element);
    }

    /**
     * 获取元素自定义属性
     * @param property 属性值
     * @param instance Element
     * @returns
     */
    getElementCustomAttributes(property: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetElementCustomAttributes(property);
    }

    /**
     * 设置元素自定义属性
     * @param id 元素的id
     * @param value 值
     * @param instance Element
     * @returns
     */
    setElementCustomAttributes(id: string, value: string | object, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetElementCustomAttributes(id, value);
    }

    /**
     * 修改元素属性 可以用于获取输入域元素，文本标签元素、单复选框元素属性值列表
     * @param id 输入域id
     * @param property 属性
     * @param instance Element
     * @returns
     */
    setElementProperties(property: object, id: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        /**** if (id) { ****/
        /**** 	let normalfield = this.getElementByIdExt(id); ****/
        /**** 	console.log(normalfield, 555) ****/
        /**** 	return instance.SetElementProperties(normalfield, property); ****/
        /**** } ****/
        return instance.SetElementProperties(id, property);
    }

    /**
     * 根据元素ID给指定输入域设置只读
     * @param id 输入域id
     * @param bool 是否只读
     * @param instance Elment
     * @returns
     */
    setElementContentReadonly(id: string, bool: boolean, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetElementContentReadonly(id, bool);
    }

    /**
     * 根据元素ID给指定输入域设置是否可见
     * @param id 输入域id
     * @param bool 是否可见
     * @param instance Elment
     * @returns
     */
    setElementVisibility(id: string, bool: boolean, instance?: HTMLElement) {
        instance = instance || this.instance;
        const result = instance.SetElementVisibility(id, bool);
        this.refreshDocument(instance);
        return result;
    }

    /**
     * 插入图片
     * @param imageList 图片列表
     * @param instance Element
     * @returns
     */
    insertImageByJSONText(imageList: Array<IImage>, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.InsertImageByJSONText(imageList);
    }

    /**
     * 插入电子签名（软签）
     * @param options 签名配置
     * @param callback 回调
     * @param instance Element
     * @returns
     */
    startCASignature(options: ICAS, callback: Function, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.CASignature(options, callback);
    }

    /**
     * 获取当前批注
     * @param instance Element
     * @returns
     */
    getCurrentComment(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetCurrentComment();
    }

    /**
     * 设置当前批注
     * @param options 配置
     * @param instance Element
     * @returns
     */
    setCurrentComment(options: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetCurrentComment(options);
    }

    /**
     * 获取文档当前字体
     * @param instance Element
     * @returns {
     *  Bold: 是否为粗体
     *  FontFamily: 字体名称
     *  FontSize: 字体大小
     *  Italic: 是否为斜体
     *  Strikeout: 是否有删除线
     *  Underline: 是否有下划线
     * }
     */
    getFontObject(instance?: HTMLElement): IFont {
        instance = instance || this.instance;
        return instance.getFontObject();
    }

    /**
     * 设置文档当前字体
     * @param instance Element
     * @param options {
     *  Bold: 是否为粗体
     *  FontFamily: 字体名称
     *  FontSize: 字体大小
     *  Italic: 是否为斜体
     *  Strikeout: 是否有删除线
     *  Underline: 是否有下划线
     * }
     */
    setFontObject(options?: IFont, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (options) return instance.setFontObject(options);
        return null;
    }

    /**
     * 获取页面设置
     * @param instance Element
     * @returns
     */
    getDocumentPageSettings(instance?: HTMLElement): IPageSetting {
        instance = instance || this.instance;
        return instance.GetDocumentPageSettings();
    }

    /**
     * 页面设置
     * @param options 配置
     * @param instance Element
     * @returns
     */
    setDocumentPageSettings(options: IPageSetting, instance?: HTMLElement): IPageSetting {
        instance = instance || this.instance;
        const result = instance.ChangeDocumentSettings(options);
        this.refreshDocument(instance);
        return result;
    }

    /**
     * 获取水印设置
     * @param instance Element
     * @returns
     */
    getDocumentWatermark(instance?: HTMLElement): IWaterMark {
        instance = instance || this.instance;
        return instance.GetDocumentWatermark();
    }

    /**
     * 水印设置
     * @param options 配置
     * @param instance Element
     * @returns
     */
    setDocumentWatermark(options: IWaterMark, instance?: HTMLElement) {
        instance = instance || this.instance;
        const result = instance.SetDocumentWatermark(options);
        this.refreshDocument(instance);
        return result;
    }

    /**
     * 获取关键字
     * @param instance Element
     * @returns
     */
    getExcludeKeywords(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetExcludeKeywords();
    }

    /**
     * 设置关键字
     * @param keywords 关键字，多个用逗号隔开
     * @param instance Element
     * @returns
     */
    setExcludeKeywords(keywords: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        const result = instance.SetExcludeKeywords(keywords);
        this.refreshDocument(instance);
        return result;
    }

    /**
     * 获取文档网格线
     * @param instance Elment
     * @returns
     */
    getDocumentGridLine(instance?: HTMLElement): IGridLine {
        instance = instance || this.instance;
        return instance.GetDocumentGridLine();
    }

    /**
     * 设置文档网格线
     * @param options 文档网格线的配置
     * @param instance Element
     * @returns
     */
    setDocumentGridLine(options: IGridLine, instance?: HTMLElement) {
        instance = instance || this.instance;
        const result = instance.SetDocumentGridLine(options);
        this.refreshDocument(instance);
        return result;
    }

    /**
     * 获取打印装订线
     * @param options 装订线配置
     * @param instance Element
     * @returns
     */
    getDocumentGutter(instance?: HTMLElement): IGutter {
        instance = instance || this.instance;
        return instance.GetDocumentGutter();
    }

    /**
     * 设置打印装订线
     * @param options 装订线配置
     * @param instance Element
     * @returns
     */
    setDocumentGutter(options: IGutter, instance?: HTMLElement) {
        instance = instance || this.instance;
        const result = instance.SetDocumentGutter(options);
        this.refreshDocument(instance);
        return result;
    }

    /**
     * 加载XML或Json字符串
     * @param str 字符串
     * @param type xml类型
     * @param cb 回调函数
     * @Returns true 则成功 false 不成功
     */
    loadDocumentFromString(str: string, type: EEditorType = EEditorType.XML, cb?: Function) {
        return this.instance.LoadDocumentFromString(str, type, null, function (validate: any) {
            /**** alert(validate); ****/
            cb && cb(validate);
            console.log(validate, '===================文档格式校验');
        });
    }

    /**
     * 数据源绑定
     * @param key 数据源的key
     * @param value 数据源的值
     * @param instance Elment
     * @returns
     */
    setDocumentParameterValue(key: string, value: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        instance.SetDocumentParameterValue(key, value);
        const result = instance.WriteDataFromDataSourceToDocument();
        return result;
    }

    /**
     * 获取数据源
     * @param key 数据源的key
     * @param instance Element
     * @returns
     */
    getDocumentParameterValue(key: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetDocumentParameterValue(key);
    }

    /**
     * 创建文档显示
     * @param id dom
     * @param strFileContent 文件字符串
     * @param fileFormat 文件类型
     * @returns  true 则成功 false 不成功
     */

    createWriterControlForWASM(
        id: string,
        strFileContent: string,
        fileFormat: EEditorType = EEditorType.XML,
        callback?: Function
    ) {
        const editor = new CEditor({
            id: id,

            documentLoadCallback: (args: any) => {
                console.log('documentLoadCallback', args);
                callback && callback(editor);
            },
            /**** // 控件加载完成回调 ****/
            /**** controlOnLoadCallback: (args: any) => { ****/
            /****   console.log("controlOnLoadCallback", args); ****/
            /**** }, ****/
            /**** // 错误回调 ****/
            /**** exceptionEventCallback: (args: any) => { ****/
            /****   console.log("exceptionEventCallback", args); ****/
            /**** }, ****/
            /**** // page 回调 ****/
            /**** eventPageResizeCallback: (args: any) => { ****/
            /****   console.log("eventPageResizeCallback", args); ****/
            /**** }, ****/
            /**** // resize 事件 ****/
            /**** eventResizeCallback: (args: any) => { ****/
            /****   console.log("eventResizeCallback", args); ****/
            /**** }, ****/
            /**** // 错误事件回调 ****/
            /**** eventOnErrorCallback: (args: any) => { ****/
            /****   console.log("eventOnErrorCallback", args); ****/
            /**** }, ****/
            /**** // 命令执行阻止回调 ****/
            /**** eventBeforeExecuteCommandCallback: (args: any) => { ****/
            /****   console.log("eventBeforeExecuteCommandCallback", args); ****/
            /**** }, ****/
            /**** // 保存文档格式校验的错误回调 ****/
            /**** eventSaveDocumentToStringValidateCallback: (args: any) => { ****/
            /****   console.log("eventSaveDocumentToStringValidateCallback", args); ****/
            /**** }, ****/
            /**** eventElementGotFocusCallback: (args: any) => { ****/
            /**** 	console.log("eventElementGotFocusCallback", args); ****/
            /**** }, ****/
            /**** eventElementLostFocusCallback: (args: any) => { ****/
            /**** 	console.log("eventElementLostFocusCallback", args); ****/
            /**** }, ****/
        });
        const { instance } = editor;
        /**** window.CreateWriterControlForWASM(instance); ****/
        this.setElementToWriterControl(instance);
        editor.loadDocumentFromString(strFileContent, fileFormat);
    }

    /**
     * 导入文件
     * @param id dom节点
     * @param callbackFile 参数为1、文件名回调 2、为promise 回调，返回创建id
     * @param callback 创建成功执行回调函数
     */

    importFile(id?: string, callbackFile?: Function, callback?: Function) {
        let file = document.createElement('input');
        file.setAttribute('id', 'dcInputFile');
        file.setAttribute('type', 'file');
        file.setAttribute('accept', '.xml,.json,.rtf,.html,.htm,.odt');
        file.style.display = 'none';
        /**** 添加文件 ****/
        this.instance.appendChild(file);

        const self = this;
        //file文件选中事件
        file.onchange = function () {
            let fileList = file.files as FileList;

            if (fileList.length > 0) {
                let reader = new FileReader();
                reader.readAsText(fileList[0], 'UFT-8');

                reader.onload = function (e) {
                    let target = e.target as FileReader;
                    //获取到文件内容
                    let strFileContent = target.result as string;
                    //获取文件格式
                    let fileFormat = fileList[0].name.substring(
                        fileList[0].name.lastIndexOf('.') + 1
                    ) as EEditorType;
                    let fileName = fileList[0].name.substring(0, fileList[0].name.lastIndexOf('.'));

                    /**** 创建文件 ****/
                    function createWriterControlForWASM(
                        id: string,
                        strFileContent: string,
                        fileFormat: EEditorType | undefined
                    ) {
                        self.createWriterControlForWASM(
                            id,
                            strFileContent,
                            fileFormat,
                            (editor: CEditor) => {
                                callback &&
                                    callback(editor, {
                                        fileName,
                                        fileFormat,
                                        id,
                                    });
                            }
                        );
                    }

                    /**** id 存在 ****/
                    if (id) {
                        createWriterControlForWASM(id, strFileContent, fileFormat);
                        /**** id 不存在，则需要回调文件名，创建id ****/
                    } else {
                        callbackFile &&
                            callbackFile(fileName, (id: string) => {
                                Promise.resolve().then(() => {
                                    createWriterControlForWASM(id, strFileContent, fileFormat);
                                });
                            });
                    }
                };
            }
        };

        file.click();
        //在编辑器的window重新获取焦点时,确保点击取消或X时能正确删除file
        window.addEventListener(
            'focus',
            function () {
                setTimeout(function () {
                    /**** 移除文件 ****/
                    self.instance.removeChild(file);
                }, 100);
            },
            { once: true }
        );
    }

    /**
     * 保存文件
     * @param instance HMTLElement
     * @param type 文件类型
     * @param options 文件其他配置
     * @returns true 为成功
     */

    saveDocumentToString(
        instance: HTMLElement,
        type: EEditorType = EEditorType.XML,
        options?: ISaveDocumentOptions
    ) {
        return instance.SaveDocumentToString(options || type);
    }

    /**
     * 保存文件为xml 格式
     * @param instance HMTLElement
     * @returns 返回需要保存的xml数据
     */

    saveXmlString(options?: ISaveDocumentOptions, instance?: HTMLElement) {
        instance = instance || this.instance;
        return this.saveDocumentToString(instance, EEditorType.XML, options);
    }

    /**
     * 保存文件为json 格式
     * @param instance  HMTLElement
     * @returns 返回需要保存的json数据
     */
    saveJsonString(options?: ISaveDocumentOptions, instance?: HTMLElement) {
        instance = instance || this.instance;
        return this.saveDocumentToString(instance, EEditorType.JSON, options);
    }

    /**
     * 下载word
     * @param instance HMTLElement
     * @param callback 下载后回调，false 为不成功，true为成功
     * @returns
     */

    downLoadFiledoc(callback?: Function, instance?: HTMLElement) {
        instance = instance || this.instance;
        let strServicePageUrl = instance.getAttribute('servicepageurl');
        let format = 'rtf';
        if (strServicePageUrl == null || strServicePageUrl.length == 0) {
            console.log('DCWriter:未配置ServicePageUrl,无法生成文件' + format);
            callback && callback(false);
            return;
        }
        const fileName = instance.getAttribute('id');
        let strFileName = Date.now() + '';
        let strUrl =
            strServicePageUrl +
            '?wasm=downloadfile&format=' +
            format +
            '&dcbid2022=' +
            window.DCTools20221228.GetClientID();
        if (strFileName != null && strFileName.length > 0) {
            strUrl = strUrl + '&filename=' + decodeURI(strFileName);
        }
        let postData = instance.__DCWriterReference.invokeMethod('InnerForDownloadFile');
        /**** let strDataType = "application/msword;charset=utf-8"; ****/
        strFileName = fileName + '.doc';

        ajax({
            type: 'post',
            url: strUrl,
            async: true,
            responseType: 'blob',
            header: {
                'Content-Type': undefined,
            },
            othersData: postData,
            success: (blob: any) => {
                let downloadElement = document.createElement('a');
                let href = window.URL.createObjectURL(blob); //创建下载的链接
                downloadElement.href = href;
                downloadElement.download = strFileName; /**** file.name; //下载后文件名 ****/
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
                window.URL.revokeObjectURL(href); //释放掉blob对象
                callback && callback(true);
            },
        });
    }

    /**
     * 下载文件
     * @param type 文件类型，默认为xml
     * @param callback 回调函数
     * @returns true 为成功，false为失败
     */

    downLoadFile(type: EEditorType = EEditorType.XML, callback?: Function) {
        if (type === EEditorType.DOC) {
            return this.downLoadFiledoc(callback, this.instance);
        }
        return this.instance.DownLoadFile(type);
    }

    /**
     * 保存选择的内容
     * @param instance Element
     * @param type 选择保存的类型
     * @param bool true：包含页眉页脚false：不包含页眉页脚
     * @returns
     */

    saveSelection(type: EEditorType = EEditorType.XML, bool: boolean = true) {
        const instance = this.instance;
        switch (type) {
            case EEditorType.HTML:
                return instance.SelectionHtml(bool);
            case EEditorType.XML:
                return instance.SelectionXml(bool);
            case EEditorType.TEXT:
                return instance.SelectionText(bool);
            case EEditorType.JSON:
                return instance.SelectionJson(bool);
        }
    }

    /**
     * 获取文档总页数
     * @param instance Element
     * @returns
     */
    getDocumentPageNum(instance: HTMLElement) {
        instance = instance || this.instance;
        return this.instance.GetDocumentPageNum();
    }

    /**
     * 查找
     * @param options 配置参数
     * @param instance Element
     * @returns
     */
    search(options: ISearchReplace, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.Search(options);
    }

    /**
     * 替换
     * @param options 配置参数
     * @param instance Element
     * @returns
     */
    reaplace(options: ISearchReplace, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.Reaplace(options);
    }

    /**
     * 替换所有
     * @param options 配置参数
     * @param instance Element
     * @returns
     */
    reaplaceAll(options: ISearchReplace, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.ReplaceAll(options);
    }

    /**
     * 获取段落配置
     * @param instance Element
     * @returns
     */
    getCurrentParagraphStyle(instance?: HTMLElement): IParagraph {
        instance = instance || this.instance;
        return instance.GetCurrentParagraphStyle();
    }

    /**
     * 设置段落配置
     * @param options 段落配置
     * @param instance Element
     * @returns
     */
    setCurrentParagraphStyle(options: IParagraph, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetCurrentParagraphStyle(options);
    }

    /**
     * 获取表单模式
     * @param instance Element
     * @returns
     */
    getFormView(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.FormView();
    }

    /**
     * 获取保护类型
     * @param instance Element
     * @returns
     */
    getProtectType(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.ProtectType();
    }

    /**
     * 用户登录
     * @param options 登录信息
     * @param instance Element
     * @returns
     */
    setUserLoginByUserLoginInfo(options: IUserLogin, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.UserLoginByUserLoginInfo(options, true);
    }

    /**
     * 页面布局
     * @param str 页面布局类型
     * @param instance Elment
     * @returns
     */
    setPageLayoutMode(type: EEditorLayout, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetPageLayoutMode(type);
    }

    /**
     * 关闭用户登录
     */
    closeUserLogin() {
        const myEditControl = this.instance;
        myEditControl.DocumentOptions.SecurityOptions.EnablePermission = false;
        myEditControl.DocumentOptions.SecurityOptions.EnableLogicDelete = false;
        myEditControl.DocumentOptions.SecurityOptions.ShowLogicDeletedContent = false;
        myEditControl.DocumentOptions.SecurityOptions.ShowPermissionMark = false;
        myEditControl.DocumentOptions.SecurityOptions.ShowPermissionTip = false;
        myEditControl.ApplyDocumentOptions();
    }

    /**
     * 配置文档
     * @param instance Elment
     */
    applyDocumentOptions(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.ApplyDocumentOptions();
    }

    /********************打印 *********************/

    /**
     * 打印预览
     * @param options 配置文件
     * @param instance Elment
     */
    loadPrintPreview(options?: IPrintPreview, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.LoadPrintPreview(options);
    }
    /**
     * 关闭预览
     * @param instance Elment
     */
    closePrintPreview(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.ClosePrintPreview();
    }

    /**
     * 打印文档
     * @param options 配置文件
     * @param instance Element
     */
    printDocument(options?: IPrintPreview, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.PrintDocument(options);
    }

    /**
     * 下载PDF
     * @param instance Element
     */
    downloadPrintAsPDF(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.PrintAsPDF();
    }

    /**
     * 下载html
     * @param instance Element
     * @returns
     */
    downloadPrintAsHtml(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.PrintAsHtml(null, function (result: BlobPart) {
            var blob = new Blob([result], { type: 'text/html' });
            let downloadElement = (instance as HTMLElement).ownerDocument.createElement('a');
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = 'PrintForHtml_' + new Date().valueOf() + '.html';
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
        });
    }

    /**
     * 设置本地服务器
     * @param options 配置文件
     * @param cb 回调
     * @param instance Element
     * @returns
     */
    setLocalPrintDocuments(options: IPrintLocal, cb?: Function, instance?: HTMLElement) {
        instance = instance || this.instance;
        instance.setAttribute('PrintServicePageUrl', options.PrintServicePageUrl);
        return instance.LocalPrintDocuments(options, cb);
    }

    /**
     * 设置视图的值 DocumentOptions【option】【property】 / DocumentOptions【option】【user】【property】
     * @param property 属性
     * @param value 值
     * @param option 配置
     * @param user 用户
     * @param instance Element
     */
    setDocumentOptions(
        property: string,
        value: boolean | string,
        option = 'ViewOptions',
        user?: string,
        instance?: HTMLElement
    ) {
        instance = instance || this.instance;
        if (!user) {
            instance.DocumentOptions[option][property] = value;
        } else {
            instance.DocumentOptions[option][user][property] = value;
        }

        this.applyDocumentOptions();
    }

    /************* 表格操作 *********************/

    /**
     * 插入表格
     * @param row 行
     * @param col 列
     * @returns
     */
    insertTable(row: number, col: number) {
        return this.executeCommand(EExecuteCommand.INSERT_TABLE, false, `${row},${col}`);
    }

    /**
     * 上面插入行
     * @returns
     */
    insertTableUp() {
        return this.executeCommand(EExecuteCommand.TABLE_INSERT_ROW_UP, false, null);
    }

    /**
     * 下面插入行
     * @returns
     */
    insertTableDown() {
        return this.executeCommand(EExecuteCommand.TABLE_INSERT_ROW_DOWN, false, null);
    }

    /**
     * 左边插入列
     * @returns
     */
    insertTableLeft() {
        return this.executeCommand(EExecuteCommand.TABLE_INSERT_COLUMN_LEFT, false, null);
    }

    /**
     * 右边插入列
     * @returns
     */
    insertTableRight() {
        return this.executeCommand(EExecuteCommand.TABLE_INSERT_COLUMN_RIGHT, false, null);
    }

    /**
     * 合并单元格
     * @returns
     */
    mergeCell() {
        return this.executeCommand(EExecuteCommand.TABLE_MERGE_CELL, false, null);
    }

    /**
     * 拆分单元格
     * @param row 行
     * @param col 列
     * @returns
     */
    splitCell(row: number, col: number) {
        return this.executeCommand(EExecuteCommand.TABLE_SPLIT_CELL_EXT, false, `${row},${col}`);
    }

    /**
     * 设置背景编号的显示隐藏
     * @returns
     */
    setBackgroundCell() {
        return this.executeCommand(EExecuteCommand.SHOW_BACKGROUND_CELL_ID, false, null);
    }

    /**
     * 设置对齐方式
     * @param type 对齐方式
     * @returns
     */
    setTableAlign(
        type:
            | EExecuteCommand.ALIGN_TOP_CENTER
            | EExecuteCommand.ALIGN_TOP_LEFT
            | EExecuteCommand.ALIGN_TOP_RIGHT
            | EExecuteCommand.ALIGN_BOTTOM_CENTER
            | EExecuteCommand.ALIGN_BOTTOM_LEFT
            | EExecuteCommand.ALIGN_BOTTOM_RIGHT
            | EExecuteCommand.ALIGN_MIDDLE_CENTER
            | EExecuteCommand.ALIGN_MIDDLE_LEFT
            | EExecuteCommand.ALIGN_MIDDLE_RIGHT
    ) {
        return this.executeCommand(type, false, null);
    }

    /**
     * 内边距
     * @param left 左边
     * @param top 上面
     * @param right 右边
     * @param bottom 下面
     * @returns
     */
    setCellPadding(left: number, top?: number, right?: number, bottom?: number) {
        if (top === undefined) {
            top = right = bottom = left;
        } else if (right === undefined) {
            right = left;
            bottom = top;
        } else if (bottom === undefined) {
            bottom = top;
        }
        return this.executeCommand(
            EExecuteCommand.PADDING,
            false,
            `${left},${top},${right},${bottom}`
        );
    }

    /**
     * 获取单元格网格线
     * @param cell 单元格
     * @param instance Element
     * @returns
     */
    getTableCellGridLineInfo(cell?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!cell) {
            cell = this.getCurrentTableCell();
        }
        return instance.GetTableCellGridLineInfo(cell);
    }

    /**
     * 设置单元格网格线
     * @param options 配置
     * @param cell 单元格
     * @param instance Element
     * @returns
     */
    setTableCellGridLineInfo(options: ICellGrid, cell?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!cell) {
            cell = this.getCurrentTableCell();
        }
        return instance.SetTableCellGridLineInfo(cell, options);
    }

    /**
     * 获取单元格斜分线
     * @param cell 单元格
     * @returns
     */
    getTableCellSlantSplitLineStyle(cell?: any) {
        if (!cell) {
            cell = this.getCurrentTableCell();
        }
        if (!cell) return null;
        const options = this.getElementProperties(cell);
        let { SlantSplitLineStyle } = options;
        return SlantSplitLineStyle;
    }

    /**
     * 设置单元格斜分线
     * @param cell 单元格
     * @returns
     */
    setTableCellSlantSplitLineStyle(SlantSplitLineStyle: String, cell?: any) {
        if (!cell) {
            cell = this.getCurrentTableCell();
        }
        if (!cell) return null;
        const options = this.getElementProperties(cell);
        this.setElementProperties(cell, { ...options, SlantSplitLineStyle });
        return;
    }

    /**
     * 删除当前焦点的表格
     * @returns
     */
    deleteTable() {
        return this.executeCommand(EExecuteCommand.TABLE_DELETE_TABLE, false, null);
    }

    /**
     * 删除当前表格的行
     * @returns
     */
    deleteTableRow() {
        return this.executeCommand(EExecuteCommand.TABLE_DELETE_ROW, false, null);
    }

    /**
     * 删除当前的列
     * @returns
     */
    deleteTableCol() {
        return this.executeCommand(EExecuteCommand.TABLE_DELETE_COLUMN, false, null);
    }

    /**
     * 当前焦点所在的表格对象
     * @param instance Element
     * @returns
     */
    getCurrentTable(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.CurrentTable();
    }

    /**
     * 当前焦点所在的表格行对象
     * @param instance Element
     * @returns
     */
    getCurrentTableRow(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.CurrentTableRow();
    }

    /**
     * 当前焦点所在的表格单元格对象
     * @param instance Element
     * @returns
     */
    getCurrentTableCell(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.CurrentTableCell();
    }

    /**
     * 设置表格样式
     * @param options 配置
     * @param table 配置的table
     * @param instance Element
     * @returns
     */
    setTableBorder(options: ITableBorder, table?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!table) {
            table = this.getCurrentTable();
        }
        return instance.SetTableBorder(table, options);
    }

    /**
     * 设置单元格样式
     * @param options 配置
     * @param table 配置的table
     * @param instance Element
     * @returns
     */
    setTableCellBorder(options: ITableBorder, table?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!table) {
            table = this.getCurrentTable();
        }
        return instance.SetTableCellBorder(table, options);
    }

    /**
     * 表格前插入段落
     */
    insertparagraphbeforetable() {
        this.executeCommand(EExecuteCommand.INSERT_PARAGRAPH_BEFORE_TABLE, false, null);
        this.refreshDocument();
    }

    /**
     * 获取表格自定义属性
     * @param table 表格，不传默认是当前
     * @param instance Element
     * @returns
     */
    getTableAttribute(table?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!table) {
            table = this.getCurrentTable();
        }
        return this.instance.GetTableAttribute(table);
    }

    /**
     * 设置表格自定义属性
     * @param options 自定义属性
     * @param table 表格
     * @param instance ELement
     * @returns
     */
    setTableAttribute(options: any, table?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!table) {
            table = this.getCurrentTable();
        }
        return this.instance.SetTableAttribute(table, options);
    }

    /**
     * 获取表格行自定义属性
     * @param row 表格行
     * @param instance Element
     * @returns
     */
    getTableRowAttribute(row?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!row) {
            row = this.getCurrentTableRow();
        }
        return this.instance.GetTableRowAttribute(row);
    }

    /**
     * 设置表格行自定义属性
     * @param options 自定义属性
     * @param row 表格行
     * @param instance Element
     * @returns
     */
    setTableRowAttribute(options: any, row?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!row) {
            row = this.getCurrentTableRow();
        }
        return this.instance.SetTableRowAttribute(row, options);
    }

    /**
     * 获取单元格自定义属性
     * @param cell 单元格
     * @param instance Element
     * @returns
     */
    getTableCellAttribute(cell?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!cell) {
            cell = this.getCurrentTableCell();
        }
        return this.instance.GetTableCellAttribute(cell);
    }

    /**
     * 获取单元格自定义属性
     * @param options 自定义属性
     * @param cell 单元格
     * @param instance Element
     * @returns
     */
    setTableCellAttribute(options: any, cell?: any, instance?: HTMLElement) {
        instance = instance || this.instance;
        if (!cell) {
            cell = this.getCurrentTableCell();
        }
        return this.instance.SetTableCellAttribute(cell, options);
    }

    /************* 病程记录 ********/

    /**
     * 获取文档所有病程记录数据
     * @param type 控件类型，不传则全部
     * @param instance Element
     * @returns
     */
    getCourseRecords(type?: EEditorElement, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetCourseRecords(type);
    }

    /**
     * 获取文档被修改的记录
     * @param type 控件类型，不传则全部
     * @param instance Element
     * @returns
     */
    getModifiedElements(type?: EEditorElement, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.getModifiedElements(type);
    }

    /**
     * 插入病程
     * @param options 插入配置
     * @param instance Element
     */
    insertSubDocuments(options: ISubRecord, instance?: HTMLElement) {
        instance = instance || this.instance;
        let result = instance.InsertSubDocuments(options);
        if (result) {
            this.refreshDocument();
        }
    }

    /**
     * 追加病程
     * @param options 配置
     * @param instance Element
     */
    appendSubDocuments(options: ISubRecord, instance?: HTMLElement) {
        instance = instance || this.instance;
        let result = instance.AppendSubDocuments(options);
        if (result) {
            this.refreshDocument();
        }
    }

    /**
     * 追加单个病程
     * @param options 配置
     * @param instance
     */
    appendLoadSubDocumentFromString(options: ISubRecordXML, instance?: HTMLElement) {
        instance = instance || this.instance;
        let result = instance.LoadSubDocumentFromString(options);
        if (result) {
            this.refreshDocument();
        }
    }

    /**
     * 单个base64
     * @param fileFormat 字符串格式
     * @param id 病程ID
     * @param instance Element
     * @returns
     */
    saveSubDocumentToBase64String(
        /**** 字符串格式 ****/
        fileFormat: string,
        /**** 病程ID ****/
        id: string,
        instance?: HTMLElement
    ) {
        instance = instance || this.instance;
        return instance.SaveSubDocumentToBase64String(fileFormat, id);
    }

    /**
   * 单个保存成字符串
   * @param options 配置
   * @param instance Element
   * @returns 
   * 
   * {
		FileFormat: 'xml',
		SubDocID: 'subdoc2',
		Usebase64: 'false',
		CommitUserTrace: 'true',
		OutputFormatXML: 'false',
		SaveHeaderFooter: 'true'
	};
   */
    saveSubDocumentToString(options: ISubRecordString, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SaveSubDocumentToString(options);
    }

    /**
     * 获取所有病程编号
     * @param instance Element
     * @returns
     */
    getAllSubDocuments(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.GetAllSubDocuments();
    }

    /**
     * 当前病程编号
     * @param instance Element
     * @returns
     */
    getCurrentSubDoc(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.CurrentSubDoc();
    }

    /**
     * 根据ID定位病程
     * @param id 病程ID
     * @param instance Element
     * @returns
     */
    getSelectSubDocumentByID(id: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SelectSubDocumentByID(id);
    }

    /**
     * 根据序号定位病程
     * @param id 病程序号
     * @param instance Element
     * @returns
     */
    getSelectSubDocument(id: number, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SelectSubDocument(id);
    }

    /**
     * 病程下移
     * @param id 病程ID
     * @param instance Element
     * @returns
     */
    setSubDocumentDown(id: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetSubDocumentDown(id);
    }

    /**
     * 病程上移
     * @param id 病程ID
     * @param instance Element
     * @returns
     */
    setSubDocumentUp(id: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetSubDocumentUp(id);
    }

    /**
     * 设置病程只读
     * @param bool 是否只读
     * @param color 颜色
     * @param instance
     * @returns
     */
    setCurrentSubDocumentReadOnly(bool: boolean, color: string | null, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SetCurrentSubDocumentReadOnly(bool, color);
    }

    /**
     * 病程是否跨页
     * @param id 病程ID
     * @param bool 是否跨页
     * @param instance Element
     * @returns
     */
    setSubDocCrossPage(id: string, bool: boolean, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.SubDocCrossPage(id, bool);
    }

    /**
     * 删除当前病程
     * @param instance Element
     * @returns
     */
    deleteCurrentSubDoc(instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.DeleteCurrentSubDoc();
    }

    /**
     * 删除指定病程
     * @param id 病程id，不存在则删除当前
     * @param instance Element
     * @returns
     */
    deleteSubDoc(id: string, instance?: HTMLElement) {
        instance = instance || this.instance;
        return instance.DeleteSubDoc(id);
    }
}
