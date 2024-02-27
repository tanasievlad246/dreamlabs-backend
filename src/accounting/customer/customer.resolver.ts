import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { CustomerInputType } from './dto/customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async findAllCustomers(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Args('createCustomerInput') customerInputType: CustomerInputType,
  ): Promise<Customer> {
    return await this.customerService.createOne(customerInputType);
  }
}
