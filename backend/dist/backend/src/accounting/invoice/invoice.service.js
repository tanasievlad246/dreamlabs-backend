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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_service_1 = require("../customer/customer.service");
const project_service_1 = require("../project/project.service");
const invoice_entity_1 = require("./invoice.entity");
let InvoiceService = class InvoiceService {
    constructor(invoiceRepo, customerService, projectService, dataSource) {
        this.invoiceRepo = invoiceRepo;
        this.customerService = customerService;
        this.projectService = projectService;
        this.dataSource = dataSource;
    }
    async findAll() {
        return await this.invoiceRepo.find({
            relations: ['customer', 'project', 'storno'],
        });
    }
    async createOne(inv) {
        const invoice = this.invoiceRepo.create(inv);
        if (inv.projectId) {
            const project = await this.projectService.findOne(inv.projectId);
            invoice.project = project;
        }
        if (inv.customerId) {
            const customer = await this.customerService.findOne(inv.customerId);
            invoice.customer = customer;
        }
        return await this.invoiceRepo.save(invoice);
    }
    async assignInvoiceToProject(assignInvoiceToProjectInput) {
        const { invoiceId, projectId } = assignInvoiceToProjectInput;
        const project = await this.projectService.findOne(projectId);
        const invoice = await this.findOne(invoiceId);
        invoice.project = project;
        return await this.invoiceRepo.save(invoice);
    }
    async assignInvoiceToCustomer(assignInvoiceToCustomerInput) {
        const { invoiceId, customerId } = assignInvoiceToCustomerInput;
        const customer = await this.customerService.findOne(customerId);
        const invoice = await this.findOne(invoiceId);
        invoice.customer = customer;
        return await this.invoiceRepo.save(invoice);
    }
    async deleteOne(id) {
        return await this.invoiceRepo.delete(id);
    }
    async updateOne(id, upadtedInvoice) {
        const invoice = await this.invoiceRepo.findOne({
            where: {
                id,
            },
        });
        if (!invoice) {
            throw new common_1.NotFoundException('Invoice not found');
        }
        const newInvoice = this.invoiceRepo.merge(invoice, upadtedInvoice);
        return await this.invoiceRepo.save(newInvoice);
    }
    async findOne(id) {
        const invoice = await this.invoiceRepo.findOne({
            where: {
                id,
            },
        });
        if (!invoice) {
            throw new common_1.NotFoundException('Invoice not found');
        }
        return invoice;
    }
    async markInvociePaid(id) {
        const invoice = await this.findOne(id);
        invoice.isPaid = true;
        return await this.invoiceRepo.save(invoice);
    }
    async markInvoiceUnpaid(id) {
        const invoice = await this.findOne(id);
        invoice.isPaid = false;
        return await this.invoiceRepo.save(invoice);
    }
    async generateStornoInvoice(id) {
        let stornoInvoie;
        await this.dataSource.transaction(async (manager) => {
            const invRepo = manager.getRepository(invoice_entity_1.Invoice);
            const invoice = await invRepo.findOne({
                where: { id },
                relations: ['project', 'customer'],
            });
            if (!invoice) {
                throw new common_1.NotFoundException('Invoice not found');
            }
            const storno = invRepo.create({
                description: invoice.description,
                currency: invoice.currency,
                isPaid: invoice.isPaid,
                paymentTerm: invoice.paymentTerm,
                project: invoice.project,
                customer: invoice.customer,
                amount: 0 - invoice.amount,
                storno: invoice,
            });
            stornoInvoie = await invRepo.save(storno);
            invoice.storno = storno;
            await invRepo.save(invoice);
        });
        return stornoInvoie;
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        customer_service_1.CustomerService,
        project_service_1.ProjectService,
        typeorm_2.DataSource])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map