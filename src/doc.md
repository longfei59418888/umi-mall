### 内置功能

###### 内置hook公共
- 约定定义方式：约定可以在 src/models, src/pages/xxxx/models/目录中，和 src/pages/xxxx/model.{js,jsx,ts,tsx} 文件引入 Model 文件
  - src/models/userModel.ts userModel
  - src/pages/pageA/model.ts pageA.model
  - src/pages/pageB/models/product.ts pageB.product
- 约定使用方式：
  - const { user, loading } = useModel('userModel');
  - const { user, loading } = useModel('pageA.model');
###### 初始化数据

- 通过 useModel('@@initialState') 获取
```ts
// src/app.ts
export async function getInitialState() {
  const initialData = await fetchInitialData();
  return initialData;
}
```

###### 权限控制
- 每一条都是一个权限
  - 路由定义  access: 'canReadPageA'
  - hook使用 const access = useAccess(); 
  - 使用组件 <Access accessible={access.canReadFoo} fallback={<div>Can not read foo content.</div>}>Foo content.</Access>
```ts
// src/access.ts
export default function (initialState) {
  const { userId, role } = initialState;

  return {
    canReadFoo: true,
    canUpdateFoo: role === 'admin',
    canDeleteFoo: (foo) => {
      return foo.ownerId === userId;
    },
  };
}
```

### layout 配置 
- layout 配置
  - 属性 @ant-design/pro-layout 透传

###### 配置文件 config/config.ts
```ts
export default defineConfig({
  layout: {
    title: 'Ant Design',
    locale: false, // 默认开启，如无需菜单国际化可关闭
  },
});
```

###### 运行时配置 src/app.tsx

```tsx
export const layout: RunTimeLayoutConfig = (initialState) => {
  return {
    // 常用属性
    title: 'Ant Design',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',

    // 默认布局调整
    rightContentRender: () => <RightContent />,
    footerRender: () => <Footer />,
    menuHeaderRender: undefined,

    // 其他属性见：https://procomponents.ant.design/components/layout#prolayout
  };
};
```

### route 配置
```ts
// config/route.ts
export const routes: IBestAFSRoute[] = [
  {
    path: '/welcome',
    component: 'IndexPage',
    name: '欢迎', // 兼容此写法
    icon: 'testicon',
    // 更多功能查看
    // https://beta-pro.ant.design/docs/advanced-menu
    // ---
    // 新页面打开
    target: '_blank',
    // 不展示顶栏
    headerRender: false,
    // 不展示页脚
    footerRender: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
    // 权限配置，需要与 plugin-access 插件配合使用
    access: 'canRead',
    // 隐藏子菜单
    hideChildrenInMenu: true,
    // 隐藏自己和子菜单
    hideInMenu: true,
    // 在面包屑中隐藏
    hideInBreadcrumb: true,
    // 子项往上提，仍旧展示,
    flatMenu: true,
  },
];
```

### 请求拦截器配置
```ts
import type { RequestConfig } from 'umi';

export const request: RequestConfig = {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler(){
    },
    errorThrower(){
    }
  },
  requestInterceptors: [],
  responseInterceptors: []
};
```
