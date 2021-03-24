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

    async hashPassword(entity: User): Promise<void> {
        entity.user_pw = await bcrypt.hash(entity.user_pw, bcrypt.genSaltSync(10));
    }

    beforeInsert(event: InsertEvent<User>): Promise<void> {
        return this.hashPassword(event.entity);
    }

    async beforeUpdate({entity, databaseEntity}: UpdateEvent<User>): Promise<void> {
        if (entity.user_pw !== databaseEntity?.user_pw) {
            await this.hashPassword(entity);
        }
    }
}