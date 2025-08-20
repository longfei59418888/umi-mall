import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Table, Space, Popconfirm, message } from 'antd';
import type { FormInstance } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { SkuStock } from '../types';

interface Step2SkuListProps {
  form: FormInstance;
  onFormChange: (changedValues: any, allValues: any) => void;
}

const Step2SkuList: React.FC<Step2SkuListProps> = ({ form, onFormChange }) => {
  const [skuList, setSkuList] = useState<SkuStock[]>([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    // 初始化时从表单中获取SKU列表
    const initialSkuList = form.getFieldValue('skuStockList') || [];
    setSkuList(initialSkuList);
  }, []);

  useEffect(() => {
    // 当SKU列表变化时，更新表单中的值
    form.setFieldsValue({ skuStockList: skuList });
  }, [skuList]);

  const isEditing = (record: SkuStock) => record.skuCode === editingKey;

  const edit = (record: SkuStock) => {
    setEditingKey(record.skuCode || '');
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: string) => {
    try {
      const row = await form.validateFields(['skuStockList'], { recursive: true });
      
      const newData = [...skuList];
      const index = newData.findIndex(item => key === item.skuCode);
      
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row.skuStockList[index] });
        setSkuList(newData);
        setEditingKey('');
      } else {
        newData.push(row.skuStockList[row.skuStockList.length - 1]);
        setSkuList(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const addNewSku = () => {
    const newSku: SkuStock = {
      skuCode: `SKU${Date.now()}`,
      price: '0',
      stock: 0,
      lowStock: 0,
      sp1: '',
      sp2: '',
      sp3: '',
      pic: '',
      sale: 0,
      promotionPrice: '0',
      lockStock: 0,
    };
    
    setSkuList([...skuList, newSku]);
    edit(newSku);
  };

  const removeSku = (key: string) => {
    const newData = skuList.filter(item => item.skuCode !== key);
    setSkuList(newData);
  };

  const columns = [
    {
      title: 'SKU编码',
      dataIndex: 'skuCode',
      width: '15%',
      editable: false,
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: '10%',
      editable: true,
      render: (text: string, record: SkuStock) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name={['skuStockList', record.skuCode, 'price']}
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <Input placeholder="价格" />
          </Form.Item>
        ) : (
          text
        );
      },
    },
    {
      title: '库存',
      dataIndex: 'stock',
      width: '10%',
      editable: true,
      render: (text: number, record: SkuStock) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name={['skuStockList', record.skuCode, 'stock']}
            rules={[{ required: true, message: '请输入库存' }]}
          >
            <InputNumber placeholder="库存" style={{ width: '100%' }} min={0} />
          </Form.Item>
        ) : (
          text
        );
      },
    },
    {
      title: '规格值1',
      dataIndex: 'sp1',
      width: '10%',
      editable: true,
      render: (text: string, record: SkuStock) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name={['skuStockList', record.skuCode, 'sp1']}
            rules={[{ required: true, message: '请输入规格值1' }]}
          >
            <Input placeholder="规格值1" />
          </Form.Item>
        ) : (
          text
        );
      },
    },
    {
      title: '规格值2',
      dataIndex: 'sp2',
      width: '10%',
      editable: true,
      render: (text: string, record: SkuStock) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name={['skuStockList', record.skuCode, 'sp2']}
          >
            <Input placeholder="规格值2" />
          </Form.Item>
        ) : (
          text
        );
      },
    },
    {
      title: '规格值3',
      dataIndex: 'sp3',
      width: '10%',
      editable: true,
      render: (text: string, record: SkuStock) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name={['skuStockList', record.skuCode, 'sp3']}
          >
            <Input placeholder="规格值3" />
          </Form.Item>
        ) : (
          text
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: SkuStock) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => save(record.skuCode || '')} type="link" size="small">
              保存
            </Button>
            <Button onClick={cancel} type="link" size="small" danger>
              取消
            </Button>
          </span>
        ) : (
          <Space>
            <Button onClick={() => edit(record)} type="link" size="small">
              编辑
            </Button>
            <Popconfirm title="确定要删除这个SKU吗？" onConfirm={() => removeSku(record.skuCode || '')}>
              <Button icon={<DeleteOutlined />} type="link" size="small" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    
    return {
      ...col,
      onCell: (record: SkuStock) => ({
        record,
        inputType: col.dataIndex === 'stock' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Form.Item>
        <Button
          type="dashed"
          onClick={addNewSku}
          style={{ width: '100%', marginBottom: 16 }}
          icon={<PlusOutlined />}
        >
          添加SKU
        </Button>
      </Form.Item>
      <Form.Item name="skuStockList" noStyle>
        <Table
          dataSource={skuList}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
          rowKey="skuCode"
        />
      </Form.Item>
    </div>
  );
};

export default Step2SkuList;