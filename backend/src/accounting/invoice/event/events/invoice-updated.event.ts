import { Invoice } from '../../domain/invoice.entity';

export class InvoiceUpdatedEvent {
  constructor(readonly invoice: Invoice) {}
}
