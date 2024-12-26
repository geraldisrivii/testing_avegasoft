import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'src/config/config.env';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { source } from '~/config/config.data-source';
import { User } from './auth/auth.model';
import { Task } from '~/tasks/tasks.model';
import { TasksModule } from '~/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      ...source.options,
      entities: [User, Task],
    }),
    AuthModule,
    TasksModule,
  ],
  controllers: [],
})
export class AppModule {}
