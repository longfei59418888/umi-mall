// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建品牌 POST /api/admin/product/brand/create */
export async function brandControllerCreate(
  body: API.CreateBrandDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.BrandResponseDto }>(
    '/api/admin/product/brand/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 删除品牌 POST /api/admin/product/brand/delete */
export async function brandControllerRemove(options?: { [key: string]: any }) {
  return request<any>('/api/admin/product/brand/delete', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取品牌详情 POST /api/admin/product/brand/detail */
export async function brandControllerFindOne(options?: { [key: string]: any }) {
  return request<API.ResponseReturn & { data?: API.BrandResponseDto }>(
    '/api/admin/product/brand/detail',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 获取品牌列表 GET /api/admin/product/brand/list */
export async function brandControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.BrandControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & {
      data?: API.PageResponse & { records?: API.BrandResponseDto[] };
    }
  >('/api/admin/product/brand/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取所有品牌（无分页） GET /api/admin/product/brand/list-all */
export async function brandControllerFindAllWithoutPagination(options?: {
  [key: string]: any;
}) {
  return request<API.ResponseReturn & { data?: API.BrandResponseDto }>(
    '/api/admin/product/brand/list-all',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 更新品牌 POST /api/admin/product/brand/update */
export async function brandControllerUpdate(
  body: API.UpdateBrandDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.BrandResponseDto }>(
    '/api/admin/product/brand/update',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
