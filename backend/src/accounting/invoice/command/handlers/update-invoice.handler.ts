import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInvoiceCommand } from '../commands/update-invoice.command';
import { Invoice } from '../../domain/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceFactory } from '../../domain/InvoiceFactory';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateInvoiceCommand)
export class UpdateInvoiceHandler
  implements ICommandHandler<UpdateInvoiceCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly invoiceFactory: InvoiceFactory,
  ) {}

  async execute(command: UpdateInvoiceCommand): Promise<Invoice> {
    const invoiceEntity = await this.invoiceRepository.findOneBy({
      id: command.id,
    });

    if (!invoiceEntity) {
      throw new NotFoundException('Invoice not found');
    }

    const invoice = this.invoiceFactory.entityToModel(invoiceEntity);

    const updatedInvoice = this.invoiceFactory.create({
      amount: command.amount,
      currency: command.currency,
      paymentTerm: new Date(command.paymentTerm),
    });

    updatedInvoice.merge(invoice);

    return await this.invoiceRepository.save(
      this.invoiceFactory.modelToEntity(updatedInvoice),
    );
  }
}
