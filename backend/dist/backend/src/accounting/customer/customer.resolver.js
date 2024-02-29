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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const customer_service_1 = require("./customer.service");
const customer_entity_1 = require("./customer.entity");
const customer_input_1 = require("./dto/customer.input");
const update_customer_input_1 = require("./dto/update-customer.input");
const customer_id_input_1 = require("./dto/customer-id.input");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
let CustomerResolver = class CustomerResolver {
    constructor(customerService, logger) {
        this.customerService = customerService;
        this.logger = logger;
    }
    async findAllCustomers() {
        return await this.customerService.findAll();
    }
    async findOneCustomer(findOneCustomerInput) {
        return await this.customerService.findOne(findOneCustomerInput.id);
    }
    async createCustomer(createCustomerInput) {
        return await this.customerService.createOne(createCustomerInput);
    }
    async updateCustomer(updateCustomerInput) {
        return await this.customerService.updateOne(updateCustomerInput.id, updateCustomerInput);
    }
    async deleteOneCustomer(deleteOneCustomer) {
        const result = await this.customerService.deleteOne(deleteOneCustomer.id);
        if (result.affected > 0) {
            return true;
        }
        return false;
    }
};
exports.CustomerResolver = CustomerResolver;
__decorate([
    (0, graphql_1.Query)(() => [customer_entity_1.Customer]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "findAllCustomers", null);
__decorate([
    (0, graphql_1.Query)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('findOneCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_id_input_1.CustomerIdInput]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "findOneCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('createCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_input_1.CreateCustomerInput]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "createCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_entity_1.Customer),
    __param(0, (0, graphql_1.Args)('updateCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_customer_input_1.UpdateCustomerInput]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "updateCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('deleteOneCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_customer_input_1.UpdateCustomerInput]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "deleteOneCustomer", null);
exports.CustomerResolver = CustomerResolver = __decorate([
    (0, graphql_1.Resolver)(() => customer_entity_1.Customer),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [customer_service_1.CustomerService,
        winston_1.Logger])
], CustomerResolver);
//# sourceMappingURL=customer.resolver.js.map