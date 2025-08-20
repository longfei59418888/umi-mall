import { ApiResponse, PageParams, PageResult } from '@/services';
import { request } from '@umijs/max';
import { AttributeResponseDto, AttributeParams } from './type';

/**
 * 获取商品属性列表
 * @param params 分页参数
 * @returns 商品属性列表
 */
export async function getAttributeList(params: AttributeParams) {
  return request<ApiResponse<PageResult<AttributeResponseDto>>>(
    '/api/admin/product/attribute/list',
    {
      method: 'GET',
      params,
    },
  );
}

/**
 * 获取所有商品属性（无分页）
 * @returns 商品属性列表
 */
export async function getAllAttributeList() {
  return request<ApiResponse<AttributeResponseDto[]>>
    ('/api/admin/product/attribute/list', {
      method: 'GET',
    });
}