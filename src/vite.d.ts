export {};

declare global {
    const ElMessage: (typeof import('element-plus'))['ElMessage'];
    const ElMessageBox: (typeof import('element-plus'))['ElMessageBox'];
    const ElLoading: (typeof import('element-plus'))['ElLoading'];
    interface Window {
        [key: string]: any;
        CreateWriterControlForWASM: Function;
        WriterControl_OnLoad: Function;
        WriterControl_DocumentContentChanged: Function;
        DCTools20221228: {
            GetClientID: Function;
        };
        WriterControl_EventElementLostFocus: Function;
        WriterControl_EventElementGotFocus: Function;
        WriterControl_DocumentContentChanged: Function;
        WriterControl_EventElementMouseClick: Function;
        WriterControl_EventElementMouseDblClick: Function;
    }
    interface HTMLElement {
        [key: string]: any;
        DocumentLoad: Function;
        LoadDocumentFromString: Function;
        SaveDocumentToString: Function;
        DownLoadFile: Function;
        __DCWriterReference: {
            invokeMethod: Function;
        };
        SelectionHtml: Function;
        SelectionText: Function;
        SelectionXml: Function;
        SelectionJson: Function;
        getModified: Function;
        getFontObject: Function;
        setFontObject: Function;
        DCExecuteCommand: Function;
        IsPrintPreview: Function;
        GetElementTextByID: Function;
        SetElementTextByID: Function;
        SetElementInnerValueStringByID: Function;
        InsertXmlById: Function;
        GetElementInnerXmlByID: Function;
        GetElementProperties: Function;
        SetElementProperties: Function;
        CurrentInputField: Function;
        GetElementById: Function;
        GetElementInnerValueStringByID: Function;
        GetElementByIdExt: Function;
        SetElementContentReadonly: Function;
        SetElementVisibility: Function;
        RefreshDocument: Function;
        CurrentCheckboxOrRadio: Function;
        SetElementCheckedByID: Function;
        GetAllCheckboxOrRadio: Function;
        GetDocumentPageNum: Function;
        InsertImageByJSONText: Function;
        CASignature: Function;
        GetCurrentComment: Function;
        GetElementsByTypeName: Function;
        GetAllInputFields: Function;
        CurrentElement: Function;
        GetElementCustomAttributes: Function;
        SetElementCustomAttributes: Function;
        GetNotSupportFontNames: Function;
        SelectionChanged: Function;
        FocusedPageIndexBase0: number;
        CurrentLineIndexInPage: number;
        CurrentColumnIndex: number;
        SelectionLength: number;
        SelectionStartPosition: {
            X: number;
            Y: number;
        };
        CurrentFontName: string;
        CurrentFontSize: number;
        value: string | number;
        EventReportException: Function;
        EventPageResize: Function;
        EventResize: Function;
        EventOnError: Function;
        EventBeforeExecuteCommand: Function;
        EventSaveDocumentToStringValidate: Function;
        EventShowContextMenu: Function;
        EventUpdateToolarState: Function;
        GetCommandStatus: Function;
        disabled: boolean;
        EventInsertObject: Function;
        QueryListItems: Function;
        EventChangeSearchInputSpellCode: Function;
        SetZoomRate: Function;
        GetZoomRate: Function;
        EventBeforeCut: Function;
        EventBeforeCopy: Function;
        EventBeforePaste: Function;
        EventBeforePrintPreview: Function;
        EventAfterPrintPreview: Function;
        EventBeforePrint: Function;
        eventBeforePrintToGetHtmlCallback: Function;
        ondocumentclick: Function;
        ondocumentdblclick: Function;
        QueryListItems: Function;
        DocumentSettingsDialog: Function;
        GetDocumentPageSettings: Function;
        ChangeDocumentSettings: Function;
        GetDocumentWatermark: Function;
        SetDocumentWatermark: Function;
        GetExcludeKeywords: Function;
        SetExcludeKeywords: Function;
        GetDocumentGutter: Function;
        SetDocumentGutter: Function;
        Search: Function;
        ReplaceAll: Function;
        Replace: Function;
        GetCurrentParagraphStyle: Function;
        SetCurrentParagraphStyle: Function;
        FormView: Function;
        ProtectType: Function;
        UserLoginByUserLoginInfo: Function;
        ApplyDocumentOptions: Function;
        CurrentInputField: Function;
        SetDocumentParameterValue: Function;
        WriteDataFromDataSourceToDocument: Function;
        // 表格
        cellGridlineDialog: Function;
        cellDiagonalLineDialog: Function;
        bordersShadingDialog: Function;
        borderShadingcellDialog: Function;
        AutoFixTableWidth: Function;

        // 打印
        LoadPrintPreview: Function;
        ClosePrintPreview: Function;
        PrintDocument: Function;
        PrintAsPDF: Function;
        PrintAsHtml: Function;
        LocalPrintDocuments: Function;
    }
    interface Element extends HTMLElement {}
    interface document {
        WriterControl;
    }
}
