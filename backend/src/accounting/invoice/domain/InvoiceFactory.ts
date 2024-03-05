import Currency from '../../../common/enums/currency.enum';
import { Invoice, InvoiceProps } from './Invoice';
import { Invoice as InvoiceEntity } from '../domain/invoice.entity';
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

  reconstitute(properties: InvoiceProps): InvoiceEntity {
    return this.eventPublisher.mergeObjectContext(new Invoice(properties));
  }

  modelToEntity(model: Invoice): Invoice {
    const properties = JSON.parse(JSON.stringify(model)) as InvoiceProps;
    return {
      ...properties,
    };
  }

  entityToModel(entity: InvoiceEntity): Invoice {
    return this.reconstitute({
      amount: entity.amount,
      currency: Currency[entity.currency] as Currency,
      paymentTerm: entity.paymentTerm,
      description: entity.description,
      isPaid: entity.isPaid,
      customer: entity.customer,
      project: entity.project,
      id: entity.id,
    });
  }
}
