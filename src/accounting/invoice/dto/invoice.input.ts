import Currency from '@/common/enums/currency.enum';
import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
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

  @IsOptional()
  @IsBoolean({
    message: 'The storno value needs to be boolean',
  })
  @Field({ nullable: true })
  storno?: boolean;

  @Field(() => Float)
  @IsNumber()
  amount: number;

  @IsEnum(Currency)
  @Field(() => Currency)
  currency: Currency;

  @IsString()
  @Field(() => String)
  customerId: string;

  @IsString()
  @Field(() => String)
  projectId: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  @Field(() => String)
  paymentDate: string;
}
