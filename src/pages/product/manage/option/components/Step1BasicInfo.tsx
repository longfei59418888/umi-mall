import CategoryTreeSelect from '@/components/CategoryTreeSelect';
import { getAttributeCategoryList } from '@/services/product/attributeCategory';
import { getBrandList } from '@/services/product/brand';
import { getCategoryList } from '@/services/product/category';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  message,
} from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import type {
  AttributeCategoryOption,
  BrandOption,
  CategoryOption,
} from '../types';

const { TextArea } = Input;
const { Option } = Select;

interface Step1BasicInfoProps {
  formData: any;
  setFormData: (data: any) => void;
}

const Step1BasicInfo = ({ formData, setFormData }: Step1BasicInfoProps) => {
  const [form] = Form.useForm();
  const [brandOptions, setBrandOptions] = useState<BrandOption[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [attributeCategoryOptions, setAttributeCategoryOptions] = useState<
    AttributeCategoryOption[]
  >([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 获取品牌列表
  const fetchBrandList = async () => {
    try {
      const res = await getBrandList({ current: 1, pageSize: 1000 });
      setBrandOptions(
        res.data.records.map((item: any) => ({ id: item.id, name: item.name })),
      );
    } catch (error) {
      console.error('获取品牌列表失败:', error);
    }
  };

  // 获取商品分类列表
  const fetchCategoryList = async () => {
    try {
      const res = await getCategoryList({ current: 1, pageSize: 1000 });
      setCategoryOptions(
        res.data.records.map((item: any) => ({
          id: item.id,
          name: item.name,
          parentId: item.parentId,
          level: item.level,
        })),
      );
    } catch (error) {
      console.error('获取商品分类列表失败:', error);
    }
  };

  // 获取属性分类列表
  const fetchAttributeCategoryList = async () => {
    try {
      const res = await getAttributeCategoryList({
        current: 1,
        pageSize: 1000,
      });
      setAttributeCategoryOptions(
        res.data.records.map((item: any) => ({ id: item.id, name: item.name })),
      );
    } catch (error) {
      console.error('获取属性分类列表失败:', error);
    }
  };

  useEffect(() => {
    void fetchBrandList();
    void fetchCategoryList();
    void fetchAttributeCategoryList();
  }, []);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const handleUploadChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      // 这里应该设置图片URL到formData
      // setFormData({ ...formData, pic: info.file.response.url });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={formData}
      onValuesChange={(_, allValues) => setFormData(allValues)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          name="name"
          label="商品名称"
          rules={[{ required: true, message: '请输入商品名称' }]}
        >
          <Input placeholder="请输入商品名称" />
        </Form.Item>

        <Form.Item name="subTitle" label="副标题">
          <Input placeholder="请输入副标题" />
        </Form.Item>

        <Form.Item
          name="brandId"
          label="品牌"
          rules={[{ required: true, message: '请选择品牌' }]}
        >
          <Select placeholder="请选择品牌">
            {brandOptions.map((brand) => (
              <Option key={brand.id} value={brand.id}>
                {brand.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="productCategoryId"
          label="商品分类"
          rules={[{ required: true, message: '请选择商品分类' }]}
        >
          <CategoryTreeSelect placeholder={'请选择商品分类'} hasTop={false} />
        </Form.Item>

        <Form.Item
          name="productAttributeCategoryId"
          label="属性分类"
          rules={[{ required: true, message: '请选择属性分类' }]}
        >
          <Select mode="multiple" placeholder="请选择属性分类">
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
          name="stock"
          label="库存"
          rules={[{ required: true, message: '请输入库存' }]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="请输入库存" />
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

        <Form.Item name="serviceIds" label="产品服务">
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
        <Form.Item name="pic" label="商品图片">
          <Upload
            action="/api/upload" // 这里需要替换为实际的上传接口
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onUpload={handleUploadChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item name="albumPics" label="画册图片">
          <Upload
            action="/api/upload" // 这里需要替换为实际的上传接口
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onUpload={handleUploadChange}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
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
    </Form>
  );
};

export default Step1BasicInfo;
