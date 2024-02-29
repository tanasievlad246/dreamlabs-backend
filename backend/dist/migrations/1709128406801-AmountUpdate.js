"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountUpdate1709128406801 = void 0;
class AmountUpdate1709128406801 {
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "invoices" ALTER COLUMN amount TYPE DECIMAL
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "invoices" ALTER COLUMN amount TYPE INTEGER
        `);
    }
}
exports.AmountUpdate1709128406801 = AmountUpdate1709128406801;
//# sourceMappingURL=1709128406801-AmountUpdate.js.map