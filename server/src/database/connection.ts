import knex from 'knex';
import path from 'path'

const connection = knex({
  client: 'mssql',
  connection: {
    server: 'localhost',
    user: 'samuel.maciel',
    password: '123456',
    database: 'ecoleta'
  },
  useNullAsDefault: true
})

export default connection