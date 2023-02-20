//  import Knex from 'knex';
// const configuration = {
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     port: 5433,
//     user: 'postgres',
//     password: 'admin123',
//     database: 'ecdb12'
//   },
//   migrations: {
//     tableName: 'migrations',
//   },
//   seeds: {
//     directory: './seeds',
//     stub: './stub/seed.stub'
//   }
// };

// ELEPHANT SUJATA 
// ELEPHANT

import Knex from 'knex';

const configuration = {
  client: "pg",
  connection: {
    host: "satao.db.elephantsql.com",
    port: 5432,
    user: "ixfkndjf",
    password: "pai8KiXmaa-ObCf32QNLfPddm1MpoOJ0",
    database: "ixfkndjf",
  },
  migrations: {
    tableName: "migrations",
  },
  seeds: {
    directory: "./seeds",
    stub: "./stub/seed.stub",
  },
};
export const connection = Knex(configuration);
export default configuration;

// //ELEPHANT
// const configuration = {
//   client: "pg",
//   connection: {
//     host: "satao.db.elephantsql.com",
//     port: 5432,
//     user: "ixfkndjf",
//     password: "pai8KiXmaa-ObCf32QNLfPddm1MpoOJ0",
//     database: "ixfkndjf",
//   },
//   migrations: {
//     tableName: "migrations",
//   },
//   seeds: {
//     directory: "./seeds",
//     stub: "./stub/seed.stub",
//   },
// };
// export const connection = Knex(configuration);
// export default configuration;
