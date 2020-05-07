// Repesentation of product retrieved from API

export interface Product {
  id: Number;
  name: String;
  description: String;
  price: Number;
  discount: Number;
  deliveryCharges: Number;
  quantityInInventory: Number;
  finalPrice: Number;
  disocuntedPrice: Number;
}

// Representation of a new product to send to API 

export interface NewProduct {
  name: String;
  description: String;
  price: Number;
  discount: Number;
  deliveryCharge: Number;
  quantity: Number;
}
