import AttributeTreeSelect from '@/components/AttributeTreeSelect'; // 引入新的树形选择器组件
import CategoryTreeSelect from '@/components/CategoryTreeSelect'; // 引入新的商品分类树形选择器组件
import { getAllAttributeList } from '@/services/product/attribute';
import { AttributeResponseDto } from '@/services/product/attribute/type';
import {
  createCategory,
  deleteCategory,
  getCategoryList,
  updateCategory,
} from '@/services/product/category';
import {
  CategoryResponseDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@/services/product/category/type';
import { useNavigate } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Switch,
} from 'antd';
import { useEffect, useRef, useState } from 'react';

const { TextArea } = Input;

const CategoryManagement = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentRecord, setCurrentRecord] =
    useState<CategoryResponseDto | null>(null);
  const [attributeOptions, setAttributeOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // 获取所有商品属性选项
  const fetchAttributeOptions = async () => {
    try {
      const res = await getAllAttributeList();
      const options = res.data.map((item: AttributeResponseDto) => ({
        label: item.name,
        value: item.id.toString(),
      }));
      setAttributeOptions(options);
    } catch (error) {
      console.error('获取商品属性失败:', error);
    }
  };

  // 表格列定义
  const columns: ProColumns<CategoryResponseDto>[] = [
    {
      title: '分类名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入分类名称',
          },
        ],
      },
    },
    {
      title: '级别',
      dataIndex: 'level',
      valueType: 'select',
      valueEnum: {
        0: { text: '一级', status: 'Success' },
        1: { text: '二级', status: 'Processing' },
        2: { text: '三级', status: 'Warning' },
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择级别',
          },
        ],
      },
    },
    {
      title: '显示状态',
      dataIndex: 'showStatus',
      valueType: 'select',
      valueEnum: {
        0: { text: '不显示', status: 'Default' },
        1: { text: '显示', status: 'Success' },
      },
      render: (_, record) => (
        <Switch
          checked={record.showStatus === 1}
          checkedChildren="显示"
          unCheckedChildren="不显示"
          disabled
        />
      ),
    },
    {
      title: '导航栏显示',
      dataIndex: 'navStatus',
      valueType: 'select',
      valueEnum: {
        0: { text: '不显示', status: 'Default' },
        1: { text: '显示', status: 'Success' },
      },
      render: (_, record) => (
        <Switch
          checked={record.navStatus === 1}
          checkedChildren="显示"
          unCheckedChildren="不显示"
          disabled
        />
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '关键字',
      dataIndex: 'keywords',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="viewable"
          onClick={() => {
            navigate('/product/category/subdivision?parentId=' + record.id);
          }}
        >
          查看
        </a>,
        <a
          key="editable"
          onClick={() => {
            handleEdit(record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={async () => {
            await handleDelete(record.id);
            action?.reload();
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  // 处理编辑
  const handleEdit = (record: CategoryResponseDto) => {
    setCurrentRecord(record);
    setIsEdit(true);
    setIsModalVisible(true);
    // 设置表单值
    form.setFieldsValue({
      ...record,
      attributes: record.attributes?.map((attr) => attr.id.toString()) || [],
    });
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 处理提交
  const handleSubmit = async (
    values: CreateCategoryDto | UpdateCategoryDto,
  ) => {
    try {
      if (isEdit && currentRecord) {
        // 编辑
        await updateCategory({
          ...values,
          id: currentRecord.id,
        } as UpdateCategoryDto);
        message.success('更新成功');
      } else {
        // 创建
        await createCategory(values as CreateCategoryDto);
        message.success('创建成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      actionRef.current?.reload();
    } catch (error) {
      message.error(isEdit ? '更新失败' : '创建失败');
    }
  };

  // 打开创建模态框
  const handleCreate = () => {
    setCurrentRecord(null);
    setIsEdit(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  // 初始化时获取属性选项
  useEffect(() => {
    void fetchAttributeOptions();
  }, []);

  return (
    <>
      <ProTable<CategoryResponseDto>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const res = await getCategoryList({
            ...params,
            parentId: '0',
            pageSize: params.pageSize,
          });
          return {
            data: res.data.records,
            success: true,
            total: res.data.total,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="商品分类管理"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />

      <Modal
        title={isEdit ? '编辑商品分类' : '创建商品分类'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="分类名称"
                name="name"
                rules={[{ required: true, message: '请输入分类名称' }]}
              >
                <Input placeholder="请输入分类名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* 使用新的商品分类树形选择器组件 */}
              <Form.Item
                label="上级分类"
                name="parentId"
                rules={[{ required: true, message: '请选择上级分类' }]}
              >
                <CategoryTreeSelect />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="分类级别"
                name="level"
                rules={[{ required: true, message: '请选择分类级别' }]}
              >
                <Select
                  placeholder="请选择分类级别"
                  options={[
                    { label: '一级', value: 0 },
                    { label: '二级', value: 1 },
                    { label: '三级', value: 2 },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="商品单位"
                name="productUnit"
                rules={[{ required: true, message: '请输入商品单位' }]}
              >
                <Input placeholder="请输入商品单位" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="排序"
                name="sort"
                rules={[{ required: true, message: '请输入排序' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="图标" name="icon">
                <Input placeholder="请输入图标URL" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="关键字" name="keywords">
                <Input placeholder="请输入关键字" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {/* 使用新的树形选择器组件 */}
              <Form.Item label="关联属性" name="attributes">
                <AttributeTreeSelect />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            labelCol={{ offset: 0, span: 3 }}
            label="描述"
            name="description"
          >
            <TextArea placeholder="请输入描述" rows={4} />
          </Form.Item>
          <Form.Item
            labelCol={{ offset: 0, span: 3 }}
            label="导航栏显示"
            name="navStatus"
            valuePropName="checked"
          >
            <Switch checkedChildren="显示" unCheckedChildren="不显示" />
          </Form.Item>
          <Form.Item
            labelCol={{ offset: 0, span: 3 }}
            label="显示状态"
            name="showStatus"
            valuePropName="checked"
          >
            <Switch checkedChildren="显示" unCheckedChildren="不显示" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {isEdit ? '更新' : '创建'}
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                setIsModalVisible(false);
                form.resetFields();
              }}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryManagement;
