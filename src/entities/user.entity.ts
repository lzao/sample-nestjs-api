import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: string;
    
    @Column()
    user_pw: string;

    @Column()
    token: string;

    @Column()
    nickname: string;

    @Column()
    is_use: number;
}