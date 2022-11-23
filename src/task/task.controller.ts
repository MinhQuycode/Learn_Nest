import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
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
}

