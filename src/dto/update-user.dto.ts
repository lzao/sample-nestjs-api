import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly user_pw?: string;

    @IsOptional()
    @IsString()
    readonly nickname?: string;

    @IsOptional()
    @IsString()
    readonly is_use?: string;
}