import { Module } from '@nestjs/common';
import { InvoiceServiceImpl } from './invoice/invoice.service';
import { InvoiceResolver } from './invoice/invoice.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice/domain/invoice.entity';
import { Customer } from './customer/customer.entity';
import { Project } from './project/project.entity';
import { ProjectService } from './project/project.service';
import { ProjectResolver } from './project/project.resolver';
import { CustomerService } from './customer/customer.service';
import { CustomerResolver } from './customer/customer.resolver';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { InvoiceCreateEventHandler } from './invoice/event/InvoiceCreatedEventHandler';
import { InvoiceFactory } from './invoice/domain/InvoiceFactory';
import { CreateInvoiceHandler } from './invoice/command/handlers/CreateInvoiceHandler';
import { InvoiceCQRSServiceImpl } from './invoice/invoice-cqrs.service';

const EventHandlers = [InvoiceCreateEventHandler];
const CommandHandlers = [CreateInvoiceHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Invoice, Customer, Project])],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    InvoiceServiceImpl,
    InvoiceResolver,
    ProjectService,
    ProjectResolver,
    CustomerService,
    CustomerResolver,
    InvoiceCQRSServiceImpl,
    ...EventHandlers,
    ...CommandHandlers,
    InvoiceFactory,
  ],
})
export class AccountingModule {}
