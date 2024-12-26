import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from '~/tasks/tasks.service';
import { CreateTask, Task, UpdateTask } from '~/tasks/tasks.model';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '~/auth/auth.service';
import { Request } from 'express';
import { AuthGuard } from '~/auth/auth.guard';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private authService: AuthService,
  ) {}

  @ApiResponse({ status: 200, type: [Task] })
  @UseGuards(AuthGuard)
  @Get()
  listAll(@Req() req: Request) {
    const token = this.authService.getUser(req);
    return this.tasksService.getTasks(token.user);
  }

  @ApiResponse({ status: 200, type: Task })
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateTask, @Req() req: Request) {
    const token = this.authService.getUser(req);

    return this.tasksService.createTask({ ...dto }, token.user);
  }

  @ApiResponse({ status: 200, type: Task })
  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateTask,
    @Req() req: Request,
  ) {
    const token = this.authService.getUser(req);

    return this.tasksService.updateTask(id, dto, token.user);
  }

  @ApiResponse({ status: 200, type: Task })
  @Delete(':id')
  delete(@Param('id') id: number, @Req() req: Request) {
    const token = this.authService.getUser(req);

    return this.tasksService.deleteTask(id, token.user);
  }
}
