import CategoryTreeSelect from '@/components/CategoryTreeSelect';
import OSSUpload from '@/components/OSSUpload';
import MultipleOSSUpload from '@/components/OSSUpload/MultipleOSSUpload';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { ProFormInstance } from '@ant-design/pro-form/lib';
import { Form, Input, InputNumber, Select, Switch } from 'antd';
import { FC, MutableRefObject } from 'react';
import { AttributeCategoryOption, BrandOption, StepFormData } from '../types';

const { Option } = Select;

const Step1BasicInfo: FC<{
  id: string | null;
  formRef: MutableRefObject<ProFormInstance<StepFormData> | undefined>;
  brandOptions: BrandOption[];
  attributeCategoryOptions: AttributeCategoryOption[];
}> = ({ id, brandOptions, attributeCategoryOptions, formRef }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ProFormText
        name="name"
        label="商品名称"
        placeholder="请输入商品名称"
        rules={[{ required: true, message: '请输入商品名称' }]}
      />
      <ProFormText name="subTitle" label="副标题" placeholder="请输入副标题" />
      <ProFormSelect<any>
        name="brandId"
        label="品牌"
        placeholder="请选择品牌"
        options={brandOptions ?? []}
        rules={[{ required: true, message: '请选择品牌' }]}
      />

      <Form.Item
        name="productCategoryId"
        label="商品分类"
        rules={[{ required: true, message: '请选择商品分类' }]}
      >
        <CategoryTreeSelect
          onSelect={(_, item) => {
            formRef.current?.setFieldValue('productCategoryName', item.title);
          }}
          placeholder={'请选择商品分类'}
          hasTop={false}
        />
      </Form.Item>
      <Form.Item hidden name="productCategoryName">
        <Input placeholder="请输入分类名称" />
      </Form.Item>

      <Form.Item
        name="productAttributeCategoryId"
        label="属性分类"
        rules={[{ required: true, message: '请选择属性分类' }]}
      >
        <Select disabled={!!id} placeholder="请选择属性分类">
          {attributeCategoryOptions.map((attrCategory) => (
            <Option key={attrCategory.id} value={attrCategory.id}>
              {attrCategory.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/*<Form.Item name="productSn" label="货号">*/}
      {/*  <Input placeholder="请输入货号" />*/}
      {/*</Form.Item>*/}

      <Form.Item
        name="originalPrice"
        label="市场价"
        rules={[{ required: true, message: '请输入市场价' }]}
      >
        <InputNumber style={{ width: '100%' }} placeholder="请输入市场价" />
      </Form.Item>

      <Form.Item
        name="promotionPrice"
        label="促销价格"
        rules={[{ required: true, message: '请输入促销价格' }]}
      >
        <InputNumber style={{ width: '100%' }} placeholder="请输入促销价格" />
      </Form.Item>

      <Form.Item
        name="stock"
        label="库存"
        rules={[{ required: true, message: '请输入库存' }]}
      >
        <InputNumber style={{ width: '100%' }} placeholder="请输入库存" />
      </Form.Item>

      <Form.Item
        name="lowStock"
        label="库存预警值"
        rules={[{ required: true, message: '请输入库存预警值' }]}
      >
        <InputNumber style={{ width: '100%' }} placeholder="请输入库存预警值" />
      </Form.Item>

      <Form.Item name="unit" label="单位">
        <Input placeholder="请输入单位" />
      </Form.Item>

      <Form.Item name="weight" label="重量">
        <Input placeholder="请输入重量" />
      </Form.Item>

      <Form.Item name="keywords" label="关键字">
        <Input placeholder="请输入关键字" />
      </Form.Item>

      {/*<Form.Item*/}
      {/*  name="detailTitle"*/}
      {/*  label="详情标题"*/}
      {/*  rules={[{ required: true, message: '请输入详情标题' }]}*/}
      {/*>*/}
      {/*  <Input placeholder="请输入详情标题" />*/}
      {/*</Form.Item>*/}

      {/*<Form.Item name="detailDesc" label="详情描述">*/}
      {/*  <TextArea placeholder="请输入详情描述" rows={4} />*/}
      {/*</Form.Item>*/}

      {/*<Form.Item name="detailHtml" label="详情网页内容">*/}
      {/*  <TextArea placeholder="请输入详情网页内容" rows={4} />*/}
      {/*</Form.Item>*/}

      {/*<Form.Item name="detailMobileHtml" label="移动端详情">*/}
      {/*  <TextArea placeholder="请输入移动端详情" rows={4} />*/}
      {/*</Form.Item>*/}

      <Form.Item name="promotionStartTime" label="促销开始时间">
        <Input type="datetime-local" />
      </Form.Item>

      <Form.Item name="promotionEndTime" label="促销结束时间">
        <Input type="datetime-local" />
      </Form.Item>

      <Form.Item name="promotionPerLimit" label="活动限购数量">
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="promotionType" label="促销类型">
        <Select placeholder="请选择促销类型">
          <Option value={0}>没有促销使用原价</Option>
          <Option value={1}>使用促销价</Option>
          <Option value={2}>使用会员价</Option>
          <Option value={3}>使用阶梯价格</Option>
          <Option value={4}>使用满减价格</Option>
          <Option value={5}>限时购</Option>
        </Select>
      </Form.Item>

      <Form.Item name="services" label="产品服务">
        <Select mode="multiple" placeholder="请选择产品服务">
          <Option value="1">无忧退货</Option>
          <Option value="2">快速退款</Option>
          <Option value="3">免费包邮</Option>
        </Select>
      </Form.Item>

      <Form.Item name="giftGrowth" label="赠送的成长值">
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="giftPoint" label="赠送的积分">
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="usePointLimit" label="限制使用的积分数">
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="pic"
        label="商品图片"
        rules={[{ required: true, message: '请上传商品主图' }]}
      >
        <OSSUpload placeholder={'上传主图'} />
      </Form.Item>

      <Form.Item
        name="pics"
        label="画册图片"
        rules={[{ required: true, message: '请上传商品相册' }]}
      >
        <MultipleOSSUpload placeholder={'上传相册'} maxCount={5} />
      </Form.Item>

      <Form.Item name="note" label="备注">
        <Input placeholder="请输入备注" />
      </Form.Item>
      <Form.Item
        name="previewStatus"
        label="预告商品状态"
        valuePropName="checked"
      >
        <Switch checkedChildren="是" unCheckedChildren="否" />
      </Form.Item>
    </div>
  );
};

export default Step1BasicInfo;
