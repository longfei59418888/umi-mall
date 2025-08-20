import { PageParams, PageResult } from '@/services';

// 商品分类请求参数
export interface CategoryParams extends PageParams {
  name?: string;
  parentId?: string;
  showStatus?: number;
  all?: 0 | 1;
}

// 创建商品分类DTO
export interface CreateCategoryDto {
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
}

// 更新商品分类DTO
export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  /** 分类ID */
  id: string;
}

// 商品分类响应数据
export interface CategoryResponseDto {
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
  attributes: AttributeResponseDto[];
  /** 分类ID */
  id: string;
}

// 商品分类分页响应
export interface CategoryPageResult extends PageResult<CategoryResponseDto> {}

// 商品属性响应数据
export interface AttributeResponseDto {
  /** 属性ID */
  id: number;
  /** 属性名称 */
  name: string;
  /** 属性分类ID */
  productAttributeCategoryId: number;
}

// 属性选择项
export interface AttributeOption {
  label: string;
  value: string;
}
