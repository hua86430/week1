const mysql = require('mysql2');
const pool = mysql.createPool({
  // socketPath: '/cloudsql/cool-attic-342916:asia-east1:community',
  host: '35.194.171.18',
  user: 'root',
  password: '17934600',
  database: 'api',
  multipleStatements: true,
});

module.exports = pool.promise();
