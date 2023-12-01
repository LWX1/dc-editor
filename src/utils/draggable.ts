// @ts-nocheck
export const mousedown = function (event: MouseEvent) {
    // 获取开始盒子的位置
    const { left, top } = this.getBoundingClientRect();
    // 将需要的数据挂载到对象上
    // 盒子起始的位置
    this.startLeft = left;
    this.startTop = top;
    // 鼠标在盒子上点击时的起始位置
    this.startX = event.clientX;
    this.startY = event.clientY;
    // 鼠标按下 绑定鼠标移动事件
    this._MOVE = move.bind(this);
    this._UP = up.bind(this);
    window.addEventListener('mousemove', this._MOVE);
    window.addEventListener('mouseup', this._UP);
};
// 鼠标移动 拖拽盒子事件
const move = function (event: MouseEvent) {
    // 获取盒子当前的 left top
    let curLeft = event.clientX - this.startX + this.startLeft;
    let curTop = event.clientY - this.startY + this.startTop;
    // // 边界判断 不能超出当前屏幕
    // curLeft = curLeft < 0 ? 0 : curLeft > maxLeft ? maxLeft : curLeft;
    // curTop = curTop < 0 ? 0 : curTop > maxTop ? maxTop : curTop;
    // 更新盒子的位置
    this.style.left = curLeft + 'px';
    this.style.top = curTop + 'px';
};

const up = function (event: MouseEvent) {
    // 鼠标抬起 取消鼠标移动事件绑定
    window.removeEventListener('mousemove', this._MOVE);
    window.removeEventListener('mouseup', this._UP);
};
