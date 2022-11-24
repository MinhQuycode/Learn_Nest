import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {bcrypt} from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique : true})
    email: string;

    @Column()
    password: string;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password,8)
    }

    async validatePassword(password: string):Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }


}
