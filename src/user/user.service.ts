import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor (private readonly userRepository: UserRepository) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findUser(id: string): Promise<User> {
        return await this.userRepository.findOne({where: {user_id: id}});
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const userId = createUserDto.user_id;
        const checkExistUser: User = await this.userRepository.findOne({where: {user_id: userId}});

        if (checkExistUser !== undefined) {
            throw new BadRequestException("이미 등록된 아이디여라");
        }

        const user = this.userRepository.create(createUserDto);

        return this.userRepository.save(user);
    }
}
