// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建商品属性类型 POST /api/admin/product/attributeCategory/create */
export async function productAttributeCategoryControllerCreate(
  body: API.CreateProductAttributeCategoryDto,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & { data?: API.ProductAttributeCategoryResponseDto }
  >('/api/admin/product/attributeCategory/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除商品属性类型 POST /api/admin/product/attributeCategory/delete */
export async function productAttributeCategoryControllerRemove(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/admin/product/attributeCategory/delete', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取商品属性类型详情 POST /api/admin/product/attributeCategory/detail */
export async function productAttributeCategoryControllerFindOne(options?: {
  [key: string]: any;
}) {
  return request<
    API.ResponseReturn & { data?: API.ProductAttributeCategoryResponseDto }
  >('/api/admin/product/attributeCategory/detail', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取商品属性类型列表 GET /api/admin/product/attributeCategory/list */
export async function productAttributeCategoryControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProductAttributeCategoryControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & {
      data?: API.PageResponse & {
        records?: API.ProductAttributeCategoryResponseDto[];
      };
    }
  >('/api/admin/product/attributeCategory/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取所有商品属性类型（不分页） GET /api/admin/product/attributeCategory/list-all */
export async function productAttributeCategoryControllerFindAllWithoutPagination(options?: {
  [key: string]: any;
}) {
  return request<
    API.ResponseReturn & { data?: API.ProductAttributeCategoryResponseDto[] }
  >('/api/admin/product/attributeCategory/list-all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新商品属性类型 POST /api/admin/product/attributeCategory/update */
export async function productAttributeCategoryControllerUpdate(
  body: API.UpdateProductAttributeCategoryDto,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & { data?: API.ProductAttributeCategoryResponseDto }
  >('/api/admin/product/attributeCategory/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
