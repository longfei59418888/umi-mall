import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Table, Space, Popconfirm, Card, Row, Col, Divider } from 'antd';
import type { FormInstance } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ProductLadder, ProductFullReduction } from '../types';

interface Step3PromotionProps {
  form: FormInstance;
}

const Step3Promotion: React.FC<Step3PromotionProps> = ({ form }) => {
  // 阶梯价格状态
  const [ladderList, setLadderList] = useState<ProductLadder[]>([]);
  // 满减价格状态
  const [fullReductionList, setFullReductionList] = useState<ProductFullReduction[]>([]);

  useEffect(() => {
    // 初始化时从表单中获取阶梯价格列表
    const initialLadderList = form.getFieldValue('productLadderList') || [];
    setLadderList(initialLadderList);
    
    // 初始化时从表单中获取满减价格列表
    const initialFullReductionList = form.getFieldValue('productFullReductionList') || [];
    setFullReductionList(initialFullReductionList);
  }, []);

  useEffect(() => {
    // 当阶梯价格列表变化时，更新表单中的值
    form.setFieldsValue({ productLadderList: ladderList });
  }, [ladderList]);

  useEffect(() => {
    // 当满减价格列表变化时，更新表单中的值
    form.setFieldsValue({ productFullReductionList: fullReductionList });
  }, [fullReductionList]);

  // 添加新的阶梯价格
  const addNewLadder = () => {
    const newLadder: ProductLadder = {
      count: 0,
      discount: '0',
      price: '0',
    };
    setLadderList([...ladderList, newLadder]);
  };

  // 删除阶梯价格
  const removeLadder = (index: number) => {
    const newData = [...ladderList];
    newData.splice(index, 1);
    setLadderList(newData);
  };

  // 添加新的满减价格
  const addNewFullReduction = () => {
    const newFullReduction: ProductFullReduction = {
      fullPrice: '0',
      reducePrice: '0',
    };
    setFullReductionList([...fullReductionList, newFullReduction]);
  };

  // 删除满减价格
  const removeFullReduction = (index: number) => {
    const newData = [...fullReductionList];
    newData.splice(index, 1);
    setFullReductionList(newData);
  };

  // 阶梯价格列定义
  const ladderColumns = [
    {
      title: '满足商品数量',
      dataIndex: 'count',
      render: (_: any, __: any, index: number) => (
        <Form.Item
          name={['productLadderList', index, 'count']}
          rules={[{ required: true, message: '请输入满足商品数量' }]}
        >
          <InputNumber placeholder="满足商品数量" style={{ width: '100%' }} min={0} />
        </Form.Item>
      ),
    },
    {
      title: '折扣',
      dataIndex: 'discount',
      render: (_: any, __: any, index: number) => (
        <Form.Item
          name={['productLadderList', index, 'discount']}
          rules={[{ required: true, message: '请输入折扣' }]}
        >
          <Input placeholder="折扣" />
        </Form.Item>
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (_: any, __: any, index: number) => (
        <Form.Item
          name={['productLadderList', index, 'price']}
          rules={[{ required: true, message: '请输入价格' }]}
        >
          <Input placeholder="价格" />
        </Form.Item>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, __: any, index: number) => (
        <Popconfirm title="确定要删除这个阶梯价格吗？" onConfirm={() => removeLadder(index)}>
          <Button icon={<DeleteOutlined />} type="link" size="small" danger>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // 满减价格列定义
  const fullReductionColumns = [
    {
      title: '满多少金额',
      dataIndex: 'fullPrice',
      render: (_: any, __: any, index: number) => (
        <Form.Item
          name={['productFullReductionList', index, 'fullPrice']}
          rules={[{ required: true, message: '请输入满多少金额' }]}
        >
          <Input placeholder="满多少金额" />
        </Form.Item>
      ),
    },
    {
      title: '减多少金额',
      dataIndex: 'reducePrice',
      render: (_: any, __: any, index: number) => (
        <Form.Item
          name={['productFullReductionList', index, 'reducePrice']}
          rules={[{ required: true, message: '请输入减多少金额' }]}
        >
          <Input placeholder="减多少金额" />
        </Form.Item>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, __: any, index: number) => (
        <Popconfirm title="确定要删除这个满减价格吗？" onConfirm={() => removeFullReduction(index)}>
          <Button icon={<DeleteOutlined />} type="link" size="small" danger>
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card title="阶梯价格设置" bordered={false}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button
                type="dashed"
                onClick={addNewLadder}
                style={{ width: '100%', marginBottom: 16 }}
                icon={<PlusOutlined />}
              >
                添加阶梯价格
              </Button>
            </Form.Item>
            <Form.Item name="productLadderList" noStyle>
              <Table
                dataSource={ladderList}
                columns={ladderColumns}
                pagination={false}
                rowKey={(_, index) => `ladder-${index}`}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Divider />

      <Card title="满减价格设置" bordered={false}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>
              <Button
                type="dashed"
                onClick={addNewFullReduction}
                style={{ width: '100%', marginBottom: 16 }}
                icon={<PlusOutlined />}
              >
                添加满减价格
              </Button>
            </Form.Item>
            <Form.Item name="productFullReductionList" noStyle>
              <Table
                dataSource={fullReductionList}
                columns={fullReductionColumns}
                pagination={false}
                rowKey={(_, index) => `fullReduction-${index}`}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Step3Promotion;