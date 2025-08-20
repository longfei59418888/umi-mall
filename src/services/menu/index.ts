import { request } from '@umijs/max';
import { ApiResponse } from '@/services/index';
import type { CreateMenuParams, UpdateMenuParams, MenuListItem, MenuListResult } from './type';

/** 获取菜单列表 */
export async function getMenuList(params: any) {
  return request<ApiResponse<MenuListResult>>('/api/admin/manage/menu/list', {
    method: 'GET',
    params,
  });
}

/** 获取菜单详情 */
export async function getMenuDetail(id: string) {
  return request<ApiResponse<MenuListItem>>(`/api/admin/manage/menu/${id}`, {
    method: 'GET',
  });
}

/** 创建菜单 */
export async function createMenu(data: CreateMenuParams) {
  return request<ApiResponse<MenuListItem>>('/api/admin/manage/menu/create', {
    method: 'POST',
    data,
  });
}

/** 更新菜单 */
export async function updateMenu(data: UpdateMenuParams) {
  return request<ApiResponse<MenuListItem>>('/api/admin/manage/menu/update', {
    method: 'POST',
    data,
  });
}

/** 删除菜单 */
export async function deleteMenu(id: string) {
  return request<ApiResponse<null>>(`/api/admin/manage/menu/delete/${id}`, {
    method: 'POST',
  });
}