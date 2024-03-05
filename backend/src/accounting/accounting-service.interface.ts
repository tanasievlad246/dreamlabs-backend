import { DeleteResult } from 'typeorm';
import { Customer } from './customer/customer.entity';
import { CreateCustomerInput } from './customer/dto/customer.input';
import { CreateProjectInput } from './project/dto/project.input';
import { Project } from './project/project.entity';
import { UpdateProjectInput } from './project/dto/update-project.input';
import { UpdateCustomerInput } from './customer/dto/update-customer.input';

export interface AccountingService<T extends Project | Customer> {
  findAll(): Promise<T[]>;
  createOne(input: CreateCustomerInput | CreateProjectInput): Promise<T>;
  findOne(id: string): Promise<T>;
  deleteOne(id: string): Promise<DeleteResult>;
  updateOne(
    id: string,
    input: UpdateCustomerInput | UpdateProjectInput,
  ): Promise<T>;
  addInvoice(projectId: string, invoiceId: number): Promise<T>;
}
