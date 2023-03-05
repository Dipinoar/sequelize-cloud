const { Pool } = require('pg');

const pool = new Pool({
    host: 'ep-red-bird-873849.us-east-2.aws.neon.tech',
    user: 'Dipinoar',
    password:'TswpI3rcYE0G',
    database: 'neondb',
    port:5432,
    endpoint:'ep-red-bird-873849',
    ssl:true,
});

module.exports = pool; 
