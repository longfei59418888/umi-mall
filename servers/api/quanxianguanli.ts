// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取权限列表 GET /api/admin/manage/permission/list */
export async function permissionControllerGetPermissionList(options?: {
  [key: string]: any;
}) {
  return request<API.ResponseReturn & { data?: API.MallAdminPermissionDto[] }>(
    '/api/admin/manage/permission/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取角色的所有权限 GET /api/admin/manage/permission/role/${param0} */
export async function permissionControllerGetRolePermissions(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionControllerGetRolePermissionsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseReturn & { data?: API.MallAdminPermissionDto[] }>(
    `/api/admin/manage/permission/role/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
