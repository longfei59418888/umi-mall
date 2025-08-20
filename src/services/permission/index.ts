import { request } from 'umi';
import { ApiResponse } from '@/services/index';
import { PermissionGroup, GetRolePermissionsParams } from './type';

/** 获取权限列表 GET /api/admin/manage/permission/list */
export async function getPermissionList(options?: { [key: string]: any }) {
  return request<ApiResponse<PermissionGroup[]>>(
    '/api/admin/manage/permission/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取角色的所有权限 GET /api/admin/manage/permission/role/${param0} */
export async function getRolePermissions(
  params: GetRolePermissionsParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<ApiResponse<PermissionGroup[]>>(
    `/api/admin/manage/permission/role/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
