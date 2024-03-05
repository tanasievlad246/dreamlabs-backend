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
        id: null,
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

  modelToEntity(model: Invoice): Invoice {
    const properties = JSON.parse(JSON.stringify(model)) as InvoiceProps;
    return {
      ...properties,
      id: model.id,
    } as Invoice;
  }

  entityToModel(entity: InvoiceEntity): Invoice {
    return this.reconstitute({
      ...entity,
      id: entity.id,
      currency: Currency[entity.currency] as Currency,
      storno: entity.storno ? this.entityToModel(entity.storno) : null,
    });
  }
}
