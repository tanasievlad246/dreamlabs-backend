import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerIdInput {
  @Field(() => String)
  id: string;
}
