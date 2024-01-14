import httpRequest from '@/http';
import { history, useModel } from '@umijs/max';
import React from 'react';
import FormNormalLogin from './FormNormalLogin';
import styles from './index.module.css';

const Login: React.FC = () => {
  const { setUserInfo } = useModel('user');

  const handleLogin = async (form: any) => {
    const res = await httpRequest.post('/login', form);
    // @ts-ignore
    setUserInfo(res);
    history.push('/index');
  };

  return (
    <div className={styles.main}>
      <FormNormalLogin handleLogin={handleLogin} />
    </div>
  );
};

export default Login;
