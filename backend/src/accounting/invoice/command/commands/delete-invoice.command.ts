import { ICommand } from '@nestjs/cqrs';

export class DeleteInvoiceCommand implements ICommand {
  constructor(readonly invoiceId: number) {}
}
