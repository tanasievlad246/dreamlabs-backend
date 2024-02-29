"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: './.env',
});
exports.config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    logging: process.env.NODE_ENV !== 'production',
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['migrations/*.{ts,js}'],
};
exports.default = new typeorm_1.DataSource(exports.config);
//# sourceMappingURL=typeOrm.config.js.map