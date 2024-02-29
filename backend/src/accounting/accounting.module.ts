import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice/invoice.service';
import { InvoiceResolver } from './invoice/invoice.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice/invoice.entity';
import { Customer } from './customer/customer.entity';
import { Project } from './project/project.entity';
import { ProjectService } from './project/project.service';
import { ProjectResolver } from './project/project.resolver';
import { CustomerService } from './customer/customer.service';
import { CustomerResolver } from './customer/customer.resolver';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Customer, Project])],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    InvoiceService,
    InvoiceResolver,
    ProjectService,
    ProjectResolver,
    CustomerService,
    CustomerResolver,
  ],
})
export class AccountingModule {}
