import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignCustomerCommand } from '../commands/assign-customer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../domain/invoice.entity';
import { Repository } from 'typeorm';
import { Customer } from '@/accounting/customer/customer.entity';
import { InvoiceFactory } from '../../domain/InvoiceFactory';

@CommandHandler(AssignCustomerCommand)
export class AssignCustomerHandler
  implements ICommandHandler<AssignCustomerCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly invoiceFactory: InvoiceFactory,
  ) {}
  async execute(command: AssignCustomerCommand): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOneBy({
      id: command.invoiceId,
    });

    const invoiceModel = this.invoiceFactory.entityToModel(invoice);

    const customer = await this.customerRepository.findOneBy({
      id: command.customerId,
    });

    invoiceModel.assignCustomer(customer);

    await this.invoiceRepository.save(
      this.invoiceFactory.modelToEntity(invoiceModel),
    );
    return invoice;
  }
}