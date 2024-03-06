import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InvoiceCreatedEvent } from '../events/invoice-created.event';

@EventsHandler(InvoiceCreatedEvent)
export class InvoiceCreateEventHandler
  implements IEventHandler<InvoiceCreatedEvent>
{
  handle(event: InvoiceCreatedEvent) {
    console.log('Invoice created event handler', event);
  }
}
