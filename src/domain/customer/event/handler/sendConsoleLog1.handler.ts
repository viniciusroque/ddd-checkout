
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.events";

export default class SendConsoleLog1Handler
  implements EventHandlerInterface<CustomerCreatedEvent> {

    handler(event: CustomerCreatedEvent): void {
      console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}