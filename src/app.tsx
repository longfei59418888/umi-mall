import { LOGIN_TOKEN, LOGIN_USERINFO } from '@/constants/localStorage';
import { getUserInfo, logout } from '@/services/auth';
import { UserInfo } from '@/services/auth/type';
import { LogoutOutlined } from '@ant-design/icons';
import { RequestConfig } from '@umijs/max';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { history } from 'umi';

// 运行时配置

export async function getInitialState() {
  // 初始化状态
  const initialState = {
    userinfo: null as UserInfo | null,
    isLogin: false,
  };

  try {
    const token = localStorage.getItem(LOGIN_TOKEN);
    if (token) {
      const response = await getUserInfo();
      if (response.data && response.code === 200) {
        initialState.userinfo = response.data;
        initialState.isLogin = true;
        localStorage.setItem(LOGIN_USERINFO, JSON.stringify(response.data));
      }
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }

  return initialState;
}

export const layout = ({
  initialState,
}: {
  initialState: { userinfo: UserInfo | null };
}) => {
  return {
    avatarProps: {
      src:
        initialState?.userinfo?.icon ||
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      title:
        initialState?.userinfo?.nickName ||
        initialState?.userinfo?.username ||
        '未知用户',
      size: 'small',
    },
    actionsRender: () => [
      <span
        className={'text-xs'}
        key="logout"
        onClick={async () => {
          try {
            // 调用退出登录API
            await logout();
            // 清除本地存储
            localStorage.removeItem(LOGIN_TOKEN);
            localStorage.removeItem(LOGIN_USERINFO);
            location.reload();
          } catch (error) {
            console.error('退出登录失败:', error);
          }
        }}
      >
        <LogoutOutlined /> 退出系统
      </span>,
    ],
  };
};

export const onRouteChange = ({
  location,
}: {
  location: { pathname: string };
}) => {
  // 不需要登录的白名单路由
  const whiteList = ['/login'];
  // 获取当前路由
  const currentPath = location.pathname;

  // 检查是否在白名单中
  if (!whiteList.includes(currentPath)) {
    // 检查是否登录
    const token = localStorage.getItem(LOGIN_TOKEN);
    if (!token) {
      // 未登录，跳转到登录页面
      history.push('/login');
    }
  }
};

export const request: RequestConfig = {
  baseURL: 'http://127.0.0.1:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // 请求拦截器
  requestInterceptors: [
    (config: AxiosRequestConfig) => {
      // 从localStorage中获取token
      const token = localStorage.getItem(LOGIN_TOKEN);
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    [
      (response) => {
        return response;
      },
      (async (error: AxiosError) => {
        const { response } = error;
        // 处理未授权情况
        if (response?.status === 401) {
          // 清除本地存储
          localStorage.removeItem(LOGIN_TOKEN);
          localStorage.removeItem(LOGIN_USERINFO);
          // 跳转到登录页
          window.location.href = '/login';
        }
        if (response?.status !== 200) {
          // message.error((response?.data as ApiResponse<null>).message);
          throw response?.data;
        }
        return response;
      }) as any,
    ],
  ],
};
