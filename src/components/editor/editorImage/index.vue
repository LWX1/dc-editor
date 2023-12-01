<script setup lang="ts">
    import BaseModal from 'src/components/BaseModal.vue';
    import { getInputFeildOptions } from 'src/config/editorData';
    import { EEditorInputFeildType } from 'src/interface/editor';
    import { IInputField } from 'src/interface/editorInputFeild';
    import { CActionBackNext } from 'src/utils/actionBackNext';
    import { CDraw } from 'src/utils/draw';
    import { CEditor } from 'src/utils/editor';
    import { ref, reactive, nextTick } from 'vue';
    const props = defineProps({
        editor: {
            type: CEditor,
        },
    });

    /*****弹框表单 */
    const title = '编辑图片';

    const visible = ref(false);

    const fillRef = ref('#000');
    const strokeRef = ref('#000');

    const btnProxy = reactive({
        undoDisabled: true,
        redoDisabled: true,
    });

    // 提交
    const submitModalForm = () => {
        if (!saveImage) {
            visible.value = !visible.value;
            return;
        }
        let ctx = canvas.getContext('2d');
        ctx.drawImage(saveImage, 0, 0);
        // 转编译一定要在图像绘制完毕以后
        let base64 = canvas.toDataURL('image/jpeg', 0.1);
        let index = base64.indexOf(',');
        let Src = '';
        if (index !== -1) {
            Src = base64.slice(index + 1, base64.length);
        }
        const data = {
            ID: imageOptions.ID,
            Src,
            Height: imageOptions.Height,
            Width: imageOptions.Width,
            Attributes: {
                inneradditionshape: JSON.stringify(canvas.toJSON()),
            },
        };
        props.editor?.setElementProperties(data, data.ID);
        props.editor?.refreshDocument();
        canvas.renderAll();
        visible.value = !visible.value;
    };

    // 取消
    const cancelModalForm = () => {
        visible.value = false;
    };
    let imageOptions;
    // 打开或者关闭弹框
    const modalTogetter = (values: EEditorInputFeildType | IInputField) => {
        if (typeof values === 'string') {
            // 深拷贝测试数据，防止被修改
            imageOptions = JSON.parse(JSON.stringify(getInputFeildOptions()[values].data));
        } else {
            imageOptions = values;
        }
        visible.value = !visible.value;
        nextTick(() => {
            initImage(imageOptions);
        });
    };

    defineExpose({
        modalTogetter,
    });

    /********* 绘制 */
    let canvas;
    let draw: CDraw;
    let actionBackNext: CActionBackNext;
    let saveImage;
    const mouseMode = ref('');

    const BtnDataList = [
        {
            value: 'Rect',
            label: '矩形',
        },
        {
            value: 'Ellipse',
            label: '椭圆形',
        },
        {
            value: 'Line',
            label: '线段',
        },
        {
            value: 'IText',
            label: '文字',
        },
    ];

    /** 改变填充颜色 */
    const changeFill = (value) => {
        draw.setFillStroke({
            fill: value,
        });
    };
    /** 改变画笔颜色 */
    const changeStroke = (value) => {
        draw.setFillStroke({
            stroke: value,
        });
    };

    /**
     * 初始化图片配置
     * @param options
     */
    const initImage = (options) => {
        draw = new CDraw({
            id: 'imgCanvas',
            fill: fillRef.value,
            stroke: strokeRef.value,
        });
        canvas = draw.canvas;
        draw.loadImage(options?.Src, options?.Attributes?.inneradditionshape, (img) => {
            actionBackNext = new CActionBackNext(canvas);
            saveImage = img;
        });
    };

    /**
     * 改变按钮状态
     * @param pointer 当前操作指针
     * @param operateList 炒作列表
     */
    const changeBtnState = (pointer, operateList) => {
        if (pointer > 0) {
            btnProxy.undoDisabled = false;
        } else {
            btnProxy.undoDisabled = true;
        }
        if (pointer + 1 >= operateList.length) {
            btnProxy.redoDisabled = true;
        } else {
            btnProxy.redoDisabled = false;
        }
    };

    /**
     * 清除状态
     */
    const clearMouseMode = () => {
        actionBackNext.operateData(changeBtnState);
        mouseMode.value = '';
    };

    /**
     * 监听模式改变事件
     * @param {*} event 事件Event
     * @returns {*} null
     */
    const handleMouseModeChange = function (event) {
        if (mouseMode.value === event) {
            // clearAllEvents();
            draw.clearAllEvents(clearMouseMode);
            return;
        }
        mouseMode.value = event;
        switch (mouseMode.value) {
            case 'Rect':
                draw.drawRect(clearMouseMode);
                break;
            case 'Ellipse':
                draw.drawEllipse(clearMouseMode);
                break;
            case 'Line':
                draw.drawLine(clearMouseMode);
                break;
            case 'IText':
                draw.drawText(clearMouseMode);
                break;
            default:
                break;
        }
    };

    /**
     * canvas 删除图形
     */
    const canvasDelete = () => {
        draw.deleteDraw(() => {
            actionBackNext.operateData(changeBtnState);
        });
    };

    /**
     * 撤销
     */
    const canvasUndo = () => {
        actionBackNext.prevStepOperate(changeBtnState);
    };

    /**
     * 重做
     */
    const canvasRedo = () => {
        actionBackNext.nextStepOperate(changeBtnState);
    };
</script>

<template>
    <BaseModal
        :visible="visible"
        :title="title"
        :handleClose="cancelModalForm"
        :onSubmit="submitModalForm"
        :onCancel="cancelModalForm"
        :fullscreen="true"
    >
        <div class="image-box">
            <div class="btn-list">
                <div>
                    <span>填充：</span>
                    <el-color-picker
                        v-model="fillRef"
                        @change="changeFill"
                    />
                </div>
                <div>
                    <span>边框：</span>
                    <el-color-picker
                        v-model="strokeRef"
                        @change="changeStroke"
                    />
                </div>
            </div>
            <div class="btn-list">
                <el-button
                    :key="item.value"
                    @click="handleMouseModeChange(item.value)"
                    v-for="item in BtnDataList"
                    :type="item.value === mouseMode ? 'primary' : 'default'"
                >
                    {{ item.label }}
                </el-button>
                <el-button @click="canvasDelete">删除</el-button>
                <el-button
                    :disabled="btnProxy.undoDisabled"
                    @click="canvasUndo"
                >
                    撤销
                </el-button>
                <el-button
                    :disabled="btnProxy.redoDisabled"
                    @click="canvasRedo"
                >
                    重做
                </el-button>
            </div>
        </div>
        <div class="canvas-box">
            <canvas
                width="300"
                height="200"
                id="imgCanvas"
            >
                <p>不支持canvas</p>
            </canvas>
        </div>
    </BaseModal>
</template>

<style lang="scss" scoped>
    .canvas-box {
        height: calc(100vh - 270px);
        display: flex;
        justify-content: center;
    }
    .btn-list {
        margin-bottom: 10px;
        justify-content: center;
    }
</style>
