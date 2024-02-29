"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingModule = void 0;
const common_1 = require("@nestjs/common");
const invoice_service_1 = require("./invoice/invoice.service");
const invoice_resolver_1 = require("./invoice/invoice.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const invoice_entity_1 = require("./invoice/invoice.entity");
const customer_entity_1 = require("./customer/customer.entity");
const project_entity_1 = require("./project/project.entity");
const project_service_1 = require("./project/project.service");
const project_resolver_1 = require("./project/project.resolver");
const customer_service_1 = require("./customer/customer.service");
const customer_resolver_1 = require("./customer/customer.resolver");
const logging_interceptor_1 = require("../common/interceptors/logging.interceptor");
const core_1 = require("@nestjs/core");
let AccountingModule = class AccountingModule {
};
exports.AccountingModule = AccountingModule;
exports.AccountingModule = AccountingModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([invoice_entity_1.Invoice, customer_entity_1.Customer, project_entity_1.Project])],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            invoice_service_1.InvoiceService,
            invoice_resolver_1.InvoiceResolver,
            project_service_1.ProjectService,
            project_resolver_1.ProjectResolver,
            customer_service_1.CustomerService,
            customer_resolver_1.CustomerResolver,
        ],
    })
], AccountingModule);
//# sourceMappingURL=accounting.module.js.map