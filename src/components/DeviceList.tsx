import React from 'react';
import { Table, Tag, Space, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeviceStore } from '../stores/deviceStore';
import type { Device } from '../types/device';

export const DeviceList: React.FC = () => {
  const { devices, loading, deleteDevice } = useDeviceStore();

  const handleDelete = async (id: string) => {
    try {
      await deleteDevice(id);
      message.success('Device deleted successfully');
    } catch (error) {
      message.error('Failed to delete device');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Device, b: Device) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'laptop' ? 'blue' : type === 'desktop' ? 'green' : 'orange'}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : status === 'inactive' ? 'error' : 'warning'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Assigned To',
      dataIndex: 'assigned_to',
      key: 'assigned_to',
    },
    {
      title: 'Last Checked',
      dataIndex: 'last_checked',
      key: 'last_checked',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Device) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => console.log('Edit', record.id)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={devices}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};