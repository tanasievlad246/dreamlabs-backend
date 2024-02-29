import { Customer } from './customer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCustomerInput } from './dto/customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { AccountingService } from '../types';
export declare class CustomerService implements AccountingService<Customer> {
    private readonly customerRepo;
    constructor(customerRepo: Repository<Customer>);
    createOne(customer: CreateCustomerInput): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findOne(id: string): Promise<Customer>;
    deleteOne(id: string): Promise<DeleteResult>;
    updateOne(id: string, updatedCustomer: UpdateCustomerInput): Promise<Customer>;
}
