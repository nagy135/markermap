import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecordDateField1649455271204 implements MigrationInterface {
  tableName = 'records';
  columnName = 'date';

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE ${this.tableName} ADD ${this.columnName} TIMESTAMP`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE ${this.tableName} DROP COLUMN ${this.columnName}`
    );
  }
}
