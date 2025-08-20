// 登录请求参数
export interface LoginParams {
  username: string;
  password: string;
}

// 角色信息
export interface MallRoleResponseDto {
  id: string;
  name: string;
  description: string;
}

// 菜单信息
export interface MallMenuResponseDto {
  id: string;
  parentId?: string;
  createTime: string;
  title: string;
  level: number;
  sort: number;
  name: string;
  icon?: string;
  hidden: number;
}

// 用户信息
export interface UserInfo {
  id: string;
  username: string;
  nickName: string;
  icon: string;
  email: string;
  roles: MallRoleResponseDto[];
  menus: string[];
  permissions: string[];
  createTime: string;
  loginTime?: string;
  status: number;
}

// 登录响应结果
export interface LoginResult {
  token: string;
  userInfo?: UserInfo;
}

// API响应通用类型
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

