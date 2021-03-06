import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;
    
    @Column()
    user_pw: string;

    @Column()
    nickname: string;

    @Column({default: 'Y'})
    is_use: string;

    @CreateDateColumn()
    reg_date: string;

    @UpdateDateColumn()
    upd_date : string;

    @DeleteDateColumn()
    del_date : string;

    public static of(params: Partial<User>): User {
        const user = new User();
    
        Object.assign(user, params);
    
        return user;
    }
}