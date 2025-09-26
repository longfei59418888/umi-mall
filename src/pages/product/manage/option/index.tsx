import Step3Promotion from '@/pages/product/manage/option/components/Step3Promotion';
import StepCustomAttr from '@/pages/product/manage/option/components/StepCustomAttr';
import {
  type AttributeCategoryOption,
  type BrandOption,
  StepFormData,
} from '@/pages/product/manage/option/types';
import {
  CreateProductDto,
  SkuStockDto,
  UpdateProductDto,
} from '@/pages/product/manage/types';
import { AttributeResponseDto } from '@/services/product/attribute/type';
import {
  getAttributeCategoryDetail,
  getAttributeCategoryList,
} from '@/services/product/attributeCategory';
import { getBrandList } from '@/services/product/brand';
import {
  createProduct,
  getProductDetail,
  updateProduct,
} from '@/services/product/manage';
import { cartesianProduct } from '@/utils/data';
import { useLocation, useSearchParams } from '@@/exports';
import { PageContainer, StepsForm } from '@ant-design/pro-components';
import { ProFormInstance } from '@ant-design/pro-form/lib';
import { message } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Step1BasicInfo from './components/Step1BasicInfo';
import Step2SkuList from './components/Step2SkuList';
import Step4Confirm from './components/Step4Confirm';

