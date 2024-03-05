import { DeleteResult } from 'typeorm';
import { Invoice } from './domain/invoice.entity';
import { CreateInvoiceInput } from './dto/invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice-input';
import {
  AssignInvoiceToCustomerInput,
  AssignInvoiceToProjetInput,
} from './dto/assign-invoice.input';

export interface InvoiceService {
  createOne(input: CreateInvoiceInput): Promise<Invoice>;
  findAll(): Promise<Invoice[]>;
  findOne(id: number): Promise<Invoice>;
  deleteOne(id: number): Promise<DeleteResult>;
  updateOne(id: number, input: UpdateInvoiceInput): Promise<Invoice>;
  markInvoiceAsPaid(id: number): Promise<Invoice>;
  markInvoiceAsUnpaid(id: number): Promise<Invoice>;
  generateStornoInvoice(id: number): Promise<Invoice>;
  assignInvoiceToProject(
    assignInvoiceToProjetInput: AssignInvoiceToProjetInput,
  ): Promise<Invoice>;
  assignInvoiceToCustomer(
    assignInvoiceToCustomerInput: AssignInvoiceToCustomerInput,
  ): Promise<Invoice>;
}
