// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 管理员登录 POST /api/admin/auth/login */
export async function authControllerLogin(
  body: API.LoginMallAdminDto,
  options?: { [key: string]: any },
) {
  return request<API.ResponseReturn & { data?: API.MallAdminLoginResponseDto }>(
    '/api/admin/auth/login',
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

/** 退出登录 POST /api/admin/auth/logout */
export async function authControllerLogout(options?: { [key: string]: any }) {
  return request<API.ResponseReturn & { data?: API.String }>(
    '/api/admin/auth/logout',
    {
      method: 'POST',
      ...(options || {}),
    },
  );
}

/** 获取用户信息 GET /api/admin/auth/userinfo */
export async function authControllerGetUserInfo(options?: {
  [key: string]: any;
}) {
  return request<
    API.ResponseReturn & {
      data?: API.MallAdminInfoResponseDto & {
        roles?: API.MallRoleResponseDto[];
        menus?: API.MallMenuResponseDto[];
      };
    }
  >('/api/admin/auth/userinfo', {
    method: 'GET',
    ...(options || {}),
  });
}
