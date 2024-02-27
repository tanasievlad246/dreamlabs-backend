import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceInput } from './dto/invoice.input';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepo.find();
  }

  async createOne(inv: CreateInvoiceInput): Promise<Invoice> {
    return await this.invoiceRepo.save(inv);
  }
}
