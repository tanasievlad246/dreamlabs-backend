import Currency from '@/common/enums/currency.enum';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Invoice {
  @Field(() => Int)
  id: number;
  @Field()
  description: string;
  @Field()
  storno: boolean;
  @Field(() => Float)
  amount: number;
  @Field(() => Currency)
  currency: Currency;
}
