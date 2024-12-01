import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useDeviceStore } from '../stores/deviceStore';
import type { Device } from '../types/device';

const { Option } = Select;

interface DeviceFormProps {
  initialValues?: Partial<Device>;
  onSuccess?: () => void;
}

export const DeviceForm: React.FC<DeviceFormProps> = ({ initialValues, onSuccess }) => {
  const { addDevice, updateDevice } = useDeviceStore();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      if (initialValues?.id) {
        await updateDevice(initialValues.id, values);
        message.success('Device updated successfully');
      } else {
        await addDevice({
          ...values,
          last_checked: new Date().toISOString(),
        });
        message.success('Device added successfully');
      }
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error('Failed to save device');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="name"
        label="Device Name"
        rules={[{ required: true, message: 'Please enter device name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="type"
        label="Device Type"
        rules={[{ required: true, message: 'Please select device type' }]}
      >
        <Select>
          <Option value="laptop">Laptop</Option>
          <Option value="desktop">Desktop</Option>
          <Option value="mobile">Mobile</Option>
          <Option value="tablet">Tablet</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select status' }]}
      >
        <Select>
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
          <Option value="maintenance">Maintenance</Option>
        </Select>
      </Form.Item>

      <Form.Item name="assigned_to" label="Assigned To">
        <Input />
      </Form.Item>

      <Form.Item
        name={['specifications', 'os']}
        label="Operating System"
        rules={[{ required: true, message: 'Please enter OS' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name={['specifications', 'ram']} label="RAM">
        <Input />
      </Form.Item>

      <Form.Item name={['specifications', 'storage']} label="Storage">
        <Input />
      </Form.Item>

      <Form.Item name={['specifications', 'processor']} label="Processor">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues?.id ? 'Update Device' : 'Add Device'}
        </Button>
      </Form.Item>
    </Form>
  );
};