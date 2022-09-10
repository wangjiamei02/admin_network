import { 
    Layout,
    Content,
    Sider,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Input,
    Icon,
    Message, 
    Modal,
    Row,
    Button,
    Col,
    Card,
    FormItem,
    Upload,
    Form,
    DatePicker,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Page,
    Select,
    Table,
  } from 'iview'
  Vue.component('Layout',Layout)  //布局
  Vue.component('Content',Content)  //布局
  Vue.component('Sider',Sider)  //侧边栏
  Vue.component('Menu',Menu)  //菜单组件
  Vue.component('Submenu',Submenu)  //1级菜单组件
  Vue.component('MenuItem',MenuItem)  //2级菜单组件
  Vue.component('Breadcrumb',Breadcrumb)  //面包屑1级菜单组件
  Vue.component('BreadcrumbItem',BreadcrumbItem)  //面包屑2级菜单组件
  Vue.component('Input',Input)  //input组件
  Vue.component('Icon',Icon)  //图标
  Vue.component('Message',Message)  //全局提示
  Vue.component('Modal',Modal)  //对话框
  Vue.component('Row',Row)  //栅格
  Vue.component('Button',Button)  //按钮button组件
  Vue.component('Col',Col)  //栅格
  Vue.component('Card',Card)  //卡片组件
  Vue.component('FormItem',FormItem)  //表单项
  Vue.component('Upload',Upload)  //上传文件
  Vue.component('Form',Form)  //表单
  Vue.component('DatePicker',DatePicker)  //日期选择器
  Vue.component('Dropdown',Dropdown)  //下拉菜单
  Vue.component('DropdownMenu',DropdownMenu)  //下拉菜单
  Vue.component('DropdownItem',DropdownItem)  //下拉菜单-选项
  Vue.component('Page',Page)  //分页
  Vue.component('Select',Select)  //选择器
  Vue.component('Table',Table)  //表格
  Vue.component('Dropdown',Dropdown)  //模态框
  Vue.component('Dropdown',Dropdown)  //模态框
  Vue.component('Dropdown',Dropdown)  //模态框
  
  //$Message $Modal都是针对提示信息的，以API的方式来进行定义的
  //iview中Message组件是以API的方式书写的，所以组成时不能用component，而是要用Vue.prototype.$Message来声明注册
  Vue.prototype.$Message = Message  
  Vue.prototype.$Modal = Modal  //iview中Modal组件一次性的轻量级对话框
  
  export default iview