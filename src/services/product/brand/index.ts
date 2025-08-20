import { request } from 'umi';
import {
  BrandListParams,
  BrandPageResult,
  BrandResponseDto,
  CreateBrandDto,
  UpdateBrandDto,
} from '@/pages/product/brand/types';
import { ApiResponse } from '@/services/index';

// 获取品牌列表
export async function getBrandList(params: BrandListParams) {
  return request<ApiResponse<BrandPageResult>>('/api/admin/product/brand/list', {
    method: 'GET',
    params,
  });
}

// 创建品牌
export async function createBrand(data: CreateBrandDto) {
  return request<ApiResponse<BrandResponseDto>>('/api/admin/product/brand/create', {
    method: 'POST',
    data,
  });
}

// 更新品牌
export async function updateBrand(data: UpdateBrandDto) {
  return request<ApiResponse<BrandResponseDto>>('/api/admin/product/brand/update', {
    method: 'POST',
    data,
  });
}

// 删除品牌
export async function deleteBrand(id: number) {
  return request<ApiResponse<any>>('/api/admin/product/brand/delete', {
    method: 'POST',
    data: { id },
  });
}

// 获取所有品牌（无分页）
export async function getAllBrands() {
  return request<ApiResponse<BrandResponseDto[]>>('/api/admin/product/brand/list-all', {
    method: 'GET',
  });
}