import { getAllCategoryList } from '@/services/product/category';
import { TreeSelect } from 'antd';
import { DataNode } from 'rc-tree-select/es/interface';
import React, { useEffect, useState } from 'react';

interface CategoryTreeSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string, option: DataNode) => void;
  placeholder?: string;
  hasTop?: boolean;
}

const CategoryTreeSelect: React.FC<CategoryTreeSelectProps> = ({
  value,
  onChange,
  onSelect,
  hasTop = true,
  placeholder = '请选择上级分类',
}) => {
  const [treeData, setTreeData] = useState<DataNode[]>(
    hasTop
      ? [
          {
            title: '一级分类',
            value: '0',
            key: '0',
            children: [],
          },
        ]
      : [],
  );
  const [loading, setLoading] = useState(false);

  // 获取商品分类数据
  const fetchCategoryTreeData = async () => {
    setLoading(true);
    try {
      // 获取所有商品分类
      const res = await getAllCategoryList();
      const categories = res.data || [];

      // 构建树形数据
      const buildTree = (parentId: string = '0'): DataNode[] => {
        return categories
          .filter((category) => category.parentId === parentId)
          .map((category) => {
            const children = buildTree(category.id);
            return {
              title: category.name,
              value: category.id,
              key: category.id,
              children: children.length > 0 ? children : undefined,
            };
          });
      };

      // 构建完整的树形结构
      const firstLevelCategories = buildTree('0');

      setTreeData(
        hasTop
          ? [
              {
                title: '一级分类',
                value: '0',
                key: '0',
                children: firstLevelCategories,
              },
            ]
          : firstLevelCategories,
      );
    } catch (error) {
      console.error('获取商品分类数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCategoryTreeData();
  }, []);

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      placeholder={placeholder}
      treeDefaultExpandAll
      loading={loading}
      allowClear
      style={{ width: '100%' }}
    />
  );
};

export default CategoryTreeSelect;
