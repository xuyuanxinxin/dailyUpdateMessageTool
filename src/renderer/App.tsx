import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Layout, Form, Input, notification } from 'antd';
import './App.css';
import { Content } from 'antd/es/layout/layout';
import { NotificationInstance } from 'antd/es/notification/interface';

let api: NotificationInstance;
let contextHolder;
const onFinish = (value: {
  frontendUpdateMessage: string;
  backendUpdateMessage: string;
}) => {
  const template = `任务进度:
        前端: ${value.frontendUpdateMessage}
        后端: ${value.backendUpdateMessage}`;
  window.electron.ipcRenderer.sendMessage('clipboard', template);
  api.info({
    message: `已经复制到剪贴板📋`,
  });
};

function Hello() {
  [api, contextHolder] = notification.useNotification();
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {contextHolder}
      <Layout style={{ height: '100vh' }}>
        <Layout>
          <Content
            style={{
              width: '100%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="前端更新信息"
                name="frontendUpdateMessage"
                rules={[{ required: true, message: '需要输入' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="后端更新信息"
                name="backendUpdateMessage"
                rules={[{ required: true, message: '需要输入' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  生成提交信息
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
