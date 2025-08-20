### 页面生成

```
仿照页面 src/pages/product/category(index.ts和config.ts) 代码，并且基于接口 servers/api/ 下面的接口
请在 src/pages/product/manage/option 下完成页面及其相关功能：
使用 @ant-design/pro-components 里面的  StepsForm 分四步骤完成创建和修改商品
第一步基础信息，例如选择品牌(需获取所有品牌供选择)、选择分类(需获取所有分类供选择)、选择属性分类(属性分类是多选，需获取所有属性分类供选择)以及其他的基础属性
第二步添加 sku 列表数据，数据从对应的第一步选择的属性分类的规则属性分类
第三步添加满减配置、折扣配置、会员登记价格配置
第四步展示添加的信息，并确认添加



部分类型和方法请使用 src/services/index.ts 中的类型。如(通用相应类型ApiResponse、页面相应类型PageResult)，不要重复编写
在编写接口参数类型和返回类型的时候不要直接引用 servers/api/typings.d.ts 中的类型，可以复制到对应的类型文件中
路由配置文件中添加菜单管理页面的路由
切记一定要使用文档集里面组件库中的 ProTable - 高级表格 功能，并完全遵循里面的功能实现列表和添加等功能
不要询问或者停顿，直接创建或者修改
```

### 修改

```

基于接口 servers/api/renzhengguanli.ts
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
ProLayout 中 avatarProps 、  actionsRender 加上用户头像名称和退出按钮

切记一定要使用文档集里面组件库中的 ProTable - 高级表格 功能，并完全遵循里面的功能实现列表和添加等功能
不要询问或者停顿，直接创建或者修改
```
