import {
  createMenu,
  deleteMenu,
  getMenuList,
  updateMenu,
} from '@/services/menu';
import {
  CreateMenuParams,
  MenuListItem,
  MenuListItemForTree,
  UpdateMenuParams,
} from '@/services/menu/type';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { ActionType, ProColumns } from '@ant-design/pro-table/es/typing';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Switch,
  TreeSelect,
} from 'antd';
import { useEffect, useRef, useState } from 'react';

// 构建菜单树
export const buildMenuTree = (
  menus: MenuListItem[],
  parentId: string,
): MenuListItemForTree[] | undefined => {
  const children = menus.filter((menu) => menu.parentId === parentId);
  if (children.length < 1 && parentId !== '0') {
    return undefined;
  }
  return children.map((menu) => ({
    ...menu,
    title: menu.title,
    value: Number(menu.id),
    key: menu.id,
    children: buildMenuTree(menus, menu.id),
  }));
};

export default function MenuManagement() {
  const actionRef = useRef<ActionType>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState<MenuListItem | null>(null);
  const [menuTreeData, setMenuTreeData] = useState<any[]>([
    { name: '根菜单', value: '0', children: [] },
  ]);
  const [allMenus, setAllMenus] = useState<MenuListItem[]>([]);

  // 获取所有菜单数据
  const fetchAllMenus = async () => {
    try {
      const response = await getMenuList({
        current: 1,
        pageSize: 1000, // 获取所有菜单
      });

      if (response.code === 200) {
        const menus = response.data?.records || [];
        setAllMenus(menus);
        // 构建树形结构
        const treeData = buildMenuTree(menus, '0');
        setMenuTreeData([{ title: '根菜单', value: '', children: treeData }]);
      }
    } catch (error) {
      message.error('获取菜单列表失败');
    }
  };

  // 初始化时获取菜单数据
  useEffect(() => {
    fetchAllMenus();
  }, []);

  // 处理创建菜单
  const handleCreate = (parentId?: string) => {
    setCurrentRecord(null);
    form.resetFields();
    // 如果有父级ID，则设置为默认值
    if (parentId) {
      form.setFieldsValue({ parentId });
    }
    setIsModalVisible(true);
  };

  // 处理编辑菜单
  const handleEdit = (record: MenuListItem) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      parentId: record.parentId || '',
      hidden: !!record.hidden,
    });
    setIsModalVisible(true);
  };

  // 处理删除菜单
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个菜单吗？',
      onOk: async () => {
        try {
          await deleteMenu(id);
          message.success('删除成功');
          actionRef.current?.reload();
          // 重新获取菜单数据以更新树形结构
          fetchAllMenus();
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  // 提交表单
  const handleFinish = async (values: any) => {
    try {
      const params = {
        ...values,
        hidden: values.hidden ? 1 : 0,
        parentId: values.parentId || '',
      };

      if (currentRecord) {
        // 更新菜单
        await updateMenu({
          ...params,
          id: currentRecord.id,
        } as UpdateMenuParams);
        message.success('更新成功');
      } else {
        // 创建菜单
        await createMenu(params as CreateMenuParams);
        message.success('创建成功');
      }

      setIsModalVisible(false);
      form.resetFields();
      actionRef.current?.reload();
      // 重新获取菜单数据以更新树形结构
      fetchAllMenus();
    } catch (error) {
      message.error(currentRecord ? '更新失败' : '创建失败');
    }
  };

  const columns: ProColumns<
    MenuListItem & {
      children?: MenuListItem[];
    }
  >[] = [
    {
      width: 160,
      title: '前端名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '菜单路径',
      dataIndex: 'title',
      valueType: 'text',
      render: (text, record) => {
        console.log(text, record);
        return record.title;
      },
    },
    {
      title: '菜单级数',
      dataIndex: 'level',
      valueType: 'digit',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'digit',
    },
    {
      title: '前端图标',
      width: 160,
      dataIndex: 'icon',
      valueType: 'text',
    },
    {
      title: '是否隐藏',
      dataIndex: 'hidden',
      valueType: 'select',
      valueEnum: {
        0: { text: '显示', status: 'Success' },
        1: { text: '隐藏', status: 'Default' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text: any, record: MenuListItem) => [
        <Button
          key="addChild"
          type="link"
          icon={<PlusOutlined />}
          onClick={() => handleCreate(record.id)}
        >
          添加子菜单
        </Button>,
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <Button
          key="delete"
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <>
      <ProTable<
        MenuListItem & {
          children?: MenuListItem[];
        }
      >
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const response = await getMenuList({
            ...params,
            current: params.current,
            pageSize: 1000,
          });

          if (response.code === 200) {
            // 构建嵌套表格数据
            const menus = response.data?.records || [];
            const treeData = buildMenuTree(menus, '0');
            return {
              data: treeData && treeData.length > 0 ? treeData : [],
              success: true,
              total: response.data?.total || 0,
            };
          }

          return {
            data: [],
            success: false,
            total: 0,
          };
        }}
        columnsState={{
          persistenceKey: 'menu-table-columns',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={false}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={false}
        dateFormatter="string"
        headerTitle="菜单管理"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => handleCreate()}
            type="primary"
          >
            新建菜单
          </Button>,
          <Button
            key="refresh"
            onClick={() => {
              actionRef.current?.reload();
              fetchAllMenus();
            }}
          >
            刷新
          </Button>,
        ]}
        expandable={{
          // 展开子菜单
          childrenColumnName: 'children',
        }}
      />

      <Modal
        title={currentRecord ? '编辑菜单' : '创建菜单'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        destroyOnHidden
      >
        <Form
          form={form}
          onFinish={handleFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item label="父级菜单" name="parentId">
            <TreeSelect
              treeData={menuTreeData}
              fieldNames={{
                label: 'name', // 显示文本字段
                value: 'id', // 选中值字段
              }}
              placeholder="请选择父级菜单"
              treeDefaultExpandAll
            />
          </Form.Item>

          <Form.Item
            label="菜单名称"
            name="title"
            rules={[{ required: true, message: '请输入菜单名称' }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>

          <Form.Item
            label="前端名称"
            name="name"
            rules={[{ required: true, message: '请输入前端名称' }]}
          >
            <Input placeholder="请输入前端名称" />
          </Form.Item>

          <Form.Item
            label="菜单级数"
            name="level"
            rules={[{ required: true, message: '请输入菜单级数' }]}
          >
            <InputNumber
              min={1}
              placeholder="请输入菜单级数"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="排序"
            name="sort"
            rules={[{ required: true, message: '请输入排序' }]}
          >
            <InputNumber
              min={0}
              placeholder="请输入排序"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item label="前端图标" name="icon">
            <Input placeholder="请输入前端图标" />
          </Form.Item>

          <Form.Item label="是否隐藏" name="hidden" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
