import { AuthDTO, RefreshDTO } from '@dapp/dto/dto.auth';
import { CreateUserDTO, LoginUserDTO, UserDTO } from '@dapp/dto/dto.user';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {
  SwaggerEmail,
  SwaggerPassword,
  SwaggerToken,
  SwaggerID,
} from '~/swager/swager.decorators';
import { Task } from '~/tasks/tasks.model';

export class CreateUser implements CreateUserDTO {
  @SwaggerEmail()
  @IsEmail()
  email: string;
  @SwaggerPassword()
  @IsString()
  password: string;
}

export class LoginUser implements LoginUserDTO {
  @SwaggerEmail()
  @IsEmail()
  email: string;
  @SwaggerPassword()
  @IsString()
  password: string;
}

export class Refresh implements RefreshDTO {
  @IsString()
  @SwaggerToken()
  refresh: string;
}

@Entity({
  name: 'users',
})
export class User implements UserDTO {
  @SwaggerID()
  @PrimaryGeneratedColumn()
  id: number;

  @SwaggerEmail()
  @Column({ unique: true })
  email: string;

  @SwaggerPassword()
  @Column()
  password: string;

  @ApiProperty({ type: [Task], description: 'Tasks' })
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}

export class Auth implements AuthDTO {
  @ApiProperty({ example: 'access token', description: 'Access token' })
  access: string;
  @ApiProperty({ example: 'refresh token', description: 'Refresh token' })
  refresh: string;
  @ApiProperty({ type: User, description: 'User' })
  user: UserDTO;
}
