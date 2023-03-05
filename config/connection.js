const { Pool } = require('pg');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env
const pool = new Pool({
    host: PGHOST,
    user: PGUSER,
    password:PGPASSWORD,
    database: PGDATABASE,
    port:5432,
    endpoint:ENDPOINT_ID,
    ssl:true,
    pooling:false,
});

module.exports = pool;  
