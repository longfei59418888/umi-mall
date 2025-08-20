import { request } from '@umijs/max';
import { ApiResponse, LoginParams, LoginResult, UserInfo } from './type';

/**
 * 登录API
 * @param params 登录参数
 * @returns 登录结果
 */
export async function login(params: LoginParams) {
  return request<ApiResponse<LoginResult>>('/api/admin/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function getUserInfo() {
  return request<ApiResponse<UserInfo>>(`/api/admin/auth/userinfo`, {
    method: 'GET',
  });
}

/**
 * 退出登录API
 * @returns 退出结果
 */
export async function logout() {
  return request<ApiResponse<null>>('/api/admin/auth/logout', {
    method: 'POST',
  });
}
