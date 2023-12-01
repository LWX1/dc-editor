import { EEditorType } from './editor';

interface ISubOptions {
    /****  自定义属性 ****/
    Attributes?: string;
    /****  是否在新的一页插入病程 ****/
    NewPage?: boolean;

    /****  病程是否只读 ****/
    ReadOnly?: boolean;
    /****  标题文本 ****/
    Title?: string;
    /****  病程ID ****/
    ID?: string;
    /****  提示文本 ****/
    ToolTip?: string;
    /****  自定义CSS样式 ****/
    CSSStyle?: string;
    /****  导航级别 ****/
    TitleLevel?: string;
    /****  绑定的数据格式 ****/
    Parameters?: string;
    /****  在病程中有数据源绑定时，把数据源信息填充到文档中 ****/
    DataBindingXML?: string;
    /****  当前端设置保存病程页眉页脚的时候，将页眉页脚字符串存在病程的自定义属性内 ****/
    LoadOriginHeaderFooter?: string;
}

export interface ISubRecord {
    /****  病程记录文档数组 ****/
    Files?: Array<string>;
    /****  设置添加病程的参数 ****/
    Options?: Array<ISubOptions>;
    /****  加载的文档是否是base64格式 ****/
    Usebase64?: boolean;
    /****  加载时显示等待提示窗口 ****/
    ShowMaskUI?: boolean;
}

export interface ISubRecordXML {
    /****  病程ID ****/
    ID: string;
    /****  病程的XML内容 ****/
    FileContentXML: string;
    /****  加载的文档是否是base64格式 ****/
    Usebase64?: boolean;
    /****  加载时显示等待提示窗口 ****/
    ShowMaskUI?: boolean;
}

export interface ISubRecordString {
    /****  是否保存回BASE64字符串 ****/
    UseBase64?: boolean;
    /****  病程ID多个病程的id写法 "SubDocIDs": "[" + subid1 +","+ subid2+ "]" ****/
    SubDocID?: string;
    /****  文档格式，使用默认值XML ****/
    FileFormat?: EEditorType;
    /****  是否提交所有文档痕迹后的内容，提交后文档中将不包含痕迹信息。 ****/
    CommitUserTrace?: boolean;
    /****  是否输出带格式的XML ****/
    OutputFormatXML?: boolean;
    /****  病程内容是否启用授权控制，使用默认值false ****/
    LogUserEditTrack?: boolean;
    /****  使用当前病程文档的主文档的页眉页脚 ****/
    SaveHeaderFooter?: string;
    /****  使用当前病程文档的页眉页脚 ****/
    SaveOriginHeaderFooter?: string;
}
