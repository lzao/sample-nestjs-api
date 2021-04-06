import { Strategy } from 'passport-local';
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField : 'userId', passwordField: "userPassword" });
    }

    async validate(userId: string, userPassword: string): Promise<User> {
        const user = await this.authService.validateUser(userId, userPassword);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}