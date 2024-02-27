import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceInput } from './dto/invoice.input';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Query(() => [Invoice])
  async findAllInvoices(): Promise<Invoice[]> {
    return await this.invoiceService.findAll();
  }

  @Mutation(() => Invoice)
  async createInvoice(
    @Args('createInvoiceInput') invoiceInputType: CreateInvoiceInput,
  ): Promise<Invoice> {
    return this.invoiceService.createOne(invoiceInputType);
  }
}
