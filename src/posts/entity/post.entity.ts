import { Task } from "src/task/entity/task.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'task_posts'})
export class Post{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description: string;

    @ManyToOne(() => Task, (task) => task.posts)
    task : Task;
}