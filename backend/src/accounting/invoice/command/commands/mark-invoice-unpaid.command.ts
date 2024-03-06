import { ICommand } from '@nestjs/cqrs';

export class MarkInvoiceAsUnpaid implements ICommand {
  constructor(readonly invoiceId: number) {}
}
