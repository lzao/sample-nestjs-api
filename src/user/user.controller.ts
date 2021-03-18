import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    all() {
        return this.userService.findAll();
    }

    @Post()
    create(@Body() createUserDto :CreateUserDto) {
        return this.userService.create(createUserDto);
    }
}