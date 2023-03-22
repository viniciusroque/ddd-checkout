export default class OrderItem {

  _id: string;
  _name: string;
  _price: number = 0;
  _productId: string;
  _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
    this.validate()
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  validate(): void {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (this._price < 0) {
      throw new Error("Price must be greater than or equal to 0");
    }

    if (this._productId.length === 0) {
      throw new Error("ProductId is required");
    }

    if (this._quantity <= 0) {
      throw new Error("Quantity must be greater than 0")
    }
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }


}