import { IRoute } from '@umijs/types';

const routes: IRoute[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '登录',
    path: '/login',
    component: './login',
    layout: false, // 登录页面不需要布局
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    path: '/product',
    name: '商品管理',
    icon: 'ShopOutlined',
    access: '/product',
    routes: [
      {
        path: '/product/category',
        name: '商品分类',
        access: '/product/category',
        icon: 'AppstoreOutlined',
        component: './product/category',
      },
      {
        path: '/product/category/subdivision',
        name: '二级商品分类管理',
        access: '/product/category/subdivision',
        icon: 'ShopOutlined',
        hideInMenu: true,
        component: './product/category/subdivision',
      },
      {
        path: '/product/brand',
        name: '品牌管理',
        access: '/product/brand',
        icon: 'TrademarkOutlined',
        component: './product/brand',
      },
      {
        path: '/product/attributeCategory',
        name: '属性分类',
        access: '/product/attributeCategory',
        icon: 'DatabaseOutlined',
        component: './product/attributeCategory',
      },
      {
        path: '/product/attribute/:type',
        name: '属性管理',
        access: '/product/attribute/:type',
        icon: 'DatabaseOutlined',
        hideInMenu: true,
        component: './product/attributeCategory/attribute',
      },
      {
        path: '/product/manage',
        name: '商品管理',
        access: '/product/manage',
        icon: 'ShopOutlined',
        component: './product/manage',
      },
      {
        path: '/product/manage/option',
        name: '商品详细管理',
        access: '/product/manage/option',
        icon: 'ShopOutlined',
        hideInMenu: true,
        component: './product/manage/option',
      },
      // 可以在这里添加其他商品管理相关路由
    ],
  },
  {
    path: '/manage',
    name: '管理中心',
    icon: 'SettingOutlined',
    access: '/manage',
    routes: [
      {
        path: '/manage/admin',
        name: '账户管理',
        access: '/manage/admin',
        icon: 'UserOutlined',
        component: './manage/admin',
      },
      {
        path: '/manage/menu',
        name: '菜单管理',
        access: '/manage/menu',
        icon: 'MenuOutlined',
        component: './manage/menu',
      },
      {
        path: '/manage/permission',
        name: '权限管理',
        access: '/manage/permission',
        icon: 'SafetyOutlined',
        component: './manage/permission',
      },
      {
        path: '/manage/role',
        name: '角色管理',
        access: '/manage/role',
        icon: 'TeamOutlined',
        component: './manage/role',
      },
    ],
  },
];

export default routes;
