import { getPermissionList } from '@/services/permission';
import { PermissionGroup } from '@/services/permission/type';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { ActionType } from '@ant-design/pro-table/es/typing';
import { Button, message } from 'antd';
import { useRef } from 'react';

export default function PermissionManagement() {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<PermissionGroup>[] = [
    {
      title: '权限组名称',
      dataIndex: 'groupName',
      width: 200,
    },
    {
      title: '路径',
      dataIndex: 'path',
      width: 200,
    },
    {
      title: '子权限数量',
      dataIndex: 'child',
      width: 150,
      render: (_, record) => record.child.length,
    },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   key: 'option',
    //   width: 100,
    //   render: (_text, record) => [
    //     <a
    //       key="view"
    //       onClick={() => {
    //         message.info(`查看权限组: ${record.groupName}`);
    //       }}
    //     >
    //       查看
    //     </a>,
    //   ],
    // },
  ];

  return (
    <ProTable<PermissionGroup>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        const result = await getPermissionList({ params });
        return {
          data: result.data || [],
          success: result.code === 200,
          total: result.data?.length || 0,
        };
      }}
      columnsState={{
        persistenceKey: 'pro-table-permission-list',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
      }}
      rowKey="path"
      search={false}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="权限管理"
      toolBarRender={() => [
        <Button
          key="refresh"
          onClick={() => {
            actionRef.current?.reload();
          }}
        >
          刷新
        </Button>,
      ]}
      expandable={{
        expandedRowRender: (record) => (
          <ProTable<PermissionGroup['child'][number]>
            columns={[
              {
                title: '权限',
                dataIndex: 'permission',
                width: 200,
              },
              {
                title: '名称',
                dataIndex: 'name',
                width: 200,
              },
              // {
              //   title: '状态',
              //   dataIndex: 'status',
              //   width: 100,
              //   render: (_, record) => (record.status === 1 ? '启用' : '禁用'),
              // },
            ]}
            headerTitle={false}
            search={false}
            options={false}
            dataSource={record.child}
            pagination={false}
            rowKey="permission"
            toolBarRender={false}
          />
        ),
      }}
    />
  );
}
