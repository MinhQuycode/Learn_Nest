import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Profile } from 'src/profile/entity/profile.entity';
import { Post } from 'src/posts/entity/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task,Profile,Post])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}