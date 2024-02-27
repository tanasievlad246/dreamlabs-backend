import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateCustomerInput } from './customer.input';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @Field(() => String)
  id: string;
}
