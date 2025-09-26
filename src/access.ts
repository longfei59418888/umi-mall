import { UserInfo } from '@/services/auth/type';
import { IRoute } from '@umijs/types';
import routes from '../config/routes';

export const getMenuPath = (
  routes: IRoute[],
  menus: string[],
  paths: string[],
) => {
  routes.forEach((route) => {
    const { routes: record = [], path = '' } = route;
    if (record.some((item) => menus.includes(item.path ?? ''))) {
      paths.push(path);
    }
    getMenuPath(record, menus, paths);
  });

  return paths;
};

/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default (initialState: { userinfo: UserInfo }) => {
  const { permissions = [], menus = [] } = initialState.userinfo || {};
  return {
    ...menus.reduce((previousValue, currentValue) => {
      return {
        ...previousValue,
        [`${currentValue}`]: true,
      };
    }, {}),
    ...getMenuPath(routes, menus, []).reduce((previousValue, currentValue) => {
      return {
        ...previousValue,
        [`${currentValue}`]: true,
      };
    }, {}),
    ...permissions.reduce((previousValue, currentValue) => {
      return {
        ...previousValue,
        [`Permission:${currentValue}`]: true,
      };
    }, {}),
  };
};
