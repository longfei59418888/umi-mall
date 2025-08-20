import { request } from '@umijs/max';
import { AttributeFormData, AttributeListParams, AttributePageResult } from '@/pages/product/attributeCategory/attribute/types';
import { ApiResponse } from '@/services';

/**
 * 获取商品属性列表
 * @param params 查询参数
 * @returns 商品属性分页列表
 */
export async function getAttributeList(params: AttributeListParams) {
  return request<ApiResponse<AttributePageResult>>('/api/admin/product/attribute/list', {
    method: 'GET',
    params,
  });
}

/**
 * 创建商品属性
 * @param data 商品属性数据
 * @returns 创建结果
 */
export async function createAttribute(data: AttributeFormData) {
  return request<ApiResponse<AttributeFormData>>('/api/admin/product/attribute/create', {
    method: 'POST',
    data,
  });
}

/**
 * 更新商品属性
 * @param data 商品属性数据
 * @returns 更新结果
 */
export async function updateAttribute(data: AttributeFormData) {
  return request<ApiResponse<AttributeFormData>>('/api/admin/product/attribute/update', {
    method: 'POST',
    data,
  });
}

/**
 * 删除商品属性
 * @param id 商品属性ID
 * @returns 删除结果
 */
export async function deleteAttribute(id: number) {
  return request<ApiResponse<void>>('/api/admin/product/attribute/delete', {
    method: 'POST',
    data: { id },
  });
}