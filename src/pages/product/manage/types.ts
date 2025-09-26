import { PageParams, PageResult } from '@/services/index';

// 商品响应类型
export interface ProductResponseDto {
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
}

// 创建商品请求类型
export interface CreateProductDto {
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
}

// 更新商品请求类型
export interface UpdateProductDto extends Partial<CreateProductDto> {
  /** 商品ID */
  id: number;
}

// SKU库存类型
export interface SkuStockDto {
  /** sku编码 */
  skuCode?: string;
  /** 价格 */
  price?: string;
  /** 库存 */
  stock?: number;
  /** 库存预警值 */
  lowStock?: number;
  /** 规格值1 */
  sp1: string;
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
}

// 阶梯价格类型
export interface ProductLadderDto {
  /** 满足的商品数量 */
  count?: number;
  /** 折扣 */
  discount?: string;
  /** 价格 */
  price?: string;
}

// 满减价格类型
export interface ProductFullReductionDto {
  /** 满多少金额 */
  fullPrice?: string;
  /** 减多少金额 */
  reducePrice?: string;
}

// 会员价格类型
export interface MemberPriceDto {
  /** 会员等级ID */
  memberLevelId?: string;
  /** 会员价格 */
  memberPrice?: string;
  /** 会员等级名称 */
  memberLevelName?: string;
}

// 产品属性值类型
export interface ProductAttributeValueDto {
  /** 会员等级ID */
  productAttributeId: string;
  /** 会员价格 */
  value?: string;
  selectType?: 1 | 2;
}

// 商品列表查询参数
export interface ProductListParams extends PageParams {
  /** 商品名称 */
  name?: string;
  /** 上架状态：0->下架；1->上架 */
  publishStatus?: number;
}

// 商品列表结果
export type ProductPageResult = PageResult<ProductResponseDto>;
