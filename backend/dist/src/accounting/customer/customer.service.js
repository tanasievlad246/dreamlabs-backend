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
exports.CustomerService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./customer.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
let CustomerService = class CustomerService {
    constructor(customerRepo) {
        this.customerRepo = customerRepo;
    }
    async createOne(customer) {
        return await this.customerRepo.save(customer);
    }
    async findAll() {
        return await this.customerRepo.find({
            relations: ['invoices'],
        });
    }
    async findOne(id) {
        const customer = await this.customerRepo.findOne({
            where: {
                id,
            },
            relations: ['invoices'],
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found', {
                description: 'Customer not found',
                cause: {
                    arguments,
                },
            });
        }
        return customer;
    }
    async deleteOne(id) {
        return await this.customerRepo.delete({
            id,
        });
    }
    async updateOne(id, updatedCustomer) {
        const currentCustomer = await this.findOne(id);
        if (!currentCustomer) {
            throw new common_1.NotFoundException('Customer not found', {
                description: 'Customer not found',
                cause: {
                    arguments,
                },
            });
        }
        const _updatedCustomer = this.customerRepo.merge(currentCustomer, updatedCustomer);
        return _updatedCustomer;
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
//# sourceMappingURL=customer.service.js.map