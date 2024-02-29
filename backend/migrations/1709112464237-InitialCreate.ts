import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCreate1709112464237 implements MigrationInterface {
    name = 'InitialCreate1709112464237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."invoices_currency_enum" AS ENUM('EUR', 'USD', 'CAD', 'ZAF', 'GBP', 'SEK')`);
        await queryRunner.query(`CREATE SEQUENCE "invoices_seq" START 1337`);
        await queryRunner.query(`CREATE TABLE "invoices" ("id" INTEGER NOT NULL DEFAULT nextval('invoices_seq'::regclass), "description" character varying, "amount" integer NOT NULL, "currency" "public"."invoices_currency_enum" NOT NULL, "paymentTerm" date NOT NULL DEFAULT ('now'::text)::date, "isPaid" boolean NOT NULL DEFAULT false, "stornoId" integer, "customerId" uuid, "projectId" uuid, CONSTRAINT "REL_96faaea0a15066904346f4cc38" UNIQUE ("stornoId"), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_96faaea0a15066904346f4cc38c" FOREIGN KEY ("stornoId") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_1df049f8943c6be0c1115541efb" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_20d900c6b7f2de7faa4d214d64d" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_20d900c6b7f2de7faa4d214d64d"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_1df049f8943c6be0c1115541efb"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_96faaea0a15066904346f4cc38c"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TYPE "public"."invoices_currency_enum"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
