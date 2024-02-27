import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { ProjectService } from '../project/project.service';
import { CreateInvoiceInput } from './dto/invoice.input';
import { Invoice } from './invoice.entity';
import { UpdateInvoiceInput } from './dto/update-invoice-input';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    private readonly customerService: CustomerService,
    private readonly projectService: ProjectService,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepo.find({
      relations: ['customer', 'project'],
    });
  }

  async createOne(inv: CreateInvoiceInput): Promise<Invoice> {
    const project = await this.projectService.findOne(inv.projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const customer = await this.customerService.findOne(inv.customerId);

    if (!customer) {
      throw new NotFoundException('Project not found');
    }

    const invoice = this.invoiceRepo.create(inv);
    invoice.customer = customer;
    invoice.project = project;
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

    const newInvoice = this.invoiceRepo.merge(invoice, upadtedInvoice);

    return await this.invoiceRepo.save(newInvoice);
  }

  async findOne(id: number): Promise<Invoice> {
    return await this.invoiceRepo.findOne({
      where: {
        id,
      },
    });
  }

  async markInvociePaid(id: number): Promise<Invoice> {
    const invoice = await this.findOne(id);
    invoice.isPaid = true;
    return await this.invoiceRepo.save(invoice);
  }

  async markInvoiceUnpaid(id: number): Promise<Invoice> {
    const invoice = await this.findOne(id);
    invoice.isPaid = false;
    return await this.invoiceRepo.save(invoice);
  }

  async generateStornoInvoice(id: number): Promise<Invoice> {
    const invoice = await this.findOne(id);
    const newInvoice = this.invoiceRepo.create();
    const storno = this.invoiceRepo.merge(invoice, newInvoice);
    storno.amount = 0 - invoice.amount;
    return await this.invoiceRepo.save(storno);
  }
}
