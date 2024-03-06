import { ICommand } from '@nestjs/cqrs';

export class AssignProjectCommand implements ICommand {
  constructor(
    readonly invoiceId: number,
    readonly projectId: string,
  ) {}
}
