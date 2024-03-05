import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCustomerInput } from './dto/customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import { InvoiceServiceImpl } from '../invoice/invoice.service';
import { AccountingService } from '../accounting-service.interface';

export class CustomerService implements AccountingService<Customer> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @Inject(forwardRef(() => InvoiceServiceImpl))
    private readonly invoiceService: InvoiceServiceImpl,
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
          id,
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

  async updateOne(
    id: string,
    updatedCustomer: UpdateCustomerInput,
  ): Promise<Customer> {
    const currentCustomer = await this.findOne(id);

    if (!currentCustomer) {
      throw new NotFoundException('Customer not found', {
        description: 'Customer not found',
        cause: {
          id,
        },
      });
    }

    const _updatedCustomer = this.customerRepo.merge(
      currentCustomer,
      updatedCustomer,
    );
    return _updatedCustomer;
  }

  async addInvoice(projectId: string, invoiceId: number): Promise<Customer> {
    const customer = await this.findOne(projectId);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const invoice = await this.invoiceService.findOne(invoiceId);

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    customer.invoices.push(invoice);
    return this.customerRepo.save(customer);
  }
}
