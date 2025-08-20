// API响应基础结构
import { message } from 'antd';

// 分页请求参数
export interface PageParams {
  current?: number;
  pageSize?: number;
  keyword?: string;
}

// 分页响应结果
export interface PageResult<T> {
  total: number;
  records: T[];
}

// API响应通用类型
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export const data = async <D = unknown>(data: ApiResponse<D>): Promise<D> =>
  data?.data;

export const toastMessage = async <D = any>(
  data: ApiResponse<D>,
): Promise<D> => {
  message.error(typeof data === 'string' ? data : data?.message);
  return data?.data;
};
