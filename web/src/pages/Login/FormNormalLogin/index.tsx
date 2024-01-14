import styles from './index.module.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const NormalLoginForm = (props: any) => {
  return (
    <Form
      name="normal_login"
      className={styles.login_form}
      initialValues={{ remember: true }}
      onFinish={props.handleLogin}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'please input username' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'please input password' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className={styles.login_btn}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default (props: any) => (
  <div className={styles.container}>
    <NormalLoginForm handleLogin={props.handleLogin} />
  </div>
);
