import { ApiResponse, PageResult } from '@/services';
import { request } from '@umijs/max';
import {
  AttributeCategoryParams,
  AttributeCategoryResponseDto,
  CreateAttributeCategoryDto,
  UpdateAttributeCategoryDto,
} from './type';

/**
 * 获取商品属性分类列表
 * @param params 分页参数
 * @returns 商品属性分类列表
 */
export async function getAttributeCategoryList(
  params: AttributeCategoryParams,
) {
  return request<ApiResponse<PageResult<AttributeCategoryResponseDto>>>(
    '/api/admin/product/attributeCategory/list',
    {
      method: 'GET',
      params,
    },
  );
}

/**
 * 获取所有商品属性分类（无分页）
 * @returns 商品属性分类列表
 */
export async function getAllAttributeCategoryList() {
  return request<ApiResponse<AttributeCategoryResponseDto[]>>(
    '/api/admin/product/attributeCategory/list-all',
    {
      method: 'GET',
    },
  );
}

/**
 * 创建商品属性分类
 * @param data 创建参数
 * @returns 创建结果
 */
export async function createAttributeCategory(
  data: CreateAttributeCategoryDto,
) {
  return request<ApiResponse<AttributeCategoryResponseDto>>(
    '/api/admin/product/attributeCategory/create',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * 更新商品属性分类
 * @param data 更新参数
 * @returns 更新结果
 */
export async function updateAttributeCategory(
  data: UpdateAttributeCategoryDto,
) {
  return request<ApiResponse<AttributeCategoryResponseDto>>(
    '/api/admin/product/attributeCategory/update',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * 删除商品属性分类
 * @param id 属性分类ID
 * @returns 删除结果
 */
export async function deleteAttributeCategory(id: number) {
  return request<ApiResponse<boolean>>(
    '/api/admin/product/attributeCategory/delete',
    {
      method: 'POST',
      data: { id },
    },
  );
}

/**
 * 获取商品属性分类详情
 * @param id 属性分类ID
 * @returns 属性分类详情
 */
export async function getAttributeCategoryDetail(id: number) {
  return request<ApiResponse<AttributeCategoryResponseDto>>(
    '/api/admin/product/attributeCategory/detail',
    {
      method: 'POST',
      data: { id },
    },
  );
}
