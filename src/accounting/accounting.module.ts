import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice/invoice.service';
import { InvoiceResolver } from './invoice/invoice.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice/invoice.entity';
import { Customer } from './customer/customer.entity';
import { Project } from './project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Customer, Project])],
  providers: [InvoiceService, InvoiceResolver],
})
export class AccountingModule {}
