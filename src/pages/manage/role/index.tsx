import { buildMenuTree } from '@/pages/manage/menu';
import { getMenuList } from '@/services/menu';
import { MenuListItemForTree } from '@/services/menu/type';
import { getPermissionList } from '@/services/permission';
import type { PermissionGroup } from '@/services/permission/type';
import {
  assignMenusToRole,
  assignPermissionsToRole,
  createRole,
  deleteRole,
  getRoleDetail,
  getRoleList,
  getRoleMenus,
  getRolePermissionPaths,
  updateRole,
} from '@/services/role';
import { RoleListItem } from '@/services/role/type';
import { getAllExpandedKeys } from '@/utils/data';
import { PlusOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { ActionType } from '@ant-design/pro-table';
import { Button, Card, Form, Input, message, Modal, Tree } from 'antd';
import { useRef, useState } from 'react';

export default function RoleManagement() {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [assignMenuModalVisible, setAssignMenuModalVisible] = useState(false);
  const [assignPermissionModalVisible, setAssignPermissionModalVisible] =
    useState(false);
  const [currentRole, setCurrentRole] = useState<RoleListItem | null>(null);
  const [menuTreeData, setMenuTreeData] = useState<MenuListItemForTree[]>([]);
  const [checkedMenuKeys, setCheckedMenuKeys] = useState<React.Key[]>([]);
  const [defaultExpandedKeys, setDefaultExpandedKeys] = useState<string[]>([]);
  const [permissionTreeData, setPermissionTreeData] = useState<any[]>([]);
  const [checkedPermissionKeys, setCheckedPermissionKeys] = useState<
    React.Key[]
  >([]);

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [assignMenuForm] = Form.useForm();
  const [assignPermissionForm] = Form.useForm();

  // 角色列表列配置
  const columns: ProColumns<RoleListItem>[] = [
    {
      title: '角色ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入角色名称',
          },
        ],
      },
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) =>
        record.id === '1'
          ? []
          : [
              <a
                key="edit"
                onClick={() => {
                  handleUpdateModalOpen(record);
                }}
              >
                编辑
              </a>,
              <a
                key="assignMenu"
                onClick={() => {
                  handleAssignMenuModalOpen(record);
                }}
              >
                分配菜单
              </a>,
              <a
                key="assignPermission"
                onClick={() => {
                  handleAssignPermissionModalOpen(record);
                }}
              >
                分配权限
              </a>,
              <a
                key="delete"
                onClick={async () => {
                  await handleDeleteRole(record.id);
                }}
              >
                删除
              </a>,
            ],
    },
  ];

  // 获取角色列表
  const fetchData = async (params: any) => {
    const response = await getRoleList(params);
    return {
      data: response.data.records,
      success: response.code === 200,
      total: response.data.total,
    };
  };

  // 创建角色
  const handleCreateRole = async (values: any) => {
    try {
      const response = await createRole(values);
      if (response.code === 200) {
        message.success('创建成功');
        setCreateModalVisible(false);
        createForm.resetFields();
        actionRef.current?.reload();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('创建失败');
    }
  };

  // 更新角色
  const handleUpdateRole = async (values: any) => {
    if (!currentRole) return;
    try {
      const response = await updateRole({ ...values, id: currentRole.id });
      if (response.code === 200) {
        message.success('更新成功');
        setUpdateModalVisible(false);
        updateForm.resetFields();
        actionRef.current?.reload();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('更新失败');
    }
  };

  // 删除角色
  const handleDeleteRole = async (id: string) => {
    try {
      const response = await deleteRole(id);
      if (response.code === 200) {
        message.success('删除成功');
        actionRef.current?.reload();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 打开更新角色弹窗
  const handleUpdateModalOpen = async (record: RoleListItem) => {
    const response = await getRoleDetail(record.id);
    if (response.code === 200) {
      setCurrentRole(response.data);
      updateForm.setFieldsValue(response.data);
      setUpdateModalVisible(true);
    } else {
      message.error(response.message);
    }
  };

  // 获取角色已分配的菜单
  const fetchRoleMenus = async (roleId: string) => {
    try {
      const response = await getRoleMenus(roleId);
      if (response.code === 200) {
        return response.data.menus || [];
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  // 获取角色已分配的权限
  const fetchRolePermissions = async (roleId: string) => {
    try {
      const response = await getRolePermissionPaths(roleId);
      if (response.code === 200) {
        // 提取所有权限的path

        return response.data.permissions || [];
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  // 打开分配菜单弹窗
  const handleAssignMenuModalOpen = async (record: RoleListItem) => {
    setCurrentRole(record);
    // 获取角色已分配的菜单
    const assignedMenus = await fetchRoleMenus(record.id);
    setCheckedMenuKeys(assignedMenus);
    if (!menuTreeData || menuTreeData.length === 0) {
      try {
        const response = await getMenuList({});
        if (response.code === 200) {
          const treeData = buildMenuTree(response.data.records, '0');
          setMenuTreeData(treeData ?? []);
          setDefaultExpandedKeys(
            getAllExpandedKeys(treeData ?? [], assignedMenus),
          );
        }
      } catch (error) {
        message.error('获取菜单数据失败');
      }
    } else {
      setDefaultExpandedKeys(
        getAllExpandedKeys(menuTreeData ?? [], assignedMenus),
      );
    }

    setAssignMenuModalVisible(true);
  };

  // 打开分配权限弹窗
  const handleAssignPermissionModalOpen = async (record: RoleListItem) => {
    setCurrentRole(record);
    // 获取角色已分配的权限
    const assignedPermissions = await fetchRolePermissions(record.id);
    setCheckedPermissionKeys(assignedPermissions);
    if (!permissionTreeData || permissionTreeData.length === 0) {
      try {
        const response = await getPermissionList();
        if (response.code === 200) {
          // 构建权限树结构
          const treeData = response.data.map((group: PermissionGroup) => ({
            title: group.groupName,
            key: group.path,
            children: group.child.map((permission) => ({
              title: permission.name,
              key: permission.permission,
              isLeaf: true,
            })),
          }));
          setDefaultExpandedKeys(
            getAllExpandedKeys<{
              key: string;
            }>(treeData, assignedPermissions),
          );
          setPermissionTreeData(treeData);
        }
      } catch (error) {
        message.error('获取权限数据失败');
      }
    } else {
      setDefaultExpandedKeys(
        getAllExpandedKeys(permissionTreeData, assignedPermissions),
      );
    }

    setAssignPermissionModalVisible(true);
  };

  // 提交菜单分配
  const handleAssignMenuSubmit = async () => {
    if (!currentRole) return;

    try {
      const menuIds = checkedMenuKeys as string[];
      const response = await assignMenusToRole(currentRole.id, { menuIds });
      if (response.code === 200) {
        message.success('菜单分配成功');
        setAssignMenuModalVisible(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('菜单分配失败');
    }
  };

  // 提交权限分配
  const handleAssignPermissionSubmit = async () => {
    if (!currentRole) return;

    try {
      const permissionPaths = checkedPermissionKeys as string[];
      const response = await assignPermissionsToRole(currentRole.id, {
        permissionPaths,
      });
      if (response.code === 200) {
        message.success('权限分配成功');
        setAssignPermissionModalVisible(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('权限分配失败');
    }
  };

  return (
    <Card>
      <ProTable<RoleListItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={fetchData}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-role-management',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="角色管理"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setCreateModalVisible(true);
            }}
            type="primary"
          >
            新建角色
          </Button>,
        ]}
      />

      {/* 创建角色弹窗 */}
      <Modal
        title="创建角色"
        open={createModalVisible}
        onOk={() => {
          createForm.submit();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
          createForm.resetFields();
        }}
      >
        <Form
          form={createForm}
          onFinish={handleCreateRole}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="角色名称"
            name="name"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item label="角色描述" name="description">
            <Input.TextArea placeholder="请输入角色描述" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 更新角色弹窗 */}
      <Modal
        title="更新角色"
        open={updateModalVisible}
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
          updateForm.resetFields();
        }}
      >
        <Form
          form={updateForm}
          onFinish={handleUpdateRole}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="角色名称"
            name="name"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item label="角色描述" name="description">
            <Input.TextArea placeholder="请输入角色描述" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 分配菜单弹窗 */}
      <Modal
        title="分配菜单"
        open={assignMenuModalVisible}
        onOk={handleAssignMenuSubmit}
        onCancel={() => {
          setAssignMenuModalVisible(false);
          setCheckedMenuKeys([]);
        }}
        width={600}
      >
        <Tree
          checkable
          treeData={menuTreeData}
          checkedKeys={checkedMenuKeys}
          onCheck={(checkedKeys) => {
            setCheckedMenuKeys(checkedKeys as React.Key[]);
          }}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </Modal>

      {/* 分配权限弹窗 */}
      <Modal
        title="分配权限"
        open={assignPermissionModalVisible}
        onOk={handleAssignPermissionSubmit}
        onCancel={() => {
          setAssignPermissionModalVisible(false);
          setCheckedPermissionKeys([]);
        }}
        width={600}
      >
        <Tree
          checkable
          treeData={permissionTreeData}
          checkedKeys={checkedPermissionKeys}
          onCheck={(checkedKeys) => {
            setCheckedPermissionKeys(checkedKeys as React.Key[]);
          }}
          defaultExpandedKeys={defaultExpandedKeys}
        />
      </Modal>
    </Card>
  );
}
