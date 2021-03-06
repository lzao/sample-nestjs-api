import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
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
        nickname: "ddd",
        is_use: 'Y',
        reg_date: '2021-03-18 00:00:00',
        upd_date: '2021-03-18 00:00:00',
        del_date: null
      },{
        id: 2,
        user_id: 'eee',
        user_pw: 'fff',
        nickname: "hhh",
        is_use: 'Y',
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

  describe("하나의 회원 조회", () => {
    it("하나의 회원 아이디로 회원 정보를 조회합니다.", async() => {
      const testUser: User = {
        id: 1,
        user_id: '1',
        user_pw: '2',
        nickname: '3',
        is_use: 'Y',
        reg_date: '2021-03-18 00:00:00',
        upd_date: '2021-03-18 00:00:00',
        del_date: null
      };

      const findUserRepositorySpy = jest.spyOn(userRepository, 'findOne').mockResolvedValue(testUser);

      const result = await service.findUser(testUser.user_id);

      expect(findUserRepositorySpy).toHaveBeenCalledWith({where: {user_id: testUser.user_id }})
      expect(result).toBe(testUser);
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
        expect(e.message).toBe("이미 등록된 아이디여라~");
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
        is_use: 'Y',
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

  describe("회원 정보 수정", () => {
    it("없는 회원 정보를 수정하면 BadRequestException을 발생합니다.", async() => {
      const updateUserDto: UpdateUserDto = {
        user_pw: 'x',
        nickname: 'dd',
        is_use: 'N'
      };
      const userId: string = "1";

      const findUserRepositorySpy = jest.spyOn(userRepository, 'findOne').mockReturnValue(undefined);

      try {
        await service.updateUser(userId, updateUserDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toEqual('없는 아이디여라~');
      }
    });
    it("회원 정보를 수정합니다", async() => {
      const updateUserDtoUserPw: UpdateUserDto = {
        user_pw: 'dd',
      };
      const updateUserDtoNickname: UpdateUserDto = {
        nickname: 'dd'
      };
      const updateUserDtoIsUse: UpdateUserDto = {
        is_use: 'Y'
      };
      const userId: string = "1";

      const existUser = User.of({user_id:userId,...updateUserDtoUserPw,...updateUserDtoNickname,...updateUserDtoIsUse});

      const updateUser:User = {
        id: 1,
        user_id: "1",
        user_pw: 'x',
        nickname: 'dd',
        is_use: 'N',
        reg_date: '2021-03-24 00:00:00',
        upd_date: '2021-03-24 00:00:00',
        del_date: null,
      }

      const findUserRepositorySpy = jest.spyOn(userRepository, 'findOne').mockResolvedValue(existUser);
      const updateUserRepositorySpy = jest.spyOn(userRepository, 'save').mockResolvedValue(updateUser);

      const result1 = await service.updateUser(userId, updateUserDtoUserPw);
      const result2 = await service.updateUser(userId, updateUserDtoNickname);
      const result3 = await service.updateUser(userId, updateUserDtoIsUse);

      expect(findUserRepositorySpy).toHaveBeenCalledWith({where: {user_id: userId}});
      expect(updateUserRepositorySpy).toBeCalledWith(existUser);
      expect(result1).toBe(updateUser);
      expect(result2).toBe(updateUser);
      expect(result3).toBe(updateUser);

    });
  });

  describe("회원 삭제", () => {
    it('하나의 회원을 삭제합니다.', async() => {
      const deleteUserId = 1;

      const deleteUserRepositorySpy = jest.spyOn(userRepository, 'delete').mockReturnValue(null);
      const result = await service.deleteUser(deleteUserId);

      expect(deleteUserRepositorySpy).toHaveBeenCalledWith(deleteUserId);
      expect(result).toBe(undefined);
    });
  });
});
