import { CreateUserDTO, LoginUserDTO, UserDTO } from '@internal/dto/dto.user';
import {
  HttpException,
  Injectable,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { publicClient } from '~/constants/constants.client';
import { AuthDTO, TokenDTO } from '@internal/dto/dto.auth';
import { Request as RequestExpress } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUser, Refresh, User } from './auth.model';
import * as bcrypt from 'bcryptjs';
import { validateToken } from '~/helpers/helpers.auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUser): Promise<AuthDTO> {
    const userExists = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new HttpException('User already exists', 400);
    }

    const user = await this.userRepository.save({
      ...dto,
      password: bcrypt.hashSync(dto.password),
    });

    return {
      user,
      access: this.generateAccessToken(user),
      refresh: this.generateRefreshToken(user),
    };
  }

  async login(dto: LoginUserDTO): Promise<AuthDTO> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (!bcrypt.compareSync(dto.password, user.password)) {
      throw new HttpException('Wrong password', 400);
    }

    return {
      user,
      access: this.generateAccessToken(user),
      refresh: this.generateRefreshToken(user),
    };
  }

  getUser(req: RequestExpress) {
    const token = req.headers.authorization;

    const tokenValue = validateToken(token);
    try {
      return this.jwtService.verify<TokenDTO>(tokenValue);
    } catch {
      throw new HttpException('Token is expired', 403);
    }
  }

  private generateAccessToken(user: User) {
    return this.jwtService.sign(
      {
        user,
        type: 'access',
      },
      {
        expiresIn: '15m',
      },
    );
  }

  private generateRefreshToken(user: User) {
    return this.jwtService.sign(
      {
        user,
        type: 'refresh',
      },
      {
        expiresIn: '10d',
      },
    );
  }

  refresh(dto: Refresh) {
    try {
      const result = this.jwtService.verify<TokenDTO>(dto.refresh);

      const { user } = result;

      return {
        access: this.generateAccessToken(user),
        refresh: this.generateRefreshToken(user),
        user,
      };
    } catch (e: any) {
      throw new UnauthorizedException(e.message);
    }
  }
}
