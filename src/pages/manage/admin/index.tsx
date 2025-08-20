import {
  createUser,
  deleteUser,
  getUserList,
  updateUser,
} from '@/services/admin';
import { getRoleList } from '@/services/role'; // 添加这行导入
import {
  CreateUserParams,
  UpdateUserParams,
  UserItem,
} from '@/services/admin/type';
import { MallRoleResponseDto } from '@/services/auth/type';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { ActionType } from '@ant-design/pro-table/es/typing';
import { Button, Dropdown, Form, Input, message, Modal, Select } from 'antd';
import { useEffect, useRef, useState } from 'react'; // 添加useEffect导入

export default function AdminManagement() {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserItem | null>(null);
  const [rolesData, setRolesData] = useState<MallRoleResponseDto[]>([]); // 移除静态数据初始化

  // 获取角色数据
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoleList({ current: 1, pageSize: 100 }); // 获取所有角色

        if (response.code === 200) {
          // 根据实际返回的数据结构调整
          setRolesData(response.data.records);
        }
      } catch (error) {
        console.error('获取角色数据失败:', error);
        message.error('获取角色数据失败');
      }
    };

    fetchRoles();
  }, []);

  // 打开创建/编辑模态框
  const openModal = (user?: UserItem) => {
    setCurrentUser(user || null);
    if (user) {
      // 设置编辑表单的值
      form.setFieldsValue({
        ...user,
        roleIds: user.roles?.map((role) => role.id) || [],
      });
    } else {
      // 重置创建表单
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // 关闭模态框
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  // 提交表单处理
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (currentUser) {
        // 更新用户
        await updateUser(currentUser.id, values as UpdateUserParams);
        message.success('更新用户成功');
      } else {
        // 创建用户
        await createUser(values as CreateUserParams);
        message.success('创建用户成功');
      }
      closeModal();
      actionRef.current?.reload();
    } catch (error) {
      message.error('操作失败，请重试');
      console.error('Submit error:', error);
    }
  };

  // 删除用户处理
  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      message.success('删除用户成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败，请重试');
      console.error('Delete error:', error);
    }
  };

  return (
    <>
      <ProTable<UserItem>
        columns={[
          {
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
          },
          {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            width: 120,
          },
          {
            title: '昵称',
            dataIndex: 'nickName',
            key: 'nickName',
            width: 120,
          },
          {
            title: '电子邮箱',
            dataIndex: 'email',
            key: 'email',
            width: 200,
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            valueEnum: {
              0: {
                text: '禁用',
                status: 'Default',
              },
              1: {
                text: '启用',
                status: 'Success',
              },
            },
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 180,
          },
          {
            title: '最后登录时间',
            dataIndex: 'loginTime',
            key: 'loginTime',
            width: 180,
          },
          {
            title: '角色',
            dataIndex: 'roles',
            key: 'roles',
            width: 150,
            render: (_, { roles }) => {
              return roles?.map((role) => role.name).join(', ') || '无角色';
            },
          },
          {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
              <a key="edit" onClick={() => openModal(record)}>
                编辑
              </a>,
              <a key="delete" onClick={() => handleDelete(record.id)}>
                删除
              </a>,
            ],
          },
        ]}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const response = await getUserList(params);
          return {
            data: response.data.records,
            success: response.code === 200,
            total: response.data.total,
          };
        }}
        rowKey="id"
        search={{}}
        columnsState={{
          persistenceKey: 'pro-table-admin-management',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        headerTitle="用户管理"
        toolBarRender={() => [
          <Button
            key="add"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
            type="primary"
          >
            新建用户
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '刷新数据',
                  key: 'refresh',
                  onClick: () => actionRef.current?.reload(),
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      {
        // 创建/编辑用户模态框
        isModalOpen && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={
              currentUser
                ? {
                    ...currentUser,
                    roleIds: currentUser.roles?.map((role) => role.id) || [],
                  }
                : {}
            }
          >
            <Modal
              title={currentUser ? '编辑用户' : '创建用户'}
              open={isModalOpen}
              onCancel={closeModal}
              onOk={handleSubmit}
              destroyOnClose
            >
              <Form.Item
                name="username"
                label="用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
              {!currentUser && (
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                      min: 6,
                    },
                  ]}
                >
                  <Input.Password placeholder="请输入至少6位密码" />
                </Form.Item>
              )}
              <Form.Item
                name="email"
                label="电子邮箱"
                rules={[
                  {
                    required: true,
                    message: '请输入电子邮箱',
                    type: 'email',
                  },
                ]}
              >
                <Input placeholder="请输入电子邮箱" />
              </Form.Item>
              <Form.Item
                name="nickName"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入昵称',
                  },
                ]}
              >
                <Input placeholder="请输入昵称" />
              </Form.Item>
              <Form.Item
                name="roleIds"
                label="角色"
                rules={[
                  {
                    required: true,
                    message: '请选择角色',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="请选择角色"
                  options={rolesData.map((role) => ({
                    value: role.id,
                    label: role.name,
                  }))}
                />
              </Form.Item>
              <Form.Item name="note" label="备注">
                <Input.TextArea placeholder="请输入备注信息" />
              </Form.Item>
              {currentUser && (
                <Form.Item
                  name="status"
                  label="状态"
                  rules={[
                    {
                      required: true,
                      message: '请选择状态',
                    },
                  ]}
                >
                  <Select
                    placeholder="请选择状态"
                    options={[
                      { value: 0, label: '禁用' },
                      { value: 1, label: '启用' },
                    ]}
                  />
                </Form.Item>
              )}
            </Modal>
          </Form>
        )
      }
    </>
  );
}
