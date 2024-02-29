import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerInput } from './dto/customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { CustomerIdInput } from './dto/customer-id.input';
import { Logger } from 'winston';
export declare class CustomerResolver {
    private readonly customerService;
    private readonly logger;
    constructor(customerService: CustomerService, logger: Logger);
    findAllCustomers(): Promise<Customer[]>;
    findOneCustomer(findOneCustomerInput: CustomerIdInput): Promise<Customer>;
    createCustomer(createCustomerInput: CreateCustomerInput): Promise<Customer>;
    updateCustomer(updateCustomerInput: UpdateCustomerInput): Promise<Customer>;
    deleteOneCustomer(deleteOneCustomer: UpdateCustomerInput): Promise<boolean>;
}
