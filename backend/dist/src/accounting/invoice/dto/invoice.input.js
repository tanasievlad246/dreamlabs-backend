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
exports.CreateInvoiceInput = void 0;
const currency_enum_1 = require("../../../common/enums/currency.enum");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateInvoiceInput = class CreateInvoiceInput {
};
exports.CreateInvoiceInput = CreateInvoiceInput;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: 'The description needs to be text',
    }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 4 }),
    __metadata("design:type", Number)
], CreateInvoiceInput.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(currency_enum_1.default),
    (0, graphql_1.Field)(() => currency_enum_1.default),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'date must be in YYYY-MM-DD format',
    }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateInvoiceInput.prototype, "paymentDate", void 0);
exports.CreateInvoiceInput = CreateInvoiceInput = __decorate([
    (0, graphql_1.InputType)()
], CreateInvoiceInput);
//# sourceMappingURL=invoice.input.js.map