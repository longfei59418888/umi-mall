import {
  createAttribute,
  deleteAttribute,
  getAttributeList,
  updateAttribute,
} from '@/services/product/attributeCategory/attribute';
import { useParams, useSearchParams } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Col, message, Popconfirm, Row } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { AttributeFormData, AttributeItem, AttributeListParams } from './types';

const AttributeList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { type } = useParams<{ type: 'specs' | 'props' }>();
  const category = searchParams.get('category');
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<AttributeItem | null>(
    null,
  );

  const dataInfo = useMemo(() => {
    if (type === 'props') {
      return {
        title: '商品参数管理',
        type: 1,
      };
    }
    return {
      title: '商品规格管理',
      type: 0,
    };
  }, [type]);

  // 定义表格列
  const columns: ProColumns<AttributeItem>[] = [
    {
      title: '名称',
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
      title: '属性分类',
      dataIndex: 'productAttributeCategoryId',
      render: (text, record) => {
        return record.attributeCategory.name;
      },
      hideInSearch: true,
    },
    {
      title: '选择类型',
      dataIndex: 'selectType',
      valueEnum: {
        0: { text: '唯一' },
        1: { text: '单选' },
        2: { text: '多选' },
      },
    },
    {
      title: '录入方式',
      dataIndex: 'inputType',
      valueEnum: {
        0: { text: '手工录入' },
        1: { text: '从列表中选取' },
      },
    },
    {
      title: '可选值列表',
      dataIndex: 'inputList',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '分类筛选样式',
      dataIndex: 'filterType',
      valueEnum: {
        1: { text: '普通' },
        2: { text: '颜色' },
      },
    },
    {
      title: '检索类型',
      dataIndex: 'searchType',
      valueEnum: {
        0: { text: '不需要进行检索' },
        1: { text: '关键字检索' },
        2: { text: '范围检索' },
      },
    },
    {
      title: '相同属性产品是否关联',
      dataIndex: 'relatedStatus',
      render: (_, record) => (record.relatedStatus ? '是' : '否'),
      hideInSearch: true,
    },
    {
      title: '是否支持手动新增',
      dataIndex: 'handAddStatus',
      render: (_, record) => (record.handAddStatus ? '是' : '否'),
      hideInSearch: true,
    },
    {
      title: '属性的类型',
      dataIndex: 'type',
      valueEnum: {
        0: { text: '规格' },
        1: { text: '参数' },
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
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
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="删除确认"
          description="确定要删除这个商品属性吗？"
          onConfirm={async () => {
            try {
              await deleteAttribute(Number(record.id));
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

  const handleCreateOrUpdate = async (values: AttributeFormData) => {
    try {
      if (currentRecord) {
        // 更新操作
        await updateAttribute({
          ...values,
          id: Number(currentRecord.id),
        });
        message.success('更新成功');
      } else {
        // 创建操作
        await createAttribute({
          ...values,
          productAttributeCategoryId: Number(category),
          type: dataInfo.type,
        });
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
      <ProTable<AttributeItem, AttributeListParams>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await getAttributeList({
            current: params.current,
            pageSize: params.pageSize,
            attributeCategoryId: Number(category),
            type: dataInfo.type,
            keyword: params.keyword,
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
        headerTitle={dataInfo.title}
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
        title={`${currentRecord ? '编辑' : '新建'}${dataInfo.title}`}
        open={modalVisible}
        onOpenChange={setModalVisible}
        onFinish={handleCreateOrUpdate}
        initialValues={currentRecord || {}}
      >
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText
              name="name"
              label="属性名称"
              rules={[{ required: true, message: '请输入属性名称' }]}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              name="selectType"
              label="属性选择类型"
              valueEnum={{
                0: '唯一',
                1: '单选',
                2: '多选',
              }}
              rules={[{ required: true, message: '请选择属性选择类型' }]}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <ProFormSelect
              name="inputType"
              label="属性录入方式"
              valueEnum={{
                0: '手工录入',
                1: '从列表中选取',
              }}
              rules={[{ required: true, message: '请选择属性录入方式' }]}
            />
          </Col>
          <Col>
            <ProFormText
              name="inputList"
              label="可选值列表"
              placeholder="多个值用逗号分隔"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <ProFormDigit
              name="sort"
              label="排序"
              min={0}
              fieldProps={{ precision: 0 }}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              name="filterType"
              label="分类筛选样式"
              valueEnum={{
                1: '普通',
                2: '颜色',
              }}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <ProFormSelect
              name="searchType"
              label="检索类型"
              valueEnum={{
                0: '不需要进行检索',
                1: '关键字检索',
                2: '范围检索',
              }}
            />
          </Col>
          <Col span={12}></Col>
        </Row>
        <ProFormSwitch name="relatedStatus" label="相同属性产品是否关联" />
        <ProFormSwitch name="handAddStatus" label="是否支持手动新增" />
      </ModalForm>
    </PageContainer>
  );
};

export default AttributeList;
