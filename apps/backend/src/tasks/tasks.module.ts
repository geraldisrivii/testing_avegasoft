import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from '~/tasks/tasks.controller';
import { TasksService } from '~/tasks/tasks.service';
import { Task } from '~/tasks/tasks.model';
import { AuthModule } from '~/auth/auth.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  exports: [TasksService],
})
export class TasksModule {}
