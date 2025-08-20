import { getAllAttributeCategoryList } from '@/services/product/attributeCategory';
import { TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';

interface AttributeTreeSelectProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
}

const AttributeTreeSelect: React.FC<AttributeTreeSelectProps> = ({
  value,
  onChange,
  placeholder = '请选择关联属性',
}) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 获取属性分类和属性数据
  const fetchAttributeTreeData = async () => {
    setLoading(true);
    try {
      // 获取所有属性分类
      const categoryRes = await getAllAttributeCategoryList();

      setTreeData(
        categoryRes.data.map(({ name, id, productAttributes }) => {
          return {
            title: name,
            value: `category-${id}`,
            key: `category-${id}`,
            children: productAttributes.map(({ name, id }) => {
              return {
                title: name,
                value: id.toString(),
                key: id.toString(),
              };
            }),
          };
        }),
      );
    } catch (error) {
      console.error('获取属性数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAttributeTreeData();
  }, []);

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      treeCheckable
      showCheckedStrategy={TreeSelect.SHOW_CHILD}
      treeDefaultExpandAll
      loading={loading}
      allowClear
      style={{ width: '100%' }}
    />
  );
};

export default AttributeTreeSelect;
