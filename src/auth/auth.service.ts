import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(userId: string, userPassword: string): Promise<User> {
        const user = await this.userService.findUser(userId);

        if (user && bcrypt.compareSync(userPassword, user.user_pw)) {
            return user;
        }

        return null;
    }

    async login(user: User) {
        const payload = { nickname: user.nickname, sub: user.user_id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
