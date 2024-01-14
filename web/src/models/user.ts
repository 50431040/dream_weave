import { useState } from 'react';

const useUser = () => {
  const [userInfo, setUserInfo] = useState<string>("");
  return {
    userInfo,
    setUserInfo,
  };
};

export default useUser;
