import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTeble1615733395222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` ( \
            `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT, \
            `user_id` varchar(30) NOT NULL DEFAULT '' COMMENT '회원 아이디', \
            `user_pw` varchar(100) NOT NULL DEFAULT '' COMMENT '회원 비밀번호', \
            `token` varchar(255) NOT NULL DEFAULT '' COMMENT '회원 토큰', \
            `nickname` varchar(50) NOT NULL DEFAULT '' COMMENT '회원 닉네임', \
            `is_use` tinyint(1) NOT NULL DEFAULT 1 COMMENT '사용여부 (1:사용함, 0:사용안함)', \
            `reg_date` DATETIME COMMENT '등록시간', \
            `upd_date` DATETIME COMMENT '수정시간', \
            `del_date` DATETIME COMMENT '삭제시간', \
            PRIMARY KEY (`id`) \
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='회원 테이블'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
