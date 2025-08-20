import { PageResult } from '@/services/index';

// 权限项定义
export interface PermissionItem {
  /** 权限 */
  permission: string;
  /** 名称 */
  name: string;
  /** 权限状态 */
  status: number;
}

// 权限组定义
export interface PermissionGroup {
  /** 路径 */
  path: string;
  /** 权限名称 */
  groupName: string;
  /** 权限列表 */
  child: PermissionItem[];
}


// 获取权限列表响应类型
export type GetPermissionListResponse = PageResult<PermissionGroup>;

// 获取角色权限参数
export interface GetRolePermissionsParams {
  id: string;
}
