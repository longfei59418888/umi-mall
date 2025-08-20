// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建商品分类 POST /api/admin/product/category/create */
export async function categoryControllerCreate(
  body: API.CreateProductCategoryDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.String }>(
    '/api/admin/product/category/create',
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

/** 删除商品分类 POST /api/admin/product/category/delete */
export async function categoryControllerRemove(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/admin/product/category/delete', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取商品分类详情 POST /api/admin/product/category/detail */
export async function categoryControllerFindOne(options?: {
  [key: string]: any;
}) {
  return request<
    API.ResponseReturn & { data?: API.ProductCategoryResponseDto }
  >('/api/admin/product/category/detail', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取商品分类列表 GET /api/admin/product/category/list */
export async function categoryControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CategoryControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & {
      data?: API.PageResponse & { records?: API.ProductCategoryResponseDto[] };
    }
  >('/api/admin/product/category/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取所有商品分类（无分页） GET /api/admin/product/category/list-all */
export async function categoryControllerFindAllWithoutPagination(options?: {
  [key: string]: any;
}) {
  return request<
    API.ResponseReturn & { data?: API.ProductCategoryResponseDto }
  >('/api/admin/product/category/list-all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新商品分类 POST /api/admin/product/category/update */
export async function categoryControllerUpdate(
  body: API.UpdateProductCategoryDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.String }>(
    '/api/admin/product/category/update',
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
