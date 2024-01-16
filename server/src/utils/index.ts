import { createHash } from 'crypto';

export const md5 = (message: string) => {
  const md5Hash = createHash('md5');
  md5Hash.update(message);
  const md5Result = md5Hash.digest('hex');
  return md5Result;
};
