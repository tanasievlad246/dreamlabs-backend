import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerInputType {
  @Field(() => String)
  name: string;
}
