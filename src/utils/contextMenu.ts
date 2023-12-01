import { EEditorSubOperateType } from 'src/interface/editor';
import { SubInfo } from './pubSub';
import { OperateEvent } from 'src/config';

/**
 * 处理编辑器控件的显示快捷菜单事件
 */
export function Handle_EventShowContextMenu(
    eventSender: HTMLElement,
    // eventSender: {
    // 	DCExecuteCommand: (arg0: string, arg1: boolean, arg2: null) => void;
    // 	CurrentTableCell: () => any;
    // 	cellGridlineDialog: (
    // 		arg0: {
    // 			AlignToGridLine: string; //文本行对齐到网格线
    // 			ColorValue: string; //网格线颜色
    // 			GridSpanInCM: number; //网格线之间的宽度
    // 			LineStyle: string; //网格线样式
    // 			LineWidth: number; //网格线宽度
    // 			Printable: string; //打印预览是否显示
    // 			Visible: string;
    // 		},
    // 		arg1: any
    // 	) => void;
    // 	cellDiagonalLineDialog: (arg0: any, arg1: any) => void;
    // 	bordersShadingDialog: () => void;
    // 	borderShadingcellDialog: () => void;
    // },
    args: { ElementType: any },
) {
    //console.log(eventSender);

    //let eventSender = GetCurrentWriterControl();

    //console.log("为 " + args.ElementType + "显示快捷菜单");
    //console.log(args);
    var typename = args.ElementType;
    if (typename != null && typename != '') {
        typename = typename.toLowerCase();
        var options = [
            {
                label: '撤销',
                exec: () => {
                    console.log('撤销');
                    eventSender.DCExecuteCommand('Undo', false, null);
                },
            },
            {
                label: '重做',
                exec: () => {
                    console.log('重做');
                    eventSender.DCExecuteCommand('Redo', false, null);
                },
            },
            '-',
            {
                label: '复制(Ctrl+C)',
                exec: () => {
                    console.log('复制(Ctrl+C)');
                    eventSender.DCExecuteCommand('Copy', false, null);
                },
            },
            {
                label: '粘贴(Ctrl+V)',
                exec: () => {
                    eventSender.DCExecuteCommand('Paste', false, null);
                },
            },
            {
                label: '剪切(Ctrl+X)',
                exec: () => {
                    eventSender.DCExecuteCommand('Cut', false, null);
                },
            },
            {
                label: '纯文本复制',
                exec: () => {
                    eventSender.DCExecuteCommand('CopyAsText', false, null);
                },
            },
            {
                label: '纯文本粘贴',
                exec: () => {
                    console.log('纯文本粘贴');
                    eventSender.DCExecuteCommand('PasteAsText', false, null);
                },
            },
            '-',
            {
                label: '属性',
                exec: () => {
                    let element = eventSender.CurrentElement();
                    const result = eventSender.GetElementProperties(element);
                    SubInfo.publish(OperateEvent, EEditorSubOperateType.INPUT, result);
                    // console.log(result)
                    // return result
                    // eventSender.DCExecuteCommand('ElementProperties', true, null);
                },
            },
        ];
        if (typename == 'xtexttablecellelement') {
            //单元格
            var options2 = [
                '-',
                {
                    label: '表格属性',
                    exec: () => {
                        eventSender.DCExecuteCommand('tableproperties', true, null);
                    },
                },
                {
                    label: '表格行属性',
                    exec: () => {
                        eventSender.DCExecuteCommand('tablerowproperties', true, null);
                    },
                },
                {
                    label: '单元格属性',
                    exec: () => {
                        eventSender.DCExecuteCommand('tablecellproperties', true, null);
                    },
                },
                '-',
                {
                    label: '表格行列',
                    exec: () => {},

                    subMenu: [
                        {
                            label: '删除表格行',
                            exec: () => {
                                eventSender.DCExecuteCommand('Table_DeleteRow', false, null);
                            },
                        },
                        {
                            label: '删除表格列',
                            exec: () => {
                                eventSender.DCExecuteCommand('Table_DeleteColumn', false, null);
                            },
                        },
                        {
                            label: '在上面插入行',
                            exec: () => {
                                eventSender.DCExecuteCommand('Table_InsertRowUp', false, null);
                            },
                        },
                        {
                            label: '在下面插入行',
                            exec: () => {
                                eventSender.DCExecuteCommand('Table_InsertRowDown', false, null);
                            },
                        },
                        {
                            label: '在左侧插入列',
                            exec: () => {
                                eventSender.DCExecuteCommand('Table_InsertColumnLeft', false, null);
                            },
                        },
                        {
                            label: '在右侧插入列',
                            exec: () => {
                                eventSender.DCExecuteCommand(
                                    'Table_InsertColumnRight',
                                    false,
                                    null,
                                );
                            },
                        },
                    ],
                },

                '-',
                {
                    label: '合并单元格',
                    exec: () => {
                        eventSender.DCExecuteCommand('Table_MergeCell', false, null);
                    },
                },
                {
                    label: '拆分单元格',
                    exec: () => {
                        eventSender.DCExecuteCommand('Table_SplitCellExt', true, null);
                    },
                },
                '-',
                {
                    label: '设置单元格网格线',
                    exec: () => {
                        console.log('设置单元格网格线');
                        var cell = eventSender.CurrentTableCell();
                        if (cell != null) {
                            var settings = {
                                AlignToGridLine: 'True', //文本行对齐到网格线
                                ColorValue: '#000000', //网格线颜色
                                GridSpanInCM: 1, //网格线之间的宽度
                                LineStyle: 'Solid', //网格线样式
                                LineWidth: 1, //网格线宽度
                                Printable: 'True', //打印预览是否显示
                                Visible: 'True', //网格是否显示
                            };
                            eventSender.cellGridlineDialog(settings, eventSender);
                        }
                    },
                },
                {
                    label: '设置单元格斜分线',
                    exec: () => {
                        console.log('设置单元格斜分线');
                        var cell = eventSender.CurrentTableCell();
                        if (cell != null) {
                            eventSender.cellDiagonalLineDialog(cell, eventSender);
                        }
                    },
                },
                {
                    label: '设置表格边框',
                    exec: () => {
                        eventSender.bordersShadingDialog();
                    },
                },
                {
                    label: '设置单元格边框',
                    exec: () => {
                        eventSender.borderShadingcellDialog();
                    },
                },
            ];

            options = options.concat(options2);
        } else {
        }
        ContextMenu(options, args, eventSender);
    }

    //return { eventSender,orgs }
}

