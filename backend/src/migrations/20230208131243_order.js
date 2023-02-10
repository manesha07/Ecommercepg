/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("order", (table) => {
      table.increments("id").primary().unsigned();
      table.integer("user_id").references("id").inTable('user');
      table.string('order_items',20000);
      table.integer('total_order_amount');
      table.string('isDelivered').defaultTo('Pending');
      table.timestamps(true, true);
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTable("order");
  }
  