const ProductManageOption = () => {
  const [search] = useSearchParams();
  const location = useLocation();
  const id = search.get('id');

  const formRef = useRef<ProFormInstance<StepFormData>>();
  const formMapRef = useRef<
    MutableRefObject<
      ProFormInstance<
        StepFormData & {
          services: string[];
        }
      >
    >[]
  >();

  const [attrs, setAttrs] = useState<AttributeResponseDto[]>();
  const [attrValue, setAttrValue] = useState<Record<string, any>>({});
  const [skuStockListValue, setSkuStockListValue] = useState<
    Record<string, SkuStockDto>
  >({});
  const skuList = useRef<ProFormInstance<StepFormData>>();

  const [current, setCurrent] = useState<number>(0);

  const [brandOptions, setBrandOptions] = useState<BrandOption[]>([]);
  const [attributeCategoryOptions, setAttributeCategoryOptions] = useState<
    AttributeCategoryOption[]
  >([]);

  // 获取品牌列表
  const fetchBrandList = async () => {
    try {
      const res = await getBrandList({ current: 1, pageSize: 1000 });
      setBrandOptions(
        res.data.records.map((item: any) => ({
          id: item.id,
          name: item.name,
          value: item.id,
          label: item.name,
        })),
      );
    } catch (error) {
      console.error('获取品牌列表失败:', error);
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
        res.data.records.map((item: any) => ({
          ...item,
          id: item.id,
          name: item.name,
        })),
      );
    } catch (error) {
      console.error('获取属性分类列表失败:', error);
    }
  };

  const getDetailWithId = async (id: string) => {
    const { data: detail } = await getProductDetail(id);
    if (detail) {
      const {
        productAttributeValueList = [],
        skuStockList = [],
        memberPriceList = [],
        productFullReductionList = [],
        productLadderList = [],
        albumPics = '',
        promotionStartTime = '',
        promotionEndTime = '',
        serviceIds = '',
      } = detail;
      const [basicInfo, _customAttr, _skuList, promotion] =
        formMapRef.current ?? [];
      basicInfo.current?.setFieldsValue({
        ...detail,
        pics: albumPics.split(','),
        promotionStartTime:
          promotionStartTime ?? new Date(promotionStartTime).toLocaleString(),
        promotionEndTime:
          promotionEndTime ?? new Date(promotionEndTime).toLocaleString(),
        services: serviceIds.split(',') ?? [],
      });
      setSkuStockListValue(
        skuStockList.reduce(
          (acc, sku) => ({
            ...acc,
            [sku.sp1]: sku,
          }),
          {},
        ),
      );
      setAttrValue(
        productAttributeValueList.reduce(
          (previousValue, currentValue) => ({
            ...previousValue,
            [`${currentValue.productAttributeId}`]:
              currentValue.selectType === 2
                ? (currentValue.value ?? '').split(',')
                : currentValue.value,
          }),
          {},
        ),
      );
      promotion.current.setFieldsValue({
        memberPriceList,
        productFullReductionList,
        productLadderList,
      });
    } else {
      console.error('获取详情失败:');
    }
  };

  useEffect(() => {
    void fetchBrandList();
    void fetchAttributeCategoryList();
    if (id) void getDetailWithId(id);
  }, [id]);

  return (
    <PageContainer title={false}>
      <div
        className="p-16 bg-white rounded-lg shadow-md flex h-full flex-col overflow-hidden min-w-[700px] [&_.ant-pro-steps-form-container]:w-full [&>div]:w-full
      items-center [&_.ant-pro-steps-form-container]:max-w-[800px]"
      >
        <StepsForm
          onCurrentChange={setCurrent}
          formMapRef={formMapRef as any}
          formRef={formRef}
          onFinish={async (values) => {
            const productAttributeValueList =
              attrs?.map(({ id, selectType }) => {
                return {
                  productAttributeId: id + '',
                  value: (selectType === 2
                    ? values[id]?.join(',')
                    : values[id]) as string,
                };
              }) ?? [];
            try {
              if (id) {
                await updateProduct({
                  ...values,
                  id: Number(id),
                  productAttributeValueList,
                  albumPics: values.pics.join(','),
                  serviceIds: values?.services.join(','),
                } as UpdateProductDto);
                message.success('修改成功');
              } else {
                await createProduct({
                  ...values,
                  productAttributeValueList,
                  albumPics: values.pics.join(','),
                  serviceIds: values?.services.join(','),
                } as CreateProductDto);
                message.success('添加成功');
              }

              history.back();
            } catch (e) {}
          }}
        >
          <StepsForm.StepForm
            onFinish={async (v: StepFormData) => {
              const { code, data } = await getAttributeCategoryDetail(
                Number(v.productAttributeCategoryId),
              );
              if (code === 200) {
                const { productAttributes } = data;
                const specs: string[][] = [];
                const attrs: AttributeResponseDto[] = [];
                productAttributes.forEach((item) =>
                  item.type === 0
                    ? specs.push(item.inputList.split(','))
                    : attrs.push(item),
                );
                skuList.current?.setFieldsValue({
                  skuStockList: cartesianProduct(specs)?.map((item) => {
                    const sp1 = item.join('-');
                    const { price, promotionPrice, stock, lowStock, pic } =
                      skuStockListValue[sp1] ?? {};
                    return cloneDeep({
                      sp1: item.join('-'),
                      price: price ?? v.originalPrice,
                      promotionPrice: promotionPrice ?? v.promotionPrice,
                      stock: stock ?? v.stock,
                      lowStock: lowStock ?? v.lowStock ?? 0,
                      pic: pic ?? v.pic,
                    });
                  }),
                });

                setAttrs(attrs);

                return true;
              }

              message.success('下一步失败！');
              return false;
            }}
            name={'基础信息'}
            title={'基础信息'}
          >
            <Step1BasicInfo
              id={id}
              formRef={formRef}
              brandOptions={brandOptions}
              attributeCategoryOptions={attributeCategoryOptions}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm name={'自定义属性'} title={'自定义属性'}>
            <StepCustomAttr
              initialValues={attrValue}
              formRef={formRef}
              attrs={attrs}
            />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            formRef={skuList}
            name={'SKU列表'}
            title={'SKU列表'}
          >
            <Step2SkuList />
          </StepsForm.StepForm>
          <StepsForm.StepForm name={'优惠活动'} title={'优惠活动'}>
            <Step3Promotion />
          </StepsForm.StepForm>
          <StepsForm.StepForm name={'确认'} title={'确认'}>
            <Step4Confirm
              current={current}
              brandOptions={brandOptions}
              attributeCategoryOptions={attributeCategoryOptions}
              formMapRef={formMapRef}
            />
          </StepsForm.StepForm>
        </StepsForm>
      </div>
    </PageContainer>
  );
};

export default ProductManageOption;
