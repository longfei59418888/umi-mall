// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建商品 POST /api/admin/product/manage/create */
export async function productControllerCreate(
  body: API.CreateProductDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.CreateProductDto }>(
    '/api/admin/product/manage/create',
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

/** 删除商品 POST /api/admin/product/manage/delete */
export async function productControllerRemove(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/admin/product/manage/delete', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取商品详情 POST /api/admin/product/manage/detail */
export async function productControllerFindOne(options?: {
  [key: string]: any;
}) {
  return request<API.ResponseReturn & { data?: API.ProductResponseDto }>(
    '/api/admin/product/manage/detail',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 获取商品列表 GET /api/admin/product/manage/list */
export async function productControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProductControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & {
      data?: API.PageResponse & { records?: API.ProductResponseDto[] };
    }
  >('/api/admin/product/manage/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取所有商品（无分页） GET /api/admin/product/manage/list-all */
export async function productControllerFindAllWithoutPagination(options?: {
  [key: string]: any;
}) {
  return request<API.ResponseReturn & { data?: API.ProductResponseDto }>(
    '/api/admin/product/manage/list-all',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 更新商品 POST /api/admin/product/manage/update */
export async function productControllerUpdate(
  body: API.UpdateProductDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.ProductResponseDto }>(
    '/api/admin/product/manage/update',
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
