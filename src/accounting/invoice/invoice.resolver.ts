import { Resolver, Query } from '@nestjs/graphql';
import { Invoice } from './invoice.entity';

@Resolver(() => Invoice)
export class InvoiceResolver {
  @Query(() => String)
  hello(): string {
    return 'world';
  }
}
