import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

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

    @Column({default: 1})
    is_use: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    reg_date : string;

    @Column({ type: 'timestamp', default: null })
    upd_date : string;

    @Column({ type: 'timestamp', default: null })
    del_date : string;

    public static of(params: Partial<User>): User {
        const user = new User();
    
        Object.assign(user, params);
    
        return user;
    }
}