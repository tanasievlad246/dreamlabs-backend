import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../domain/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceCommand } from '../commands/create-invoice.command';
import { InvoiceFactory } from '../../domain/InvoiceFactory';
import { InvoiceCreatedEvent } from '../../event/events/invoice-created.event';

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceHandler
  implements ICommandHandler<CreateInvoiceCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly invoiceFactory: InvoiceFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateInvoiceCommand): Promise<Invoice> {
    console.log('Command', command);
    const invoice = this.invoiceFactory.create({
      amount: command.amount,
      currency: command.currency,
      paymentTerm: new Date(command.paymentTerm),
    });

    const savedInvoice = await this.invoiceRepository.save(invoice);

    this.eventBus.publish(new InvoiceCreatedEvent(invoice));

    return savedInvoice;
  }
}
