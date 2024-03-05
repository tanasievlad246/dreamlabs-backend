import Currency from '../../../common/enums/currency.enum';
import { Invoice, InvoiceProps } from './Invoice';
import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

type CreateInvoiceOptions = Readonly<{
  amount: number;
  currency: Currency;
  paymentTerm: Date;
}>;

export class InvoiceFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(createInvoiceOptions: CreateInvoiceOptions): Invoice {
    return this.eventPublisher.mergeObjectContext(
      new Invoice({
        ...createInvoiceOptions,
        customer: null,
        project: null,
        description: null,
        isPaid: false,
        storno: null,
      }),
    );
  }

  reconstitute(properties: InvoiceProps): Invoice {
    return this.eventPublisher.mergeObjectContext(new Invoice(properties));
  }
}
