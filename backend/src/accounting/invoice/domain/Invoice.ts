import { Customer } from '@/accounting/customer/customer.entity';
import { Project } from '@/accounting/project/project.entity';
import Currency from '../../../common/enums/currency.enum';

import { AggregateRoot } from '@nestjs/cqrs';

export type InvoiceEssentialProps = Readonly<
  Required<{
    amount: number;
    currency: Currency;
    paymentTerm: Date;
  }>
>;

export type InvoiceOptionalProps = Readonly<
  Partial<{
    id: number;
    description: string;
    storno: Invoice;
    isPaid: boolean;
    customer: Customer;
    project: Project;
  }>
>;

export type InvoiceProps = InvoiceEssentialProps &
  Required<InvoiceOptionalProps>;

export class Invoice extends AggregateRoot implements InvoiceProps {
  id: number;
  description: string;
  storno: Invoice;
  amount: number;
  currency: Currency;
  paymentTerm: Date;
  isPaid: boolean;
  customer: Customer;
  project: Project;

  constructor(props: InvoiceProps) {
    super();
    Object.assign(this, props);
  }

  markAsPaid(): void {
    this.isPaid = true;
  }

  markAsUnpaid(): void {
    this.isPaid = false;
  }

  changeAmount(amount: number): void {
    this.amount = amount;
  }

  changeCurrency(currency: Currency): void {
    this.currency = currency;
  }

  changeDescription(description: string): void {
    this.description = description;
  }

  changePaymentTerm(paymentTerm: Date): void {
    this.paymentTerm = paymentTerm;
  }

  assignCustomer(customer: Customer): void {
    this.customer = customer;
  }

  assignProject(project: Project): void {
    this.project = project;
  }

  /**
   * Update invoice properties based on what properties are passed
   */
  merge(invoice: Invoice): void {
    Object.assign(this, invoice);
  }

  cancel(): Invoice {
    const amount = 0 - this.amount;
    this.storno = new Invoice({
      ...this,
      amount,
    });
    return this.storno;
  }
}
