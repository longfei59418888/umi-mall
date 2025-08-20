// 表格列配置
import { UserItem } from '@/services/admin/type';
import { ProColumns } from '@ant-design/pro-components';

export const columns: ProColumns<UserItem>[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    valueEnum: {
      0: {
        text: '禁用',
        status: 'Default',
      },
      1: {
        text: '启用',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];
