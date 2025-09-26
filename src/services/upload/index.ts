import { request } from '@umijs/max';
import { UploadSignatureResponse } from './type';

/**
 * 获取OSS上传签名
 * @returns 上传签名信息
 */
export async function getUploadSignature() {
  return request<UploadSignatureResponse>('/api/common/upload/signature', {
    method: 'GET',
  });
}
