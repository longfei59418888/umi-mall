// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 给角色分配菜单 POST /api/admin/manage/role/${param0}/menu */
export async function roleControllerAssignMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerAssignMenusParams,
  body: API.AssignMenuDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn & { data?: API.String }>(
    `/api/admin/manage/role/${param0}/menu`,
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

/** 获取角色已分配菜单 GET /api/admin/manage/role/${param0}/menus */
export async function roleControllerGetRoleMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerGetRoleMenusParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn & { data?: API.RoleMenusResponseDto }>(
    `/api/admin/manage/role/${param0}/menus`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 分配权限给角色 POST /api/admin/manage/role/${param0}/permission */
export async function roleControllerAssignPermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerAssignPermissionsParams,
  body: API.AssignPermissionDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn & { data?: API.String }>(
    `/api/admin/manage/role/${param0}/permission`,
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

/** 获取角色已分配权限 GET /api/admin/manage/role/${param0}/permissions */
export async function roleControllerGetRolePermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerGetRolePermissionsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<
    API.ResponseReturn & { data?: API.RolePermissionsResponseDto }
  >(`/api/admin/manage/role/${param0}/permissions`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询角色下的用户列表 GET /api/admin/manage/role/${param0}/users */
export async function roleControllerFindUsersByRoleId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerFindUsersByRoleIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<
    API.ResponseReturn & {
      data?: API.PageResponse & { records?: API.MallAdminResponseDto[] };
    }
  >(`/api/admin/manage/role/${param0}/users`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 创建角色 POST /api/admin/manage/role/create */
export async function roleControllerCreate(
  body: API.CreateRoleDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.MallRoleResponseDto }>(
    '/api/admin/manage/role/create',
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

/** 删除角色 POST /api/admin/manage/role/delete/${param0} */
export async function roleControllerRemove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerRemoveParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn>(
    `/api/admin/manage/role/delete/${param0}`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 获取单个角色 GET /api/admin/manage/role/detail/${param0} */
export async function roleControllerFindOne(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerFindOneParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn & { data?: API.MallRoleResponseDto }>(
    `/api/admin/manage/role/detail/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 获取角色列表 GET /api/admin/manage/role/list */
export async function roleControllerFindAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerFindAllParams,
  options?: { [key: string]: any },
) {
  return request<
    API.ResponseReturn & {
      data?: API.PageResponse & { records?: API.MallRoleResponseDto[] };
    }
  >('/api/admin/manage/role/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新角色 POST /api/admin/manage/role/update/${param0} */
export async function roleControllerUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleControllerUpdateParams,
  body: API.UpdateRoleDto,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn & { data?: API.MallRoleResponseDto }>(
    `/api/admin/manage/role/update/${param0}`,
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
