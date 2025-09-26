// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取OSS上传签名 POST /api/common/upload/signature */
export async function uploadControllerGetUploadSignature(options?: {
  [key: string]: any;
}) {
  return request<
    API.ResponseReturn & { data?: API.UploadSignatureResponseDataDto }
  >('/api/common/upload/signature', {
    method: 'POST',
    ...(options || {}),
  });
}
