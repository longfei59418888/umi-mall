import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, Space } from 'antd';

const Step3Promotion = () => {
  return (
    <div className="space-y-6 pb-5">
      <h2 className={'my-2 font-bold mr-5'}>阶梯价格</h2>
      <Form.List name="productLadderList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} className={' mb-2 flex'} align="baseline">
                <Form.Item
                  {...restField}
                  label={'阶梯价格类型'}
                  name={[name, 'count']}
                  rules={[{ required: true, message: '请输入满足的商品数量' }]}
                >
                  <InputNumber
                    className={'w-[180px]'}
                    placeholder="请输入满足的商品数量"
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={'折扣'}
                  name={[name, 'discount']}
                  rules={[{ required: true, message: '请输入折扣' }]}
                >
                  <InputNumber
                    className={'w-[180px]'}
                    placeholder="请输入折扣"
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={'价格'}
                  name={[name, 'price']}
                  rules={[{ required: true, message: '请输入价格' }]}
                >
                  <InputNumber
                    className={'w-[180px]'}
                    placeholder="请输入价格"
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider />
      <h2 className={'my-2 font-bold mr-5'}>满减价格</h2>
      <Form.List name="productFullReductionList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  label={'满多少金额'}
                  name={[name, 'fullPrice']}
                  rules={[{ required: true, message: '请输入满多少金额' }]}
                >
                  <InputNumber
                    className={'w-[180px]'}
                    placeholder="请输入满多少金额"
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={'减多少金额'}
                  name={[name, 'reducePrice']}
                  rules={[{ required: true, message: '请输入减多少金额' }]}
                >
                  <InputNumber
                    className={'w-[180px]'}
                    placeholder="请输入减多少金额"
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider />
      <h2 className={'my-2 font-bold mr-5'}>会员价格</h2>
      <Form.List name="memberPriceList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  label={'会员等级ID'}
                  name={[name, 'memberLevelId']}
                  rules={[{ required: true, message: '请输入会员等级ID' }]}
                >
                  <InputNumber
                    className={'w-[180px]'}
                    placeholder="请输入会员等级ID"
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={'会员价格'}
                  name={[name, 'memberPrice']}
                  rules={[{ required: true, message: '请输入会员价格' }]}
                >
                  <InputNumber
                    className={'w-[180px]'}
                    placeholder="请输入会员价格"
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={'会员等级名称'}
                  name={[name, 'memberLevelName']}
                  rules={[{ required: true, message: '请输入会员等级名称' }]}
                >
                  <Input
                    className={'w-[180px]'}
                    placeholder="请输入会员等级名称"
                  />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default Step3Promotion;
