import { MigrationInterface, QueryRunner } from 'typeorm';

export class Invoices1708962855659 implements MigrationInterface {
  name = 'Invoices1708962855659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE "invoices" START WITH 1337`);
    await queryRunner.query(
      `CREATE TYPE "public"."invoices_currency_enum" AS ENUM('EUR', 'USD', 'CAD', 'ZAF', 'GBP', 'SEK')`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoices" ("id" integer NOT NULL, "description" character varying, "storno" boolean NOT NULL, "amount" integer NOT NULL, "currency" "public"."invoices_currency_enum" NOT NULL, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invoices"`);
    await queryRunner.query(`DROP TYPE "public"."invoices_currency_enum"`);
  }
}
