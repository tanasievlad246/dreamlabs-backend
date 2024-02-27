import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateInvoiceInput } from './invoice.input';

@InputType()
export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) {
  @Field(() => Int)
  id: number;
}
