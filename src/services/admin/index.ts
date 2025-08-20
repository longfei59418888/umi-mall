import { ApiResponse, PageParams, PageResult } from '@/services';
import { request } from '@umijs/max';
import { CreateUserParams, UpdateUserParams, UserItem } from './type';

/**
 * 获取用户列表
 * @param params 分页参数
 * @returns 用户列表
 */
export async function getUserList(params: PageParams) {
  return request<ApiResponse<PageResult<UserItem>>>(
    '/api/admin/manage/user/list',
    {
      method: 'GET',
      params,
    },
  );
}

/**
 * 获取单个用户详情
 * @param id 用户ID
 * @returns 用户详情
 */
export async function getUserDetail(id: string) {
  return request<ApiResponse<UserItem>>(`/api/admin/manage/user/detail/${id}`, {
    method: 'GET',
  });
}

/**
 * 创建用户
 * @param data 用户数据
 * @returns 创建结果
 */
export async function createUser(data: CreateUserParams) {
  return request<ApiResponse<UserItem>>('/api/admin/manage/user/create', {
    method: 'POST',
    data,
  });
}

/**
 * 更新用户
 * @param id 用户ID
 * @param data 更新数据
 * @returns 更新结果
 */
export async function updateUser(id: string, data: UpdateUserParams) {
  return request<ApiResponse<UserItem>>(`/api/admin/manage/user/update/${id}`, {
    method: 'POST',
    data,
  });
}

/**
 * 删除用户
 * @param id 用户ID
 * @returns 删除结果
 */
export async function deleteUser(id: string) {
  return request<ApiResponse<{}>>(`/api/admin/manage/user/delete/${id}`, {
    method: 'POST',
  });
}
