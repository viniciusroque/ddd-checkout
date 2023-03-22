import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            order_id: entity.id,
            name: item.name,
            product_id: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        },
        {
          include: [{ model: OrderItemModel }]
        }
      );
    } catch (error){
      throw new Error("Error when creating a new order");

    }
  };

  async update(entity: Order): Promise<void> {
    const items = entity.items.map((item) => ({
      id: item.id,
      order_id: entity.id,
      name: item.name,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price
    }))
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total()
      },
      {
        where: {
          id: entity.id
        },
      }
    );
    await OrderItemModel.destroy({
      where: { order_id: entity.id }
    });

    await OrderItemModel.bulkCreate(
      items
    );

  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id: id },
        include: [{ model: OrderItemModel }]
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const orderItems = orderModel.items.map((item) => (
      new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      )
    ));
    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderItems
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }]
    });

    return orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map((item) => (
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
      ));

      return new Order(
        orderModel.id,
        orderModel.customer_id,
        orderItems
      )
    });

  }
}