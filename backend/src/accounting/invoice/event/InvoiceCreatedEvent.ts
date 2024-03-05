import { IEvent } from '@nestjs/cqrs';

export class InvoiceCreatedEvent implements IEvent {
  constructor(
    readonly invoiceId: number,
    readonly amount: number,
    readonly currency: string,
    readonly paymentTerm: Date,
  ) {}
}
