import { Controller, Get, Post, Put, Delete, Body, Param ,ParseIntPipe} from '@nestjs/common';
import { CreateTaskPostDto } from 'src/posts/dto/post.dto';
import { CreateTaskProfileDto } from 'src/profile/dto/profile.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll()
  }

  @Get(':id')
  get(@Param('id') id:number) {
    return this.taskService.findOne(id);
  }

  @Post()
  create(@Body() task: Task) {
    return this.taskService.create(task);
  }

  @Put()
  update(@Body() task: Task) {
    return this.taskService.update(task);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.taskService.delete(params.id);
  }

  @Post(':id/profiles')
  createTaskProfile(@Param('id',ParseIntPipe) id:number ,@Body() createTaskProfile : CreateTaskProfileDto){
    return this.taskService.createTaskProfile(id,createTaskProfile)
  }

  @Post(':id/posts')
  createTaskPost(@Param('id',ParseIntPipe) id: number, @Body() createTaskPost:CreateTaskPostDto) {
    return this.taskService.createTaskPost(id,createTaskPost)
  }
}

