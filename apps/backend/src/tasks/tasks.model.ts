import {
  TaskDTO,
  CreateTaskDTO,
  TaskStatus,
  UpdateTaskDTO,
} from '@internal/dto/dto.task';
import { UserDTO } from '@internal/dto/dto.user';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '~/auth/auth.model';
import {
  SwaggerID,
  SwaggerValue,
  SwaggerBoolean,
} from '~/swager/swager.decorators';

export class CreateTask implements CreateTaskDTO {
  @SwaggerValue()
  @IsString()
  name: string;
  @SwaggerValue()
  @IsString()
  description: string;
  @SwaggerBoolean()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

export class UpdateTask implements UpdateTaskDTO {
  @SwaggerValue()
  @IsString()
  @IsOptional()
  name?: string;
  @SwaggerValue()
  @IsString()
  @IsOptional()
  description?: string;
  @SwaggerBoolean()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

@Entity({
  name: 'tasks',
})
export class Task implements TaskDTO {
  @SwaggerID()
  @PrimaryGeneratedColumn()
  id: number;

  @SwaggerValue()
  @Column({ type: 'varchar' })
  name: string;

  @SwaggerValue()
  @Column({ type: 'varchar' })
  description: string;

  @SwaggerValue()
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.ACTIVE })
  status: TaskStatus;

  @ApiProperty({ type: User, description: 'User' })
  @ManyToOne(() => User, (user) => user.tasks)
  user: UserDTO;
}
