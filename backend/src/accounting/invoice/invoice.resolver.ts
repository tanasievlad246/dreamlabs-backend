import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Invoice } from './invoice.entity';
import { InvoiceServiceImpl } from './invoice.service';
import { CreateInvoiceInput } from './dto/invoice.input';
import { UpdateInvoiceInput } from './dto/update-invoice-input';
import { InvoiceIdInput } from './dto/invoice-id.input';
import { IInvoiceResolver } from './invoice-resolver.interface';

@Resolver(() => Invoice)
export class InvoiceResolver implements IInvoiceResolver {
  constructor(private readonly invoiceService: InvoiceServiceImpl) {}

  @Query(() => [Invoice])
  async findAllInvoices(): Promise<Invoice[]> {
    return await this.invoiceService.findAll();
  }

  @Mutation(() => Invoice)
  async createOneInvoice(
    @Args('createInvoiceInput') invoiceInputType: CreateInvoiceInput,
  ): Promise<Invoice> {
    return this.invoiceService.createOne(invoiceInputType);
  }

  @Query(() => Invoice)
  async findOneInvoice(
    @Args('findOneInvoiceInput') invoiceIdInput: InvoiceIdInput,
  ): Promise<Invoice> {
    return await this.invoiceService.findOne(invoiceIdInput.id);
  }

  @Mutation(() => Boolean)
  async deleteOneInvoice(
    @Args('deleteOneInvoiceInput') invoiceIdInput: InvoiceIdInput,
  ): Promise<boolean> {
    const result = await this.invoiceService.deleteOne(invoiceIdInput.id);

    if (result.affected > 0) {
      return true;
    }
    return false;
  }

  @Mutation(() => Invoice)
  async updateOneInvoice(
    @Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput,
  ): Promise<Invoice> {
    return await this.invoiceService.updateOne(
      updateInvoiceInput.id,
      updateInvoiceInput,
    );
  }

  @Mutation(() => Invoice)
  async markOneInvoiceAsPaid(
    @Args('markInvoicePaidInput') markInvoicePaidInput: InvoiceIdInput,
  ): Promise<Invoice> {
    return this.invoiceService.markInvoiceAsPaid(markInvoicePaidInput.id);
  }

  @Mutation(() => Invoice)
  async markOneInvoiceAsUnpaid(
    @Args('markInvoicePaidInput') markInvoiceUnpaidInput: InvoiceIdInput,
  ): Promise<Invoice> {
    return this.invoiceService.markInvoiceAsUnpaid(markInvoiceUnpaidInput.id);
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
