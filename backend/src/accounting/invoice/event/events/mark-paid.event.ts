import { Invoice } from '../../domain/invoice.entity';

export class MarkInvoiceAsPaidEvent {
  constructor(readonly invoice: Invoice) {}
}
