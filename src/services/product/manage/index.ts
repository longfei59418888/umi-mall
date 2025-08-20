import { request } from 'umi';
import {
  ProductResponseDto,
  CreateProductDto,
  UpdateProductDto,
  ProductListParams,
  ProductPageResult,
} from '@/pages/product/manage/types';
import { ApiResponse } from '@/services/index';

// 获取商品列表
export async function getProductList(params: ProductListParams) {
  return request<
    ApiResponse<ProductPageResult>
  >('/api/admin/product/manage/list', {
    method: 'GET',
    params,
  });
}

// 创建商品
export async function createProduct(data: CreateProductDto) {
  return request<ApiResponse<ProductResponseDto>>(
    '/api/admin/product/manage/create',
    {
      method: 'POST',
      data,
    },
  );
}

// 更新商品
export async function updateProduct(data: UpdateProductDto) {
  return request<ApiResponse<ProductResponseDto>>(
    '/api/admin/product/manage/update',
    {
      method: 'POST',
      data,
    },
  );
}

// 删除商品
export async function deleteProduct(id: string) {
  return request<ApiResponse<any>>('/api/admin/product/manage/delete', {
    method: 'POST',
    params: { id },
  });
}

// 获取商品详情
export async function getProductDetail(id: string) {
  return request<ApiResponse<ProductResponseDto>>(
    '/api/admin/product/manage/detail',
    {
      method: 'POST',
      params: { id },
    },
  );
}

// 上架/下架商品
export async function togglePublishStatus(id: string, status: number) {
  return request<ApiResponse<any>>(
    '/api/admin/product/manage/update-publish-status',
    {
      method: 'POST',
      params: { id, status },
    },
  );
}

// 设置新品状态
export async function toggleNewStatus(id: string, status: number) {
  return request<ApiResponse<any>>(
    '/api/admin/product/manage/update-new-status',
    {
      method: 'POST',
      params: { id, status },
    },
  );
}

// 设置推荐状态
export async function toggleRecommendStatus(id: string, status: number) {
  return request<ApiResponse<any>>(
    '/api/admin/product/manage/update-recommend-status',
    {
      method: 'POST',
      params: { id, status },
    },
  );
}

// 审核商品
export async function verifyProduct(id: string, status: number) {
  return request<ApiResponse<any>>(
    '/api/admin/product/manage/update-verify-status',
    {
      method: 'POST',
      params: { id, status },
    },
  );
}

// 设置预告状态
export async function togglePreviewStatus(id: string, status: number) {
  return request<ApiResponse<any>>(
    '/api/admin/product/manage/update-preview-status',
    {
      method: 'POST',
      params: { id, status },
    },
  );
}