import { ApiResponse } from '@/services';

// 上传签名响应数据
export interface UploadSignatureResponseDataDto {
  /** Policy */
  policy: string;
  /** OSS4-HMAC-SHA256 */
  xOssSignatureVersion: string;
  xOssCredential: string;
  xOssDate: string;
  securityToken: string;
  /** Signature */
  signature: string;
  /** Host */
  host: string;
  /** Directory */
  dir: string;
}

// 上传签名响应
export interface UploadSignatureResponse extends ApiResponse<UploadSignatureResponseDataDto> {}