import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../domain/invoice.entity';
import { Repository } from 'typeorm';
import { FindOneQuery } from '../queries/find-one.query';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindOneQuery)
export class FindOneQueryHandler {
  constructor(
    @InjectRepository(Invoice) private readonly repository: Repository<Invoice>,
  ) {}
  async execute(query: FindOneQuery) {
    return await this.repository.findOneBy({
      id: query.id,
    });
  }
}
