import { ICommand } from '@nestjs/cqrs';

export class AssignCustomerCommand implements ICommand {
  constructor(
    readonly invoiceId: number,
    readonly customerId: string,
  ) {}
}
