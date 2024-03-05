import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { ProjectService } from '../project/project.service';
import { CreateInvoiceInput } from './dto/invoice.input';
import { Invoice } from './domain/invoice.entity';
import { UpdateInvoiceInput } from './dto/update-invoice-input';
import {
  AssignInvoiceToCustomerInput,
  AssignInvoiceToProjetInput,
} from './dto/assign-invoice.input';
import { InvoiceService } from './invoice-service.interface';

@Injectable()
export class InvoiceServiceImpl implements InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    private readonly customerService: CustomerService,
    private readonly projectService: ProjectService,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepo.find({
      relations: ['customer', 'project', 'storno'],
    });
  }

  async createOne(inv: CreateInvoiceInput): Promise<Invoice> {
    const invoice = this.invoiceRepo.create(inv);

    if (inv.projectId) {
      const project = await this.projectService.findOne(inv.projectId);
      invoice.project = project;
    }

    if (inv.customerId) {
      const customer = await this.customerService.findOne(inv.customerId);
      invoice.customer = customer;
    }

    return await this.invoiceRepo.save(invoice);
  }

  async assignInvoiceToProject(
    assignInvoiceToProjectInput: AssignInvoiceToProjetInput,
  ): Promise<Invoice> {
    const { invoiceId, projectId } = assignInvoiceToProjectInput;
    const project = await this.projectService.findOne(projectId);
    const invoice = await this.findOne(invoiceId);

    invoice.project = project;

    return await this.invoiceRepo.save(invoice);
  }

  async assignInvoiceToCustomer(
    assignInvoiceToCustomerInput: AssignInvoiceToCustomerInput,
  ): Promise<Invoice> {
    const { invoiceId, customerId } = assignInvoiceToCustomerInput;
    const customer = await this.customerService.findOne(customerId);
    const invoice = await this.findOne(invoiceId);

    invoice.customer = customer;

    return await this.invoiceRepo.save(invoice);
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return await this.invoiceRepo.delete(id);
  }

  async updateOne(id: number, upadtedInvoice: UpdateInvoiceInput) {
    const invoice = await this.invoiceRepo.findOne({
      where: {
        id,
      },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    const newInvoice = this.invoiceRepo.merge(invoice, upadtedInvoice);

    return await this.invoiceRepo.save(newInvoice);
  }

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepo.findOne({
      where: {
        id,
      },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }

  async markInvoiceAsPaid(id: number): Promise<Invoice> {
    const invoice = await this.findOne(id);
    invoice.isPaid = true;
    return await this.invoiceRepo.save(invoice);
  }

  async markInvoiceAsUnpaid(id: number): Promise<Invoice> {
    const invoice = await this.findOne(id);
    invoice.isPaid = false;
    return await this.invoiceRepo.save(invoice);
  }

  async generateStornoInvoice(id: number): Promise<Invoice> {
    let stornoInvoie: Invoice;
    await this.dataSource.transaction(async (manager) => {
      const invRepo = manager.getRepository(Invoice);

      const invoice = await invRepo.findOne({
        where: { id },
        relations: ['project', 'customer'],
      });

      if (!invoice) {
        throw new NotFoundException('Invoice not found');
      }

      const storno = invRepo.create({
        description: invoice.description,
        currency: invoice.currency,
        isPaid: invoice.isPaid,
        paymentTerm: invoice.paymentTerm,
        project: invoice.project,
        customer: invoice.customer,
        amount: 0 - invoice.amount,
        storno: invoice,
      });

      stornoInvoie = await invRepo.save(storno);

      invoice.storno = storno;
      await invRepo.save(invoice);
    });
    return stornoInvoie;
  }
}
