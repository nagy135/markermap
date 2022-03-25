import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntities1637577081110 implements MigrationInterface {
  name = 'CreateEntities1637577081110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "records" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lat" character varying NOT NULL, "lon" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid, CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "record_id" uuid, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_1871c973c51f0e22988d72ae6ba" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_1871c973c51f0e22988d72ae6ba"`
    );
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "records"`);
  }
}
