 import axios from 'axios';

//  if (process.env.NODE_ENV !== 'production' &&
//  config.productionTip !== false &&
//  inBrowser && typeof console !== 'undefined'
// )
//  console.log(process.env.NODE_ENV,'2134');
 if (process.env.NODE_ENV === 'development') {
     var base = 'api';
 }else {
    var base = '';
 }
 
 //全局设置token,解决刷新时请求不走拦截器,没有token的情况
 if (sessionStorage.getItem('token')) {
     axios.defaults.headers.common.token = sessionStorage.getItem('token'); 
 }
 

 //登录
 export const requestLogin = params => { return axios.post(`${base}/login/loginByUsername`, {},{params:params}).then(res => res.data); };

 //退出
 export const requestLogout = () => { return axios.get(`${base}/user/logout`).then(res => res.data)};

//字体管理
 export const getFontList = params => {
     return axios({
         method: 'post',
         url: `${base}/web/font/getFontList`,
         data: params.font,
         params: {page:params.page,pageSize:params.pageSize},
         headers: {"X-Requested-With": "XMLHttpRequest"},
         emulateJSON: true
     }).then(res => res.data);
 }

 export const getsmallPic= params => { return axios.get(`${base}/web/font/createFontSmallPic`,{params: params}).then(res => res.data); };  //生成字体小图

 export const getFontDetail= params => { return axios.get(`${base}/web/font/getFontDetail`,{ params: params }).then(res => res.data); };

 export const getFontResource = params => {return axios.get(`${base}/web/font/downFont`,{params: params}).then(res => res.data);};   //获取字体资源

 export const getFontFamily = () => {return axios.get(`${base}/web/font/getFontFamily`).then(res => res.data);};  //获取家族字体id和名称

 export const uploadImage = params => { return axios.post(`${base}/file/uploadImage`,params).then(res => res.data); };  //更新图片

 export const checkName = params => {return axios.get(`${base}/web/font/checkName`,params).then(res => res.data);}; //查询字体名称是否存在

 //新增字体
 export const addFont = params => {
     return axios({
         method: 'post',
         url: `${base}/web/font/addFont`,
         data: params,
         headers: {"X-Requested-With": "XMLHttpRequest"},
         emulateJSON: true
     }).then(res => res.data)
 };

 export const addFontVersion = params => {
    return axios({
        method: 'post',
        url: `${base}/web/font/version/addFontVersion`,
        data: params,
        headers: {"X-Requested-With": "XMLHttpRequest"},
        emulateJSON: true
    }).then(res => res.data) 
};  //新增字体版本

 export const updateFontVersion = params => {
    return axios({
        method: 'post',
        url: `${base}/web/font/version/updateFontVersion`,
        data: params,
        headers: {"X-Requested-With": "XMLHttpRequest"},
        emulateJSON: true
    }).then(res => res.data)
 };   //更新字体版本

 export const updateFontDetail = params => {
    return axios({
        method: 'post',
        url: `${base}/web/font/updateFontDetail`,
        data: params,
        headers: {"X-Requested-With": "XMLHttpRequest"},
        emulateJSON: true
    }).then(res => res.data) 
 };  //更新字体详情

 export const delFont = params => {return axios.post(`${base}/web/font/delFont`,{},{params:params}).then(res => res.data)};  //删除字体

//作者管理
export const getEndUser = params => {return axios.get(`${base}/web/font/enduser/getUserList`,{params:params}).then(res => res.data)};
