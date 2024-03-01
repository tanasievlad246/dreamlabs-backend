import { Customer } from './customer.entity';
import { CustomerIdInput } from './dto/customer-id.input';
import { CreateCustomerInput } from './dto/customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

export interface ICustomerResolver {
  findAllCustomers(): Promise<Customer[]>;
  findOneCustomer(customerIdInput: CustomerIdInput): Promise<Customer>;
  createOneCustomer(
    createCustomerInput: CreateCustomerInput,
  ): Promise<Customer>;
  updateOneCustomer(
    updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer>;
  deleteOneCustomer(customerIdInput: CustomerIdInput): Promise<boolean>;
}
