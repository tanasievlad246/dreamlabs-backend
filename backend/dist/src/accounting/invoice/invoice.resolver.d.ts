import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceInput } from './dto/invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice-input';
import { InvoiceIdInput } from './dto/invoice-id.input';
export declare class InvoiceResolver {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    findAllInvoices(): Promise<Invoice[]>;
    createInvoice(invoiceInputType: CreateInvoiceInput): Promise<Invoice>;
    findOneInvoice(updatedInvoice: UpdateInvoiceInput): Promise<Invoice>;
    deleteOneInvoice(updatedInvoice: UpdateInvoiceInput): Promise<boolean>;
    updateOneInvoice(updatedInvoice: UpdateInvoiceInput): Promise<Invoice>;
    markOneInvoiceAsPaid(markInvoicePaidInput: InvoiceIdInput): Promise<Invoice>;
    markOneInvoiceAsUnpaid(markInvoiceUnpaidInput: InvoiceIdInput): Promise<Invoice>;
    generateOneStornoInvoice(generateInvoiceStornoInput: InvoiceIdInput): Promise<Invoice>;
}
