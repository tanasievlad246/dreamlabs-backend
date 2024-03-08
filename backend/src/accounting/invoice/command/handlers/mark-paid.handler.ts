import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MarkInvoiceAsPaidCommand } from '../commands/mark-invoice-paid.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../domain/invoice.entity';
import { Repository } from 'typeorm';
import { InvoiceFactory } from '../../domain/InvoiceFactory';

@CommandHandler(MarkInvoiceAsPaidCommand)
export class MarkInvoiceAsPaidHandler implements ICommandHandler {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly invoiceFactory: InvoiceFactory,
  ) {}

  async execute(command: any): Promise<Invoice> {
    const invoiceEntity = await this.invoiceRepository.findOneBy({
      id: command.invoiceId,
    });

    if (!invoiceEntity) {
      throw new Error('Invoice not found');
    }

    const invoice = this.invoiceFactory.entityToModel(invoiceEntity);

    invoice.markAsPaid();
    invoice.commit();

    return await this.invoiceRepository.save(
      this.invoiceFactory.modelToEntity(invoice),
    );
  }
}
