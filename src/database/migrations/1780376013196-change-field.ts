import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeField1780376013196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "cover_image" TYPE VARCHAR(900);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "cover_image" TYPE VARCHAR(800);`);
    }

}
