import { Post } from 'src/posts/entity/post.entity';
import { Profile } from 'src/profile/entity/profile.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'task'})
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 }) 
  name: string;

  @Column('text')
  description: string;

  @Column()
  isDone: boolean;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile

  @OneToMany(() => Post,(post) => post.task)
  posts: Post[]

}