import { ISubRecord, ISubRecordString, ISubRecordXML } from 'src/interface/editorRecord';
import { CEditor } from './editor';
import { EEditorElement, EEditorType } from 'src/interface/editor';

/***
 * 病程
 */
export class CSubDocument {
    editor: CEditor;
    constructor(editor: CEditor) {
        this.editor = editor;
    }

    /**
     * 病程下移
     */
    setSubDocumentDown() {
        let id = this.editor.getCurrentSubDoc();
        return this.editor.setSubDocumentDown(id);
    }
    /**
     * 病程上移
     */
    setSubDocumentUp() {
        let id = this.editor.getCurrentSubDoc();
        return this.editor.setSubDocumentUp(id);
    }
    /**
     * 加载XML 病程
     * @param  str 病程的字符串
     * @param type 加载类型
     */
    loadsubMainXml(str: string, type: EEditorType = EEditorType.XML) {
        this.editor.loadDocumentFromString(str, type);
    }

    /**
     * 插入病程
     * @param options 插入配置
     */
    insertSubDocuments(options: ISubRecord) {
        return this.editor.insertSubDocuments(options);
    }

    /**
     * 追加病程
     * @param options 配置
     */
    appendSubDocuments(options: ISubRecord) {
        return this.editor.appendSubDocuments(options);
    }

    /**
     * 追加病程
     * @param options 追加配置
     */
    appendSubs(option: ISubRecord) {
        this.appendSubDocuments(option);
    }
    /**
     * 追加病程
     * @param option 病程配置
     */
    addSub(option: ISubRecord) {
        this.appendSubDocuments(option);
    }

    /**
     * 插入病程
     * @param option 病程配置
     */
    insertSub(option: ISubRecord) {
        this.editor.insertSubDocuments(option);
    }
    /**
     * 获取病程记录
     * @returns
     */
    getCourseRecords() {
        return this.editor.getCourseRecords();
    }
    /**
     * 根据病程id定位病程
     */
    getSelectSubDocumentByID(id: string) {
        return this.editor.getSelectSubDocumentByID(id);
    }
    /**
     * 根据编号定位病程
     */
    getSelectSubDocument(index: number) {
        return this.editor.getSelectSubDocument(index);
    }
    /**
     * 删除病程id指定病程
     */
    deleteSubDoc(id: string) {
        return this.editor.deleteSubDoc(id);
    }
    /**
     * 删除当前病程
     * @returns
     */
    deleteCurrentSubDoc() {
        return this.editor.deleteCurrentSubDoc();
    }
    /**
     * 当前病程编号
     * @returns
     */
    getCurrentSubDoc() {
        return this.editor.getCurrentSubDoc();
    }
    /**
     * 设置病程是否只读
     * @param isReadOnly
     */
    setCurrentSubDocumentReadOnly(isReadOnly: boolean, color: string | null = '#FFFFCD') {
        this.editor.setCurrentSubDocumentReadOnly(isReadOnly, color);
    }
    /**
     * 设置病程是否跨页
     * @param bool
     */
    setSubDocCrossPage(bool: boolean) {
        let id = this.getCurrentSubDoc();
        return this.editor.setSubDocCrossPage(id, bool);
    }

    /**
     * 根据字符串加载病程
     * @param options 配置文件
     */
    appendLoadSubDocumentFromString(options: ISubRecordXML) {
        return this.editor.appendLoadSubDocumentFromString(options);
    }

    /**
     * 单个base64
     * @param fileFormat 字符串格式
     * @param id 病程ID
     * @returns
     */
    saveSubDocumentToBase64String(
        fileFormat: string,
        // 病程ID
        id: string,
    ) {
        return this.editor.saveSubDocumentToBase64String(fileFormat, id);
    }

    /**
   * 单个保存成字符串
   * @param options 配置
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
    saveSubDocumentToString(options: ISubRecordString) {
        return this.editor.saveSubDocumentToString(options);
    }

    /**
     * 获取文档被修改的记录
     * @param type 控件类型，不传则全部
     * @returns
     */
    getModifiedElements(type?: EEditorElement) {
        return this.editor.getModifiedElements(type);
    }
}
