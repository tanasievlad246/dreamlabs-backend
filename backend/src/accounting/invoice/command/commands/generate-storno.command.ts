import { ICommand } from '@nestjs/cqrs';

export class GenerateStornoCommand implements ICommand {
  constructor(readonly invoiceId: number) {}
}
