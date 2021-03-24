import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    all(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(":id")
    findUser(@Param('id') id: string): Promise<User> {
        return this.userService.findUser(id);
    }

    @Post()
    create(@Body() createUserDto :CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
}
