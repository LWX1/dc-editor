/**
 * 绘制图形
 */
export class CDraw {
    /** 画布 */
    canvas: HTMLCanvasElement;
    /** 画布宽度 */
    width: number = 500;
    /** 画布高度 */
    height: number = 500;
    /** 画笔填充 */
    fill: string = '';
    /** 画笔颜色 */
    stroke: string = '';
    /**
     * 实例化画布并设置默认大小
     * @param options 实例化配置文件
     */
    constructor(options: {
        id: string;
        width?: number;
        height?: number;
        stroke?: string;
        fill?: string;
    }) {
        this.fill = options.fill as string;
        this.stroke = options.stroke as string;
        // let canvasElement = document.getElementById(options.id);

        // console.log(canvasElement);
        this.canvas = new window.fabric.Canvas(options.id, {
            containerClass: 'my-canvas-container',
        });
        // console.log(this.canvas, 6666);
        this.setSize(options.width, options.height);
    }

    /**
     * 设置填充和画笔颜色
     * @param options 配置
     */
    setFillStroke(options: { fill?: string; stroke?: string }) {
        this.fill = options.fill || this.fill;
        this.stroke = options.stroke || this.stroke;
    }

    /**
     * 设置画布大小
     * @param width 宽度
     * @param height 高度
     */
    setSize(width?: number, height?: number) {
        this.width = width || this.width;
        this.height = height || this.height;
        this.canvas?.setDimensions({
            width: this.width,
            height: this.height,
        });
    }

    /**
     * 加载图片到画布上
     * @param src 图片地址
     * @param inneradditionshape 图片内部形状
     * @param cb 回调函数
     */
    loadImage(src, inneradditionshape, cb?) {
        let img = new Image();
        // debugger;
        // console.log(src);
        if (src.indexOf(',') === -1) {
            img.src = 'data:image/png;base64,' + src;
        } else {
            img.src = src;
        }
        const canvas = this.canvas as HTMLCanvasElement;
        // console.log(img.src);
        img.onload = () => {
            // debugger;
            // 设置画布的宽高
            this.setSize(img.width, img.height);
            if (inneradditionshape) {
                let loadobj = JSON.parse(inneradditionshape);
                canvas.loadFromJSON(loadobj, function () {
                    canvas.renderAll();
                    cb && cb(img);
                });
            } else {
                // 将base64图片设置成背景
                canvas.setBackgroundImage(img.src, function () {
                    canvas.renderAll(); // 刷新画布
                    cb && cb(img);
                });
            }
        };
    }

    /**
     * 清空所有事件
     * @param cb 回调函数
     */
    clearAllEvents(cb?) {
        if (this.canvas) {
            this.canvas.off('mouse:down');
            this.canvas.off('mouse:move');
            this.canvas.off('mouse:up');
            cb && cb();
        }
    }

    /**
     * 删除图形
     * @param cb 回调函数
     */
    deleteDraw(cb?) {
        let dc_active = this.canvas.getActiveObject();
        if (dc_active) {
            this.canvas.remove(dc_active);
            if (dc_active.type == 'activeSelection') {
                dc_active.getObjects().forEach((x) => {
                    this.canvas.remove(x);
                });
                this.canvas.discardActiveObject().renderAll();
            }
            cb && cb();
        }
    }

    /**
     * 绘制矩形
     * @param cb 回调函数
     */
    drawRect(cb) {
        let isMouseDown = false; //是否鼠标按下
        let rect;
        this.canvas.on('mouse:down', (options) => {
            if (options.target) {
                return;
            }
            let left = options.pointer.x;
            let top = options.pointer.y;
            isMouseDown = true;
            rect = new window.fabric.Rect({
                left: left,
                top: top,
                fill: this.fill,
                stroke: this.stroke,
                opacity: 0.6,
            });
            // 添加矩形到画布上
            this.canvas.add(rect);
        });
        this.canvas.on('mouse:move', (options) => {
            if (isMouseDown) {
                let move_left = options.pointer.x - rect.left;
                let move_top = options.pointer.y - rect.top;
                rect.set({
                    width: move_left,
                    height: move_top,
                });
                this.canvas.renderAll();
            }
        });
        this.canvas.on('mouse:up', () => {
            isMouseDown = false;
            if (rect) {
                if (rect.get('width') == 0 || rect.get('height') == 0) {
                    this.canvas.remove(rect); // 移除这个矩形
                    this.clearAllEvents();
                } else {
                    this.clearAllEvents(cb);
                }
            }
        });
    }

