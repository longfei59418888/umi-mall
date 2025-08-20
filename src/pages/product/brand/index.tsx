import {
  createBrand,
  deleteBrand,
  getBrandList,
  updateBrand,
} from '@/services/product/brand';
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
  Switch,
} from 'antd';
import { useRef, useState } from 'react';
import {
  BrandListParams,
  BrandResponseDto,
  CreateBrandDto,
  UpdateBrandDto,
} from './types';

const { TextArea } = Input;

const BrandManagement = () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<BrandResponseDto | null>(
    null,
  );

  // 表格列定义
  const columns: ProColumns<BrandResponseDto>[] = [
    {
      title: '品牌名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入品牌名称',
          },
        ],
      },
    },
    {
      title: '首字母',
      dataIndex: 'firstLetter',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'digit',
    },
    {
      title: '是否为制造商',
      dataIndex: 'factoryStatus',
      valueType: 'select',
      valueEnum: {
        0: { text: '不是', status: 'Default' },
        1: { text: '是', status: 'Success' },
      },
      render: (_, record) => (
        <Switch
          checked={record.factoryStatus === 1}
          checkedChildren="是"
          unCheckedChildren="否"
          disabled
        />
      ),
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
      title: '产品数量',
      dataIndex: 'productCount',
      hideInSearch: true,
    },
    {
      title: '产品评论数量',
      dataIndex: 'productCommentCount',
      hideInSearch: true,
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
  const handleEdit = (record: BrandResponseDto) => {
    setCurrentRecord(record);
    setIsEdit(true);
    setIsModalVisible(true);
    // 设置表单值
    form.setFieldsValue(record);
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    try {
      await deleteBrand(id);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 处理提交
  const handleSubmit = async (values: CreateBrandDto | UpdateBrandDto) => {
    try {
      if (isEdit && currentRecord) {
        // 编辑
        await updateBrand({
          ...values,
          id: currentRecord.id,
        } as UpdateBrandDto);
        message.success('更新成功');
      } else {
        // 创建
        await createBrand(values as CreateBrandDto);
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

  return (
    <>
      <ProTable<BrandResponseDto>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          // 转换参数类型
          const listParams: BrandListParams = {
            current: params.current,
            pageSize: params.pageSize,
            name: params.name,
            showStatus: params.showStatus,
          };

          const res = await getBrandList(listParams);
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
        headerTitle="品牌管理"
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
        title={isEdit ? '编辑品牌' : '创建品牌'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={700}
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
                label="品牌名称"
                name="name"
                rules={[{ required: true, message: '请输入品牌名称' }]}
              >
                <Input placeholder="请输入品牌名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="首字母" name="firstLetter">
                <Input placeholder="请输入首字母" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="品牌logo" name="logo">
                <Input placeholder="请输入品牌logo URL" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="专区大图" name="bigPic">
                <Input placeholder="请输入专区大图 URL" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item labelCol={{ span: 3, offset: 0 }} label="排序" name="sort">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 3, offset: 0 }}
            label="品牌故事"
            name="brandStory"
          >
            <TextArea placeholder="请输入品牌故事" rows={4} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 3, offset: 0 }}
            label="显示状态"
            name="showStatus"
            valuePropName="checked"
          >
            <Switch checkedChildren="显示" unCheckedChildren="不显示" />
          </Form.Item>
          <Form.Item
            label="是否为制造商"
            labelCol={{ span: 4, offset: 0 }}
            name="factoryStatus"
            valuePropName="checked"
          >
            <Switch checkedChildren="是" unCheckedChildren="否" />
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

export default BrandManagement;
