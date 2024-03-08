import { Invoice } from '../../domain/invoice.entity';

export class GenerateStornoEvent {
  constructor(
    readonly invoice: Invoice,
    readonly storno: Invoice,
  ) {}
}
