import { ICommand } from '@nestjs/cqrs';

export class MarkInvoiceAsUnpaidCommand implements ICommand {
  constructor(readonly invoiceId: number) {}
}
