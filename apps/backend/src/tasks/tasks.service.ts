import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.model';
import {
  CreateTaskDTO,
  TaskStatus,
  UpdateTaskDTO,
} from '@internal/dto/dto.task';
import { UserDTO, UserWithoutRelation } from '@internal/dto/dto.user';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  createTask(dto: CreateTaskDTO, user: UserWithoutRelation) {
    const status = dto.status || TaskStatus.ACTIVE;

    return this.taskRepository.save({
      ...dto,
      status,
      user,
    });
  }

  async updateTask(id: number, dto: UpdateTaskDTO, user: UserWithoutRelation) {
    const task = await this.taskRepository.findOne({ where: { id, user } });

    if (!task) {
      throw new HttpException('Task not found', 404);
    }

    return this.taskRepository.save({
      ...task,
      ...dto,
    });
  }

  async deleteTask(id: number, user: UserWithoutRelation) {
    const task = await this.taskRepository.findOne({ where: { id, user } });

    if (!task) {
      throw new HttpException('Task not found', 404);
    }

    return this.taskRepository.delete({ id });
  }

  async getTask(id: number, user: UserWithoutRelation) {
    return this.taskRepository.findOne({ where: { id, user } });
  }

  async getTasks(user: UserWithoutRelation) {
    return this.taskRepository.find({ where: { user } });
  }
}
