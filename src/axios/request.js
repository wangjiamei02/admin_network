//用来封装
import axios from 'axios'
import qs from 'qs';

//实例接口：https://api.apiopen.top/api/sentences
//配置基础url'http://xxx.xx.xx.xxx:xxxx'、超时时间、post请求头 

//实例的配置项
//自定义axios实例添加拦截器
const serve = axios.create({ //用axios创建实例对象
    baseURL:'http://120.53.104.223/wangjiamei/api' //请求的域名 api的base_url
});
serve.defaults.headers.post['Content-Type'] = 'application/X-www-form-urlencoded'; //全局设置post请求的数据编码格式

//------------------请求拦截-------------------//
//------------在发送请求之前做些什么------------//
//config 是为请求提供的配置信息 对象型
serve.interceptors.request.use(config => {
    //在发送请求之前做些什么
    //例如：可以设置请求携带token;可以设置loading加载
    console.log("请求拦截=>",config);
    //如果config配置对象中的method请求类型为post
    //就对传递的参数使用qs.stringify()进行序列化处理
    //使用扩展运算符对参数进行一个整合
    config.method === 'post' ?
        config.data = qs.stringify({
            ...config.data
        }):
        config.params = {
            ...config.params
        };
        //设置即将被发送的自定义请求头的格式
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        //在对config的内容设置完毕之后
        //需要添加return config进行返回
        return config;
},err => {
    // 对请求错误做些什么
    //可以设置出现错误弹框;跳转到错误页等
    console.log("请求拦截=>",err);
    return err;
});

//------------------响应拦截-------------------//
//-------------对响应数据做点什么-------------//
//2xx 3xx开头的数字值在res中执行
//4xx 5xx开头的数字值在err中执行
serve.interceptors.response.use(res => {
    // 对响应数据做点什么
    console.log("响应拦截=>",res.data.message);
    //这里根据后端提供的数据进行对应的处理
    if(res.data.code == 200) {  //如果code为200代表数据成功返回
        return (res && res.data && res.data.result) ? res.data.result : ''
    }else{
        //常规错误处理
        //例：弹出带有错误信息的弹框
        Message({
            message:res.data.message + ',请重试！',
            type:'warning'
        });
    }
},err => {  //响应错误处理
     // 对响应错误做点什么
    console.log(err);
    //打印完整的错误信息
    console.log("响应拦截错误完整信息=>",err.res)
    //也可以在这里对不同的错误码做不同的展示处理
    throw err;
})

//把实例暴露出去 实例只有暴露之后才可以使用
export default serve;