import { getUploadSignature } from '@/services/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { request } from '@umijs/max';
import type { UploadProps } from 'antd';
import { Upload, message } from 'antd';
import React, { useState } from 'react';

interface OSSUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  placeholder?: string;
  accept?: UploadProps['accept'];
}

const OSSUpload: React.FC<OSSUploadProps> = ({
  value,
  onChange,
  accept = 'image/*',
  placeholder = '点击上传文件',
}) => {
  const [loading, setLoading] = useState(false);

  // 自定义上传请求
  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;

    setLoading(true);

    try {
      // 1. 获取上传签名
      const signatureRes = await getUploadSignature();

      if (signatureRes.code !== 200) {
        throw new Error(signatureRes.message || '获取上传签名失败');
      }

      const {
        policy,
        xOssSignatureVersion,
        xOssCredential,
        xOssDate,
        securityToken,
        signature,
        host,
        dir,
      } = signatureRes.data;

      // 2. 构造上传到 OSS 的表单数据
      const formData = new FormData();

      formData.append('policy', policy);
      formData.append('x-oss-signature', signature);
      formData.append('x-oss-signature-version', xOssSignatureVersion);
      formData.append('x-oss-credential', xOssCredential);
      formData.append('x-oss-date', xOssDate);
      formData.append('key', `${dir}${Date.now()}-${(file as File).name}`);
      formData.append('x-oss-security-token', securityToken);

      formData.append('file', file as File);

      // 3. 上传文件到 OSS
      const uploadRes = await request(host, {
        method: 'POST',
        data: formData,
        requestType: 'form',
      });

      // 4. 构造文件访问 URL
      const fileUrl = `${host}/${formData.get('key')}`;

      // 5. 通知父组件
      if (onChange) {
        onChange(fileUrl);
      }

      if (onSuccess) {
        onSuccess({ url: fileUrl }, new XMLHttpRequest());
      }

      message.success('上传成功');
    } catch (error: unknown) {
      console.error('上传失败:', error);
      message.error((error as Error).message || '上传失败');

      if (onError) {
        onError(error as Error, new XMLHttpRequest());
      }
    } finally {
      setLoading(false);
    }
  };

  // 上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{placeholder}</div>
    </div>
  );

  return (
    <Upload
      name="file"
      accept={accept}
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      customRequest={customRequest}
    >
      {value ? (
        <img src={value} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default OSSUpload;
