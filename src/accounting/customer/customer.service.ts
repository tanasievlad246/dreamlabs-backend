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
    try {
      return await this.customerRepo.save(customer);
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          stack: error.stack,
          arguments,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Customer[]> {
    try {
      return await this.customerRepo.find({
        relations: ['invoices']
      });
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          stack: error.stack,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Customer> {
    try {
      const customer = await this.customerRepo.findOne({
        where: {
          id,
        },
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          {
            message: error.message,
            stack: error.stack,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    try {
      return await this.customerRepo.delete({
        id,
      });
    } catch (error) {
      throw new HttpException(
        {
          stack: error.stack,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updatedCustomer: UpdateCustomerInput,
  ): Promise<Customer> {
    try {
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException(
          {
            message: error.message,
            stack: error.stack,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
