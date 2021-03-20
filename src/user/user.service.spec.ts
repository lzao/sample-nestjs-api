import { BadRequestException } from '@nestjs/common';
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

      const testUsers: User[] = [{
        id: 1,
        user_id: 'aaa',
        user_pw: 'bbb',
        token: "ccc",
        nickname: "ddd",
        is_use: 1,
        reg_date: '2021-03-18 00:00:00',
        upd_date: '2021-03-18 00:00:00',
        del_date: null
      },{
        id: 2,
        user_id: 'eee',
        user_pw: 'fff',
        token: "ggg",
        nickname: "hhh",
        is_use: 1,
        reg_date: "2021-03-18 00:00:00",
        upd_date: "2021-03-18 00:00:00",
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
    it("회원을 생성할 때 이미 있는 회원일 경우 BadRequest 를 호출합니다", async() => {
      const createUserDto: CreateUserDto = {
        user_id: '1',
        user_pw: '2',
        nickname: '3'
      };

      const createUser = User.of(createUserDto);

      const findUserRepositorySpy = jest.spyOn(userRepository, 'findOne')
        .mockResolvedValue(createUser);

      try {
        await service.create(createUserDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe("이미 등록된 아이디여라");
      }

      expect(findUserRepositorySpy).toHaveBeenCalledWith({where: {user_id: '1'}});

    });
    it("하나의 회원 정보를 생성합니다.", async() => {
      const createUserDto: CreateUserDto = {
        user_id: '1',
        user_pw: '2',
        nickname: '3'
      };

      const createUser = User.of(createUserDto);

      const saveUser: User = {
        id: 1,
        ...createUserDto,
        token: "ccc",
        is_use: 1,
        reg_date: '2021-03-18 00:00:00',
        upd_date: '2021-03-18 00:00:00',
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
