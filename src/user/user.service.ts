import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor (private readonly userRepository: UserRepository) {}

    /**
     * 모든 유저 조회
     * @returns Promise<User[]>
     */
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    /**
     * 하나의 유저 조회
     * @param id user.user_id 
     * @returns 
     */
    async findUser(id: string): Promise<User> {
        return await this.userRepository.findOne({where: {user_id: id}});
    }

    /**
     * 유저 생성
     * @param createUserDto
     * @returns Promise<User>
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        const userId = createUserDto.user_id;
        const checkExistUser: User = await this.userRepository.findOne({where: {user_id: userId}});

        if (checkExistUser !== undefined) {
            throw new BadRequestException("이미 등록된 아이디여라~");
        }

        const user = this.userRepository.create(createUserDto);

        return this.userRepository.save(user);
    }

    async updateUser(id:string, updateUserDto: UpdateUserDto): Promise<User> {
        const existUser = await this.findUser(id);
        if (existUser === undefined) {
            throw new BadRequestException("없는 아이디여라~");
        }

        existUser.user_pw = updateUserDto.user_pw ?? existUser.user_pw;
        existUser.nickname = updateUserDto.nickname ?? existUser.nickname;
        existUser.is_use = updateUserDto.is_use ?? existUser.is_use;
        
        return await this.userRepository.save(existUser);
    }
}
