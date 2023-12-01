import { IAjax } from 'src/interface';

// 转对象为字符串
export const changeObjectToStr = (obj: any) => {
    if (!obj) {
        return obj;
    }
    let result: any = {};
    const change = (obj: any, data = '') => {
        for (let i in obj) {
            if (typeof obj[i] === 'object') {
                change(obj[i], `${data}${i}.`);
            } else {
                result[`${data}${i}`] = obj[i];
            }
        }
    };
    change(obj);
    return result;
};

// 动态加载js
export const loadScript = (url: string, callback?: Function) => {
    if (!url) return;
    let script = document.createElement('script');
    script.src = url;
    script.onload = () => {
        callback && callback(script);
    };
    document.body.appendChild(script);
};

/**
 * 
 * @param options = {
 *   data?: {  数据
        [key: string]: string
    };
    type?: string; 类型 get/post
    url: string; 链接
    header?: { 请求头
        [key: string]: string | undefined
    };
    success: Function; 成功回调
    error?: Function; 失败回调
    async?: boolean; 是否异步
    responseType?: XMLHttpRequestResponseType; 返回类型
    othersData?:any;} 其他参数
 */
export const ajax = (options: IAjax) => {
    // 存储的是默认值
    const defaults: IAjax = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/json',
        },
        success: function () {},
        error: function () {},
        async: true,
    };

    // 使用options对象中的属性覆盖defaults对象中的属性
    Object.assign(defaults, options);

    // 创建ajax对象
    var xhr = new XMLHttpRequest();
    // 拼接请求参数的变量
    var params = '';
    // 循环用户传递进来的对象格式参数
    for (var attr in defaults.data) {
        // 将参数转换为字符串格式
        params += attr + '=' + defaults.data[attr] + '&';
    }
    // 将参数最后面的&截取掉
    // 将截取的结果重新赋值给params变量
    params = params.substr(0, params.length - 1);

    // 判断请求方式
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    }

    if (defaults.responseType) {
        xhr.responseType = defaults.responseType;
    }

    // 配置ajax对象
    xhr.open(defaults.type as string, defaults.url, defaults.async || false);

    // 监听xhr对象下面的onload事件
    // 当xhr对象接收完响应数据后触发
    xhr.onload = function () {
        // xhr.getResponseHeader()
        // 获取响应头中的数据
        var contentType = xhr.getResponseHeader('Content-Type');
        // 服务器端返回的数据
        var responseText = xhr.response;
        // 如果响应类型中包含applicaition/json
        if (contentType && contentType.includes('application/json')) {
            // 将json字符串转换为json对象
            responseText = JSON.parse(responseText);
        }

        // 当http状态码等于200的时候
        if (xhr.status == 200) {
            // 请求成功 调用处理成功情况的函数
            defaults.success(responseText, xhr);
        } else {
            // 请求失败 调用处理失败情况的函数
            (defaults.error as Function)(responseText, xhr);
        }
    };
    // 如果请求方式为post
    if (defaults.type == 'post') {
        // 用户希望的向服务器端传递的请求参数的类型
        var contentType = (defaults.header as any)['Content-Type'];
        if (contentType)
            // 设置请求参数格式的类型
            xhr.setRequestHeader('Content-Type', contentType);
        // 判断用户希望的请求参数格式的类型
        // 如果类型为json
        if (contentType == 'application/json') {
            // 向服务器端传递json数据格式的参数
            xhr.send(JSON.stringify(defaults.data));
        } else {
            // 向服务器端传递普通类型的请求参数
            xhr.send(params || defaults.othersData);
        }
    } else {
        // 发送请求
        xhr.send();
    }
};

/**
 * 在数组中通过value 查找对象
 * @param dataList 数组
 * @param value 值
 * @returns 返回找到的对象
 */
export const getKeyValue = (dataList: any[], value: any, property = 'value') => {
    return dataList.find((item: any) => item[property] === value);
};

/**
 * 图片转base64
 * @param file 上传的文件
 * @returns
 */
export const imageChangeBase64 = (file: Blob) => {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        // let imgResult = '';
        reader.readAsDataURL(file);
        reader.onload = function () {
            // imgResult = reader.result as string;
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
        // reader.onloadend = function () {
        //     resolve(imgResult);
        // };
    });
};

/**
 * 清空object 数据
 */
export const clearObject = (obj: { [x: string]: undefined | any }) => {
    for (const key in obj) {
        if (typeof obj[key] === 'boolean') {
            obj[key] = false;
        } else {
            obj[key] = undefined;
        }
    }
    return obj;
};

/**
 * 上传文件
 * @param rootElement Element 节点
 * @param accept 接受的文件类型
 * @param cb 上传成功后回调
 */
export const importFile = (
    rootElement: Element | HTMLElement,
    accept = 'image/png',
    cb: Function
) => {
    var file = document.createElement('input');
    // file.setAttribute("id", "dcInputFile");
    file.setAttribute('type', 'file');
    file.setAttribute('accept', accept);
    file.style.display = 'none';
    rootElement.appendChild(file);
    file.click();
    //file文件选中事件
    file.onchange = function () {
        var files;
        if (file.files) {
            files = file.files[0];
        }
        if (files) {
            cb && cb(files);
        }
    };
    //在编辑器的window重新获取焦点时,确保点击取消或X时能正确删除file
    window.addEventListener(
        'focus',
        function () {
            setTimeout(function () {
                file.remove();
            }, 100);
        },
        { once: true }
    );
};
