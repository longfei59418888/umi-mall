import { ProFormInstance } from '@ant-design/pro-form/lib';
import { Card, Col, Descriptions, Row, Table, Tag } from 'antd';
import { FC, MutableRefObject, useEffect, useState } from 'react';
import type {
  AttributeCategoryOption,
  BrandOption,
  StepFormData,
} from '../types';

const Step4Confirm: FC<{
  current: number;
  formMapRef: any;
  brandOptions: BrandOption[];
  attributeCategoryOptions: AttributeCategoryOption[];
}> = ({ formMapRef, brandOptions, attributeCategoryOptions, current }) => {
  const [formData, setFormData] = useState<StepFormData>();
  useEffect(() => {
    setTimeout(
      () =>
        setFormData(
          formMapRef.current?.reduce(
            (
              prev: object,
              current: MutableRefObject<
                ProFormInstance<StepFormData> | undefined
              >,
            ) => {
              const values = current.current?.getFieldsValue();
              return {
                ...prev,
                ...values,
              };
            },
            {},
          ),
        ),
      0,
    );
  }, [current]);
  // 商品基本信息
  const basicInfoItems = [
    { label: '商品名称', value: formData?.name },
    { label: '副标题', value: formData?.subTitle },
    {
      label: '商品品牌',
      value: brandOptions.find((item) => item.id === formData?.brandId)?.name,
    },
    { label: '商品分类', value: formData?.productCategoryName },
    {
      label: '商品属性分类',
      value: attributeCategoryOptions.find(
        (item) => item.id === formData?.productAttributeCategoryId,
      )?.name,
    },
    { label: '商品单位', value: formData?.unit },
    { label: '商品重量', value: formData?.weight },
    { label: '排序', value: formData?.sort },
  ];
  //
  // // 商品状态信息
  const statusItems = [
    {
      label: '新品状态',
      value:
        formData?.newStatus === 1 ? (
          <Tag color="blue">新品</Tag>
        ) : (
          <Tag color="default">非新品</Tag>
        ),
    },
    {
      label: '推荐状态',
      value:
        formData?.recommandStatus === 1 ? (
          <Tag color="purple">推荐</Tag>
        ) : (
          <Tag color="default">不推荐</Tag>
        ),
    },
    {
      label: '预告商品',
      value:
        formData?.previewStatus === 1 ? (
          <Tag color="orange">预告商品</Tag>
        ) : (
          <Tag color="default">非预告商品</Tag>
        ),
    },
  ];
  //
  // // 商品价格库存信息
  const priceStockItems = [
    { label: '价格', value: `¥${formData?.originalPrice}` },
    { label: '市场价', value: `¥${formData?.originalPrice}` },
    { label: '促销价格', value: `¥${formData?.promotionPrice}` },
    { label: '库存', value: formData?.stock },
    { label: '库存预警值', value: formData?.lowStock },
  ];
  //
  // // 商品SKU列表列定义
  const skuColumns = [
    // {
    //   title: 'SKU编码',
    //   dataIndex: 'skuCode',
    //   key: 'skuCode',
    // },
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
      title: '库存预警值',
      dataIndex: 'lowStock',
      key: 'lowStock',
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
  //
  // // 阶梯价格列表列定义
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
  //
  // // 满减价格列表列定义
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

  const memberPriceColumns = [
    {
      title: '会员等级ID',
      dataIndex: 'memberLevelId',
      key: 'memberLevelId',
    },
    {
      title: '会员价格',
      dataIndex: 'memberPrice',
      key: 'memberPrice',
      render: (text: string) => `¥${text}`,
    },
    {
      title: '会员等级名称',
      dataIndex: 'memberLevelName',
      key: 'memberLevelName',
    },
  ];

  return (
    <div className="space-y-6 pb-5">
      商品基本信息
      <Card title="商品基本信息">
        <Row gutter={16}>
          <Col span={12}>
            <Descriptions column={1}>
              {basicInfoItems.map((item, index) => (
                <Descriptions.Item key={index} label={item.label}>
                  {item.value || '-'}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions column={1}>
              {statusItems.map((item, index) => (
                <Descriptions.Item key={index} label={item.label}>
                  {item.value || '-'}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>
        </Row>
      </Card>
      {/*/!* 价格库存信息 *!/*/}
      <Card title="价格库存信息">
        <Descriptions column={2}>
          {priceStockItems.map((item, index) => (
            <Descriptions.Item key={index} label={item.label}>
              {item.value || '-'}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
      {/*/!* 商品图片 *!/*/}
      <Card title="商品图片">
        <div className="flex flex-wrap gap-4">
          {formData?.pic && <img alt={''} width={200} src={formData.pic} />}
          {formData?.pics?.map((pic, index) => (
            <img alt={''} key={index} width={200} src={pic} />
          ))}
        </div>
      </Card>
      {/*/!* SKU列表 *!/*/}
      <Card title="SKU列表">
        <Table
          dataSource={formData?.skuStockList || []}
          columns={skuColumns}
          pagination={false}
          rowKey="sp1"
        />
      </Card>
      {/*/!* 阶梯价格 *!/*/}
      <Card title="阶梯价格">
        <Table
          dataSource={formData?.productLadderList || []}
          columns={ladderColumns}
          pagination={false}
          rowKey={'count'}
        />
      </Card>
      {/*/!* 满减价格 *!/*/}
      <Card title="满减价格">
        <Table
          dataSource={formData?.productFullReductionList || []}
          columns={fullReductionColumns}
          pagination={false}
          rowKey={'fullPrice'}
        />
      </Card>
      <Card title="满减价格">
        <Table
          dataSource={formData?.memberPriceList || []}
          columns={memberPriceColumns}
          pagination={false}
          rowKey={'memberLevelId'}
        />
      </Card>
      {/*/!* 商品描述 *!/*/}
      <Card title="商品描述">
        <div
          dangerouslySetInnerHTML={{ __html: formData?.description || '' }}
        />
      </Card>
      {/* 详情描述 */}
      <Card title="详情描述">
        <div dangerouslySetInnerHTML={{ __html: formData?.detailDesc || '' }} />
      </Card>
    </div>
  );
};

export default Step4Confirm;
