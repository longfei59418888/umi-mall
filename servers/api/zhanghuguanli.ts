// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 创建管理员 POST /api/admin/manage/user/create */
export async function userControllerCreate(
  body: API.CreateMallAdminDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.MallAdminResponseDto }>(
    '/api/admin/manage/user/create',
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

/** 删除用户 POST /api/admin/manage/user/delete/${param0} */
export async function userControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api/admin/manage/user/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取单个用户 GET /api/admin/manage/user/detail/${param0} */
export async function userControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn & { data?: API.MallAdminResponseDto }>(
    `/api/admin/manage/user/detail/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 获取用户列表 GET /api/admin/manage/user/list */
export async function userControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & {
      data?: API.PageResponse & { records?: API.MallAdminResponseDto[] };
    }
  >('/api/admin/manage/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改用户 POST /api/admin/manage/user/update/${param0} */
export async function userControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserControllerUpdateParams,
  body: API.UpdateMallAdminDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn & { data?: API.MallAdminResponseDto }>(
    `/api/admin/manage/user/update/${param0}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    },
  );
}
