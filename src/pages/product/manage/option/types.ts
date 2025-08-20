import { ProductResponseDto } from '@/services/product/manage/types';

// 品牌类型
export type BrandOption = {
  id: string;
  name: string;
};

// 商品分类类型
export type CategoryOption = {
  id: string;
  name: string;
  parentId: string;
  level: number;
};

// 属性分类类型
export type AttributeCategoryOption = {
  id: string;
  name: string;
};

// 商品属性类型
export type ProductAttribute = {
  id: number;
  name: string;
  selectType: number; // 0->唯一；1->单选；2->多选
  inputType: number; // 0->手工录入；1->从列表中选取
  inputList: string; // 可选值列表，以逗号分隔
  type: number; // 0->规格；1->参数
};

// SKU库存类型
export type SkuStock = {
  skuCode?: string;
  price?: string;
  stock?: number;
  lowStock?: number;
  sp1?: string;
  sp2?: string;
  sp3?: string;
  pic?: string;
  sale?: number;
  promotionPrice?: string;
  lockStock?: number;
};

// 阶梯价格类型
export type ProductLadder = {
  count?: number;
  discount?: string;
  price?: string;
};

// 满减价格类型
export type ProductFullReduction = {
  fullPrice?: string;
  reducePrice?: string;
};

// 会员价格类型
export type MemberPrice = {
  memberLevelId?: string;
  memberPrice?: string;
  memberLevelName?: string;
};

// 商品创建/更新类型
export type CreateProductDto = {
  brandId: string;
  productCategoryId: string;
  productAttributeCategoryId: string;
  name: string;
  pic: string;
  productSn: string;
  subTitle: string;
  description: string;
  originalPrice: string;
  stock: number;
  unit: string;
  weight: string;
  keywords: string;
  note: string;
  albumPics: string;
  detailTitle: string;
  detailDesc: string;
  detailHtml: string;
  detailMobileHtml: string;
  promotionStartTime: string;
  promotionEndTime: string;
  promotionPerLimit: number;
  promotionType: number;
  serviceIds: string;
  giftGrowth: number;
  giftPoint: number;
  usePointLimit: number;
  previewStatus: number;
};

export type UpdateProductDto = CreateProductDto & {
  id: number;
  skuStockList?: SkuStock[];
  productLadderList?: ProductLadder[];
  productFullReductionList?: ProductFullReduction[];
  memberPriceList?: MemberPrice[];
};

// 步骤表单数据类型
export type StepFormData = {
  // 第一步基础信息
  basicInfo: {
    brandId: string;
    productCategoryId: string;
    productAttributeCategoryId: string[];
    name: string;
    pic: string;
    productSn: string;
    subTitle: string;
    description: string;
    originalPrice: string;
    stock: number;
    unit: string;
    weight: string;
    keywords: string;
    note: string;
    albumPics: string[];
    detailTitle: string;
    detailDesc: string;
    detailHtml: string;
    detailMobileHtml: string;
    promotionStartTime: string;
    promotionEndTime: string;
    promotionPerLimit: number;
    promotionType: number;
    serviceIds: string[];
    giftGrowth: number;
    giftPoint: number;
    usePointLimit: number;
    previewStatus: number;
  };
  
  // 第二步SKU列表
  skuList: SkuStock[];
  
  // 第三步满减折扣配置
  promotionConfig: {
    productLadderList: ProductLadder[];
    productFullReductionList: ProductFullReduction[];
    memberPriceList: MemberPrice[];
  };
  
  // 第四步信息确认
  confirmInfo: {
    basicInfo: {
      brandId: string;
      productCategoryId: string;
      productAttributeCategoryId: string[];
      name: string;
      pic: string;
      productSn: string;
      subTitle: string;
      description: string;
      originalPrice: string;
      stock: number;
      unit: string;
      weight: string;
      keywords: string;
      note: string;
      albumPics: string[];
      detailTitle: string;
      detailDesc: string;
      detailHtml: string;
      detailMobileHtml: string;
      promotionStartTime: string;
      promotionEndTime: string;
      promotionPerLimit: number;
      promotionType: number;
      serviceIds: string[];
      giftGrowth: number;
      giftPoint: number;
      usePointLimit: number;
      previewStatus: number;
    };
    skuList: SkuStock[];
    promotionConfig: {
      productLadderList: ProductLadder[];
      productFullReductionList: ProductFullReduction[];
      memberPriceList: MemberPrice[];
    };
  };
};