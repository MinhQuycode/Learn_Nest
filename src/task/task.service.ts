import { CreateTaskPostDto } from './../posts/dto/post.dto';
import { Injectable,HttpException,HttpStatus  } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { CreateTaskProfileDto } from 'src/profile/dto/profile.dto';
import { Profile } from 'src/profile/entity/profile.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { Task } from './entity/task.entity';
import { Post } from 'src/posts/entity/post.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>
  ) {}

  async findAll (): Promise<Task[]> {
    return await this.taskRepo.find({relations:['profile','posts']});
  }

  async findOne (id:number): Promise<Task> {
    return await this.taskRepo.findOneBy({id})
  }

  async create (task: Task): Promise<Task> {
    return await this.taskRepo.save(task)
  }

  async update(task: Task): Promise<UpdateResult> {
    return await this.taskRepo.update(task.id, task);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.taskRepo.delete(id);
  }

  async createTaskProfile(id: number, createTaskProfile: CreateTaskProfileDto): Promise<Task> {
    const task = await this.taskRepo.findOneBy({id});
    if(!task) throw new HttpException(
      "Task not found. Cannot create Profile",
      HttpStatus.BAD_REQUEST,
    )
    const newProfile = this.profileRepo.create(createTaskProfile);
    const saveProfile = await this.profileRepo.save(newProfile);
    task.profile = saveProfile;
    return this.taskRepo.save(task)
  }

 async createTaskPost(id:number,createTaskPost: CreateTaskPostDto) : Promise<Post> {
  const task = await this.taskRepo.findOneBy({id});
  if(!task) throw new HttpException(
    "Task not found. Cannot create Post",
    HttpStatus.BAD_REQUEST,
  )
  const newPost = this.postRepo.create({...createTaskPost,task});
  return this.postRepo.save(newPost);

 }
}