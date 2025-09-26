import { getUploadSignature } from '@/services/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { request } from '@umijs/max';
import type { UploadProps } from 'antd';
import { Upload, message } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import React, { useMemo, useState } from 'react';

interface MultipleOSSUploadProps {
  value?: string[];
  onChange?: (urls: string[]) => void;
  placeholder?: string;
  maxCount?: number;
}

const MultipleOSSUpload: React.FC<MultipleOSSUploadProps> = ({
  value = [],
  onChange,
  placeholder = '点击上传文件',
  maxCount = 5,
}) => {
  const [loading, setLoading] = useState(false);
  const fileList = useMemo(() => {
    return value.map(
      (url) =>
        ({
          uid: url,
          name: url,
          status: 'done',
          url: url,
        } as UploadFile),
    );
  }, [value]);
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
      formData.append('key', `${dir}${Date.now()}-${(file as File).name}`);
      formData.append('policy', policy);
      formData.append('x-oss-signature-version', xOssSignatureVersion);
      formData.append('x-oss-credential', xOssCredential);
      formData.append('x-oss-date', xOssDate);
      formData.append('x-oss-security-token', securityToken);
      formData.append('x-oss-signature', signature);
      formData.append('file', file as File);

      // 3. 上传文件到 OSS
      await request(host, {
        method: 'POST',
        data: formData,
        requestType: 'form',
      });

      // 4. 构造文件访问 URL
      const fileUrl = `${host}/${formData.get('key')}`;

      // 6. 通知父组件
      if (onChange) {
        onChange([...value, fileUrl]);
      }

      if (onSuccess) {
        onSuccess({ url: fileUrl }, new XMLHttpRequest());
      }

      message.success('上传成功');
    } catch (error) {
      console.error('上传失败:', error);
      message.error((error as Error).message || '上传失败');

      if (onError) {
        onError(error as Error, new XMLHttpRequest());
      }
    } finally {
      setLoading(false);
    }
  };

  // 处理文件删除
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    onChange?.(newFileList.map(({ url = '' }) => url).filter((item) => !!item));
  };
  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      customRequest={customRequest}
      multiple
      maxCount={maxCount}
      onChange={handleChange}
      fileList={fileList}
    >
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>{placeholder}</div>
      </div>
    </Upload>
  );
};

export default MultipleOSSUpload;
