import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/entities/user.entity';
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
        is_use: 1 
      },{
        id: 2,
        user_id: 'eee',
        user_pw: 'fff',
        token: "ggg",
        nickname: "hhh",
        is_use: 1 
      }];

      const userRepositoryFindSpy = jest
        .spyOn(userRepository, 'find')
        .mockResolvedValue(testUsers);

      const result = await service.findAll();

      expect(result).toBe(testUsers);
      expect(userRepositoryFindSpy).toBeCalled();
    });
  });
});
