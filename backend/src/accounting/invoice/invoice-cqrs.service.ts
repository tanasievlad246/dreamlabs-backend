import { DeleteResult } from 'typeorm';
import { Invoice } from './domain/invoice.entity';
import {
  AssignInvoiceToProjetInput,
  AssignInvoiceToCustomerInput,
} from './dto/assign-invoice.input';
import { CreateInvoiceInput } from './dto/invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice-input';
import { InvoiceService } from './invoice-service.interface';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateInvoiceCommand } from './command/commands/create-invoice.command';
import { Injectable } from '@nestjs/common';
import { FindAllQuery } from './query/queries/find-all.query';
import { FindOneQuery } from './query/queries/find-one.query';
import {
  AssignCustomerCommand,
  DeleteInvoiceCommand,
  GenerateStornoCommand,
  MarkInvoiceAsPaidCommand,
  UpdateInvoiceCommand,
} from './command';
import { MarkInvoiceAsUnpaidCommand } from './command/commands/mark-invoice-unpaid.command';
import { AssignProjectCommand } from './command/commands/assign-project.command';

@Injectable()
export class InvoiceCQRSServiceImpl implements InvoiceService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createOne(input: CreateInvoiceInput): Promise<Invoice> {
    try {
      return await this.commandBus.execute(
        new CreateInvoiceCommand(
          input.amount,
          input.currency,
          input.paymentTerm,
          input.customerId,
          input.projectId,
          input.description,
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Invoice[]> {
    return await this.queryBus.execute(new FindAllQuery());
  }

  async findOne(id: number): Promise<Invoice> {
    return await this.queryBus.execute(new FindOneQuery(id));
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return await this.commandBus.execute(new DeleteInvoiceCommand(id));
  }

  async updateOne(
    id: number,
    {
      amount,
      currency,
      customerId,
      description,
      paymentTerm,
      projectId,
    }: UpdateInvoiceInput,
  ): Promise<Invoice> {
    return await this.commandBus.execute(
      new UpdateInvoiceCommand(
        id,
        amount,
        currency,
        paymentTerm,
        customerId,
        projectId,
        description,
      ),
    );
  }

  async markInvoiceAsPaid(id: number): Promise<Invoice> {
    return await this.commandBus.execute(new MarkInvoiceAsPaidCommand(id));
  }

  async markInvoiceAsUnpaid(id: number): Promise<Invoice> {
    return await this.commandBus.execute(new MarkInvoiceAsUnpaidCommand(id));
  }

  async generateStornoInvoice(id: number): Promise<Invoice> {
    return await this.commandBus.execute(new GenerateStornoCommand(id));
  }

  async assignInvoiceToProject(
    assignInvoiceToProjetInput: AssignInvoiceToProjetInput,
  ): Promise<Invoice> {
    return await this.commandBus.execute(
      new AssignProjectCommand(
        assignInvoiceToProjetInput.invoiceId,
        assignInvoiceToProjetInput.projectId,
      ),
    );
  }

  async assignInvoiceToCustomer(
    assignInvoiceToCustomerInput: AssignInvoiceToCustomerInput,
  ): Promise<Invoice> {
    return await this.commandBus.execute(
      new AssignCustomerCommand(
        assignInvoiceToCustomerInput.invoiceId,
        assignInvoiceToCustomerInput.customerId,
      ),
    );
  }
}
