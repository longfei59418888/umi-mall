import {
  createAttributeCategory,
  deleteAttributeCategory,
  getAttributeCategoryList,
  updateAttributeCategory,
} from '@/services/product/attributeCategory';
import {
  AttributeCategoryParams,
  AttributeCategoryResponseDto,
  CreateAttributeCategoryDto,
  UpdateAttributeCategoryDto,
} from '@/services/product/attributeCategory/type';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'umi';

const AttributeCategoryList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] =
    useState<AttributeCategoryResponseDto | null>(null);
  const navigate = useNavigate();

  // 定义表格列
  const columns: ProColumns<AttributeCategoryResponseDto>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '属性类型名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '属性数量',
      dataIndex: 'attributeCount',
      hideInSearch: true,
    },
    {
      title: '参数数量',
      dataIndex: 'paramCount',
      hideInSearch: true,
    },
    {
      title: '设置',
      dataIndex: 'paramCount',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <div className={'flex gap-2'}>
            <Button
              size={'small'}
              onClick={() =>
                navigate(`/product/attribute/specs?category=${record.id}`)
              }
            >
              规格管理
            </Button>
            <Button
              size={'small'}
              onClick={() =>
                navigate(`/product/attribute/props?category=${record.id}`)
              }
            >
              参数管理
            </Button>
          </div>
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="edit"
          onClick={() => {
            setCurrentRecord(record);
            setModalVisible(true);
          }}
        >
          <EditOutlined /> 编辑
        </a>,
        <Popconfirm
          key="delete"
          title="删除确认"
          description="确定要删除这个属性分类吗？"
          onConfirm={async () => {
            try {
              await deleteAttributeCategory(Number(record.id));
              message.success('删除成功');
              action?.reload();
            } catch (error) {
              message.error('删除失败');
            }
          }}
          okText="确定"
          cancelText="取消"
        >
          <a>
            <span style={{ color: 'red' }}>删除</span>
          </a>
        </Popconfirm>,
      ],
    },
  ];

  const handleCreateOrUpdate = async (
    values: CreateAttributeCategoryDto | UpdateAttributeCategoryDto,
  ) => {
    try {
      if (currentRecord) {
        // 更新操作
        await updateAttributeCategory({
          ...values,
          id: Number(currentRecord.id),
        } as UpdateAttributeCategoryDto);
        message.success('更新成功');
      } else {
        // 创建操作
        await createAttributeCategory(values as CreateAttributeCategoryDto);
        message.success('创建成功');
      }
      setModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error(currentRecord ? '更新失败' : '创建失败');
    }
  };

  return (
    <PageContainer>
      <ProTable<AttributeCategoryResponseDto, AttributeCategoryParams>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await getAttributeCategoryList({
            current: params.current,
            pageSize: params.pageSize,
            name: params.name,
          });

          return {
            data: res.data?.records || [],
            success: res.code === 200,
            total: res.data?.total || 0,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
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
        headerTitle="商品属性分类"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentRecord(null);
              setModalVisible(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />

      <ModalForm
        title={currentRecord ? '编辑属性分类' : '新建属性分类'}
        open={modalVisible}
        onOpenChange={setModalVisible}
        onFinish={handleCreateOrUpdate}
        initialValues={currentRecord || {}}
      >
        <ProFormText
          name="name"
          label="属性类型名称"
          rules={[{ required: true, message: '请输入属性类型名称' }]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default AttributeCategoryList;
