import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkInvoiceAsUnpaidCommand } from '../commands/mark-invoice-unpaid.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../domain/invoice.entity';
import { Repository } from 'typeorm';
import { InvoiceFactory } from '../../domain/InvoiceFactory';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(MarkInvoiceAsUnpaidCommand)
export class MarkInvoiceAsUnpaidHandler
  implements ICommandHandler<MarkInvoiceAsUnpaidCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
    private readonly invoiceFactory: InvoiceFactory,
  ) {}
  async execute(command: MarkInvoiceAsUnpaidCommand): Promise<Invoice> {
    const invoiceEntity = await this.invoiceRepo.findOneBy({
      id: command.invoiceId,
    });

    if (!invoiceEntity) {
      throw new NotFoundException('Invoice not found');
    }

    const invoice = this.invoiceFactory.entityToModel(invoiceEntity);

    invoice.markAsUnpaid();

    return await this.invoiceRepo.save(
      this.invoiceFactory.modelToEntity(invoice),
    );
  }
}
