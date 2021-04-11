import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1616332803864 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` ( \
            `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT, \
            `user_id` varchar(30) NOT NULL default '' COMMENT '회원 아이디', \
            `user_pw` varchar(150) NOT NULL default '' COMMENT '회원 비밀번호', \
            `nickname` varchar(50) NOT NULL default '' COMMENT '회원 이름', \
            `is_use` char(1) NOT NULL DEFAULT 'Y' COMMENT '사용 여부(Y: 사용함, N: 사용안함)', \
            `reg_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '생성 시간', \
            `upd_date` timestamp NULL DEFAULT NULL COMMENT '수정 시간', \
            `del_date` timestamp NULL DEFAULT NULL COMMENT '삭제 시간', \
            PRIMARY KEY (`id`) \
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='회원 테이블'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
