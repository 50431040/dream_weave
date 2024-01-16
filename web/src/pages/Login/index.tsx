import httpRequest from '@/http';
import { history, useModel } from '@umijs/max';
import React from 'react';
import FormNormalLogin from './FormNormalLogin';
import styles from './index.module.css';
const CryptoJS = require('crypto-js');

const Login: React.FC = () => {
  const { setUserInfo } = useModel('user');

  const handleLogin = async (form: any) => {
    const password = CryptoJS.MD5(form.password);
    const passwordMd5 = password.toString();

    const res = await httpRequest.post('/user/login', {
      username: form.username,
      password: passwordMd5,
    });

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