    /**
     * 绘制椭圆
     * @param cb 回调函数
     */
    drawEllipse(cb) {
        let isMouseDown = false; //是否鼠标按下
        let Ellipse;
        let downPointer;
        this.canvas.on('mouse:down', (options) => {
            if (options.target) {
                return;
            }
            downPointer = options.pointer;
            let left = options.pointer.x;
            let top = options.pointer.y;

            isMouseDown = true;
            Ellipse = new window.fabric.Ellipse({
                left,
                top,
                fill: this.fill,
                stroke: this.stroke,
                opacity: 0.3,
            });
            // 添加椭圆形到画布上
            this.canvas.add(Ellipse);
        });
        this.canvas.on('mouse:move', (options) => {
            if (isMouseDown) {
                let move_left = options.pointer.x - downPointer.x;
                let move_top = options.pointer.y - downPointer.y;
                if (move_left != 0 || move_top != 0) {
                    let obj = {
                        left: Math.min(options.pointer.x, downPointer.x),
                        top: Math.min(options.pointer.y, downPointer.y),
                        rx: Math.abs(move_left) / 2,
                        ry: Math.abs(move_top) / 2,
                    };
                    Ellipse.set(obj);
                    this.canvas.renderAll();
                }
            }
        });
        this.canvas.on('mouse:up', (options) => {
            isMouseDown = false;
            if (Ellipse.get('rx') == 0 || Ellipse.get('ry') == 0) {
                this.canvas.remove(Ellipse); // 移除这个椭圆形
                this.clearAllEvents();
            } else {
                this.clearAllEvents(cb);
            }
        });
    }

    /**
     * 绘制线
     * @param cb 回调函数
     */
    drawLine(cb) {
        let isMouseDown = false; //是否鼠标按下
        let Line;
        let downPointer;
        this.canvas.on('mouse:down', (options) => {
            if (options.target) {
                return;
            }
            downPointer = options.pointer;
            // let left = options.pointer.x;
            // let top = options.pointer.y;
            isMouseDown = true;
            // Line = new fabric.Line([left, top],{
            //   stroke: 'black', // 笔触颜色
            // });
            // 添加椭圆形到画布上
            // canvas.add(Line);
        });
        this.canvas.on('mouse:move', (options) => {
            if (isMouseDown) {
                let move_left = options.pointer.x - downPointer.x;
                let move_top = options.pointer.y - downPointer.y;
                this.canvas.remove(Line);
                if (move_left != 0 || move_top != 0) {
                    let obj = {
                        x2: options.pointer.x,
                        y2: options.pointer.y,
                    };
                    Line = new window.fabric.Line([downPointer.x, downPointer.y, obj.x2, obj.y2], {
                        stroke: 'black', // 笔触颜色
                    });
                    // 添加椭圆形到画布上
                    this.canvas.add(Line);
                    // Line.set(obj);
                    this.canvas.renderAll();
                }
            }
        });
        this.canvas.on('mouse:up', (options) => {
            isMouseDown = false;
            this.clearAllEvents();
            if (Line) {
                cb && cb();
            }
        });
    }

    /**
     * 绘制字体
     * @param cb 回调函数
     */
    drawText(cb) {
        this.canvas.on('mouse:up', (options) => {
            if (options.target) {
                return;
            }
            let dc_active = this.canvas.getActiveObject();
            if (dc_active) {
                return;
            }
            let left = options.pointer.x;
            let top = options.pointer.y;
            let IText = new window.fabric.IText('默认文字', {
                left: left,
                top: top,
            });
            this.canvas.add(IText);
            this.clearAllEvents(cb);
        });
    }
}
