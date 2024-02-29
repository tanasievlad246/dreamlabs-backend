"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const accounting_module_1 = require("./accounting/accounting.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const core_1 = require("@nestjs/core");
const gql_exception_filter_1 = require("./common/filters/gql-exception.filter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot({
                format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike('DreamlabsBackend', {
                    colors: false,
                    prettyPrint: true,
                })),
                transports: [
                    new winston.transports.File({ filename: 'error.log', level: 'error' }),
                    new winston.transports.File({ filename: 'warn.log', level: 'warning' }),
                    new winston.transports.File({ filename: 'info.log', level: 'info' }),
                    new winston.transports.File({ filename: 'http.log', level: 'http' }),
                ],
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                context: ({ req, res }) => ({ req, res }),
                formatError: (err) => {
                    return {
                        message: err.message,
                        status: err.extensions.status || 500,
                        path: err.path,
                        originalError: err.extensions.originalError,
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                password: process.env.DB_PASS,
                username: process.env.DB_USER,
                database: process.env.DB_NAME,
                logging: process.env.NODE_ENV !== 'production',
                entities: ['dist/**/*.entity.{ts,js}'],
            }),
            accounting_module_1.AccountingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: gql_exception_filter_1.GraphqlExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map