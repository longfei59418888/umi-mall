import { PageParams, PageResult } from '@/services/index';

// 品牌响应数据类型
export interface BrandResponseDto {
  /** 品牌ID */
  id: number;
  /** 名称 */
  name: string;
  /** 首字母 */
  firstLetter: string;
  /** 排序 */
  sort: number;
  /** 是否为品牌制造商：0->不是；1->是 */
  factoryStatus: number;
  /** 是否显示 */
  showStatus: number;
  /** 产品数量 */
  productCount: number;
  /** 产品评论数量 */
  productCommentCount: number;
  /** 品牌logo */
  logo: string;
  /** 专区大图 */
  bigPic: string;
  /** 品牌故事 */
  brandStory: string;
}

// 创建品牌请求数据类型
export interface CreateBrandDto {
  /** 名称 */
  name: string;
  /** 首字母 */
  firstLetter?: string;
  /** 排序 */
  sort?: number;
  /** 是否为品牌制造商：0->不是；1->是 */
  factoryStatus?: number;
  /** 是否显示 */
  showStatus?: number;
  /** 品牌logo */
  logo?: string;
  /** 专区大图 */
  bigPic?: string;
  /** 品牌故事 */
  brandStory?: string;
}

// 更新品牌请求数据类型
export interface UpdateBrandDto extends Partial<CreateBrandDto> {
  /** 品牌ID */
  id: number;
}

// 品牌查询参数类型
export interface BrandListParams extends PageParams {
  /** 品牌名称 */
  name?: string;
  /** 显示状态：0->不显示；1->显示 */
  showStatus?: number;
}

// 品牌分页结果类型
export interface BrandPageResult extends PageResult<BrandResponseDto> {}