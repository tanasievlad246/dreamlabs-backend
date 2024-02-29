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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const invoice_entity_1 = require("../invoice/invoice.entity");
const graphql_1 = require("@nestjs/graphql");
let Customer = class Customer {
};
exports.Customer = Customer;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Customer.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [invoice_entity_1.Invoice]),
    (0, typeorm_1.OneToMany)(() => invoice_entity_1.Invoice, (inv) => inv.customer),
    __metadata("design:type", Array)
], Customer.prototype, "invoices", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)({
        name: 'customers',
    }),
    (0, graphql_1.ObjectType)()
], Customer);
//# sourceMappingURL=customer.entity.js.map