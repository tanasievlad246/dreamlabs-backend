import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerInput } from './dto/customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { CustomerIdInput } from './dto/customer-id.input';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private readonly customerService: CustomerService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Query(() => [Customer])
  async findAllCustomers(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }

  @Query(() => Customer)
  async findOneCustomer(
    @Args('findOneCustomerInput') findOneCustomerInput: CustomerIdInput,
  ): Promise<Customer> {
    return await this.customerService.findOne(findOneCustomerInput.id);
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return await this.customerService.createOne(createCustomerInput);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return await this.customerService.updateOne(
      updateCustomerInput.id,
      updateCustomerInput,
    );
  }

  @Mutation(() => Boolean)
  async deleteOneCustomer(
    @Args('deleteOneCustomerInput') deleteOneCustomer: UpdateCustomerInput,
  ): Promise<boolean> {
    if (await this.customerService.deleteOne(deleteOneCustomer.id)) {
      return true;
    }

    return false;
  }
}
