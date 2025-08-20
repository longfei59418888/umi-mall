import { MallRoleResponseDto } from '@/services/auth/type';

type CreateMallAdminDto = {
  /** 用户名 */
  username: string;
  /** 密码（至少6位） */
  password: string;
  /** 电子邮箱 */
  email: string;
  /** 昵称 */
  nickName: string;
  /** 头像URL */
  icon?: string;
  /** 备注信息 */
  note?: string;
  /** 角色ID列表 */
  roleIds: string[];
};
type UpdateMallAdminDto = {
  /** 用户名 */
  username?: string;
  /** 密码（至少6位） */
  password?: string;
  /** 电子邮箱 */
  email?: string;
  /** 昵称 */
  nickName?: string;
  /** 头像URL */
  icon?: string;
  /** 备注信息 */
  note?: string;
  /** 角色ID列表 */
  roleIds?: string[];
  /** 帐号启用状态：0->禁用；1->启用 */
  status?: number;
};
type MallAdminResponseDto = {
  /** 管理员ID */
  id: string;
  /** 用户名 */
  username: string;
  /** 电子邮箱 */
  email: string;
  /** 昵称 */
  nickName: string;
  /** 头像URL */
  icon?: string;
  /** 备注信息 */
  note?: string;
  /** 创建时间 */
  createTime: string;
  /** 最后登录时间 */
  loginTime?: string;
  /** 帐号启用状态：0->禁用；1->启用 */
  status: number;
  /** 角色列表 */
  roles?: MallRoleResponseDto[];
};

// 用户列表项类型
export type UserItem = MallAdminResponseDto;

// 创建用户参数类型
export type CreateUserParams = CreateMallAdminDto;

// 更新用户参数类型
export type UpdateUserParams = UpdateMallAdminDto;
