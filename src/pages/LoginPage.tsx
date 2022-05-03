import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../services/auth';

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values: any) => {
    try {
      const user = await login(values).unwrap();
      navigate('/');
      notification['success']({
        message: 'Đăng nhập thành công',
        description: `Xin chào ${user?.userName ?? ''}`,
      });
    } catch (err) {
      // er
    }
  };

  return (
    <div className="login-page">
      <div className="page-content">
        <div className="login-banner">banner</div>
        <div className="login-form">
          <Form
            name="login-form"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="User name"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter user name" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Enter password"
              />
            </Form.Item>
            <Form.Item className="text-right">
              <Button type="link">
                <Link to="/forgot-password">Forgot password</Link>
              </Button>
            </Form.Item>

            <Form.Item className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isLoading}
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item className="text-center">
              Do not have an account?
              <Button type="link">
                <Link to="/register">Register</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
