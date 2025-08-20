import { PageParams, PageResult } from '@/services';
import { AttributeCategoryResponseDto } from '@/services/product/attributeCategory/type';

// 商品属性请求参数
export interface AttributeParams extends PageParams {
  name?: string;
  productAttributeCategoryId?: number;
}

// 商品属性响应数据
export interface AttributeResponseDto {
  /** 属性ID */
  id: number;
  /** 属性分类ID */
  productAttributeCategoryId: number;
  /** 属性名称 */
  name: string;
  /** 属性选择类型：0->唯一；1->单选；2->多选 */
  selectType: number;
  /** 属性录入方式：0->手工录入；1->从列表中选取 */
  inputType: number;
  /** 可选值列表，以逗号分隔 */
  inputList: string;
  /** 排序字段：最高的可以单独上传图片 */
  sort: number;
  /** 分类筛选样式：1->普通；1->颜色 */
  filterType: number;
  /** 检索类型；0->不需要进行检索；1->关键字检索；2->范围检索 */
  searchType: number;
  /** 相同属性产品是否关联；0->不关联；1->关联 */
  relatedStatus: boolean;
  /** 是否支持手动新增；0->不支持；1->支持 */
  handAddStatus: boolean;
  /** 属性的类型；0->规格；1->参数 */
  type: number;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
  /** 属性类型 */
  attributeCategory: AttributeCategoryResponseDto;
}

// 商品属性分页响应
export interface AttributePageResult extends PageResult<AttributeResponseDto> {}
