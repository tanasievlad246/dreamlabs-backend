import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../domain/invoice.entity';
import { Repository } from 'typeorm';
import { Project } from '@/accounting/project/project.entity';
import { InvoiceFactory } from '../../domain/InvoiceFactory';
import { AssignProjectCommand } from '../commands/assign-project.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(AssignProjectCommand)
export class AssignProjectHandler
  implements ICommandHandler<AssignProjectCommand>
{
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly invoiceFactory: InvoiceFactory,
  ) {}
  async execute(command: AssignProjectCommand): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOneBy({
      id: command.invoiceId,
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    const project = await this.projectRepository.findOneBy({
      id: command.projectId,
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const invoiceModel = this.invoiceFactory.entityToModel(invoice);
    invoiceModel.assignProject(project);

    return await this.invoiceRepository.save(
      this.invoiceFactory.modelToEntity(invoiceModel),
    );
  }
}
