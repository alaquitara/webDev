var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_laquitaa',
  password        : '4277',
  database        : 'cs290_laquitaa'
});

module.exports.pool = pool;