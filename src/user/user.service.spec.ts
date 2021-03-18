import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe("전체 회원 조회", () => {
    it("전체 회원 정보를 조회합니다.", async() => {
      const nowDate = new Date(Date.now()).toLocaleString();
      const testUsers: User[] = [{
        id: 1,
        user_id: 'aaa',
        user_pw: 'bbb',
        token: "ccc",
        nickname: "ddd",
        is_use: 1,
        reg_date: nowDate,
        upd_date: null,
        del_date: null
      },{
        id: 2,
        user_id: 'eee',
        user_pw: 'fff',
        token: "ggg",
        nickname: "hhh",
        is_use: 1,
        reg_date: nowDate,
        upd_date: null,
        del_date: null
      }];

      const userRepositoryFindSpy = jest
        .spyOn(userRepository, 'find')
        .mockResolvedValue(testUsers);

      const result = await service.findAll();

      expect(userRepositoryFindSpy).toBeCalled();
      expect(result).toBe(testUsers);
    });
  });

  describe("회원 생성", () => {
    it("하나의 회원 정보를 생성합니다.", async() => {
      const nowDate = new Date(Date.now()).toLocaleString();

      const createUserDto: CreateUserDto = {
        user_id: '1',
        user_pw: '2',
        nickname: '3'
      };

      const createUser = User.of(createUserDto);

      const saveUser: User = {
        id: 2,
        user_id: '1',
        user_pw: '2',
        nickname: '3',
        token: 'dddd',
        is_use: 1,
        reg_date: nowDate,
        upd_date: null,
        del_date: null
      };

      const findUserRepositorySpy = jest.spyOn(userRepository, 'findOne')
        .mockResolvedValue(undefined);

      const createUserRepositorySpy = jest.spyOn(userRepository, 'create')
        .mockReturnValue(createUser);

      const saveUserRepositorySpy = jest.spyOn(userRepository, 'save')
        .mockResolvedValue(saveUser);
      
      const result = await service.create(createUserDto);
      expect(findUserRepositorySpy).toHaveBeenCalledWith({where: {user_id: "1"}});
      expect(createUserRepositorySpy).toBeCalledWith(createUserDto);
      expect(saveUserRepositorySpy).toBeCalledWith(createUser);
      expect(result).toEqual(saveUser);
    });
  });
});
