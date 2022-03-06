const mysql = require('mysql2');
const pool = mysql.createPool({
  // socketPath: '/cloudsql/cool-attic-342916:asia-east1:community',
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b8c56e7b5d2ea9',
  password: '5dea7bf3f3331fd',
  database: 'heroku_9fb0e1320f3eb9e',
  multipleStatements: true,
});

module.exports = pool.promise();
