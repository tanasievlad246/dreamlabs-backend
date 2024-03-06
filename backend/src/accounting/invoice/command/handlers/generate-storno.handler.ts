import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateStornoCommand } from '../commands/generate-storno.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../domain/invoice.entity';
import { Repository } from 'typeorm';
import { InvoiceFactory } from '../../domain/InvoiceFactory';
import Currency from '@/common/enums/currency.enum';

@CommandHandler(GenerateStornoCommand)
export class GenerateStornoHandler
  implements ICommandHandler<GenerateStornoCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly invoiceFactory: InvoiceFactory,
  ) {}

  async execute(command: GenerateStornoCommand): Promise<Invoice> {
    return await this.invoiceRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const invoiceEntity = await transactionalEntityManager.findOne(
          Invoice,
          {
            where: { id: command.invoiceId },
            relations: ['project', 'customer'],
          },
        );

        if (!invoiceEntity) {
          throw new Error('Invoice not found');
        }

        const storno = this.invoiceFactory.create({
          amount: -invoiceEntity.amount,
          currency: invoiceEntity.currency as Currency,
          paymentTerm: invoiceEntity.paymentTerm,
        });

        const invoice = this.invoiceFactory.entityToModel(invoiceEntity);

        storno.project = invoice.project;
        storno.customer = invoice.customer;
        storno.storno = invoice;

        invoice.storno = storno;

        await transactionalEntityManager.save(
          this.invoiceFactory.modelToEntity(invoice),
        );

        return await transactionalEntityManager.save(
          this.invoiceFactory.modelToEntity(storno),
        );
      },
    );
  }
}
