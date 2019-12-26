import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRespository } from './task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRespository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
