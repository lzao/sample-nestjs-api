import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dto/update-user.dto';

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

    @Patch(":id")
    update(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(":id")
    deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
