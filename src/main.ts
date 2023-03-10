import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";
import Address from "./domain/value-object/address";

let customer = new Customer("customer1", "Customer name");
const address = new Address("Street name", 123, "04107-020", "São Paulo");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("item1", "Item 1", 29, "product1", 10);
const item2 = new OrderItem("item2", "Item 2", 41, "product2", 4);
const order = new Order("order1", customer.id, [item1, item2]);