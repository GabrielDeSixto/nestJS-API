import { MigrationInterface, QueryRunner } from "typeorm";

export class AddField1780370888979 implements MigrationInterface {
    name = 'AddField1780370888979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "CoverImage" character varying(800)`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "cover_image" character varying(800)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "cover_image"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "cover_image" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "CoverImage"`);
    }

}
