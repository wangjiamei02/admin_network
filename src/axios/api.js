//用来定义接口
import serve from './request.js'
//注意：使用创建的 axios 实例请求时，实例的配置将与请求的配置项合并。
//请求的配置项
export const getVal = () => {   //如果是post请求()里面需要传递参数
    return serve({
        //这里的配置项会传递到request.js请求拦截中的config中
        //因为这里只是对api进行一个配置,此时的请求还没有被发送出去 
        //所以会在request.js中发送请求前被拦截
        url:'/list.php',
        method:'get',
        // params:{
        //     id:'wjm'
        // }
    })
};
//登录时间
export const loginTime = () => { 
    return serve({  
        url:'/logintime.php',
        method:'get',
    })
};
//控制面板-卡片数据
export const getMains = () => { 
    return serve({  
        url:'/mains.php',
        method:'get',
    })
};
//功能模块-新闻列表页
export const getNews = () => { 
    return serve({  
        url:'/news.php',
        method:'get',
    })
};
//功能模块-新闻列表页-添加
export const newsAdd = (data) => {   
    return serve({
        url:'/newsadd.php',
        method:'post',
        data:data
    })
};
//功能模块-新闻列表页-搜索
export const newsSearch = (formItem) => {   
    return serve({
        url:'/newssearch.php',
        method:'get',
        params:formItem
    })
};
//功能模块-新闻列表页-修改
export const newsUpdate = (data) => {   
    return serve({
        url:'/newsupdate.php',
        method:'put',
        data:data
    })
};
//功能模块-新闻列表页-分页二级联动数据
export const getItemize = () => { 
    return serve({  
        url:'/news_itemize.php',
        method:'get',
    })
};
//功能模块-新闻列表页-批量删除数据
export const deleteData = (ids) => { 
    return serve({  
        url:'/news.php',
        method:'get',
        params:{
            id:ids
        }
    })
};
//功能模块-新闻列表页-修改按钮
export const UpdateListData = (id) => { 
    return serve({  
        url:'/news.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//功能模块-说说列表页
export const getSays = () => { 
    return serve({  
        url:'/says.php',
        method:'get',
    })
};
//功能模块-说说列表页-批量删除数据
export const deleteSaysData = (ids) => { 
    return serve({  
        url:'/says.php',
        method:'get',
        params:{
            id:ids
        }
    })
};
//功能模块-说说列表页-修改按钮
export const UpdateSaysData = (id) => { 
    return serve({  
        url:'/says.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//功能模块-留言列表页
export const getMessage = () => { 
    return serve({  
        url:'/messages.php',
        method:'get',
    })
};
//功能模块-留言列表页表格查看新闻列表页数据
export const messageCheck = (id) => { 
    return serve({  
        url:'/news.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//功能模块-留言列表页-修改按钮
export const UpdateMessageData = (id) => { 
    return serve({  
        url:'/messages.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//功能模块-广告列表页
export const getAdverts = () => { 
    return serve({  
        url:'/adverts.php',
        method:'get',
    })
};
//功能模块-广告列表页-批量删除数据
export const deleteAdvertsData = (ids) => { 
    return serve({  
        url:'/adverts.php',
        method:'get',
        params:{
            id:ids
        }
    })
};
//功能模块-广告列表页-修改按钮
export const UpdateAdvertsData = (id) => { 
    return serve({  
        url:'/adverts.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//功能模块-友情链接列表页
export const getFriendlyLink = (id) => { 
    return serve({  
        url:'/friendlylink.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//功能模块-用户列表页
export const getUser = () => { 
    return serve({  
        url:'/user.php',
        method:'get',
    })
};
//功能模块-用户列表页-修改按钮
export const UserUpdateData = (id) => { 
    return serve({  
        url:'/user.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//系统设置-字典分类列表页
export const getDictionary = () => { 
    return serve({  
        url:'/dictionarytype.php',
        method:'get',
    })
};
//系统设置-字典列表页
export const getDictionaryList = (id) => { 
    return serve({  
        url:'/dictionarylist.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//系统设置-地区列表页-一级分类
export const getArea = (id) => { 
    return serve({  
        url:'/area.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//系统设置-操作日志页
export const getHandle = (id) => { 
    return serve({  
        url:'/handle.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//系统设置-IP管理页
export const getManage = (id) => { 
    return serve({  
        url:'/manage.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//系统设置-IP管理页-修改按钮
export const alterManage = (id) => { 
    return serve({  
        url:'/manage.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//控制权限-节点分类列表页-表格数据
export const getNode = (id) => { 
    return serve({  
        url:'/node.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//控制权限-角色列表页-表格数据
export const getRole = (id) => { 
    return serve({  
        url:'/role.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//权限控制-角色列表页-权限配置按钮
export const DisposeData = (id) => { 
    return serve({  
        url:'/role.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//权限控制-管理员列表页-表格数据
export const getAdmin = (id) => { 
    return serve({  
        url:'/admin.php',
        method:'get',
        params:{
            id:id
        }
    })
};
//如果是post请求()里面需要传递参数
export const postVal = (data) => {   
    return serve({
        url:'/uploads.php',
        method:'post',
        data:data
    })
};