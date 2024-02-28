import { MigrationInterface, QueryRunner } from 'typeorm';

export class AmountUpdate1709128406801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "invoices" ALTER COLUMN amount TYPE DECIMAL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "invoices" ALTER COLUMN amount TYPE INTEGER
        `);
  }
}
