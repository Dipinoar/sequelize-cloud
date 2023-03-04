//NEON

/* const { Pool } = require('pg');

const pool = new Pool({
    host: 'ep-red-bird-873849.us-east-2.aws.neon.tech',
    user: 'Dipinoar',
    password:'TswpI3rcYE0G',
    database: 'neondb',
    port:5432,
    endpoint:'ep-red-bird-873849',
    ssl:true,
});

module.exports = pool;  */



/* const postgres = require('postgres');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const sql = postgres(URL, { ssl: 'require' });
module.exports = sql;  */


 const { Client } = require('pg')

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env

const URL = 'postgres://Dipinoar:TswpI3rcYE0G@us-east-2.aws.neon.tech/neondb';
 
const client = new Client(URL)

client.connect()
module.exports=client  */

//ELEPHANT SQL

/* const { Client } = require('pg')

const URL = `postgres://rkaczahv:QpIe42wGbAQ4xwq-MRaEBGK5Mt0Vlhty@babar.db.elephantsql.com/rkaczahv`;
 
const client = new Client(URL)

client.connect()
module.exports=client */

/*
const { Pool } = require('pg');

const pool = new Pool({
    host: 'babar.db.elephantsql.com',
    user: 'rkaczahv',
    password:'QpIe42wGbAQ4xwq-MRaEBGK5Mt0Vlhty',
    database: 'rkaczahv',
    port:5432
});

module.exports = pool;*/
