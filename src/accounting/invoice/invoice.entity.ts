import Currency from '@/common/enums/currency.enum';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'invoices',
})
@ObjectType()
export class Invoice {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;
  @Field()
  @Column({
    nullable: true,
  })
  description: string;
  @Field()
  @Column({
    type: 'boolean',
  })
  storno: boolean;
  @Field(() => Float)
  @Column({
    nullable: false,
  })
  amount: number;
  @Field(() => Currency)
  @Column({
    nullable: false,
    type: 'enum',
    enum: Currency,
  })
  currency: string;
}
