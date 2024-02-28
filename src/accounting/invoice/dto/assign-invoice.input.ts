import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AssignInvoiceToProjetInput {
  @Field(() => Int)
  invoiceId: number;

  @Field(() => String)
  projectId: string;
}

@InputType()
export class AssignInvoiceToCustomerInput {
  @Field(() => Int)
  invoiceId: number;

  @Field(() => String)
  customerId: string;
}
