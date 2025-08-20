import { PageResult } from '@/services/index';

// 创建菜单参数类型
export interface CreateMenuParams {
  /** 父级ID */
  parentId: string;
  /** 菜单名称 */
  title: string;
  /** 菜单级数 */
  level: number;
  /** 菜单排序 */
  sort: number;
  /** 前端名称 */
  name: string;
  /** 前端图标 */
  icon?: string;
  /** 前端隐藏 */
  hidden: number;
}

// 更新菜单参数类型
export interface UpdateMenuParams extends Partial<CreateMenuParams> {
  /** 菜单ID */
  id: string;
}

// 菜单响应数据类型
export interface MenuListItem {
  /** 菜单ID */
  id: string;
  /** 父级ID */
  parentId?: string;
  /** 创建时间 */
  createTime: string;
  /** 菜单名称 */
  title: string;
  /** 菜单级数 */
  level: number;
  /** 菜单排序 */
  sort: number;
  /** 前端名称 */
  name: string;
  /** 前端图标 */
  icon?: string;
  /** 前端隐藏 */
  hidden: number;
}

export type MenuListItemForTree = MenuListItem & {
  children?: MenuListItemForTree[];
  key: string;
  title: string;
  value: number;
};

// 菜单列表响应类型
export type MenuListResult = PageResult<MenuListItem>;
