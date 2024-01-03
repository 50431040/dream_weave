import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 获取Cookie中的值
 */
export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);
