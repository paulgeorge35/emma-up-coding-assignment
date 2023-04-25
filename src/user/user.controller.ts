import { LoginUserDto } from './dto/login-user.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const existingUser = await this.userService.login(loginUserDto);
    const token = await this.userService.generateJWT(existingUser);

    return {
      user: existingUser,
      token,
    };
  }
}
