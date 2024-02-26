import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice/invoice.service';
import { InvoiceResolver } from './invoice/invoice.resolver';

@Module({
  providers: [InvoiceService, InvoiceResolver],
})
export class AccountingModule {}
