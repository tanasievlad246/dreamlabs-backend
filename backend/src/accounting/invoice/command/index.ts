import { AssignCustomerHandler } from './handlers/assign-customer.handler';
import { CreateInvoiceHandler } from './handlers/create-invoice.handler';
import { DeleteInvoiceHandler } from './handlers/delete-invoice.handler';
import { UpdateInvoiceHandler } from './handlers/update-invoice.handler';
import { GenerateStornoHandler } from './handlers/generate-storno.handler';
import { MarkInvoiceAsPaidHandler } from './handlers/mark-paid.handler';
import { MarkInvoiceAsUnpaidHandler } from './handlers/mark-unpaid.handler';

export { AssignCustomerCommand } from './commands/assign-customer.command';
export { CreateInvoiceCommand } from './commands/create-invoice.command';
export { DeleteInvoiceCommand } from './commands/delete-invoice.command';
export { UpdateInvoiceCommand } from './commands/update-invoice.command';
export { GenerateStornoCommand } from './commands/generate-storno.command';
export { MarkInvoiceAsPaidCommand } from './commands/mark-invoice-paid.command';
export { MarkInvoiceAsUnpaidCommand } from './commands/mark-invoice-unpaid.command';

export { AssignCustomerHandler } from './handlers/assign-customer.handler';
export { CreateInvoiceHandler } from './handlers/create-invoice.handler';
export { DeleteInvoiceHandler } from './handlers/delete-invoice.handler';
export { UpdateInvoiceHandler } from './handlers/update-invoice.handler';
export { GenerateStornoHandler } from './handlers/generate-storno.handler';
export { MarkInvoiceAsPaidHandler } from './handlers/mark-paid.handler';
export { MarkInvoiceAsUnpaidHandler } from './handlers/mark-unpaid.handler';

export const CommandHandlers = [
  AssignCustomerHandler,
  CreateInvoiceHandler,
  DeleteInvoiceHandler,
  UpdateInvoiceHandler,
  GenerateStornoHandler,
  MarkInvoiceAsPaidHandler,
  MarkInvoiceAsUnpaidHandler,
];
