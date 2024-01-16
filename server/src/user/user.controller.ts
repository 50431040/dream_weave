import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDTO } from './user.dto';
import { Public } from '../auth-jwt/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    return await this.userService.login(userLoginDTO);
  }
}
