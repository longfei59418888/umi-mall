import { PageContainer } from '@ant-design/pro-components';
import { Button, message, Steps } from 'antd';
import { useState } from 'react';
import Step1BasicInfo from './components/Step1BasicInfo';
import Step2SkuList from './components/Step2SkuList';
import Step3Promotion from './components/Step3Promotion';
import Step4Confirm from './components/Step4Confirm';
import { StepFormData } from './types';

const { Step } = Steps;

const ProductManageOption = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepFormData, setStepFormData] = useState<StepFormData>({
    basicInfo: {
      brandId: '',
      productCategoryId: '',
      productAttributeCategoryId: [],
      name: '',
      pic: '',
      productSn: '',
      subTitle: '',
      description: '',
      originalPrice: '',
      stock: 0,
      unit: '',
      weight: '',
      keywords: '',
      note: '',
      albumPics: [],
      detailTitle: '',
      detailDesc: '',
      detailHtml: '',
      detailMobileHtml: '',
      promotionStartTime: '',
      promotionEndTime: '',
      promotionPerLimit: 0,
      promotionType: 0,
      serviceIds: [],
      giftGrowth: 0,
      giftPoint: 0,
      usePointLimit: 0,
      previewStatus: 0,
    },
    skuList: [],
    promotionConfig: {
      productLadderList: [],
      productFullReductionList: [],
      memberPriceList: [],
    },
    confirmInfo: {
      basicInfo: {
        brandId: '',
        productCategoryId: '',
        productAttributeCategoryId: [],
        name: '',
        pic: '',
        productSn: '',
        subTitle: '',
        description: '',
        originalPrice: '',
        stock: 0,
        unit: '',
        weight: '',
        keywords: '',
        note: '',
        albumPics: [],
        detailTitle: '',
        detailDesc: '',
        detailHtml: '',
        detailMobileHtml: '',
        promotionStartTime: '',
        promotionEndTime: '',
        promotionPerLimit: 0,
        promotionType: 0,
        serviceIds: [],
        giftGrowth: 0,
        giftPoint: 0,
        usePointLimit: 0,
        previewStatus: 0,
      },
      skuList: [],
      promotionConfig: {
        productLadderList: [],
        productFullReductionList: [],
        memberPriceList: [],
      },
    },
  });

  const steps = [
    {
      title: '基础信息',
      content: (
        <Step1BasicInfo
          formData={stepFormData.basicInfo}
          setFormData={(data) =>
            setStepFormData({
              ...stepFormData,
              basicInfo: data,
              confirmInfo: {
                ...stepFormData.confirmInfo,
                basicInfo: data,
              },
            })
          }
        />
      ),
    },
    {
      title: 'SKU列表',
      content: (
        <Step2SkuList
          formData={stepFormData.skuList}
          setFormData={(data) =>
            setStepFormData({
              ...stepFormData,
              skuList: data,
              confirmInfo: {
                ...stepFormData.confirmInfo,
                skuList: data,
              },
            })
          }
        />
      ),
    },
    {
      title: '满减折扣配置',
      content: (
        <Step3Promotion
          formData={stepFormData.promotionConfig}
          setFormData={(data) =>
            setStepFormData({
              ...stepFormData,
              promotionConfig: data,
              confirmInfo: {
                ...stepFormData.confirmInfo,
                promotionConfig: data,
              },
            })
          }
        />
      ),
    },
    {
      title: '信息确认',
      content: <Step4Confirm formData={stepFormData.confirmInfo} />, // 传递确认信息数据
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      // 这里应该调用创建商品的API
      // await createProduct(stepFormData);
      message.success('商品创建成功');
      // 可以在这里添加跳转到商品列表页面的逻辑
    } catch (error) {
      message.error('商品创建失败');
    }
  };

  return (
    <PageContainer title={false}>
      <div className="p-16 bg-white rounded-lg shadow-md flex h-full flex-col overflow-hidden min-w-[700px] items-center">
        <Steps current={currentStep} className={'w-3/4'}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="mt-12 flex-1 overflow-x-auto w-3/4">
          {steps[currentStep].content}
        </div>
        <div className="mt-6 flex justify-between">
          {currentStep > 0 && <Button onClick={() => prev()}>上一步</Button>}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              下一步
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" onClick={handleSubmit}>
              提交
            </Button>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductManageOption;
