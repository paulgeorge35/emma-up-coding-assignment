import { HttpException, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { PrismaService } from 'src/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new HttpException({ User: 'The email is already use' }, 400);
    }

    const password_hash = await hash(createUserDto.password, 1);

    delete createUserDto.password;
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        hash: password_hash,
      },
    });
  }
  async login({ email, password }: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        { User: 'The email and password do not match' },
        400,
      );
    }

    const passwordMatch = await compare(password, user.hash);

    if (!passwordMatch) {
      throw new HttpException(
        { User: 'The email and password do not match' },
        400,
      );
    }

    return user;
  }

  public generateJWT(user: User) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }
}
