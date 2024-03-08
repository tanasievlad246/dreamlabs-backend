import { Project } from '@/accounting/project/project.entity';
import { Invoice } from '../../domain/invoice.entity';

export class AssignProjectEvent {
  constructor(
    readonly invoice: Invoice,
    readonly project: Project,
  ) {}
}
