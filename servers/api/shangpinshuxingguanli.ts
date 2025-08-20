// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建商品属性 POST /api/admin/product/attribute/create */
export async function productAttributeControllerCreate(
  body: API.CreateProductAttributeDto,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & { data?: API.ProductAttributeResponseDto }
  >('/api/admin/product/attribute/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除商品属性 POST /api/admin/product/attribute/delete */
export async function productAttributeControllerRemove(options?: {
  [key: string]: any;
}) {
  return request<any>('/api/admin/product/attribute/delete', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取商品属性详情 POST /api/admin/product/attribute/detail */
export async function productAttributeControllerFindOne(options?: {
  [key: string]: any;
}) {
  return request<
    API.ResponseReturn & { data?: API.ProductAttributeResponseDto }
  >('/api/admin/product/attribute/detail', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取商品属性列表 GET /api/admin/product/attribute/list */
export async function productAttributeControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProductAttributeControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & {
      data?: API.PageResponse & { records?: API.ProductAttributeResponseDto[] };
    }
  >('/api/admin/product/attribute/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新商品属性 POST /api/admin/product/attribute/update */
export async function productAttributeControllerUpdate(
  body: API.UpdateProductAttributeDto,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & { data?: API.ProductAttributeResponseDto }
  >('/api/admin/product/attribute/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