/**
     * 开启右键菜单
     * @param {Array} options 右键菜单的所有配置
     * [
     *  {
     *  label: '全选',        //名称 
        icon: 'selectall',    //图标
        exec: () => {         //回调函数
            ctl.DCDCExecuteCommand('selectall', true, null)
        },
     *  }
     * ] 
     * @returns
     */
function ContextMenu(
    options: string | any[] | null,
    menuObj: { ElementType?: any; PageElement?: any; X?: any; Y?: any },
    rootElement: HTMLElement,
) {
    if (options != null && Array.isArray(options)) {
        if (menuObj) {
            //获取到包裹元素
            var pageContainer = rootElement.querySelector('[dctype=page-container]');
            //判断是否为打印预览
            if (rootElement.IsPrintPreview()) {
                pageContainer = rootElement.querySelector('[dctype=page-printpreview]');
            }
            if (!pageContainer) {
                return;
            }
            //判断是否存在dcContextMenu的元素
            var hasContextMenu = pageContainer.querySelector('#dcContextMenu');
            if (!hasContextMenu) {
                var meunDiv = document.createElement('div');
                meunDiv.setAttribute('id', 'dcContextMenu');
                pageContainer.appendChild(meunDiv);
                meunDiv.innerHTML = `<div class="dcMenu-line"></div>`;
                hasContextMenu = meunDiv;
                //判断是否有css
                var dcHead = document.head;
                //判断是否存在对应的css
                var hasContextMenuCss = dcHead.querySelector('#ContextMenuCss');
                if (!hasContextMenuCss) {
                    var newCssString = `
                            #dcContextMenu{
                                position: absolute;
                                margin: 0;
                                padding: 2px;
                                border-width: 1px;
                                border-style: solid;
                                background-color: #fafafa;
                                border-color: #ddd;
                                color: #444;
                                box-shadow: rgb(204, 204, 204) 2px 2px 3px;
                                min-width: 144px;
                                /* left: 8px;
                                top: 481.672px; 
                                overflow: hidden;*/
                                z-index: 110008;
                                display: none;
                            }
                            #dcContextMenu div.dcMenu-item:hover{
                                color: rgb(0, 0, 0);
                                border-color: rgb(183,210,255);
                                background: rgb(234,242,255);
                            }
                            #dcContextMenu .dcMenu-line{
                                position: absolute;
                                left: 26px;
                                top: 0;
                                height: 100%;
                                font-size: 1px;
                                border-left: 1px solid #ccc;
                                border-right: 1px solid #fff;
                            }
                            #dcContextMenu .dcMenu-item{
                                position: relative;
                                white-space: nowrap;
                                cursor: pointer;
                                margin: 0px;
                                padding: 0px;
                                font-size: 12px;
                                overflow: hidden;
                                border-width: 1px;
                                border-style: solid;
                                border-color: transparent;
                                box-sizing: content-box;
                            }
                            #dcContextMenu .dcMenu-item .dcMenu-text{
                                float: left;
                                padding-left: 28px;
                                padding-right: 20px;
                                font-size: 12px;
                            }
        
                            #dcContextMenu .dcMenu-icon{
                                position: absolute;
                                width: 16px;
                                height: 16px;
                                left: 2px;
                                top: 50%;
                                margin-top: -8px;
                            }
                            #dcContextMenu .dcMenu-sep{
                                margin: 3px 0px 3px 25px;
                                font-size: 1px;
                                border-top: 1px solid #ccc;
                                border-bottom: 1px solid #fff;
                            }
                            #dcContextMenu .secondaryMenu{
                                position: absolute;
                                z-index: 110011;
                                margin: 0;
                                padding: 2px;
                                border-width: 1px;
                                border-style: solid;
                                border-color: #ddd;
                                min-width: 144px;
                                overflow: hidden;
                                display: none;
                                background-color: #fafafa;
                            }
                            #dcContextMenu .dcMenu-rightarrow {
                                position: absolute;
                                width: 16px;
                                height: 16px;
                                right: 0;
                                top: 50%;
                                margin-top: -8px;
                                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAZ0lEQVR42u2VMQ7AMAgD+f9XeYBHd+mA2IqrJFJ8EkMGrNiCJMIYY86Eh2otDYA7dNgq2/kLEEzwhxDGGrURQxGlN97gUUrxQCU9DM33ALjYQA0vlRGCcPEUjGxdgasfQX+DxphreAA2tk8BzQnbmgAAAABJRU5ErkJggg==) no-repeat -32px center;
                            }`;
                    var ContextMenuCss = document.createElement('style');
                    ContextMenuCss.setAttribute('id', 'ContextMenuCss');
                    dcHead.appendChild(ContextMenuCss);
                    ContextMenuCss.innerHTML = newCssString;

                    //页面滚动
                    pageContainer.addEventListener('scroll', function () {
                        var hasContextMenu = rootElement.querySelector('#dcContextMenu');
                        if (hasContextMenu) {
                            hasContextMenu.remove();
                        }
                    });
                    //丢失焦点
                    window.addEventListener('blur', function () {
                        var hasContextMenu = rootElement.querySelector('#dcContextMenu');
                        if (hasContextMenu) {
                            hasContextMenu.remove();
                        }
                    });
                }
            } else {
                //存在时，清空所有item和sep的元素
                var allItem = hasContextMenu.querySelectorAll('.dcMenu-item, .dcMenu-sep');
                for (var i = 0; i < allItem.length; i++) {
                    allItem[i].remove();
                }
            }
            var containerHeight = 0;
            if (Array.isArray(options) && options.length > 0) {
                //根据options显示元素
                for (var option = 0; option < options.length; option++) {
                    if (typeof options[option] == 'object') {
                        var thisItem = insertItem(
                            options[option],
                            hasContextMenu,
                            true,
                        ) as HTMLDivElement;
                        //判断是否存在subMenu，如果需要更多可以使用递归调用
                        if (options[option].subMenu && Array.isArray(options[option].subMenu)) {
                            var secondaryMenu = document.createElement('div');
                            secondaryMenu.setAttribute('class', 'secondaryMenu');
                            secondaryMenu.innerHTML = `<div class="dcMenu-line"></div>`;
                            hasContextMenu.appendChild(secondaryMenu);
                            for (var meun = 0; meun < options[option].subMenu.length; meun++) {
                                insertItem(options[option].subMenu[meun], secondaryMenu, false);
                            }
                            var rightItem = document.createElement('div');
                            rightItem.setAttribute('class', 'dcMenu-rightarrow');
                            thisItem.appendChild(rightItem);
                            //添加事件
                            thisItem.addEventListener('mouseenter', function () {
                                //console.log(e)
                                //console.log($(e.target))
                                //找到下一个子元素
                                var targetEle = this.nextElementSibling as HTMLDivElement;
                                targetEle.style.top = this.offsetTop + 'px';
                                targetEle.style.left = this.offsetLeft + this.offsetWidth + 'px';
                                targetEle.style.display = 'block';
                            });
                            thisItem.addEventListener('mouseleave', function () {
                                var targetEle = this.nextElementSibling as HTMLDivElement;
                                targetEle.style.display = 'none';
                            });
                            secondaryMenu.addEventListener('mouseenter', function () {
                                var targetEle = this.previousElementSibling as HTMLDivElement;
                                this.style.top = targetEle.offsetTop + 'px';
                                this.style.left =
                                    targetEle.offsetLeft + targetEle.offsetWidth + 'px';
                                this.style.display = 'block';
                            });
                            secondaryMenu.addEventListener('mouseleave', function () {
                                this.style.display = 'none';
                            });
                        }
                    } else if (typeof options[option] == 'string' && options[option] == '-') {
                        var sepEle = document.createElement('div');
                        sepEle.setAttribute('class', 'dcMenu-sep');
                        hasContextMenu.appendChild(sepEle);
                        containerHeight += 8;
                    }
                }
                var pageElement = menuObj.PageElement;
                //计算展示的高度
                var minHeight = pageContainer.scrollTop;
                var maxHeight = minHeight + pageContainer.clientHeight;
                containerHeight = containerHeight ? containerHeight + 6 : 0;
                hasContextMenu.style.height = containerHeight + 'px';
                hasContextMenu.style.left = pageElement.offsetLeft + menuObj.X + 'px';
                var cursorTop = pageElement.offsetTop + menuObj.Y;
                var menuLastHeight = cursorTop + containerHeight;
                //计算最下方的距离是否够显示全
                if (menuLastHeight > maxHeight) {
                    //显示不全
                    var topHasSpacing = -minHeight;
                    //判断上边是否存在足够的距离
                    if (topHasSpacing > containerHeight) {
                        //距离足够
                        hasContextMenu.style.top = cursorTop - containerHeight + 'px';
                    } else {
                        //距离不够
                        if (maxHeight - cursorTop > cursorTop - minHeight) {
                            //下方的距离大于上方
                            hasContextMenu.style.top = cursorTop + 'px';
                        } else {
                            //上方的距离大于下方
                            hasContextMenu.style.top = cursorTop - containerHeight + 'px';
                        }
                    }
                } else {
                    //显示全
                    hasContextMenu.style.top = cursorTop + 'px';
                }
                hasContextMenu.style.display = 'block';
            }
        }
    }

    //插入内部的item项
    function insertItem(options: string, hasContextMenu: HTMLDivElement, needHeight: boolean) {
        if (typeof options == 'object') {
            var itemEle = document.createElement('div');
            itemEle.setAttribute('class', 'dcMenu-item');
            itemEle.style.cssText = 'height: 22px;line-height: 22px';
            hasContextMenu.appendChild(itemEle);
            itemEle.innerHTML = `
                        <div class="dcMenu-text" style="height: 22px; line-height: 22px;">${
                            (options as any).label
                        }</div>
                        <div class="dcMenu-icon"></div>
                    `;
            itemEle.addEventListener('mousedown', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            itemEle.onclick;
            itemEle.addEventListener('click', function () {
                (options as any).exec();
                hasContextMenu.remove();
            });
            if (needHeight) {
                containerHeight += 24;
            }
            return itemEle;
        } else if (typeof options == 'string' && options == '-') {
            var sepEle = document.createElement('div');
            sepEle.setAttribute('class', 'dcMenu-sep');
            hasContextMenu.appendChild(sepEle);
            if (needHeight) {
                containerHeight += 24;
            }
            return sepEle;
        }
    }
}

/**
 * 处理编辑器控件的更新工具条按钮状态事件
 * @param {any} eventSender
 * @param {any} args
 */
export function Handle_EventUpdateToolarState(instance: HTMLElement, eventSender: any, args: any) {
    function UpdateCommandUIElement(commandName: string, uiElement: HTMLElement) {
        var info = instance.GetCommandStatus(commandName);
        if (info.Supported == false) {
            // 系统不支持命令
            uiElement.style.backgroundColor = 'red';
            uiElement.disabled = true;
        } else if (info.Enabled == false) {
            // 命令当前无效
            //uiElement.style.backgroundColor = "lightgray";
            uiElement.style.color = '#999999';
            uiElement.disabled = true;
        } else {
            uiElement.style.color = '';
            uiElement.disabled = false;
        }
        if (info.Checked == true) {
            // 命令处于勾选状态
            uiElement.style.border = '1px solid black';
        } else {
            uiElement.style.border = '';
        }
    }
    var elements = document.getElementsByTagName('A');
    for (var iCount = 0; iCount < elements.length; iCount++) {
        var element = elements[iCount];
        var cmdName = element.getAttribute('dccommandName');
        if (cmdName != null && cmdName.length > 0) {
            UpdateCommandUIElement(cmdName, element as HTMLElement);
        }
    }
    console.log('更新工具条按钮状态');
}
