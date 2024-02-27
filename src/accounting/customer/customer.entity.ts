import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from '../invoice/invoice.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({
  name: 'customers',
})
@ObjectType()
export class Customer {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(() => String)
  @Column({
    nullable: false,
  })
  name: string;
  @Field(() => [Invoice])
  @OneToMany(() => Invoice, (inv) => inv.customer)
  invoices: Invoice[];
}
