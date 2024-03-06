import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../domain/invoice.entity';
import { Repository } from 'typeorm';
import { FindOneQuery } from '../queries/find-one.query';
import { QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(FindOneQuery)
export class FindOneQueryHandler {
  constructor(
    @InjectRepository(Invoice) private readonly repository: Repository<Invoice>,
  ) {}
  async execute(query: FindOneQuery) {
    const invoice = await this.repository.findOneBy({
      id: query.id,
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    return invoice;
  }
}
