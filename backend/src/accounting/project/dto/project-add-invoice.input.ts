import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddInvoiceToProjectInput {
  @Field(() => String)
  projectId: string;
  @Field(() => Int)
  invoiceId: number;
}
