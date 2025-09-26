declare namespace API {
  type AssignMenuDto = {
    /** 菜单ID列表 */
    menuIds: string[];
  };

  type AssignPermissionDto = {
    /** 权限路径列表 */
    permissionPaths: string[];
  };

  type BrandControllerFindAllParams = {
    /** 页码 */
    current?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 品牌名称 */
    name?: string;
    /** 显示状态：0->不显示；1->显示 */
    showStatus?: number;
  };

  type BrandResponseDto = {
    /** 品牌ID */
    id: number;
    /** 名称 */
    name: string;
    /** 首字母 */
    firstLetter: string;
    /** 排序 */
    sort: number;
    /** 是否为品牌制造商：0->不是；1->是 */
    factoryStatus: number;
    /** 是否显示 */
    showStatus: number;
    /** 产品数量 */
    productCount: number;
    /** 产品评论数量 */
    productCommentCount: number;
    /** 品牌logo */
    logo: string;
    /** 专区大图 */
    bigPic: string;
    /** 品牌故事 */
    brandStory: string;
  };

  type CategoryControllerFindAllParams = {
    /** 页码 */
    current?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 分类名称 */
    name?: string;
    parentId: string;
    /** 显示状态：0->不显示；1->显示 */
    showStatus?: number;
  };

  type CreateBrandDto = {
    /** 名称 */
    name: string;
    /** 首字母 */
    firstLetter?: string;
    /** 排序 */
    sort?: number;
    /** 是否为品牌制造商：0->不是；1->是 */
    factoryStatus?: number;
    /** 是否显示 */
    showStatus?: number;
    /** 品牌logo */
    logo?: string;
    /** 专区大图 */
    bigPic?: string;
    /** 品牌故事 */
    brandStory?: string;
  };

  type CreateMallAdminDto = {
    /** 用户名 */
    username: string;
    /** 密码（至少6位） */
    password: string;
    /** 电子邮箱 */
    email: string;
    /** 昵称 */
    nickName: string;
    /** 头像URL */
    icon?: string;
    /** 备注信息 */
    note?: string;
    /** 角色ID列表 */
    roleIds: string[];
  };

  type CreateMallMenuDto = {
    /** 父级ID */
    parentId: string;
    /** 菜单名称 */
    title: string;
    /** 菜单级数 */
    level: number;
    /** 菜单排序 */
    sort: number;
    /** 前端名称 */
    name: string;
    /** 前端图标 */
    icon?: string;
    /** 前端隐藏 */
    hidden: number;
  };

  type CreateProductAttributeCategoryDto = {
    /** 名称 */
    name: string;
    /** 属性数量 */
    attributeCount: number;
    /** 参数数量 */
    paramCount: number;
  };

  type CreateProductAttributeDto = {
    /** 商品属性分类id */
    productAttributeCategoryId: number;
    /** 名称 */
    name: string;
    /** 属性选择类型：0->唯一；1->单选；2->多选 */
    selectType: number;
    /** 属性录入方式：0->手工录入；1->从列表中选取 */
    inputType: number;
    /** 可选值列表，以逗号隔开 */
    inputList: string;
    /** 排序字段 */
    sort: number;
    /** 分类筛选样式：1->普通；1->颜色 */
    filterType: number;
    /** 检索类型；0->不需要进行检索；1->关键字检索；2->范围检索 */
    searchType: number;
    /** 相同属性产品是否关联；0->不关联；1->关联 */
    relatedStatus: number;
    /** 是否支持手动新增；0->不支持；1->支持 */
    handAddStatus: number;
    /** 属性的类型；0->规格；1->参数 */
    type: number;
  };

  type CreateProductCategoryDto = {
    /** 上级分类的编号：0表示一级分类 */
    parentId: string;
    /** 名称 */
    name: string;
    /** 分类级别：0->1级；1->2级 */
    level: number;
    /** 商品单位 */
    productUnit: string;
    /** 是否显示在导航栏：0->不显示；1->显示 */
    navStatus: number;
    /** 显示状态：0->不显示；1->显示 */
    showStatus: number;
    /** 排序 */
    sort: number;
    /** 图标 */
    icon: string;
    /** 关键字 */
    keywords: string;
    /** 描述 */
    description: string;
    /** 商品属性ID列表 */
    attributes?: string[];
  };

  type CreateProductDto = {
    /** 商品品牌id */
    brandId: string;
    /** 商品分类id */
    productCategoryId: string;
    /** 商品属性分类id */
    productAttributeCategoryId?: string;
    /** 商品名称 */
    name: string;
    /** 商品图片 */
    pic?: string;
    /** 货号 */
    productSn?: string;
    /** 删除状态：0->未删除；1->已删除 */
    deleteStatus?: number;
    /** 上架状态：0->下架；1->上架 */
    publishStatus?: number;
    /** 新品状态:0->不是新品；1->新品 */
    newStatus?: number;
    /** 推荐状态；0->不推荐；1->推荐 */
    recommandStatus?: number;
    /** 审核状态：0->未审核；1->审核通过 */
    verifyStatus?: number;
    /** 排序 */
    sort?: number;
    /** 销量 */
    sale?: number;
    /** 价格 */
    price?: string;
    /** 促销价格 */
    promotionPrice?: string;
    /** 赠送的成长值 */
    giftGrowth?: number;
    /** 赠送的积分 */
    giftPoint?: number;
    /** 限制使用的积分数 */
    usePointLimit?: number;
    /** 副标题 */
    subTitle?: string;
    /** 商品描述 */
    description?: string;
    /** 市场价 */
    originalPrice?: string;
    /** 库存 */
    stock?: number;
    /** 库存预警值 */
    lowStock?: number;
    /** 单位 */
    unit?: string;
    /** 商品重量，默认为克 */
    weight?: string;
    /** 预告商品状态：0->不是预告商品；1->预告商品 */
    previewStatus?: number;
    /** 以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮 */
    serviceIds?: string;
    /** 关键字 */
    keywords?: string;
    /** 备注 */
    note?: string;
    /** 画册图片，连产品图片限制为5张，以逗号分割 */
    albumPics?: string;
    /** 详情标题 */
    detailTitle?: string;
    /** 详情描述 */
    detailDesc?: string;
    /** 产品详情网页内容 */
    detailHtml?: string;
    /** 移动端网页详情 */
    detailMobileHtml?: string;
    /** 促销开始时间 */
    promotionStartTime?: string;
    /** 促销结束时间 */
    promotionEndTime?: string;
    /** 活动限购数量 */
    promotionPerLimit?: number;
    /** 促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 */
    promotionType?: number;
    /** SKU库存列表 */
    skuStockList?: SkuStockDto[];
    /** 阶梯价格列表 */
    productLadderList?: ProductLadderDto[];
    /** 满减价格列表 */
    productFullReductionList?: ProductFullReductionDto[];
    /** 会员价格列表 */
    memberPriceList?: MemberPriceDto[];
    /** 产品属性值列表 */
    productAttributeValueList?: ProductAttributeValueDto[];
  };

  type CreateRoleDto = {
    /** 角色名称 */
    name: string;
    /** 角色描述 */
    description?: string;
    /** 后台用户数量 */
    adminCount?: number;
  };

  type LoginMallAdminDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type MallAdminInfoResponseDto = {
    /** 用户ID */
    id: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickName: string;
    /** 头像 */
    icon: string;
    /** 邮箱 */
    email: string;
    /** 角色列表 */
    roles: MallRoleResponseDto[];
    /** 菜单列表 */
    menus: string[];
    /** 权限列表 */
    permissions: string[];
  };

  type MallAdminPermission = {
    /** 权限 */
    permission: string;
    /** 名称 */
    name: string;
    /** 权限状态 */
    status: number;
  };

  type MallAdminPermissionDto = {
    /** 路径 */
    path: string;
    /** 权限名称 */
    groupName: string;
    /** 权限列表 */
    child: MallAdminPermission[];
  };

  type MallAdminResponseDto = {
    /** 管理员ID */
    id: string;
    /** 用户名 */
    username: string;
    /** 电子邮箱 */
    email: string;
    /** 昵称 */
    nickName: string;
    /** 头像URL */
    icon?: string;
    /** 备注信息 */
    note?: string;
    /** 创建时间 */
    createTime: string;
    /** 最后登录时间 */
    loginTime?: string;
    /** 帐号启用状态：0->禁用；1->启用 */
    status: number;
    /** 角色列表 */
    roles?: MallRoleResponseDto[];
  };

  type MallMenuResponseDto = {
    /** 菜单ID */
    id: string;
    /** 父级ID */
    parentId?: string;
    /** 创建时间 */
    createTime: string;
    /** 菜单名称 */
    title: string;
    /** 菜单级数 */
    level: number;
    /** 菜单排序 */
    sort: number;
    /** 前端名称 */
    name: string;
    /** 前端图标 */
    icon?: string;
    /** 前端隐藏 */
    hidden: number;
  };

  type MallRoleResponseDto = {
    /** 角色ID */
    id: string;
    /** 角色名称 */
    name: string;
    /** 角色描述 */
    description: string;
  };

  type MemberPriceDto = {
    /** 会员等级ID */
    memberLevelId?: string;
    /** 会员价格 */
    memberPrice?: string;
    /** 会员等级名称 */
    memberLevelName?: string;
  };

  type MenuControllerDeleteMenuParams = {
    id: string;
  };

  type MenuControllerGetMenuByIdParams = {
    id: string;
  };

  type MenuControllerGetMenuListParams = {
    /** 当前页码 */
    current: number;
    /** 每页大小：默认：15 */
    pageSize: number;
    /** 参数 */
    params: Object;
  };

  type Object = {};

  type PageResponse = {
    /** 当前页码 */
    current: number;
    /** 总数 */
    total: number;
    /** 每页长度 */
    pageSize: number;
    /** 记录列表 */
    records: string[];
  };

  type PermissionControllerGetRolePermissionsParams = {
    id: string;
  };

  type ProductAttributeCategoryControllerFindAllParams = {
    /** 页码 */
    current?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 属性类型名称 */
    name?: string;
  };

  type ProductAttributeCategoryResponseDto = {
    /** 属性类型ID */
    id: string;
    /** 属性类型名称 */
    name: string;
    /** 属性数量 */
    attributeCount: number;
    /** 参数数量 */
    paramCount: number;
  };

  type ProductAttributeControllerFindAllParams = {
    /** 页码 */
    current?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 属性分类ID */
    productAttributeCategoryId?: number;
    /** 属性名称 */
    name?: string;
    /** 属性类型 */
    type?: string;
  };

  type ProductAttributeResponseDto = {
    /** 属性ID */
    id: number;
    /** 属性分类ID */
    productAttributeCategoryId: number;
    /** 属性名称 */
    name: string;
    /** 属性选择类型：0->唯一；1->单选；2->多选 */
    selectType: number;
    /** 属性录入方式：0->手工录入；1->从列表中选取 */
    inputType: number;
    /** 可选值列表，以逗号分隔 */
    inputList: string;
    /** 排序字段：最高的可以单独上传图片 */
    sort: number;
    /** 分类筛选样式：1->普通；1->颜色 */
    filterType: number;
    /** 检索类型；0->不需要进行检索；1->关键字检索；2->范围检索 */
    searchType: number;
    /** 相同属性产品是否关联；0->不关联；1->关联 */
    relatedStatus: boolean;
    /** 是否支持手动新增；0->不支持；1->支持 */
    handAddStatus: boolean;
    /** 属性的类型；0->规格；1->参数 */
    type: number;
    /** 创建时间 */
    createTime: string;
    /** 更新时间 */
    updateTime: string;
    /** 属性类型 */
    attributeCategory: ProductAttributeCategoryResponseDto;
  };

  type ProductAttributeValueDto = {
    /** 会员等级ID */
    productAttributeId?: string;
    /** 会员价格 */
    value?: string;
  };

  type ProductCategoryResponseDto = {
    /** 上级分类的编号：0表示一级分类 */
    parentId: string;
    /** 名称 */
    name: string;
    /** 分类级别：0->1级；1->2级 */
    level: number;
    /** 商品单位 */
    productUnit: string;
    /** 是否显示在导航栏：0->不显示；1->显示 */
    navStatus: number;
    /** 显示状态：0->不显示；1->显示 */
    showStatus: number;
    /** 排序 */
    sort: number;
    /** 图标 */
    icon: string;
    /** 关键字 */
    keywords: string;
    /** 描述 */
    description: string;
    /** 属性列表 */
    attributes: ProductAttributeResponseDto[];
  };

  type ProductControllerFindAllParams = {
    /** 页码 */
    current?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 商品名称 */
    name?: string;
    /** 上架状态：0->下架；1->上架 */
    publishStatus?: number;
  };

  type ProductFullReductionDto = {
    /** 满多少金额 */
    fullPrice?: string;
    /** 减多少金额 */
    reducePrice?: string;
  };

  type ProductLadderDto = {
    /** 满足的商品数量 */
    count?: number;
    /** 折扣 */
    discount?: string;
    /** 价格 */
    price?: string;
  };

  type ProductResponseDto = {
    /** 商品ID */
    id: string;
    /** 品牌id */
    brandId: string;
    /** 品牌分类id */
    productCategoryId: string;
    /** 运费模版id */
    feightTemplateId: string;
    /** 品牌属性分类id */
    productAttributeCategoryId: string;
    /** 商品名称 */
    name: string;
    /** 图片 */
    pic: string;
    /** 货号 */
    productSn: string;
    /** 删除状态：0->未删除；1->已删除 */
    deleteStatus: number;
    /** 上架状态：0->下架；1->上架 */
    publishStatus: number;
    /** 新品状态:0->不是新品；1->新品 */
    newStatus: number;
    /** 推荐状态；0->不推荐；1->推荐 */
    recommandStatus: number;
    /** 审核状态：0->未审核；1->审核通过 */
    verifyStatus: number;
    /** 排序 */
    sort: number;
    /** 销量 */
    sale: number;
    /** 价格 */
    price: string;
    /** 促销价格 */
    promotionPrice: string;
    /** 赠送的成长值 */
    giftGrowth: number;
    /** 赠送的积分 */
    giftPoint: number;
    /** 限制使用的积分数 */
    usePointLimit: number;
    /** 副标题 */
    subTitle: string;
    /** 商品描述 */
    description: string;
    /** 市场价 */
    originalPrice: string;
    /** 库存 */
    stock: number;
    /** 库存预警值 */
    lowStock: number;
    /** 单位 */
    unit: string;
    /** 商品重量，默认为克 */
    weight: string;
    /** 是否为预告商品：0->不是；1->是 */
    previewStatus: number;
    /** 以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮 */
    serviceIds: string;
    /** 关键字 */
    keywords: string;
    /** 备注 */
    note: string;
    /** 画册图片，连产品图片限制为5张，以逗号分割 */
    albumPics: string;
    /** 详情标题 */
    detailTitle: string;
    /** 详情描述 */
    detailDesc: string;
    /** 产品详情网页内容 */
    detailHtml: string;
    /** 移动端网页详情 */
    detailMobileHtml: string;
    /** 促销开始时间 */
    promotionStartTime: string;
    /** 促销结束时间 */
    promotionEndTime: string;
    /** 活动限购数量 */
    promotionPerLimit: number;
    /** 促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 */
    promotionType: number;
    /** 产品分类名称 */
    productCategoryName: string;
    /** 品牌名称 */
    brandName: string;
  };

  type ResponseReturn = {
    /** 200:返回成功 */
    code: 200 | 500;
    /** 错误描述 */
    message: string;
    /** 返回内容 */
    data: Record<string, any>;
  };

  type RoleControllerAssignMenusParams = {
    id: string;
  };

  type RoleControllerAssignPermissionsParams = {
    id: string;
  };

  type RoleControllerFindAllParams = {
    /** 当前页码 */
    current: number;
    /** 每页数量 */
    pageSize: number;
  };

  type RoleControllerFindOneParams = {
    id: string;
  };

  type RoleControllerFindUsersByRoleIdParams = {
    id: string;
    /** 当前页码 */
    page: number;
    /** 每页数量 */
    pageSize: number;
  };

  type RoleControllerGetRoleMenusParams = {
    id: string;
  };

  type RoleControllerGetRolePermissionsParams = {
    id: string;
  };

  type RoleControllerRemoveParams = {
    id: string;
  };

  type RoleControllerUpdateParams = {
    id: string;
  };

  type RoleMenusResponseDto = {
    /** 菜单id列表 */
    menus: string[];
  };

  type RolePermissionsResponseDto = {
    /** 权限Path列表 */
    permissions: string[];
  };

  type SkuStockDto = {
    /** sku编码 */
    skuCode?: string;
    /** 价格 */
    price?: string;
    /** 库存 */
    stock?: number;
    /** 库存预警值 */
    lowStock?: number;
    /** 规格值1 */
    sp1?: string;
    /** 规格值2 */
    sp2?: string;
    /** 规格值3 */
    sp3?: string;
    /** 展示图片 */
    pic?: string;
    /** 销量 */
    sale?: number;
    /** 促销价格 */
    promotionPrice?: string;
    /** 锁定库存 */
    lockStock?: number;
  };

  type UpdateBrandDto = {
    /** 名称 */
    name?: string;
    /** 首字母 */
    firstLetter?: string;
    /** 排序 */
    sort?: number;
    /** 是否为品牌制造商：0->不是；1->是 */
    factoryStatus?: number;
    /** 是否显示 */
    showStatus?: number;
    /** 品牌logo */
    logo?: string;
    /** 专区大图 */
    bigPic?: string;
    /** 品牌故事 */
    brandStory?: string;
    /** 品牌ID */
    id: number;
  };

  type UpdateMallAdminDto = {
    /** 用户名 */
    username?: string;
    /** 密码（至少6位） */
    password?: string;
    /** 电子邮箱 */
    email?: string;
    /** 昵称 */
    nickName?: string;
    /** 头像URL */
    icon?: string;
    /** 备注信息 */
    note?: string;
    /** 角色ID列表 */
    roleIds?: string[];
    /** 帐号启用状态：0->禁用；1->启用 */
    status?: number;
  };

  type UpdateMallMenuDto = {
    /** 父级ID */
    parentId?: string;
    /** 菜单名称 */
    title?: string;
    /** 菜单级数 */
    level?: number;
    /** 菜单排序 */
    sort?: number;
    /** 前端名称 */
    name?: string;
    /** 前端图标 */
    icon?: string;
    /** 前端隐藏 */
    hidden?: number;
    /** 菜单ID */
    id: string;
  };

  type UpdateProductAttributeCategoryDto = {
    /** 名称 */
    name?: string;
    /** 属性数量 */
    attributeCount?: number;
    /** 参数数量 */
    paramCount?: number;
    /** 属性类型ID */
    id: number;
  };

  type UpdateProductAttributeDto = {
    /** 商品属性分类id */
    productAttributeCategoryId?: number;
    /** 名称 */
    name?: string;
    /** 属性选择类型：0->唯一；1->单选；2->多选 */
    selectType?: number;
    /** 属性录入方式：0->手工录入；1->从列表中选取 */
    inputType?: number;
    /** 可选值列表，以逗号隔开 */
    inputList?: string;
    /** 排序字段 */
    sort?: number;
    /** 分类筛选样式：1->普通；1->颜色 */
    filterType?: number;
    /** 检索类型；0->不需要进行检索；1->关键字检索；2->范围检索 */
    searchType?: number;
    /** 相同属性产品是否关联；0->不关联；1->关联 */
    relatedStatus?: number;
    /** 是否支持手动新增；0->不支持；1->支持 */
    handAddStatus?: number;
    /** 属性的类型；0->规格；1->参数 */
    type?: number;
    /** 属性ID */
    id: number;
  };

  type UpdateProductCategoryDto = {
    /** 上级分类的编号：0表示一级分类 */
    parentId?: string;
    /** 名称 */
    name?: string;
    /** 分类级别：0->1级；1->2级 */
    level?: number;
    /** 商品单位 */
    productUnit?: string;
    /** 是否显示在导航栏：0->不显示；1->显示 */
    navStatus?: number;
    /** 显示状态：0->不显示；1->显示 */
    showStatus?: number;
    /** 排序 */
    sort?: number;
    /** 图标 */
    icon?: string;
    /** 关键字 */
    keywords?: string;
    /** 描述 */
    description?: string;
    /** 商品属性ID列表 */
    attributes?: string[];
    /** 分类ID */
    id: string;
  };

  type UpdateProductDto = {
    /** 商品品牌id */
    brandId?: string;
    /** 商品分类id */
    productCategoryId?: string;
    /** 商品属性分类id */
    productAttributeCategoryId?: string;
    /** 商品名称 */
    name?: string;
    /** 商品图片 */
    pic?: string;
    /** 货号 */
    productSn?: string;
    /** 删除状态：0->未删除；1->已删除 */
    deleteStatus?: number;
    /** 上架状态：0->下架；1->上架 */
    publishStatus?: number;
    /** 新品状态:0->不是新品；1->新品 */
    newStatus?: number;
    /** 推荐状态；0->不推荐；1->推荐 */
    recommandStatus?: number;
    /** 审核状态：0->未审核；1->审核通过 */
    verifyStatus?: number;
    /** 排序 */
    sort?: number;
    /** 销量 */
    sale?: number;
    /** 价格 */
    price?: string;
    /** 促销价格 */
    promotionPrice?: string;
    /** 赠送的成长值 */
    giftGrowth?: number;
    /** 赠送的积分 */
    giftPoint?: number;
    /** 限制使用的积分数 */
    usePointLimit?: number;
    /** 副标题 */
    subTitle?: string;
    /** 商品描述 */
    description?: string;
    /** 市场价 */
    originalPrice?: string;
    /** 库存 */
    stock?: number;
    /** 库存预警值 */
    lowStock?: number;
    /** 单位 */
    unit?: string;
    /** 商品重量，默认为克 */
    weight?: string;
    /** 预告商品状态：0->不是预告商品；1->预告商品 */
    previewStatus?: number;
    /** 以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮 */
    serviceIds?: string;
    /** 关键字 */
    keywords?: string;
    /** 备注 */
    note?: string;
    /** 画册图片，连产品图片限制为5张，以逗号分割 */
    albumPics?: string;
    /** 详情标题 */
    detailTitle?: string;
    /** 详情描述 */
    detailDesc?: string;
    /** 产品详情网页内容 */
    detailHtml?: string;
    /** 移动端网页详情 */
    detailMobileHtml?: string;
    /** 促销开始时间 */
    promotionStartTime?: string;
    /** 促销结束时间 */
    promotionEndTime?: string;
    /** 活动限购数量 */
    promotionPerLimit?: number;
    /** 促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 */
    promotionType?: number;
    /** SKU库存列表 */
    skuStockList?: SkuStockDto[];
    /** 阶梯价格列表 */
    productLadderList?: ProductLadderDto[];
    /** 满减价格列表 */
    productFullReductionList?: ProductFullReductionDto[];
    /** 会员价格列表 */
    memberPriceList?: MemberPriceDto[];
    /** 产品属性值列表 */
    productAttributeValueList?: ProductAttributeValueDto[];
    /** 商品ID */
    id: number;
  };

  type UpdateRoleDto = {
    /** 角色名称 */
    name?: string;
    /** 角色描述 */
    description?: string;
    /** 后台用户数量 */
    adminCount?: number;
  };

  type UploadSignatureResponseDataDto = {
    /** Policy */
    policy: string;
    /** OSS4-HMAC-SHA256 */
    xOssSignatureVersion: string;
    xOssCredential: string;
    xOssDate: string;
    securityToken: string;
    /** Signature */
    signature: string;
    /** Host */
    host: string;
    /** Directory */
    dir: string;
  };

  type UserControllerFindAllParams = {
    /** 当前页码 */
    current: number;
    /** 每页数量 */
    pageSize: number;
  };

  type UserControllerFindOneParams = {
    id: string;
  };

  type UserControllerRemoveParams = {
    id: string;
  };

  type UserControllerUpdateParams = {
    id: string;
  };
}
