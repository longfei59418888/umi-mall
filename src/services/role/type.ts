import { PageResult } from '@/services/index';

// 创建角色参数类型
export interface CreateRoleParams {
  /** 角色名称 */
  name: string;
  /** 角色描述 */
  description?: string;
  /** 后台用户数量 */
  adminCount?: number;
}

// 更新角色参数类型
export interface UpdateRoleParams extends Partial<CreateRoleParams> {
  /** 角色ID */
  id: string;
}

// 角色响应数据类型
export interface RoleListItem {
  /** 角色ID */
  id: string;
  /** 角色名称 */
  name: string;
  /** 角色描述 */
  description: string;
}

// 角色列表响应类型
export type RoleListResult = PageResult<RoleListItem>;

// 分配菜单参数类型
export interface AssignMenuParams {
  /** 菜单ID列表 */
  menuIds: string[];
}

// 分配权限参数类型
export interface AssignPermissionParams {
  /** 权限路径列表 */
  permissionPaths: string[];
}

// 查询角色下用户列表参数
export interface FindUsersByRoleIdParams {
  id: string;
  /** 当前页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
}

// 获取角色菜单响应类型
export interface RoleMenusResult {
  /** 菜单ID列表 */
  menus: string[];
}