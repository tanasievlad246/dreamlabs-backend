import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from '../invoice/domain/invoice.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({
  name: 'projects',
})
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column({
    nullable: false,
  })
  @Field(() => String)
  name: string;
  @OneToMany(() => Invoice, (inv) => inv.project)
  @Field(() => [Invoice])
  invoices: Invoice[];
}
