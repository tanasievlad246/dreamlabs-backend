import { ICommand } from '@nestjs/cqrs';
import Currency from '../../../../common/enums/currency.enum';

export class CreateInvoiceCommand implements ICommand {
  constructor(
    public readonly amount: number,
    public readonly currency: Currency,
    public readonly paymentTerm: string,
    public readonly customerId?: string,
    public readonly projectId?: string,
    public readonly description?: string,
  ) {}
}
