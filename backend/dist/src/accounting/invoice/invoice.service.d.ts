import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { ProjectService } from '../project/project.service';
import { CreateInvoiceInput } from './dto/invoice.input';
import { Invoice } from './invoice.entity';
import { UpdateInvoiceInput } from './dto/update-invoice-input';
import { AssignInvoiceToCustomerInput, AssignInvoiceToProjetInput } from './dto/assign-invoice.input';
import { AccountingService } from '../types';
export declare class InvoiceService implements AccountingService<Invoice> {
    private invoiceRepo;
    private readonly customerService;
    private readonly projectService;
    private readonly dataSource;
    constructor(invoiceRepo: Repository<Invoice>, customerService: CustomerService, projectService: ProjectService, dataSource: DataSource);
    findAll(): Promise<Invoice[]>;
    createOne(inv: CreateInvoiceInput): Promise<Invoice>;
    assignInvoiceToProject(assignInvoiceToProjectInput: AssignInvoiceToProjetInput): Promise<Invoice>;
    assignInvoiceToCustomer(assignInvoiceToCustomerInput: AssignInvoiceToCustomerInput): Promise<Invoice>;
    deleteOne(id: number): Promise<DeleteResult>;
    updateOne(id: number, upadtedInvoice: UpdateInvoiceInput): Promise<Invoice>;
    findOne(id: number): Promise<Invoice>;
    markInvociePaid(id: number): Promise<Invoice>;
    markInvoiceUnpaid(id: number): Promise<Invoice>;
    generateStornoInvoice(id: number): Promise<Invoice>;
}
