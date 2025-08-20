import { getProductList, createProduct, updateProduct, deleteProduct, togglePublishStatus } from '@/services/product/manage';
import { ProductResponseDto, CreateProductDto, UpdateProductDto } from '@/pages/product/manage/types';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from 'umi';
import {
  Button,
  message,
  Switch,
} from 'antd';
import { useRef } from 'react';

const ProductManagement = () => {
  const actionRef = useRef<ActionType>();

  // 表格列定义
  const columns: ProColumns<ProductResponseDto>[] = [
    {
      title: '商品名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入商品名称',
          },
        ],
      },
    },
    {
      title: '商品图片',
      dataIndex: 'pic',
      valueType: 'image',
      hideInSearch: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'sale',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
    },
    {
      title: '产品分类',
      dataIndex: 'productCategoryName',
    },
    {
      title: '品牌名称',
      dataIndex: 'brandName',
    },

    {
      title: '上架状态',
      dataIndex: 'publishStatus',
      valueType: 'select',
      valueEnum: {
        0: { text: '下架', status: 'Default' },
        1: { text: '上架', status: 'Success' },
      },
      render: (_, record) => (
        <Switch
          checked={record.publishStatus === 1}
          checkedChildren="上架"
          unCheckedChildren="下架"
          onChange={(checked) => handleTogglePublishStatus(record.id, checked ? 1 : 0)}
        />
      ),
    },
    {
      title: '新品状态',
      dataIndex: 'newStatus',
      valueType: 'select',
      valueEnum: {
        0: { text: '非新品', status: 'Default' },
        1: { text: '新品', status: 'Success' },
      },
      render: (_, record) => (
        <Switch
          checked={record.newStatus === 1}
          checkedChildren="新品"
          unCheckedChildren="非新品"
          disabled
        />
      ),
    },
    {
      title: '推荐状态',
      dataIndex: 'recommandStatus',
      valueType: 'select',
      valueEnum: {
        0: { text: '不推荐', status: 'Default' },
        1: { text: '推荐', status: 'Success' },
      },
      render: (_, record) => (
        <Switch
          checked={record.recommandStatus === 1}
          checkedChildren="推荐"
          unCheckedChildren="不推荐"
          disabled
        />
      ),
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
  const handleEdit = (record: ProductResponseDto) => {
    // 跳转到商品详细管理页面，传递商品ID表示是编辑操作
    history.push(`/product/manage/option?id=${record.id}`);
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 处理上下架
  const handleTogglePublishStatus = async (id: string, status: number) => {
    try {
      await togglePublishStatus(id, status);
      message.success('状态更新成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  // 打开创建页面
  const handleCreate = () => {
    // 跳转到商品详细管理页面，传递参数表示是新建操作
    history.push('/product/manage/option');
  };

  return (
    <>
      <ProTable<ProductResponseDto>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const res = await getProductList({
            ...params,
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
        headerTitle="商品管理"
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
    </>
  );
};

export default ProductManagement;
