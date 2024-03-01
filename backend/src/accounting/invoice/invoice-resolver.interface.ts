import { InvoiceIdInput } from './dto/invoice-id.input';
import { CreateInvoiceInput } from './dto/invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice-input';
import { Invoice } from './invoice.entity';

export interface IInvoiceResolver {
  findAllInvoices(): Promise<Invoice[]>;
  createOneInvoice(createInvoiceInput: CreateInvoiceInput): Promise<Invoice>;
  findOneInvoice(invoiceIdInput: InvoiceIdInput): Promise<Invoice>;
  deleteOneInvoice(invoiceIdInput: InvoiceIdInput): Promise<boolean>;
  updateOneInvoice(updateInvoiceInput: UpdateInvoiceInput): Promise<Invoice>;
  markOneInvoiceAsPaid(invoiceIdInput: InvoiceIdInput): Promise<Invoice>;
  markOneInvoiceAsUnpaid(invoiceIdInput: InvoiceIdInput): Promise<Invoice>;
  generateOneStornoInvoice(invoiceIdInput: InvoiceIdInput): Promise<Invoice>;
}
