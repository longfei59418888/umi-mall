import { LOGIN_TOKEN, LOGIN_USERINFO } from '@/constants/localStorage';
import { getUserInfo, login } from '@/services/auth';
import { LoginParams } from '@/services/auth/type';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'umi';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm();

  // 使用 useRequest 处理登录请求
  const { run: handleLogin, loading } = useRequest(
    async (params: LoginParams) => {
      const response = await login(params);
      if (response.code === 200 && response.data.token) {
        // 保存token到localStorage
        localStorage.setItem(LOGIN_TOKEN, response.data.token);
        // 保存用户信息(如果有)
        if (response.data.userInfo) {
          setInitialState({
            userinfo: response.data.userInfo,
            isLogin: true,
          });
          localStorage.setItem(
            LOGIN_USERINFO,
            JSON.stringify(response.data.userInfo),
          );
        } else {
          const response = await getUserInfo();
          if (response.data && response.code === 200) {
            setInitialState({
              userinfo: response.data,
              isLogin: true,
            });
            localStorage.setItem(LOGIN_USERINFO, JSON.stringify(response.data));
          }
        }
        message.success('登录成功');
        // 跳转到首页
        navigate('/home');
      } else {
        message.error(response.message || '登录失败');
        throw new Error(response.message || '登录失败');
      }
    },
    {
      manual: true, // 手动触发
      onError: (error) => {
        console.error('Login error:', error);
      },
    },
  );

  const handleSubmit = (values: LoginParams) => {
    handleLogin(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            系统登录
          </h2>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
              className="mb-4"
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="用户名"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
              className="mb-6"
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="密码"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </Form.Item>
            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
