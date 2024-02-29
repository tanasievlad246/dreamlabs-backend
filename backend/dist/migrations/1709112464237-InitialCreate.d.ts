import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialCreate1709112464237 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
