var express = require('express');
var db = require('../util/database');
var router = express.Router();

const createGet = require('../modules/invoiceManage/invoiceManage');
// const getData = (req, res, next) => {
//   db.execute(`SELECT * FROM \`api\`.\`test\`;`)
//     .then((data) => {
//       res.send({
//         success: true,
//         code: 200,
//         invoiceList: data[0],
//       });
//       res.end();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
router.get('/', createGet.getAll);

router.post('/', (req, res, next) => {
  const data = req.body;
  db.execute('INSERT INTO `api`.`invoice` (name,price) VALUES (?,?)', [
    data.name,
    data.price,
  ])
    .then((data) => {
      res.send(data[0]);
      // getData(req, res);
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
  let str = `replace into api.invoice (name,price,id) values ${sql}`.slice(
    0,
    -1
  );
  db.execute(str).then((data) => {
    getData(req, res);
  });
});

router.delete('/', (req, res, next) => {
  db.execute('truncate table `api`.`invoice`;').then((data) => {
    res.send(data[0]);
  });
});
module.exports = router;
