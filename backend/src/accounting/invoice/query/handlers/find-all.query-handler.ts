import { Repository } from 'typeorm';
import { Invoice } from '../../domain/invoice.entity';
import { FindAllQuery } from '../queries/find-all.query';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindAllQuery)
export class FindAllQueryHandler {
  constructor(
    @InjectRepository(Invoice) private readonly repository: Repository<Invoice>,
  ) {}

  async execute(query: FindAllQuery): Promise<Invoice[]> {
    if (!query) throw new Error('Query not found');
    return await this.repository.find();
  }
}
