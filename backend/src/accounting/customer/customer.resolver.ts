import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CreateCustomerInput } from './dto/customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { CustomerIdInput } from './dto/customer-id.input';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ICustomerResolver } from './customer-resolver.interface';

@Resolver(() => Customer)
export class CustomerResolver implements ICustomerResolver {
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
    @Args('findOneCustomerInput') customerIdInput: CustomerIdInput,
  ): Promise<Customer> {
    return await this.customerService.findOne(customerIdInput.id);
  }

  @Mutation(() => Customer)
  async createOneCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return await this.customerService.createOne(createCustomerInput);
  }

  @Mutation(() => Customer)
  async updateOneCustomer(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return await this.customerService.updateOne(
      updateCustomerInput.id,
      updateCustomerInput,
    );
  }

  @Mutation(() => Boolean)
  async deleteOneCustomer(
    @Args('deleteOneCustomerInput') customerIdInput: CustomerIdInput,
  ): Promise<boolean> {
    const result = await this.customerService.deleteOne(customerIdInput.id);

    if (result.affected > 0) {
      return true;
    }

    return false;
  }
}
