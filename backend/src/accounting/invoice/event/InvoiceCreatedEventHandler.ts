import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InvoiceCreatedEvent } from './InvoiceCreatedEvent';

@EventsHandler(InvoiceCreatedEvent)
export class InvoiceCreateEventHandler
  implements IEventHandler<InvoiceCreatedEvent>
{
  handle(event: InvoiceCreatedEvent) {
    console.log('Invoice created event handler', event);
  }
}
