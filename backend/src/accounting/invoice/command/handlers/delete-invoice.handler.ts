import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteInvoiceCommand } from '../commands/delete-invoice.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../domain/invoice.entity';
import { DeleteResult, Repository } from 'typeorm';

@CommandHandler(DeleteInvoiceCommand)
export class DeleteInvoiceHandler
  implements ICommandHandler<DeleteInvoiceCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepostiory: Repository<Invoice>,
  ) {}
  async execute(command: DeleteInvoiceCommand): Promise<DeleteResult> {
    return await this.invoiceRepostiory.delete(command.invoiceId);
  }
}
