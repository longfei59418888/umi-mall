// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取菜单详情 GET /api/admin/manage/menu/${param0} */
export async function menuControllerGetMenuById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerGetMenuByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn & { data?: API.MallMenuResponseDto }>(
    `/api/admin/manage/menu/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 创建菜单 POST /api/admin/manage/menu/create */
export async function menuControllerCreateMenu(
  body: API.CreateMallMenuDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.MallMenuResponseDto }>(
    '/api/admin/manage/menu/create',
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

/** 删除菜单 POST /api/admin/manage/menu/delete/${param0} */
export async function menuControllerDeleteMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerDeleteMenuParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn>(
    `/api/admin/manage/menu/delete/${param0}`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 获取菜单列表 GET /api/admin/manage/menu/list */
export async function menuControllerGetMenuList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuControllerGetMenuListParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & {
      data?: API.PageResponse & { records?: API.MallMenuResponseDto[] };
    }
  >('/api/admin/manage/menu/list', {
    method: 'GET',
    params: {
      ...params,
      params: undefined,
      ...params['params'],
    },
    ...(options || {}),
  });
}

/** 更新菜单 POST /api/admin/manage/menu/update */
export async function menuControllerUpdateMenu(
  body: API.UpdateMallMenuDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.MallMenuResponseDto }>(
    '/api/admin/manage/menu/update',
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
