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

  findAll(): Promise<Invoice[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }
  deleteOne(id: number): Promise<DeleteResult> {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateOne(id: number, input: UpdateInvoiceInput): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }
  markInvoiceAsPaid(id: number): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }
  markInvoiceAsUnpaid(id: number): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }
  generateStornoInvoice(id: number): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }
  assignInvoiceToProject(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    assignInvoiceToProjetInput: AssignInvoiceToProjetInput,
  ): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }
  assignInvoiceToCustomer(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    assignInvoiceToCustomerInput: AssignInvoiceToCustomerInput,
  ): Promise<Invoice> {
    throw new Error('Method not implemented.');
  }
}
