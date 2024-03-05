import Currency from '../../../common/enums/currency.enum';

export class CreateInvoiceCommand {
  constructor(
    public readonly amount: number,
    public readonly currency: Currency,
    public readonly paymentTerm: string,
    public readonly customerId?: string,
    public readonly projectId?: string,
    public readonly description?: string,
  ) {}
}
