import { Invoice } from '../../domain/invoice.entity';

export class InvoiceDeletedEvent {
  constructor(readonly invoice: Invoice) {}
}
