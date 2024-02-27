import Currency from '@/common/enums/currency.enum';
import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
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

  @IsNumber()
  @Field(() => Float)
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

  @IsDateString()
  @Field(() => Date)
  paymentDate: Date;
}
