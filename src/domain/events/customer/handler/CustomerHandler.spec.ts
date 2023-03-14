import EventDispatcher from "../../@shared/event-dispatcher";
import CustomerCreatedEvent from "../customer-created.events";
import SendConsoleLog1Handler from "./sendConsoleLog1.handler";
import SendConsoleLog2Handler from "./sendConsoleLog2.handler";

describe("Customer handlers test", () => {


  it("Should register 2 handlers for event when customer has created", () => {
    const eventDispatcher = new EventDispatcher();
    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1"
    });
    const sendConsoleLog1Handler = new SendConsoleLog1Handler();
    const sendConsoleLog2Handler = new SendConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog2Handler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

  });

  it("Should notify when customer has created", () => {
    const eventDispatcher = new EventDispatcher();
    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1"
    });
    const sendConsoleLog1Handler = new SendConsoleLog1Handler();
    const sendConsoleLog2Handler = new SendConsoleLog2Handler();

    const spyEventHandler1 = jest.spyOn(sendConsoleLog1Handler, "handler");
    const spyEventHandler2 = jest.spyOn(sendConsoleLog2Handler, "handler");

    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog2Handler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

  });
});