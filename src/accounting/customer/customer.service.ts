import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCustomerInput } from './dto/customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import {
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';

export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  async createOne(customer: CreateCustomerInput): Promise<Customer> {
    return await this.customerRepo.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return await this.customerRepo.find({
      relations: ['invoices'],
    });
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepo.findOne({
      where: {
        id,
      },
      relations: ['invoices'],
    });

    if (!customer) {
      throw new NotFoundException('Customer not found', {
        description: 'Customer not found',
        cause: {
          arguments,
        },
      });
    }

    return customer;
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
      throw new NotFoundException('Customer not found', {
        description: 'Customer not found',
        cause: {
          arguments,
        },
      });
    }

    const _updatedCustomer = this.customerRepo.merge(
      currentCustomer,
      updatedCustomer,
    );
    return _updatedCustomer;
  }
}
