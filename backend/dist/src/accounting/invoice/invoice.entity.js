"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const currency_enum_1 = require("../../common/enums/currency.enum");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../customer/customer.entity");
const project_entity_1 = require("../project/project.entity");
let Invoice = class Invoice {
};
exports.Invoice = Invoice;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Invoice.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Invoice.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({
        nullable: true,
    }),
    (0, typeorm_1.OneToOne)(() => Invoice, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Invoice)
], Invoice.prototype, "storno", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Invoice.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => currency_enum_1.default),
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'enum',
        enum: currency_enum_1.default,
    }),
    __metadata("design:type", String)
], Invoice.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        type: 'date',
        default: () => 'CURRENT_DATE',
    }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], Invoice.prototype, "paymentTerm", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
    }),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Invoice.prototype, "isPaid", void 0);
__decorate([
    (0, graphql_1.Field)(() => customer_entity_1.Customer, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.invoices, {
        nullable: true,
    }),
    __metadata("design:type", customer_entity_1.Customer)
], Invoice.prototype, "customer", void 0);
__decorate([
    (0, graphql_1.Field)(() => project_entity_1.Project, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.invoices, { nullable: true }),
    __metadata("design:type", project_entity_1.Project)
], Invoice.prototype, "project", void 0);
exports.Invoice = Invoice = __decorate([
    (0, typeorm_1.Entity)({
        name: 'invoices',
    }),
    (0, graphql_1.ObjectType)()
], Invoice);
//# sourceMappingURL=invoice.entity.js.map