import { DeleteResult } from 'typeorm';
import { CreateCustomerInput } from './customer/dto/customer.input';
import { CreateProjectInput } from './project/dto/project.input';
import { CreateInvoiceInput } from './invoice/dto/invoice.input';
import { UpdateCustomerInput } from './customer/dto/update-customer.input';
import { UpdateProjectInput } from './project/dto/update-project.input';
import { UpdateInvoiceInput } from './invoice/dto/update-invoice-input';

export interface AccountingService<T> {
  findAll(): Promise<T[]>;
  createOne(
    input: CreateCustomerInput | CreateProjectInput | CreateInvoiceInput,
  ): Promise<T>;
  findOne(id: string): Promise<T>;
  deleteOne(id: string): Promise<DeleteResult>;
  updateOne(
    id: string,
    input: UpdateCustomerInput | UpdateProjectInput | UpdateInvoiceInput,
  ): Promise<T>;
}
