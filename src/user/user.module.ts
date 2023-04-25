import { PrismaService } from './../prisma.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthMiddleware } from './auth.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    await consumer
      .apply(AuthMiddleware)
      .exclude('user/login', 'user/register')
      .forRoutes(UserController);
  }
}
