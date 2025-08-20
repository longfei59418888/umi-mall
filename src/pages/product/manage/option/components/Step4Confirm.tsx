import React from 'react';
import { Descriptions, Card, Row, Col, Table, Image, Tag } from 'antd';
import type { StepFormData } from '../types';

interface Step4ConfirmProps {
  formData: StepFormData;
}

const Step4Confirm: React.FC<Step4ConfirmProps> = ({ formData }) => {
  // 商品基本信息
  const basicInfoItems = [
    { label: '商品名称', value: formData.name },
    { label: '副标题', value: formData.subTitle },
    { label: '商品品牌', value: formData.brandName },
    { label: '商品分类', value: formData.productCategoryName },
    { label: '商品属性分类', value: formData.productAttributeCategoryName },
    { label: '商品单位', value: formData.unit },
    { label: '商品重量', value: formData.weight },
    { label: '排序', value: formData.sort },
  ];

  // 商品状态信息
  const statusItems = [
    { 
      label: '上架状态', 
      value: formData.publishStatus === 1 ? <Tag color="green">上架</Tag> : <Tag color="red">下架</Tag> 
    },
    { 
      label: '新品状态', 
      value: formData.newStatus === 1 ? <Tag color="blue">新品</Tag> : <Tag color="default">非新品</Tag> 
    },
    { 
      label: '推荐状态', 
      value: formData.recommandStatus === 1 ? <Tag color="purple">推荐</Tag> : <Tag color="default">不推荐</Tag> 
    },
    { 
      label: '预告商品', 
      value: formData.previewStatus === 1 ? <Tag color="orange">预告商品</Tag> : <Tag color="default">非预告商品</Tag> 
    },
  ];

  // 商品价格库存信息
  const priceStockItems = [
    { label: '价格', value: `¥${formData.price}` },
    { label: '市场价', value: `¥${formData.originalPrice}` },
    { label: '促销价格', value: `¥${formData.promotionPrice}` },
    { label: '库存', value: formData.stock },
    { label: '库存预警值', value: formData.lowStock },
    { label: '销量', value: formData.sale },
  ];

  // 商品SKU列表列定义
  const skuColumns = [
    {
      title: 'SKU编码',
      dataIndex: 'skuCode',
      key: 'skuCode',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => `¥${text}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '规格值1',
      dataIndex: 'sp1',
      key: 'sp1',
    },
    {
      title: '规格值2',
      dataIndex: 'sp2',
      key: 'sp2',
    },
    {
      title: '规格值3',
      dataIndex: 'sp3',
      key: 'sp3',
    },
  ];

  // 阶梯价格列表列定义
  const ladderColumns = [
    {
      title: '满足商品数量',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '折扣',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => `¥${text}`,
    },
  ];

  // 满减价格列表列定义
  const fullReductionColumns = [
    {
      title: '满多少金额',
      dataIndex: 'fullPrice',
      key: 'fullPrice',
      render: (text: string) => `¥${text}`,
    },
    {
      title: '减多少金额',
      dataIndex: 'reducePrice',
      key: 'reducePrice',
      render: (text: string) => `¥${text}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 商品基本信息 */}
      <Card title="商品基本信息" bordered={false}>
        <Row gutter={16}>
          <Col span={12}>
            <Descriptions column={1} bordered>
              {basicInfoItems.map((item, index) => (
                <Descriptions.Item key={index} label={item.label}>
                  {item.value || '-'}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions column={1} bordered>
              {statusItems.map((item, index) => (
                <Descriptions.Item key={index} label={item.label}>
                  {item.value || '-'}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>
        </Row>
      </Card>

      {/* 商品图片 */}
      <Card title="商品图片" bordered={false}>
        <div className="flex flex-wrap gap-4">
          {formData.pic && <Image width={200} src={formData.pic} />}
          {formData.albumPics?.split(',').map((pic, index) => (
            <Image key={index} width={200} src={pic} />
          ))}
        </div>
      </Card>

      {/* 价格库存信息 */}
      <Card title="价格库存信息" bordered={false}>
        <Descriptions column={2} bordered>
          {priceStockItems.map((item, index) => (
            <Descriptions.Item key={index} label={item.label}>
              {item.value || '-'}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>

      {/* SKU列表 */}
      <Card title="SKU列表" bordered={false}>
        <Table 
          dataSource={formData.skuStockList || []} 
          columns={skuColumns} 
          pagination={false} 
          rowKey="skuCode" 
        />
      </Card>

      {/* 阶梯价格 */}
      <Card title="阶梯价格" bordered={false}>
        <Table 
          dataSource={formData.productLadderList || []} 
          columns={ladderColumns} 
          pagination={false} 
          rowKey={(_, index) => `ladder-${index}`} 
        />
      </Card>

      {/* 满减价格 */}
      <Card title="满减价格" bordered={false}>
        <Table 
          dataSource={formData.productFullReductionList || []} 
          columns={fullReductionColumns} 
          pagination={false} 
          rowKey={(_, index) => `fullReduction-${index}`} 
        />
      </Card>

      {/* 商品描述 */}
      <Card title="商品描述" bordered={false}>
        <div dangerouslySetInnerHTML={{ __html: formData.description || '' }} />
      </Card>

      {/* 详情描述 */}
      <Card title="详情描述" bordered={false}>
        <div dangerouslySetInnerHTML={{ __html: formData.detailDesc || '' }} />
      </Card>
    </div>
  );
};

export default Step4Confirm;