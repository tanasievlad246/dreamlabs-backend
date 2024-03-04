import { DeleteResult } from 'typeorm';
import { CreateCustomerInput } from './customer/dto/customer.input';
import { CreateProjectInput } from './project/dto/project.input';
import { CreateInvoiceInput } from './invoice/dto/invoice.input';
import { UpdateCustomerInput } from './customer/dto/update-customer.input';
import { UpdateProjectInput } from './project/dto/update-project.input';
import { UpdateInvoiceInput } from './invoice/dto/update-invoice-input';
import { Invoice } from './invoice/invoice.entity';
import { Customer } from './customer/customer.entity';
import { Project } from './project/project.entity';
import {
  AssignInvoiceToCustomerInput,
  AssignInvoiceToProjetInput,
} from './invoice/dto/assign-invoice.input';

export interface AccountingService<T extends Project | Customer> {
  findAll(): Promise<T[]>;
  createOne(input: CreateCustomerInput | CreateProjectInput): Promise<T>;
  findOne(id: string): Promise<T>;
  deleteOne(id: string): Promise<DeleteResult>;
  updateOne(
    id: string,
    input: UpdateCustomerInput | UpdateProjectInput,
  ): Promise<T>;
}

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
