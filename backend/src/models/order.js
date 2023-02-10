import DBModel from './DBModel.js';

/**
 * Model for the 'users' table.
 *
 * @class Order
 */
class Order extends DBModel {
  constructor() {
    super('order');
  }
}

export default Order;
