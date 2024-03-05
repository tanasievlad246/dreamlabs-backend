import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../domain/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceCommand } from './createInvoice.command';
import moment from 'moment';
import { InvoiceFactory } from '../domain/InvoiceFactory';
import { InvoiceCreatedEvent } from '../event/InvoiceCreatedEvent';

@CommandHandler(CreateInvoiceCommand)
export class InvoiceCreatedHandler
  implements ICommandHandler<CreateInvoiceCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly invoiceFactory: InvoiceFactory,
  ) {}

  async execute(command: CreateInvoiceCommand) {
    console.log('Command', command);
    const invoice = this.invoiceFactory.create({
      amount: command.amount,
      currency: command.currency,
      paymentTerm: moment(command.paymentTerm).toDate(),
    });

    const savedInvoice = await this.invoiceRepository.save(invoice);

    invoice.commit();
    invoice.apply(
      new InvoiceCreatedEvent(
        savedInvoice.id,
        savedInvoice.amount,
        savedInvoice.currency,
        savedInvoice.paymentTerm,
      ),
    );

    return savedInvoice;
  }
}