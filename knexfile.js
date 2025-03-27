require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'Momiji25!',
        database: 'SustainableHobbiesDb',
        port: 5432
    }
  },
  development2: {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'Momiji21',
        database: 'SustainableHobbiesDb',
        port: 5432
    }
  },
};