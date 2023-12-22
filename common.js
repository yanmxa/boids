// 动画执行的帧数
let start = 0, frames = 200;
// 过渡颜色 蓝色 到 红色
let to = [0, 0, 255];
let from = [255, 0, 0];
// 动画算法，这里使用Cubic.easeOut算法
let cubicEaseOut = function(t, b, c, d) {
    return c * ((t = t/d - 1) * t * t + 1) + b;
};

function cutColor(from, to, frameCount) {
    // 动画执行的帧数
    let start = 0, frames = 200;
    // 过渡颜色 蓝色 到 红色
    let to = [0, 0, 255];
    let from = [255, 0, 0];
    // 计算此时r, g, b数值
    var r = cubicEaseOut(start, from[0], to[0] - from[0], frames);
    var g = cubicEaseOut(start, from[1], to[1] - from[1], frames);
    var b = cubicEaseOut(start, from[2], to[2] - from[2], frames);
    return [r, g, b];
}
