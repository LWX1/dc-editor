<script setup lang="ts">
    import EditorScale from 'src/components/editor/editorScale.vue';
    import EditorStatus from 'src/components/editor/editorStatus.vue';
    import { AddrUrl } from 'src/config';
    import { CEditor } from 'src/utils/editor';
    import { onMounted, ref } from 'vue';
    import RecordListCom from './components/RecordListCom.vue';
    import { CSubDocument } from 'src/utils/subDocument';
    import {
        Record1,
        Record2,
        Record3,
        Record4,
        Record5,
        Record6,
        Record7,
        Record9,
        RecordStrData,
    } from 'src/config/editorRecord';
    import { router } from 'src/router';
    import { ISubRecord } from 'src/interface/editorRecord';

    const ID = 'recordWriter';

    const recordListRef = ref();

    const RecordList = [
        {
            label: '加载病程',
            value: '加载病程',
            events: {
                click: () => {
                    loadRecord();
                    callbackRecord();
                },
            },
        },
        {
            label: '追加病程',
            value: '追加病程',
            events: {
                click: () => {
                    addRecord();
                    callbackRecord();
                },
            },
        },
        {
            label: '插入病程',
            value: '插入病程',
            events: {
                click: () => {
                    insertRecord();
                    callbackRecord();
                },
            },
        },
        {
            label: '获取病程记录',
            value: '获取病程记录',
            events: {
                click: () => {
                    getRecordList();
                },
            },
        },
        {
            label: '获取当前病程编号',
            value: '获取当前病程编号',
            events: {
                click: () => {
                    getRecordID();
                },
            },
        },
        {
            label: '根据编号定位病程',
            value: '根据编号定位病程',
            events: {
                click: () => {
                    getRecordIdPos();
                },
            },
        },
        {
            label: '根据序号定位病程',
            value: '根据序号定位病程',
            events: {
                click: () => {
                    getRecordIndexPos();
                },
            },
        },
        {
            label: '删除指定病程',
            value: '删除指定病程',
            events: {
                click: () => {
                    deleteRecord();
                },
            },
        },
        {
            label: '删除当前病程',
            value: '删除当前病程',
            events: {
                click: () => {
                    deleteCurrentRecord();
                    callbackRecord();
                },
            },
        },

        {
            label: '设置病程只读',
            value: '设置病程只读',
            events: {
                click: () => {
                    setRecordReadly(true, 'red');
                    callbackRecord();
                },
            },
        },
        {
            label: '取消病程只读',
            value: '取消病程只读',
            events: {
                click: () => {
                    setRecordReadly(false, null);
                    callbackRecord();
                },
            },
        },
        {
            label: '设置病程跨页',
            value: '设置病程跨页',
            events: {
                click: () => {
                    setRecordCrossPage(true);
                    callbackRecord();
                },
            },
        },
        {
            label: '取消病程跨页',
            value: '取消病程跨页',
            events: {
                click: () => {
                    setRecordCrossPage(false);
                    callbackRecord();
                },
            },
        },
        {
            label: '当前病程上移',
            value: '当前病程上移',
            events: {
                click: () => {
                    setRecordUp();
                    callbackRecord();
                },
            },
        },
        {
            label: '当前病程下移',
            value: '当前病程下移',
            events: {
                click: () => {
                    setRecordDown();
                    callbackRecord();
                },
            },
        },
        {
            label: '打印',
            value: '打印',
            events: {
                click: () => printData(),
            },
        },
        {
            label: '返回',
            value: '返回',
            events: {
                click: () => {
                    router.back();
                },
            },
        },
    ];

    const editor = ref<CEditor>();

    onMounted(() => {
        const loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        });
        editor.value = new CEditor({
            id: 'recordWriter',
            controlOnLoadCallback: () => {
                loading.close();
                loadRecord();
                callbackRecord();
            },
        });
    });

    let subDocument: CSubDocument;

    // 操作病程完回调
    const callbackRecord = () => {
        recordListRef.value.getCourseList(subDocument);
    };

    // 加载病程
    const loadRecord = () => {
        subDocument = new CSubDocument(editor.value as CEditor);
        // 加载主数据
        subDocument.loadsubMainXml(RecordStrData);
        /***追加数据 */
        let file = new Array();
        file.push(Record1);
        file.push(Record2);
        file.push(Record3);
        file.push(Record4);
        file.push(Record5);

        let options = new Array();
        let attr1 = {
            ID: 'subdoc1', //randomString(6),//
            Attributes: { 姓名: '张三', 科室: '科室1', 床号: '12345' }, //自定义属性
            Title: '首次病程记录',
            Parameters: { rdogroup: 'V3', chkgroup: 'V2,V3' }, //绑定的数据格式
            DataBindingXML: '<DataSourceName><Name>王二麻</Name><Sex>男</Sex></DataSourceName>',
        };
        let attr2 = {
            ID: 'subdoc2', //randomString(6),//
            Attributes: { 姓名: '张三', 科室: '科室2', 床号: '12345' }, //自定义属性
            Title: '主任医师查房记录',
            Parameters: { rdogroup: 'V1', chkgroup: 'V1,V4' }, //绑定的数据格式
            DataBindingXML: '<DataSourceName><Name>刘二狗</Name><Sex>女</Sex></DataSourceName>',
        };
        let attr3 = {
            ID: 'subdoc3', //randomString(6),//
            Attributes: { 姓名: '张三', 科室: '科室3', 床号: '12345' }, //自定义属性
            Title: '主治医师查房记录',
            Parameters: { rdogroup: 'V3', chkgroup: 'V2,V3' }, //绑定的数据格式
            DataBindingXML: '<DataSourceName><Name>王二麻</Name><Sex>男</Sex></DataSourceName>',
        };
        let attr4 = {
            ID: 'subdoc4', //randomString(6),//
            Attributes: { 姓名: '张三', 科室: '科室4', 床号: '12345' }, //自定义属性
            Title: '转出记录',
            Parameters: { rdogroup: 'V1', chkgroup: 'V1,V4' }, //绑定的数据格式
            DataBindingXML: '<DataSourceName><Name>刘二狗</Name><Sex>女</Sex></DataSourceName>',
        };
        let attr5 = {
            ID: 'subdoc5', //randomString(6),//
            Attributes: { 姓名: '张三', 科室: '科室5', 床号: '12345' }, //自定义属性
            Title: '转入记录',
            Parameters: { rdogroup: 'V3', chkgroup: 'V2,V3' }, //绑定的数据格式
            DataBindingXML: '<DataSourceName><Name>王二麻</Name><Sex>男</Sex></DataSourceName>',
        };
        options.push(attr1);
        options.push(attr2);
        options.push(attr3);
        options.push(attr4);
        options.push(attr5);

        let option: ISubRecord = {
            Files: file,
            Options: options,
            Usebase64: false,
        };
        subDocument.appendSubs(option);
    };

    // 追加病程
    const addRecord = () => {
        let file = new Array();
        file.push(Record6);
        file.push(Record7);

        let options = new Array();
        let attr1 = {
            ID: new Date().valueOf(), //
            Title: '术前小结',
            Parameters: { rdogroup: 'V3', chkgroup: 'V2,V3' }, //绑定的数据格式
            DataBindingXML: '<DataSourceName><Name>王二麻</Name><Sex>男</Sex></DataSourceName>',
        };
        let attr2 = {
            ID: new Date().valueOf() + 2, //
            Title: '深静脉置管术操作记录',
            Parameters: { rdogroup: 'V1', chkgroup: 'V1,V4' }, //绑定的数据格式
            DataBindingXML: '<DataSourceName><Name>刘二狗</Name><Sex>女</Sex></DataSourceName>',
        };
        options.push(attr1);
        options.push(attr2);
        let option: ISubRecord = {
            Files: file,
            Options: options,
            Usebase64: false,
        };
        subDocument.addSub(option);
    };

    // 插入病程
    const insertRecord = () => {
        var file = new Array();
        file.push(Record9);

        var options = new Array();
        var attr1 = {
            ID: new Date().valueOf(),
            Title: '日常病程记录',
            Parameters: { rdogroup: 'V3', chkgroup: 'V2,V3' }, //绑定的数据格式
            DataBindingXML: '<DataSourceName><Name>王二麻</Name><Sex>男</Sex></DataSourceName>',
        };
        options.push(attr1);
        var option = {
            Files: file,
            Options: options,
            Usebase64: false,
        };
        subDocument.insertSub(option);
    };

    // 获取病程记录
    const getRecordList = () => {
        let result = subDocument.getCourseRecords();
        console.log(result);
    };

    // 获取病程编号
    const getRecordID = () => {
        let result = subDocument.getCurrentSubDoc();
        console.log(result);
    };

    // 根据编号定位到病程
    const getRecordIdPos = () => {
        ElMessageBox.prompt('病程编号 ', '定位病程', {
            confirmButtonText: '提交',
            cancelButtonText: '取消',
            inputType: 'text',
        })
            .then(({ value }) => {
                subDocument.getSelectSubDocumentByID(value);
            })
            .catch(() => {});
    };

    // 根据序号定位到病程
    const getRecordIndexPos = () => {
        ElMessageBox.prompt('序号', ' 定位病程', {
            confirmButtonText: '提交',
            cancelButtonText: '取消',
            inputType: 'number',
        })
            .then(({ value }) => {
                subDocument.getSelectSubDocument(Number(value));
            })
            .catch(() => {});
    };

    // 删除指定病程
    const deleteRecord = () => {
        ElMessageBox.prompt('病程编号', ' 删除指定病程', {
            confirmButtonText: '提交',
            cancelButtonText: '取消',
            inputType: 'text',
        })
            .then(({ value }) => {
                subDocument.deleteSubDoc(value);
                callbackRecord();
            })
            .catch(() => {});
    };

    // 删除当前病程
    const deleteCurrentRecord = () => {
        subDocument.deleteCurrentSubDoc();
    };

    // 设置病程只读
    const setRecordReadly = (isReadonly: boolean, color: string | null) => {
        subDocument.setCurrentSubDocumentReadOnly(isReadonly, color);
    };

    // 设置病程跨页
    const setRecordCrossPage = (bool: boolean) => {
        subDocument.setSubDocCrossPage(bool);
    };

    // 上移
    const setRecordUp = () => {
        subDocument.setSubDocumentUp();
    };

    // 下移
    const setRecordDown = () => {
        subDocument.setSubDocumentDown();
    };

    // 打印
    const printData = () => {
        editor.value?.printDocument();
    };
</script>

<template>
    <div class="record-container">
        <div class="record-top">
            <span
                v-for="item in RecordList"
                :key="item.value"
                class="edit"
                v-on="item.events || {}"
            >
                {{ item.label }}
            </span>
        </div>
        <div class="record-content">
            <div class="record-left">
                <h3>病程记录</h3>
                <RecordListCom ref="recordListRef" />
            </div>
            <div
                :id="ID"
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
        </div>
    </div>

    <EditorStatus />
    <EditorScale :id="ID" />
</template>

<style lang="scss" scoped>
    .record-container {
        display: flex;
        flex-direction: column;
        padding: 20px;
        height: calc(100% - 40px);

        // overflow: auto;
        .record-top {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 10px;

            > span {
                border: 1px solid;
                padding: 3px 5px;
            }
        }

        .record-content {
            display: flex;
            overflow: auto;

            .record-left {
                width: 300px;
                min-width: 300px;
            }
        }
    }
</style>
