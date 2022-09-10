//导入vue对象
import Vue from 'vue'

//导入vue-router对象
import VueRouter from 'vue-router'

//注入插件
Vue.use(VueRouter)

//定义路由 配置路由映射(组件和路径的映射关系)
const routes = [
  // 进入页面重定向
  {
    path: '/',
    redirect:{
      name:'control',
      name:'mains',
     },     

  },
  // 登录页面
  {
    path: '/login',
    name:'login',
    component:() => import('@c/Login.vue'),
    meta:{
      showNav: true
    }
  },
  // 控制面板
  {
    path: '/index/control',
    name:'control',    
    redirect:{
      name:'control',
      name:'mains',
     },
     meta:{
      requiresAuth: true  //添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('@c/Control.vue'),
    children:[
      {
        path: 'mains',
        name:'mains',
        component: () => import('@v/Control/Mains.vue'),
      },
      {
        path: 'self',
        name:'self',
        component: () => import('@v/Control/Self.vue'),
      },
    ]
  },
  // 功能模块
  {
    path: '/index/module',
    name:'module',
    redirect:{
      name:'module',
      name:'news',
     },
    component: () => import('@c/Module.vue'),
    children:[
      {
        path: 'newslist',
        name:'newslist',
        component: () => import('@v/Module/NewsList.vue'),
        children:[
          {
            path:'news',
            name:'news',
            // props: true,
            component:() => import('@v/Module/News.vue')
          },
          {
            path:'newsadd',
            name:'newsadd',
            component:() => import('@v/Module/NewsAdd.vue')
          },
          {
            path:'newsupdate',
            name:'newsupdate',
            component:() => import('@v/Module/NewUpdate.vue')
          }
        ]
      },
      {
        path: 'sayslist',
        name:'sayslist',
        component: () => import('@v/Module/SaysList.vue'),
        children:[
          {
            path:'says',
            name:'says',
            // props: true,
            component:() => import('@v/Module/Says.vue')
          },
          {
            path:'saysadd',
            name:'saysadd',
            component:() => import('@v/Module/SaysAdd.vue')
          },
          {
            path:'saysupdate',
            name:'saysupdate',
            component:() => import('@v/Module/SaysUpdate.vue')
          }
          
        ]
      },
      {
        path: 'messageslist',
        name:'messageslist',
        component: () => import('@v/Module/MessagesList.vue'),
        children:[
          {
            path:'messages',
            name:'messages',
            component:() => import('@v/Module/Messages.vue')
          },
          {
            path:'messagesupdate',
            name:'messagesupdate',
            component:() => import('@v/Module/MessagesUpdate.vue')
          },          
        ]
      },
      {
        path: 'friendlylink',
        name:'friendlylink',
        component: () => import('@v/Module/FriendlyLink.vue'),
      },
      {
        path: 'advertslist',
        name:'advertslist',
        component: () => import('@v/Module/AdvertsList.vue'),
        children:[
          {
            path:'adverts',
            name:'adverts',
            // props: true,
            component:() => import('@v/Module/Adverts.vue')
          },
          {
            path:'advertsadd',
            name:'advertsadd',
            component:() => import('@v/Module/AdvertsAdd.vue')
          },
          {
            path:'advertsupdate',
            name:'advertsupdate',
            component:() => import('@v/Module/AdvertsUpdate.vue')
          } 
        ]
      },
      {
        path: 'picturelist',
        name:'picturelist',
        component: () => import('@v/Module/PictureList.vue'),
        children:[
          {
            path:'picture',
            name:'picture',
            component:() => import('@v/Module/Picture.vue')
          },
          {
            path:'pictureadd',
            name:'pictureadd',
            component:() => import('@v/Module/PictureAdd.vue')
          }
        ]
      },
      {
        path:'videolist',
        name:'videolist',
        component:() => import('@v/Module/VideoList.vue'),
        children:[
          {
            path:'video',
            name:'video',
            component:() => import('@v/Module/Video.vue')
          },
          {
            path:'videoadd',
            name:'videoadd',
            component:() => import('@v/Module/VideoAdd.vue')
          }
        ]
      },  
      {
        path: 'random',
        name:'random',
        component: () => import('@v/Module/Random.vue'),
      },   
      {
        path:'userlist',
        name:'userlist',
        component:() => import('@v/Module/UserList.vue'),
        children:[
          {
            path:'user',
            name:'user',
            component:() => import('@v/Module/User.vue')
          },
          {
            path:'useradd',
            name:'useradd',
            component:() => import('@v/Module/UserAdd.vue')
          },
          {
            path:'userupdate',
            name:'userupdate',
            component:() => import('@v/Module/UserUpdate.vue')
          }
        ]
      }
    ]
  },
  // 系统设置
  {
    path: '/index/system',
    name:'system',
    component: () => import('@c/System.vue'),
    redirect:{
      name:'system',
      name:'dictionarytype',
     },
    children:[
      // 字典分类列表
      {
        path:'dictionarytype',
        name:'dictionarytype',
        component: () => import('@v/System/DictionaryType.vue')
      }, 
      // 字典列表       
      {
        path:'dictionarylist',
        name:'dictionarylist',
        component: () => import('@v/System/DictionaryList.vue'),
        redirect:{
          name:'dictionarylist',
          name:'dictionaryindex',
         },
        children:[
          //  字典列表-默认
          {
            path:'dictionary_index',
            name:'dictionaryindex',
            component:() => import('@v/System/DictionaryIndex.vue')
          },
          //  字典列表-文章
          {
            path:'dictionary_article',
            name:'dictionaryarticle',
            component:() => import('@v/System/DictionaryArticle.vue')
          },
          //  字典列表-广告
          {
            path:'dictionary_advert',
            name:'dictionaryadvert',
            component:() => import('@v/System/DictionaryAdvert.vue')
          },
          //  字典列表-相册
          {
            path:'dictionary_photo',
            name:'dictionaryphoto',
            component:() => import('@v/System/DictionaryPhoto.vue')
          },
          //  字典列表-应用分组
          {
            path:'dictionary_use',
            name:'dictionaryuse',
            component:() => import('@v/System/DictionaryUse.vue')
          },
          //  字典列表-黑名单封杀时长
          {
            path:'dictionary_blacklist',
            name:'dictionaryblacklist',
            component:() => import('@v/System/DictionaryBlacklist.vue')
          }, 
          //  字典列表-视频
          {
            path:'dictionary_video',
            name:'dictionaryvideo',
            component:() => import('@v/System/DictionaryVideo.vue')
          },
          //  字典列表-短信来源
          {
            path:'dictionary_note',
            name:'dictionarynote',
            component:() => import('@v/System/DictionaryNote.vue')
          },   
          //  字典列表-其他
          {
            path:'dictionary_other',
            name:'dictionaryother',
            component:() => import('@v/System/DictionaryOther.vue')
          },  
          //  字典列表-MySQL列类型
          {
            path:'dictionary_mysql',
            name:'dictionarymysql',
            component:() => import('@v/System/DictionaryMysql.vue')
          },              
        ]
      }, 
      {
        path:'blacklist',
        name:'blacklist',
        component: () => import('@v/System/BlackList.vue')
      },     
      {
        path:'area',
        name:'area',
        component: () => import('@v/System/Area.vue'),
      }, 
      // 操作日志
      {
        path:'handle',
        name:'handle',
        component: () => import('@v/System/Handle.vue')
      }, 
      // 回收站
      {
        path:'recylebin',
        name:'recylebin',
        component: () => import('@v/System/RecyleBin.vue')
      }, 
      // IP管理
      {
        path:'manage',
        name:'manage',
        component: () => import('@v/System/Manage.vue')
      },  
      // 短信日志
      {
        path:'note',
        name:'note',
        component: () => import('@v/System/Note.vue')
      },  
      // 邮件日志
      {
        path:'mail',
        name:'mail',
        component: () => import('@v/System/Mail.vue')
      },   
    ]
  },
  // 权限控制
  {
    path: '/index/limit',
    name:'limit',
    component: () => import('@c/Limit.vue'),
    redirect:{
      name:'limit',
      name:'node',
     },    
    children:[
      {
        path:'node',
        name:'node',
        component: () => import('@v/Limit/Node.vue')
      },
      {
        path:'rolelist',
        name:'rolelist',
        component: () => import('@v/Limit/RoleList.vue'),
        children:[
          {
            path:'role',
            name:'role',
            component: () => import('@v/Limit/Role.vue'),
          },
          {
            path:'role_dispose',
            name:'roledispose',
            component: () => import('@v/Limit/RoleDispose.vue')
          }
        ]
      },
      {
        path:'admin',
        name:'admin',
        component: () => import('@v/Limit/Admin.vue')
      },
    ]
  },
  // 数据图表
  {
    path: '/index/chart',
    name:'chart',
    redirect:{
      name:'chart',
      name:'weeklist',
     },
    component: () => import('@c/Chart.vue'),
    children:[
      {
        path:'weeklist',
        name:'weeklist',
        component:() => import('@v/Chart/WeekList.vue')
      },
      {
        path:'daylist',
        name:'daylist',
        component:() => import('@v/Chart/DayList.vue')
      }
    ]
  },
  //演示
  {
    path: '/index/demo',
    name:'demo',
    component: () => import('@c/Demo.vue'),
  },
  
]

//创建路由实例
const router = new VueRouter({
  mode: 'history',
  routes
})

// 登陆页面的权限
router.beforeEach((to,from,next) => {
  //判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requiresAuth))
  {
    //路由需要验证，判断用户是否已经登录
    //否则判断用户是否已经登录，注意这里是字符串判断
    if(sessionStorage.isAuth === "true"){
      next();
    }
    //如果用户访问的是受保护的资源，且没有登录，则跳转到登录页面，
    //并将当前路由的完整路径作为query查询参数传给Login组件，以便登录成功后返回先前的页面
    else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}    //to.fullPath为当前点击的页面也就是 /videos  赋值给redirect变量
      });
    }
  }else{
     // 判断目标路由是否是/login，如果是，直接调用next()方法
     next();
  }
})

//解决重复点击导航时，控制台出现报错 
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//导出 router 实例
export default router
