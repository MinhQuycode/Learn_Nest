import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'task_profiles'})
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;
}