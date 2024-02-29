import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceInput } from './dto/invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice-input';
import { InvoiceIdInput } from './dto/invoice-id.input';

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

  @Query(() => Invoice)
  async findOneInvoice(
    @Args('findOneInvoiceInput') updatedInvoice: UpdateInvoiceInput,
  ): Promise<Invoice> {
    return await this.invoiceService.findOne(updatedInvoice.id);
  }

  @Mutation(() => Boolean)
  async deleteOneInvoice(
    @Args('deleteOneInvoiceInput') updatedInvoice: UpdateInvoiceInput,
  ): Promise<boolean> {
    const result = await this.invoiceService.deleteOne(updatedInvoice.id);

    if (result.affected > 0) {
      return true;
    }
    return false;
  }

  @Mutation(() => Invoice)
  async updateOneInvoice(
    @Args('updateInvoiceInput') updatedInvoice: UpdateInvoiceInput,
  ): Promise<Invoice> {
    return await this.invoiceService.updateOne(
      updatedInvoice.id,
      updatedInvoice,
    );
  }

  @Mutation(() => Invoice)
  async markOneInvoiceAsPaid(
    @Args('markInvoicePaidInput') markInvoicePaidInput: InvoiceIdInput,
  ): Promise<Invoice> {
    return this.invoiceService.markInvociePaid(markInvoicePaidInput.id);
  }

  @Mutation(() => Invoice)
  async markOneInvoiceAsUnpaid(
    @Args('markInvoicePaidInput') markInvoiceUnpaidInput: InvoiceIdInput,
  ): Promise<Invoice> {
    return this.invoiceService.markInvoiceUnpaid(markInvoiceUnpaidInput.id);
  }

  @Mutation(() => Invoice)
  async generateOneStornoInvoice(
    @Args('generateInvoiceStornoInput')
    generateInvoiceStornoInput: InvoiceIdInput,
  ): Promise<Invoice> {
    return await this.invoiceService.generateStornoInvoice(
      generateInvoiceStornoInput.id,
    );
  }
}
