import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "아이디를 입력해주세요." })
    @IsString({ message: "형식이 유효하지 않습니다." })
    readonly user_id: string;

    @IsNotEmpty({ message: "비밀번호를 입력해주세요." })
    @IsString({ message: "형식이 유효하지 않습니다." })
    readonly user_pw: string;

    @IsNotEmpty({ message: "이름을 입력해주세요. "})
    @IsString({ message: "형식이 유효하지 않습니다." })
    readonly nickname: string;
}