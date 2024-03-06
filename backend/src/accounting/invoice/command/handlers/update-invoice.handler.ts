import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInvoiceCommand } from '../commands/update-invoice.command';
import { Invoice } from '../../domain/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceFactory } from '../../domain/InvoiceFactory';
import { NotFoundException } from '@nestjs/common';
import { UpdateInvoiceProps } from '../../domain/Invoice';
import * as moment from 'moment';

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
    console.log(invoiceEntity);
    console.log(invoice);
    console.log(moment(command.paymentTerm).toDate());
    const invoiceProps: UpdateInvoiceProps = {
      amount: command.amount || invoice.amount,
      currency: command.currency || invoice.currency,
      paymentTerm: moment(command.paymentTerm, 'YYYY-MM-DD', true).isValid()
        ? moment(command.paymentTerm, 'YYYY-MM-DD').toDate()
        : invoice.paymentTerm,
      description: command.description || invoice.description,
      isPaid: command.isPaid || invoice.isPaid,
    };

    invoice.update(invoiceProps);

    return await this.invoiceRepository.save(
      this.invoiceFactory.modelToEntity(invoice),
    );
  }
}
