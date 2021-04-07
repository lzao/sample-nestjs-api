import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, UserRepository],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe("로그인 회원 유효성 체크", () => {
    it("유저의 비밀번호가 같지 않다면 null를 리턴합니다.", async() => {
      const userId = "1";
      const userPassword = "2";
      const userWrongPassword = "3";

      const encryptPassword:string = bcrypt.hashSync(userPassword, bcrypt.genSaltSync(10));
      const encryptWrongPassword = bcrypt.hashSync(userWrongPassword, bcrypt.genSaltSync(10));

      const user:User = {
        id: 1,
        user_id: "1",
        user_pw: encryptPassword,
        nickname: "3",
        token: "",
        is_use: "Y",
        reg_date: "2021-04-07 00:00:00",
        upd_date: null,
        del_date: null
      };
      const wrongUser:User = {
        ...user,
        user_pw: encryptWrongPassword
      }

      const findOneUserRepositorySpy = jest.spyOn(userRepository, 'findOne').mockResolvedValue(wrongUser);
      const result = await service.validateUser(userId, userPassword);
      expect(result).toBe(null);
      expect(findOneUserRepositorySpy).toHaveBeenCalledWith({where: {user_id:userId}});
    });
    it("유저 아이디가 같고 비밀번호가 같으면 회원 정보를 리턴합니다.", async() => {
      const userId = "1";
      const userPassword = "2";

      const encryptPassword:string = bcrypt.hashSync(userPassword, bcrypt.genSaltSync(10));

      const user:User = {
        id: 1,
        user_id: "1",
        user_pw: encryptPassword,
        nickname: "3",
        token: "",
        is_use: "Y",
        reg_date: "2021-04-07 00:00:00",
        upd_date: null,
        del_date: null
      };

      const findOneUserRepositorySpy = jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      const result = await service.validateUser(userId, userPassword);
      expect(result).toBe(user);
      expect(findOneUserRepositorySpy).toHaveBeenCalledWith({where: {user_id:userId}});
    });
  });
});
