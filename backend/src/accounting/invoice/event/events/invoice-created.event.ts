import { IEvent } from '@nestjs/cqrs';
import { Invoice } from '../../domain/invoice.entity';

export class InvoiceCreatedEvent implements IEvent {
  constructor(readonly invoice: Invoice) {}
}
