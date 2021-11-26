import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAltitudeToRecord1637940711821 implements MigrationInterface {
  tableName = 'records';
  columnName = 'altitude';

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE ${this.tableName} ADD ${this.columnName} numeric DEFAULT 0`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE ${this.tableName} DROP COLUMN ${this.columnName}`
    );
  }
}
