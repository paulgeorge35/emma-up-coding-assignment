import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { AuthMiddleware } from 'src/user/auth.middleware';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [MovieController],
  providers: [MovieService, PrismaService],
})
export class MovieModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(MovieController);
  }
}
