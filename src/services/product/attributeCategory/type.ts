import { PageParams, PageResult } from '@/services';
import { AttributeResponseDto } from '@/services/product/attribute/type';

// 商品属性分类请求参数
export interface AttributeCategoryParams extends PageParams {
  name?: string;
}

// 商品属性分类响应数据
export interface AttributeCategoryResponseDto {
  /** 属性类型ID */
  id: string;
  /** 属性类型名称 */
  name: string;
  /** 属性数量 */
  attributeCount: number;
  /** 参数数量 */
  paramCount: number;
  /**  属性列表 */
  productAttributes: AttributeResponseDto[];
}

// 创建商品属性分类参数
export interface CreateAttributeCategoryDto {
  /** 名称 */
  name: string;
  /** 属性数量 */
  attributeCount: number;
  /** 参数数量 */
  paramCount: number;
}

// 更新商品属性分类参数
export interface UpdateAttributeCategoryDto {
  /** 属性类型ID */
  id: number;
  /** 名称 */
  name?: string;
  /** 属性数量 */
  attributeCount?: number;
  /** 参数数量 */
  paramCount?: number;
}

// 商品属性分类分页响应
export interface AttributeCategoryPageResult
  extends PageResult<AttributeCategoryResponseDto> {}
