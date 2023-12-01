import { ICanvasState } from 'src/interface';

/**
 * 实现画布的操作状态管理
 */
export class CActionBackNext {
    state: ICanvasState = {
        /** 指针标记当前位置 */
        pointer: -1,
        /** 操作记录 */
        operateList: [],
        /** 深度，最大记录步骤次数 */
        maxDeep: 20,
        /** 画布 */
        canvas: null,
    };

    /**
     * 初始化
     * @param canvas 画布
     * @param cb 操作完后的回调
     */
    constructor(canvas, cb?) {
        // 保存 canvas 对象
        this.state['canvas'] = canvas;
        // 绑定键盘事件
        this.bindKeyBoard(canvas, cb);
        // 添加也要保存
        this.operateData(cb);
    }

    /**
     *
     * 监听键盘事件操作
     * @param canvas 画布
     * @param cb 操作后回调
     */
    bindKeyBoard(canvas, cb) {
        // $(document).on('keydown', (e) => {
        //   const key = e.originalEvent.keyCode;
        //   switch (key) {
        //     case KeyCode.W: // 上一步
        //       console.log('back');
        //       this.prevStepOperate();
        //       break;
        //     case KeyCode.E: // 下一步
        //       console.log('next');
        //       this.nextStepOperate();
        //       break;
        //   }
        // });
        canvas.on('object:modified', (e) => {
            // 为了方便保存，调整图形直接触发保存
            this.operateData(cb);
        });
    }

    /**
     * 操作数据保存
     * @param cb 操作后回调
     */
    operateData(cb) {
        const { canvas, operateList, pointer, maxDeep } = this.state;
        let max = maxDeep;
        let list = [...operateList];
        // 当前状态
        let currentPointer = pointer;
        const json = canvas?.toJSON();
        // 更新指针位置
        currentPointer += 1;
        // 考虑到可能存在后续动作，插入队列操作
        list.splice(currentPointer, 0, json);
        if (max && max < list.length) {
            // 深度存在，则判断当前队列长，超出则从头移出队列
            list.shift();
            currentPointer -= 1;
        }
        // 保存数据
        this.setState({
            operateList: list,
            pointer: currentPointer,
        });
        cb && cb(this.state.pointer, this.state.operateList);
    }

    /**
     * 上一步
     * @param cb 操作完回调
     */
    prevStepOperate(cb) {
        const { canvas, operateList, pointer } = this.state;
        let list = [...operateList];
        let currentPointer = pointer;
        if (currentPointer > 0) {
            // 加载前一步
            currentPointer -= 1;
            canvas?.loadFromJSON(list[currentPointer]).renderAll();
        }
        this.setState({
            operateList: [...list],
            pointer: currentPointer,
        });
        cb && cb(this.state.pointer, this.state.operateList);
    }

    /**
     * 下一步
     * @param cb 操作完回调
     * @returns
     */
    nextStepOperate(cb) {
        const { canvas, operateList, pointer } = this.state;
        let list = [...operateList];
        let currentPointer = pointer;
        // 指针移动
        currentPointer += 1;
        if (currentPointer >= list.length) {
            cb && cb(this.state.pointer, this.state.operateList);
            return;
        }
        canvas?.loadFromJSON(list[currentPointer]).renderAll();
        this.setState({
            operateList: [...list],
            pointer: currentPointer,
        });
        cb && cb(this.state.pointer, this.state.operateList);
    }

    /**
     * 合并状态
     * @param obj 状态
     */
    setState(options) {
        this.state = Object.assign(this.state, options);
    }
}
