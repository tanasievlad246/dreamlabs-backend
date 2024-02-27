import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCustomerInput } from './dto/customer.input';
import { NotFoundError } from 'rxjs';
import { UpdateCustomerInput } from './dto/update-customer.input';

export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  async createOne(customer: CreateCustomerInput): Promise<Customer> {
    return await this.customerRepo.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepo.find();
  }

  async findOne(id: string): Promise<Customer> {
    return await this.customerRepo.findOne({
      where: {
        id,
      },
    });
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.customerRepo.delete({
      id,
    });
  }

  async update(
    id: string,
    updatedCustomer: UpdateCustomerInput,
  ): Promise<Customer> {
    const currentCustomer = await this.findOne(id);

    if (!currentCustomer) {
      throw new NotFoundError('Customer not found');
    }

    const _updatedCustomer = this.customerRepo.merge(
      currentCustomer,
      updatedCustomer,
    );
    return _updatedCustomer;
  }
}
