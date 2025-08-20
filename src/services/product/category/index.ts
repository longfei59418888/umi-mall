import { ApiResponse, PageResult } from '@/services';
import { request } from '@umijs/max';
import {
  CategoryParams,
  CategoryResponseDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './type';

/**
 * 获取商品分类列表
 * @param params 分页参数
 * @returns 商品分类列表
 */
export async function getCategoryList(params: CategoryParams) {
  return request<ApiResponse<PageResult<CategoryResponseDto>>>(
    '/api/admin/product/category/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
    },
  );
}

/**
 * 获取所有商品分类（无分页）
 * @returns 商品分类列表
 */
export async function getAllCategoryList() {
  return request<ApiResponse<CategoryResponseDto[]>>(
    '/api/admin/product/category/list-all',
    {
      method: 'GET',
    },
  );
}

/**
 * 创建商品分类
 * @param data 商品分类数据
 * @returns 创建结果
 */
export async function createCategory(data: CreateCategoryDto) {
  return request<ApiResponse<CategoryResponseDto>>(
    '/api/admin/product/category/create',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * 更新商品分类
 * @param data 更新数据
 * @returns 更新结果
 */
export async function updateCategory(data: UpdateCategoryDto) {
  return request<ApiResponse<CategoryResponseDto>>(
    '/api/admin/product/category/update',
    {
      method: 'POST',
      data,
    },
  );
}

/**
 * 删除商品分类
 * @param id 商品分类ID
 * @returns 删除结果
 */
export async function deleteCategory(id: string) {
  return request<ApiResponse<{}>>('/api/admin/product/category/delete', {
    method: 'POST',
    data: { id },
  });
}
