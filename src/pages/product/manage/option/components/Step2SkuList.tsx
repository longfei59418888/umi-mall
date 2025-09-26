import OSSUpload from '@/components/OSSUpload';
import { Form, InputNumber, Space } from 'antd';
const columns = [
  { label: '价格', nameColumn: 'price', placeholder: '请输入价格' },
  {
    label: '促销价格',
    nameColumn: 'promotionPrice',
    placeholder: '请输入促销价格',
  },
  { label: '库存', nameColumn: 'stock', placeholder: '请输入库存' },
  { label: '预警库存', nameColumn: 'lowStock', placeholder: '请输入预警库存' },
];

const Step2SkuList = () => {
  return (
    <Form.List name="skuStockList">
      {(fields) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} className={'flex mb-2'} align="baseline">
              <Form.Item noStyle shouldUpdate>
                {({ getFieldValue }) => {
                  const currentRow = getFieldValue(['skuStockList']);
                  return (
                    <h2 className={'my-2 font-bold mr-5'}>
                      {currentRow[key]['sp1']}
                    </h2>
                  );
                }}
              </Form.Item>
              {columns.map(({ label, nameColumn, placeholder }) => (
                <Form.Item
                  {...restField}
                  label={label}
                  name={[name, nameColumn]}
                  rules={[{ required: true, message: placeholder }]}
                >
                  <InputNumber placeholder={placeholder} />
                </Form.Item>
              ))}
              <Form.Item
                name={[name, 'pic']}
                rules={[{ required: true, message: '请上图片' }]}
              >
                <OSSUpload placeholder={'上传图片'} />
              </Form.Item>
            </Space>
          ))}
        </>
      )}
    </Form.List>
  );
};

export default Step2SkuList;
