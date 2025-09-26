import { StepFormData } from '@/pages/product/manage/option/types';
import { AttributeResponseDto } from '@/services/product/attribute/type';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { ProFormColumnsType } from '@ant-design/pro-form/es/components/SchemaForm/typing';
import { ProFormInstance } from '@ant-design/pro-form/lib';
import { FC, MutableRefObject, useEffect, useState } from 'react';

const StepCustomAttr: FC<{
  attrs?: AttributeResponseDto[];
  initialValues?: Record<string, any>;
  formRef: MutableRefObject<ProFormInstance<StepFormData> | undefined>;
}> = ({ attrs, initialValues, formRef }) => {
  const [columns, setColumns] = useState<ProFormColumnsType[]>();
  useEffect(() => {
    setColumns(
      attrs?.map((item) => {
        const { inputType, name, id, inputList, selectType } = item;
        if (inputType === 0) {
          return {
            title: name,
            dataIndex: id,
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
          };
        } else {
          return {
            title: name,
            dataIndex: id,
            mode: selectType === 2 ? 'multiple' : undefined,
            valueType: 'select',
            valueEnum: inputList
              .split(',')
              .reduce((previousValue, currentValue) => {
                if (!currentValue) return previousValue;
                return {
                  ...previousValue,
                  [currentValue]: { text: currentValue },
                };
              }, {}),
            fieldProps: {
              mode: selectType === 2 ? 'multiple' : undefined,
            },
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
          };
        }
      }) ?? [],
    );
    formRef.current?.setFieldsValue(initialValues ?? {});
  }, [attrs, initialValues]);

  return (
    <BetaSchemaForm
      initialValues={initialValues}
      layoutType="Embed"
      columns={columns ?? []}
    />
  );
};

export default StepCustomAttr;
