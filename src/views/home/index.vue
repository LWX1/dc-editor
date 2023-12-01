<script setup lang="ts">
    import { OperateEvent, AddrUrl } from 'src/config';
    import { IObject, ISelected } from 'src/interface';
    import {
        EEditorElement,
        EEditorInputFeildType,
        EEditorSubOperateType,
        EEditorType,
    } from 'src/interface/editor';
    import { CEditor } from 'src/utils/editor';
    import { SubInfo } from 'src/utils/pubSub';
    import { ComputedRef, computed, nextTick, onMounted, onUnmounted, ref, shallowRef } from 'vue';
    import Editor from 'src/components/editor/index.vue';
    import EditorTags from 'src/components/editor/editorTags.vue';
    import EditorStatus from 'src/components/editor/editorStatus.vue';
    import EditorScale from 'src/components/editor/editorScale.vue';
    import EditorPage from 'src/components/editor/editorPage.vue';
    import EditorLeft from 'src/components/editor/editorLeft/index.vue';
    import EditorWaterMark from 'src/components/editor/editorWaterMark.vue';
    import EditorGridLine from 'src/components/editor/editorGridLine.vue';
    import EditorGutter from 'src/components/editor/editorGutter.vue';
    import EditorFontSetting from 'src/components/editor/editorFontSetting.vue';
    import EditorSearchReplace from 'src/components/editor/editorSearchReplace.vue';
    import EditorParagraphFormat from 'src/components/editor/editorParagraphFormat.vue';
    import EditorInput from 'src/components/editor/editorInput/index.vue';
    import EditorFourBarcode from 'src/components/editor/editorFourBarcode.vue';
    import EditorFourTDBarcode from 'src/components/editor/editorFourTDBarcode.vue';
    import EditorFourPagination from 'src/components/editor/editorFourPagination.vue';
    import EditorFour1 from 'src/components/editor/editorFour1.vue';
    import EditorFour2 from 'src/components/editor/editorFour2.vue';
    import EditorFour3 from 'src/components/editor/editorFour3.vue';
    import EditorFour4 from 'src/components/editor/editorFour4.vue';
    import EditorFourEye from 'src/components/editor/editorFourEye.vue';
    import EditorFourSymbol from 'src/components/editor/editorFourSymbol.vue';
    import EditorFourFetalHeart from 'src/components/editor/editorFourFetalHeart.vue';
    import EditorFourPupil from 'src/components/editor/editorFourPupil.vue';
    import EditorFourTeeth from 'src/components/editor/editorFourTeeth.vue';
    import EditorFourPain from 'src/components/editor/editorFourPain.vue';
    import EditorFourTeethBottom from 'src/components/editor/editorFourTeethBottom.vue';
    import EditorFourTeethTop from 'src/components/editor/editorFourTeethTop.vue';
    import EditorFourFraction from 'src/components/editor/editorFourFraction.vue';
    import EditorCheckboxRadio from 'src/components/editor/editorCheckboxRadio/index.vue';
    import EditorCheckboxRadioProperty from 'src/components/editor/editorCheckboxRadio/editorCheckboxRadioProperty.vue';
    import EditorFourLabel from 'src/components/editor/editorFourLabel.vue';
    import EditorFourHorizontalLine from 'src/components/editor/editorFourHorizontalLine.vue';
    import EditorFourButton from 'src/components/editor/editorFourButton.vue';
    import EditorImage from 'src/components/editor/editorImage/index.vue';
    // 实例化编辑器
    const editors = ref<IObject<CEditor>>({});
    // 演示打开
    const actionVisible = ref(false);

    // 弹框标题
    const modalTitle = ref('');

    onMounted(() => {
        let isRender = false;
        const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        });
        tagLists.value.forEach((item) => {
            editors.value[item.label] = new CEditor({
                id: item.label,
                controlOnLoadCallback: () => {
                    if (!isRender) {
                        loading.close();
                        isRender = true;
                    }
                },
            });
        });
        // 监听事件
        SubInfo.subscribe(OperateEvent, getOperateEvent);
    });

    onUnmounted(() => {
        SubInfo.unSubscribe(OperateEvent, getOperateEvent);
    });

    const getOperateEvent = (type: EEditorSubOperateType, values?: any) => {
        switch (type) {
            case EEditorSubOperateType.OPEN:
                return openFile();
            // 新建
            case EEditorSubOperateType.CREATE:
                return createFile();
            // 演示
            case EEditorSubOperateType.ACTION:
                return openAction();
            // 演示案例选择
            case EEditorSubOperateType.ACTION_EXAMPLE:
                const { fileName, data, fileExtension } = values;
                return createFile(fileName, data, fileExtension);
            // 页面设置
            case EEditorSubOperateType.PAGE_SETTING:
                return openPageSetting();
            // 水印设置
            case EEditorSubOperateType.WATER_MARK:
                return openWaterMarkSetting();
            // 网格线
            case EEditorSubOperateType.GRID_LINE:
                return openGridLine();
            // 装订线
            case EEditorSubOperateType.GUTTER:
                return openGutter();
            // 查找和替换
            case EEditorSubOperateType.SEARCH_REPLACE:
                return openSearchReplace();
            // 字体设置
            case EEditorSubOperateType.FONT_SETTING:
                return openFontSetting();
            // 段落
            case EEditorSubOperateType.PARAGRAPH_FORMAT:
                return openParagraphFormat();
            // 输入域
            case EEditorSubOperateType.INPUT:
                return getInputFeild(values);
        }
    };

    const editor: ComputedRef<CEditor> = computed(() => {
        return editors.value[tabsActive.value];
    });

    /***** tabs */

    // tabs 列表
    const tagLists = shallowRef<Array<ISelected>>([
        {
            label: '测试',
            value: '测试',
        },
    ]);

    const tabsActive = ref(tagLists.value[0]?.value);

    // 移除tabs
    const removeTabs = (values: string) => {
        const result = tagLists.value.filter((item) => item.value !== values);
        if (result.length > 0) {
            const isModified = editors.value[values].getModified();
            const fun = () => {
                delete editors.value[values];
                if (result.length > 0) {
                    tagLists.value = result;
                    if (tabsActive.value === values) {
                        tabsActive.value = tagLists.value[0].value;
                    }
                }
            };
            if (!isModified) {
                fun();
            } else {
                ElMessageBox.confirm('数据已改变，是否确定删除', '删除', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        fun();
                    })
                    .catch(() => {});
            }
        } else {
            ElMessage({
                message: '只有一个不可关闭！',
                type: 'warning',
            });
        }
    };

    // 点击tabs
    const clickTabs = (args: { props: { name: string } }) => {
        tabsActive.value = args.props.name;
        const editor = editors.value[tabsActive.value];
        SubInfo.publish('editorToComponentScale', editor.getZoomRate());
    };

    // 更改tabs
    const updateTabs = (fileName: string) => {
        // 是否存在
        const arr = tagLists.value.filter((item) => item.value === fileName);
        const len = arr.length;
        let obj: any = null;
        if (len) {
            const str = new Date().valueOf().toFixed(0) + '';
            obj = {
                value: fileName + str,
                label: fileName + str,
            };
        } else {
            obj = {
                value: fileName,
                label: fileName,
            };
        }
        tagLists.value = [...tagLists.value, obj];
        tabsActive.value = obj.value;
        return obj.value;
    };

    // 打开文件
    const openFile = () => {
        editors.value[tabsActive.value].importFile(
            undefined,
            (fileName: string, cb: Function) => {
                const id = updateTabs(fileName);
                cb(id);
            },
            (editor: CEditor, { id }: any) => {
                // console.log(id, editors)
                const number = editor.getZoomRate();
                SubInfo.publish('editorToComponentScale', number);
                editors.value[id] = editor;
            }
        );
    };

    // 新建文件
    const createFile = (fileName?: string, strFileContent?: string, fileFormat?: EEditorType) => {
        const str = fileName || '新建文件' + new Date().valueOf().toFixed(0);
        const id = updateTabs(str);

        nextTick(() => {
            editors.value[id] = new CEditor({
                id,
            });
            window.CreateWriterControlForWASM(editors.value[id].instance);
            if (strFileContent) {
                editors.value[id].loadDocumentFromString(strFileContent, fileFormat);
            }
        });
    };

    // 打开演示
    const openAction = () => {
        actionVisible.value = !actionVisible.value;
    };

    // 设置页面
    const pageRef = ref();

    const openPageSetting = () => {
        pageRef.value.modalTogetter();
    };

    // 水印设置
    const waterMarkRef = ref();
    const openWaterMarkSetting = () => {
        waterMarkRef.value.modalTogetter();
    };

    // 网格线
    const gridLineRef = ref();
    const openGridLine = () => {
        gridLineRef.value.modalTogetter();
    };

    // 装订线
    const gutterRef = ref();
    const openGutter = () => {
        gutterRef.value.modalTogetter();
    };

    // 字体设置
    const fontSettingRef = ref();
    const openFontSetting = () => {
        fontSettingRef.value.modalTogetter();
    };

    // 查找
    const searchReplaceRef = ref();
    const openSearchReplace = () => {
        searchReplaceRef.value.modalTogetter();
    };

    // 段落
    const paragraphFormatRef = ref();
    const openParagraphFormat = () => {
        paragraphFormatRef.value.modalTogetter();
    };

    // 各类元素
    const getInputFeild = (values: string | { TypeName: string }) => {
        if (!values) return;
        if (typeof values === 'string') {
            switch (values) {
                case EEditorInputFeildType.DATE:
                case EEditorInputFeildType.TEXT:
                case EEditorInputFeildType.SELECT:
                    return openInput(values);
                case EEditorInputFeildType.BARCODE:
                    return openBarcode(values);
                case EEditorInputFeildType.TDBARCODE:
                    return openTBbarcode(values);
                case EEditorInputFeildType.PAGE:
                    return openPagination(values);
                case EEditorInputFeildType.FOUR_VALUES1:
                    return openFour1(values);
                case EEditorInputFeildType.FOUR_VALUES2:
                    return openFour2(values);
                case EEditorInputFeildType.FOUR_VALUES3:
                    return openFour3(values);
                case EEditorInputFeildType.FOUR_VALUES4:
                    return openFour4(values);
                case EEditorInputFeildType.THREE_VALUES:
                    return openFourEye(values);
                case EEditorInputFeildType.STRABISMUS_SYMBOL:
                    return openFourSymbol(values);
                case EEditorInputFeildType.FETAL_HEART:
                    return openFourFetalHeart(values);
                case EEditorInputFeildType.PUPIL:
                    return openFourPupil(values);
                case EEditorInputFeildType.PERMANENT_TEETH_BITMAP:
                    modalTitle.value = '恒牙牙位图';
                    return openFourTeeth(values);
                case EEditorInputFeildType.DECIDUOUS_TEECH:
                    modalTitle.value = '乳牙牙位图';
                    return openFourTeeth(values);
                case EEditorInputFeildType.PAIN_INDEX:
                    return openFourPain(values);
                case EEditorInputFeildType.DISEASED_TEETH_TOP:
                    return openFourTeethTop(values);
                case EEditorInputFeildType.DISEASED_TEETH_BOTTOM:
                    return openFourTeethBottom(values);
                case EEditorInputFeildType.FRACTION:
                    return openFourFraction(values);
                case EEditorInputFeildType.CHECKBOX:
                case EEditorInputFeildType.RADIO:
                    return openCheckboxRadio(values);
                case EEditorInputFeildType.LABEL:
                    return openLabel(values);
                case EEditorInputFeildType.HORIZONTAL_LINE:
                    return openHorizontalLine(values);
                case EEditorInputFeildType.BUTTON:
                    return openButton(values);
                case EEditorInputFeildType.IMAGE:
                    return openImage(values);
            }
        } else {
            switch (values.TypeName.toLowerCase()) {
                case EEditorElement.INPUT_FIELD:
                    return openInput(values);
                case EEditorElement.BARCODE:
                    return openBarcode(values);
                case EEditorElement.TDBARCODE:
                    return openTBbarcode(values);
                case EEditorElement.MEDICAL_EXPRESSION:
                    return getFour(values);
                case EEditorElement.CHECKBOX:
                    modalTitle.value = '复选框属性';
                    return openCheckboxRadioProperty(values);
                case EEditorElement.RADIO:
                    modalTitle.value = '单选框属性';
                    return openCheckboxRadioProperty(values);
                case EEditorElement.LABEL:
                    return openLabel(values);
                case EEditorElement.HORIZONTAL:
                    return openHorizontalLine(values);
                case EEditorElement.BUTTON:
                    return openButton(values);
                case EEditorElement.IMAGE:
                    return openImage(values);
            }
        }
    };

    // 获取表达式的
    const getFour = (values) => {
        const expressionStyle = values.ExpressionStyle;
        switch (expressionStyle) {
            case EEditorInputFeildType.FOUR_VALUES1:
                return openFour1(values);
            case EEditorInputFeildType.FOUR_VALUES2:
                return openFour2(values);
            case EEditorInputFeildType.FOUR_VALUES3:
                return openFour3(values);
            case EEditorInputFeildType.FOUR_VALUES4:
                return openFour4(values);
            case EEditorInputFeildType.THREE_VALUES:
                return openFourEye(values);
            case EEditorInputFeildType.STRABISMUS_SYMBOL:
                return openFourSymbol(values);
            case EEditorInputFeildType.FETAL_HEART:
                return openFourFetalHeart(values);
            case EEditorInputFeildType.PUPIL:
                return openFourPupil(values);
            case EEditorInputFeildType.PERMANENT_TEETH_BITMAP:
                modalTitle.value = '恒牙牙位图';
                return openFourTeeth(values);
            case EEditorInputFeildType.DECIDUOUS_TEECH:
                modalTitle.value = '乳牙牙位图';
                return openFourTeeth(values);
            case EEditorInputFeildType.PAIN_INDEX:
                return openFourPain(values);
            case EEditorInputFeildType.DISEASED_TEETH_TOP:
                return openFourTeethTop(values);
            case EEditorInputFeildType.DISEASED_TEETH_BOTTOM:
                return openFourTeethBottom(values);
            case EEditorInputFeildType.FRACTION:
                return openFourFraction(values);
        }
    };

    // 输入框设置
    const inputRef = ref();
    const openInput = (values: any) => {
        inputRef.value.modalTogetter(values);
    };

    // 条形码
    const barcodeRef = ref();
    const openBarcode = (values: any) => {
        barcodeRef.value.modalTogetter(values);
    };

    // 二维码
    const TDbarcodeRef = ref();
    const openTBbarcode = (values: any) => {
        TDbarcodeRef.value.modalTogetter(values);
    };

    // 页码
    const paginationRef = ref();
    const openPagination = (values: any) => {
        paginationRef.value.modalTogetter(values);
    };

    // 月经史值1
    const editorFour1Ref = ref();
    const openFour1 = (values: any) => {
        editorFour1Ref.value.modalTogetter(values);
    };

    // 月经史值2
    const editorFour2Ref = ref();
    const openFour2 = (values: any) => {
        editorFour2Ref.value.modalTogetter(values);
    };

    // 月经史值3
    const editorFour3Ref = ref();
    const openFour3 = (values: any) => {
        editorFour3Ref.value.modalTogetter(values);
    };

    // 月经史值4
    const EditorFour4Ref = ref();
    const openFour4 = (values: any) => {
        EditorFour4Ref.value.modalTogetter(values);
    };

    // 眼球突出度
    const editorFourEyeRef = ref();
    const openFourEye = (values: any) => {
        editorFourEyeRef.value.modalTogetter(values);
    };

    // 斜视符号
    const editorFourSymbolRef = ref();
    const openFourSymbol = (values: any) => {
        editorFourSymbolRef.value.modalTogetter(values);
    };

    // 胎心图
    const editorFourFetalHeartRef = ref();
    const openFourFetalHeart = (values: any) => {
        editorFourFetalHeartRef.value.modalTogetter(values);
    };

    // 瞳孔图
    const editorFourPupilRef = ref();
    const openFourPupil = (values: any) => {
        editorFourPupilRef.value.modalTogetter(values);
    };

    // 恒/乳牙牙位图
    const editorFourTeethRef = ref();
    const openFourTeeth = (values: any) => {
        editorFourTeethRef.value.modalTogetter(values);
    };
    // 标尺
    const editorFourPainRef = ref();
    const openFourPain = (values: any) => {
        editorFourPainRef.value.modalTogetter(values);
    };

    // 病变上牙
    const editorFourTeethTopRef = ref();
    const openFourTeethTop = (values: any) => {
        editorFourTeethTopRef.value.modalTogetter(values);
    };

    // 病变下牙
    const editorFourTeethBottomRef = ref();
    const openFourTeethBottom = (values: any) => {
        editorFourTeethBottomRef.value.modalTogetter(values);
    };
    // 分数公式
    const editorFourFractionRef = ref();
    const openFourFraction = (values: any) => {
        editorFourFractionRef.value.modalTogetter(values);
    };

    // 新建单复选框
    const editorCheckboxRadioRef = ref();
    const openCheckboxRadio = (values: any) => {
        editorCheckboxRadioRef.value.modalTogetter(values);
    };

    // 单复选框的属性
    const editorCheckboxRadioPropertyRef = ref();
    const openCheckboxRadioProperty = (values: any) => {
        editorCheckboxRadioPropertyRef.value.modalTogetter(values);
    };
    // 文本标签的属性
    const editorLabelRef = ref();
    const openLabel = (values: any) => {
        editorLabelRef.value.modalTogetter(values);
    };
    // 水平线的属性
    const editorHorizontalLineRef = ref();
    const openHorizontalLine = (values: any) => {
        editorHorizontalLineRef.value.modalTogetter(values);
    };

    // 按钮的属性
    const editorButtonRef = ref();
    const openButton = (values: any) => {
        editorButtonRef.value.modalTogetter(values);
    };

    // 图片的属性
    const editorImageRef = ref();
    const openImage = (values: any) => {
        editorImageRef.value.modalTogetter(values);
    };
