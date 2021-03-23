import { User } from "src/entities/user.entity";
import { BeforeInsert, Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>): Promise<void> {
        event.entity.user_pw = await bcrypt.hash(event.entity.user_pw, bcrypt.genSaltSync(10));
    }
}