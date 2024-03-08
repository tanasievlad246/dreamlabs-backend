import { Customer } from '@/accounting/customer/customer.entity';
import { Invoice } from '../../domain/invoice.entity';

export class AssignCustomerEvent {
  constructor(
    readonly invoice: Invoice,
    readonly customer: Customer,
  ) {}
}
