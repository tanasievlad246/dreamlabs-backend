import { Invoice } from '../../domain/invoice.entity';

export class MarkInvoiceAsUnpaid {
  constructor(readonly invoice: Invoice) {}
}
