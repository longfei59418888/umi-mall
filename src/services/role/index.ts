import { ApiResponse } from '@/services/index';
import { request } from '@umijs/max';
import type {
  AssignMenuParams,
  AssignPermissionParams,
  CreateRoleParams,
  FindUsersByRoleIdParams,
  RoleListItem,
  RoleListResult,
  UpdateRoleParams,
} from './type';

/** 获取角色列表 */
export async function getRoleList(params: any) {
  return request<ApiResponse<RoleListResult>>('/api/admin/manage/role/list', {
    method: 'GET',
    params,
  });
}

/** 获取角色详情 */
export async function getRoleDetail(id: string) {
  return request<ApiResponse<RoleListItem>>(
    `/api/admin/manage/role/detail/${id}`,
    {
      method: 'GET',
    },
  );
}

/** 创建角色 */
export async function createRole(data: CreateRoleParams) {
  return request<ApiResponse<RoleListItem>>('/api/admin/manage/role/create', {
    method: 'POST',
    data,
  });
}

/** 更新角色 */
export async function updateRole(data: UpdateRoleParams) {
  return request<ApiResponse<RoleListItem>>(
    `/api/admin/manage/role/update/${data.id}`,
    {
      method: 'POST',
      data,
    },
  );
}

/** 删除角色 */
export async function deleteRole(id: string) {
  return request<ApiResponse<null>>(`/api/admin/manage/role/delete/${id}`, {
    method: 'POST',
  });
}

/** 给角色分配菜单 */
export async function assignMenusToRole(
  roleId: string,
  data: AssignMenuParams,
) {
  return request<ApiResponse<string>>(`/api/admin/manage/role/${roleId}/menu`, {
    method: 'POST',
    data,
  });
}

/** 分配权限给角色 */
export async function assignPermissionsToRole(
  roleId: string,
  data: AssignPermissionParams,
) {
  return request<ApiResponse<string>>(
    `/api/admin/manage/role/${roleId}/permission`,
    {
      method: 'POST',
      data,
    },
  );
}

/** 查询角色下的用户列表 */
export async function getUsersByRoleId(params: FindUsersByRoleIdParams) {
  return request<ApiResponse<any>>(
    `/api/admin/manage/role/${params.id}/users`,
    {
      method: 'GET',
      params,
    },
  );
}

/** 获取角色已分配菜单 */
export async function getRoleMenus(roleId: string) {
  return request<ApiResponse<{ menus: string[] }>>(
    `/api/admin/manage/role/${roleId}/menus`,
    {
      method: 'GET',
    },
  );
}

/** 获取角色已分配菜单 */
export async function getRolePermissionPaths(roleId: string) {
  return request<ApiResponse<{ permissions: string[] }>>(
    `/api/admin/manage/role/${roleId}/permissions`,
    {
      method: 'GET',
    },
  );
}
