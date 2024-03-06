import Currency from '@/common/enums/currency.enum';
import { ICommand } from '@nestjs/cqrs';

export class UpdateInvoiceCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly amount?: number,
    public readonly currency?: Currency,
    public readonly paymentTerm?: string,
    public readonly customerId?: string,
    public readonly projectId?: string,
    public readonly description?: string,
  ) {}
}
