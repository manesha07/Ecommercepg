import camelize from 'camelize';
import snakeize from 'snakeize';

import { connection } from '../knexfile.js';

// console.log("knex connection",Knex(connection))

/**
 * Base model for that can be used for all tables.
 *
 * @class DBModel
 */

class DBModel {
  constructor(table) {
    this.table = table;
    this.connection = connection;
  }

  async getAll() {
    const data = await connection(this.table).select('*');

    return camelize(data);
  }

  async getById(id) {
    const [data] = await connection(this.table).select('*').where('id', id);

    return data ? camelize(data) : null;
  }

  async findByParams(params) {
    const [data] = await connection(this.table).select('*').where(snakeize(params));

    return data ? camelize(data) : null;
  }

  // result  {
  //   name: 'epoo',
  //   description: 'ere',
  //   price: '45',
  //   stock: '45',
  //   category: 'dr',
  //   images: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
  // }
  async save(data) {
    console.log("result ", data)
    const result = await connection(this.table).insert(snakeize(data)).returning('*');
    console.log("arko res ", result)
    return camelize(result);
  }
  // arko res  [
  //   {
  //     id: 48,
  //     name: 'epoo',
  //     description: 'ere',
  //     category: 'dr',
  //     images: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  //     stock: 45,
  //     created_at: 2023-02-10T04:40:41.140Z,
  //     updated_at: 2023-02-10T04:40:41.140Z,
  //     price: 45
  //   }
  // ]
  async save1(data) {
    console.log("yoho ", data)
    const result = await connection(this.table).insert(data).returning('*');
    console.log("yaha ", result)
    return result;
  }


  async updateById(id, data) {
    const result = await connection(this.table).update(snakeize(data)).where({ id }).returning('*');

    return camelize(result);
  }

  async removeById(id) {
    console.log("llllllif", id);
    const result = await connection(this.table).delete().where({ id });
    console.log("llllll", result);
    return camelize(result);
  }

  async removeByParams(params) {
    const result = await connection(this.table).delete().where(snakeize(params));
    console.log("result1", result);
    return camelize(result);
  }

  async query(sql, params) {
    const result = await connection.raw(sql, params);

    return camelize(result.rows);
  }

  async getByUserId(id) {
    console.log("popp", id)
    const data = await connection(this.table).select('*').where('user_id', id);
    console.log("yaha", data)
    return data ? camelize(data) : null;
  }

  async removeByUserId(id) {
    console.log("llllllif", id);
    const result = await connection(this.table).delete().where({ user_id: id });
    console.log("llllll", result);
    return camelize(result);
  }

}

export default DBModel;
