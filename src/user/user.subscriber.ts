import { User } from "src/entities/user.entity";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    /**
     * 비밀번호를 암호화 합니다.
     * @param entity 
     */
    async hashPassword(entity: User): Promise<void> {
        entity.user_pw = await bcrypt.hash(entity.user_pw, bcrypt.genSaltSync(10));
    }

    /**
     * 회원 정보 추가 시 비밀번호를 암호화하여 저장합니다.
     * @param event 
     * @returns 
     */
    beforeInsert(event: InsertEvent<User>): Promise<void> {
        return this.hashPassword(event.entity);
    }

    /**
     * 회원 비밀번호 수정 시 기존 비밀번호와 같지 않다면 암호화하여 저장합니다.
     * @param param0 
     */
    async beforeUpdate({entity, databaseEntity}: UpdateEvent<User>): Promise<void> {
        if (entity.user_pw !== databaseEntity?.user_pw) {
            await this.hashPassword(entity);
        }
    }
}