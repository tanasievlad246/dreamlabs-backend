import Currency from '@/common/enums/currency.enum';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Project } from '../project/project.entity';

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
  @Field({
    nullable: true,
  })
  @Column({
    type: 'boolean',
    default: false,
  })
  storno?: boolean;
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
  @Column({
    nullable: false,
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  @Field(() => Date)
  paymentTerm: Date;
  @Field(() => Customer)
  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;
  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.invoices)
  project: Project;
}
