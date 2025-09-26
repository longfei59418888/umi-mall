// 品牌类型

import { CreateProductDto } from '@/pages/product/manage/types';

export type BrandOption = {
  id: string;
  name: string;
};

// 商品分类类型
export type CategoryOption = {
  id: string;
  name: string;
  parentId: string;
  level: number;
};

// 属性分类类型
export type AttributeCategoryOption = {
  id: string;
  name: string;
};

export type UpdateProductDto = CreateProductDto & {
  id: number;
};

// 步骤表单数据类型
export type StepFormData = CreateProductDto & {
  productCategoryName: string;
  pics?: string[];
};
