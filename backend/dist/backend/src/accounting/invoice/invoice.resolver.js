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
exports.InvoiceResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const invoice_entity_1 = require("./invoice.entity");
const invoice_service_1 = require("./invoice.service");
const invoice_input_1 = require("./dto/invoice.input");
const update_invoice_input_1 = require("./dto/update-invoice-input");
const invoice_id_input_1 = require("./dto/invoice-id.input");
let InvoiceResolver = class InvoiceResolver {
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    async findAllInvoices() {
        return await this.invoiceService.findAll();
    }
    async createInvoice(invoiceInputType) {
        return this.invoiceService.createOne(invoiceInputType);
    }
    async findOneInvoice(updatedInvoice) {
        return await this.invoiceService.findOne(updatedInvoice.id);
    }
    async deleteOneInvoice(updatedInvoice) {
        const result = await this.invoiceService.deleteOne(updatedInvoice.id);
        if (result.affected > 0) {
            return true;
        }
        return false;
    }
    async updateOneInvoice(updatedInvoice) {
        return await this.invoiceService.updateOne(updatedInvoice.id, updatedInvoice);
    }
    async markOneInvoiceAsPaid(markInvoicePaidInput) {
        return this.invoiceService.markInvociePaid(markInvoicePaidInput.id);
    }
    async markOneInvoiceAsUnpaid(markInvoiceUnpaidInput) {
        return this.invoiceService.markInvoiceUnpaid(markInvoiceUnpaidInput.id);
    }
    async generateOneStornoInvoice(generateInvoiceStornoInput) {
        return await this.invoiceService.generateStornoInvoice(generateInvoiceStornoInput.id);
    }
};
exports.InvoiceResolver = InvoiceResolver;
__decorate([
    (0, graphql_1.Query)(() => [invoice_entity_1.Invoice]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "findAllInvoices", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('createInvoiceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invoice_input_1.CreateInvoiceInput]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "createInvoice", null);
__decorate([
    (0, graphql_1.Query)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('findOneInvoiceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_invoice_input_1.UpdateInvoiceInput]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "findOneInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('deleteOneInvoiceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_invoice_input_1.UpdateInvoiceInput]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "deleteOneInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('updateInvoiceInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_invoice_input_1.UpdateInvoiceInput]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "updateOneInvoice", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('markInvoicePaidInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invoice_id_input_1.InvoiceIdInput]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "markOneInvoiceAsPaid", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('markInvoicePaidInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invoice_id_input_1.InvoiceIdInput]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "markOneInvoiceAsUnpaid", null);
__decorate([
    (0, graphql_1.Mutation)(() => invoice_entity_1.Invoice),
    __param(0, (0, graphql_1.Args)('generateInvoiceStornoInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invoice_id_input_1.InvoiceIdInput]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "generateOneStornoInvoice", null);
exports.InvoiceResolver = InvoiceResolver = __decorate([
    (0, graphql_1.Resolver)(() => invoice_entity_1.Invoice),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService])
], InvoiceResolver);
//# sourceMappingURL=invoice.resolver.js.map