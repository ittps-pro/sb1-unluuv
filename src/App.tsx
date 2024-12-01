import React, { useEffect } from 'react';
import { Layout, Typography, Button, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DeviceList } from './components/DeviceList';
import { DeviceForm } from './components/DeviceForm';
import { useDeviceStore } from './stores/deviceStore';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const { fetchDevices } = useDeviceStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between px-6">
        <Title level={3} className="text-white m-0">Device Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Device
        </Button>
      </Header>
      
      <Content className="p-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <DeviceList />
        </div>
      </Content>

      <Modal
        title="Add New Device"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <DeviceForm
          onSuccess={() => {
            setIsModalOpen(false);
            fetchDevices();
          }}
        />
      </Modal>
    </Layout>
  );
}

export default App;