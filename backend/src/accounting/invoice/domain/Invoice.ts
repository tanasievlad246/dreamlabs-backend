import { Customer } from '@/accounting/customer/customer.entity';
import { Project } from '@/accounting/project/project.entity';
import Currency from '@/common/enums/currency.enum';

export class Invoice {
  id: number;
  description: string;
  storno: Invoice;
  amount: number;
  currency: Currency;
  paymentTerm: Date;
  isPaid: boolean;
  customer: Customer;
  project: Project;

  constructor(
    id: number,
    description: string,
    storno: Invoice,
    amount: number,
    currency: Currency,
    paymentTerm: Date,
    isPaid: boolean,
    customer: Customer,
    project: Project,
  ) {
    this.id = id;
    this.description = description;
    this.storno = storno;
    this.amount = amount;
    this.currency = currency;
    this.paymentTerm = paymentTerm;
    this.isPaid = isPaid;
    this.customer = customer;
    this.project = project;
  }
}
