import Currency from '@/common/enums/currency.enum';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Project } from '../project/project.entity';

@Entity({
  name: 'invoices',
})
@ObjectType()
export class Invoice {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column({
    nullable: true,
  })
  description: string;

  @Field({
    nullable: true,
  })
  @OneToOne(() => Invoice)
  storno?: number;

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
  @Field(() => String)
  paymentTerm: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  @Field(() => Boolean)
  isPaid: boolean;

  @Field(() => Customer)
  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;

  @Field(() => Project)
  @ManyToOne(() => Project, (project) => project.invoices)
  project: Project;
}
