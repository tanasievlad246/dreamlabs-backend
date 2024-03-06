import { ICommand } from '@nestjs/cqrs';

export class MarkInvoiceAsPaidCommand implements ICommand {
  constructor(readonly invoiceId: number) {}
}
