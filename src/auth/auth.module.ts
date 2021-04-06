import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, PassportModule, TypeOrmModule.forFeature([UserRepository])],
  providers: [AuthService, LocalStrategy, UserService]
})
export class AuthModule {}
