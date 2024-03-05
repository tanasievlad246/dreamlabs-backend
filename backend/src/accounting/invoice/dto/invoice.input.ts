import Currency from '../../../common/enums/currency.enum';
import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

@InputType()
export class CreateInvoiceInput {
  @IsOptional()
  @IsString({
    message: 'The description needs to be text',
  })
  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 4 })
  amount: number;

  @IsEnum(Currency)
  @Field(() => Currency)
  currency: Currency;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  customerId: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  projectId: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  @Field(() => String)
  paymentTerm: string;
}
