var express = require('express');
var db = require('../util/database');
const mysql = require('mysql2');
var router = express.Router();
var app = express();

const getData = (req, res, next) => {
  db.execute('SELECT * FROM api.test;')
    .then((data) => {
      res.send({
        success: true,
        code: 200,
        invoiceList: data[0],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
router.get('/', function (req, res, next) {
  getData(req, res);
});

router.post('/', (req, res, next) => {
  const data = req.body;
  db.execute('INSERT INTO api.test (name,price) VALUES (?,?)', [
    data.name,
    data.price,
  ])
    .then(() => {
      getData(req, res);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.patch('/', (req, res, next) => {
  const data = req.body;
  let sql = '';
  data.forEach((item) => {
    sql += `('${item[0]}',${item[1]},${item[2]}),`;
  });
  let str = `replace into api.test (name,price,id) values ${sql}`.slice(0, -1);
  db.execute(str).then((data) => {
    getData(req, res);
  });
});

router.delete('/', (req, res, next) => {
  db.execute('truncate table api.test;').then((data) => {
    res.send(data[0]);
  });
});
module.exports = router;