</script>

<template>
    <div class="box-container">
        <Editor :editor="editor" />
        <div class="box-content">
            <EditorLeft
                v-show="actionVisible"
                :editor="editor"
            />
            <EditorTags
                :dataList="tagLists"
                :active="tabsActive"
                :removeTabs="removeTabs"
                :clickTabs="clickTabs"
            >
                <template
                    v-for="item in tagLists"
                    v-slot:[item.label]
                >
                    <div
                        :id="item.value"
                        dctype="WriterControlForWASM"
                        :servicepageurl="`${AddrUrl}/ServicePage.aspx`"
                        style="
                            /* height: 1200px; */
                            border-bottom: 0px solid black;
                            background-attachment: fixed;
                            background-size: cover;
                            background-position: center top;
                        "
                        RuleVisible="true"
                        AllowDrop="true"
                        AllowDragContent="true"
                        RuleBackColor="rgb(155, 187, 227)"
                        CaretCss="1,red"
                        PageCssString="box-shadow:0px 0px 0px grey"
                    >
                        正在加载...
                    </div>
                </template>
            </EditorTags>
        </div>
    </div>

    <EditorStatus />
    <EditorScale :id="tabsActive" />
    <EditorPage
        ref="pageRef"
        :editor="editor"
    />
    <EditorWaterMark
        ref="waterMarkRef"
        :editor="editor"
    />
    <EditorGridLine
        ref="gridLineRef"
        :editor="editor"
    />
    <EditorGutter
        ref="gutterRef"
        :editor="editor"
    />
    <EditorFontSetting
        ref="fontSettingRef"
        :editor="editor"
    />
    <EditorSearchReplace
        ref="searchReplaceRef"
        :editor="editor"
    />
    <EditorParagraphFormat
        ref="paragraphFormatRef"
        :editor="editor"
    />
    <EditorInput
        ref="inputRef"
        :editor="editor"
    />
    <EditorFourBarcode
        ref="barcodeRef"
        :editor="editor"
    />
    <EditorFourTDBarcode
        ref="TDbarcodeRef"
        :editor="editor"
    />
    <EditorFourPagination
        ref="paginationRef"
        :editor="editor"
    />
    <EditorFour1
        ref="editorFour1Ref"
        :editor="editor"
    />
    <EditorFour2
        ref="editorFour2Ref"
        :editor="editor"
    />
    <EditorFour3
        ref="editorFour3Ref"
        :editor="editor"
    />
    <EditorFour4
        ref="EditorFour4Ref"
        :editor="editor"
    />
    <EditorFourEye
        ref="editorFourEyeRef"
        :editor="editor"
    />
    <EditorFourSymbol
        ref="editorFourSymbolRef"
        :editor="editor"
    />
    <EditorFourFetalHeart
        ref="editorFourFetalHeartRef"
        :editor="editor"
    />
    <EditorFourPupil
        ref="editorFourPupilRef"
        :editor="editor"
    />
    <EditorFourTeeth
        ref="editorFourTeethRef"
        :editor="editor"
        :title="modalTitle"
    />
    <EditorFourPain
        ref="editorFourPainRef"
        :editor="editor"
    />
    <EditorFourTeethTop
        ref="editorFourTeethTopRef"
        :editor="editor"
    />
    <EditorFourTeethBottom
        ref="editorFourTeethBottomRef"
        :editor="editor"
    />
    <EditorFourFraction
        ref="editorFourFractionRef"
        :editor="editor"
    />
    <EditorCheckboxRadio
        ref="editorCheckboxRadioRef"
        :editor="editor"
    />
    <EditorCheckboxRadioProperty
        ref="editorCheckboxRadioPropertyRef"
        :editor="editor"
        :title="modalTitle"
    />
    <EditorFourLabel
        ref="editorLabelRef"
        :editor="editor"
    />
    <EditorFourHorizontalLine
        ref="editorHorizontalLineRef"
        :editor="editor"
    />
    <EditorFourButton
        ref="editorButtonRef"
        :editor="editor"
    />
    <EditorImage
        ref="editorImageRef"
        :editor="editor"
    />
</template>

<style scoped lang="scss">
    .box-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        .box-content {
            display: flex;
            height: 0;
            flex-grow: 1;
        }
    }
</style>
