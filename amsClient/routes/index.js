var express = require('express');
var bodyParser = require('body-parser');
var { UserClient } = require('./UserClient')
var router = express.Router();
var util = require('util');







/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('Registration', { title: 'Asset Management System' });
});

/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('Home', { title: 'Asset Management System' });
});

/* GET Asset Registration page. */
router.get('/registration', (req, res) => {
  res.render('Registration');
});

/* GET Asset test page. */
router.get('/test', (req, res) => {
  res.render('Test');
});

/* GET Asset mechanic page. */
router.get('/mechanic', (req, res) => {
  res.render('Mechanic');
});


/* GET Asset Details page. */
router.get('/state', (req, res) => {
  res.render('Details');
});

/* GET Asset Deletion page. */
router.get('/delete', (req, res) => {
  res.render('Delete');
});



/* GET Transaction Receipts page. */
router.get('/transactionReceipts', (req, res) => {
  res.render('TransactionReceipts');
});

/* GET Latest Transaction's ID Display page. */
router.get('/transactionID', (req, res) => {
  res.render('TransactionID');
});



 router.post('/registration', async function (req, res) {
  var data1 = req.body.write1;
  var data2 = req.body.write2;
  var data3 = req.body.write3;
  var data4 = req.body.write4;
  var data5 = req.body.write5;
  console.log("Data sent to REST API");
  var client = new UserClient();
  let clientExist = await client.addRegistration("Registration", data1, data2, data3, data4, data5);
  if (clientExist == 1) {
    res.send({ message: "Registration of ASSET NO: " + data2 + "  Data successfully added" });
  }
  else if (clientExist == 0) {
    res.send({ message: "Registration Already Exist" });
  }
})


 router.post('/test', async function (req, res) {
  var data1 = req.body.write1;
  var data2 = req.body.write2;
  var data3 = req.body.write3;
  var data4 = req.body.write4;
  var data5 = req.body.write5;
  console.log("Data sent to REST API");
  var client = new UserClient();
  let clientExist = await client.addTest("Test", data1, data2, data3, data4, data5)
  if (clientExist == 1) {
    res.send({ message: "" + data2 + " done and Data successfully added" });
  }
  else if (clientExist == 0) {
    res.send({ message: "test data Already Exists" });
  }
})


/**
 * @title addMechanic
 * @dev  Function to add the details of the mechanic of Asset 
 */
 router.post('/mechanic', async function (req, res) {
  var data1 = req.body.write1;
  var data2 = req.body.write2;
  var data3 = req.body.write3;
  var data4 = req.body.write4;
  var data5 = req.body.write5;
  console.log("Data sent to REST API");
  var client = new UserClient();
  let clientExist = await client.addMechanic("mechanic", data1, data2, data3, data4, data5)
  if (clientExist == 1) {
    res.send({ message: "Mechanic data of asset NO: " + data2 + " done and Data successfully added" });
  }
  else if (clientExist == 0) {
    res.send({ message: "Mechanic data Already Exists" });
  }
})



 router.post('/state', async function (req, res) {
  var data1 = req.body.write1;
  var data2 = req.body.write2;
  console.log(data1 + " data1 from index");
  console.log(data2 + " data2 from index");
  var client = new UserClient();
  var getData = await client.result(data1, data2);
  console.log("Data got from REST API", getData);
  if (getData == 1) {
    res.send({ balance: "Data not found" });
  }
  else {
    res.send({ balance: getData });
  }
})


 router.post('/delete', async function (req, res) {
  var data1 = req.body.write1;
  var data2 = req.body.write2;
  console.log(data1 + " data1 from index");
  console.log(data2 + " data2 from index");
  var client = new UserClient();
  let clientExist = await client.deleteData("deleteState", data1, data2)
  if (clientExist == 1) {
    res.send({ message: "Asset of id NO: " + data2 + " deleted successfully " });
  }
  else if (clientExist == 0) {
    res.send({ message: "Asset of id NO: " + data2 + " Does not Exist " });
  }
})



 router.post('/transactionReceipts', async function (req, res) {
  var data1 = req.body.write1;
  console.log(data1 + " data1 from index");
  var client = new UserClient();
  var getData = await client.transactionReceipt(data1);
  console.log("Data got from REST API", getData);
  if (getData == 1) {
    res.send({ balance: "There is no Receipt Data For This Transaction ID" });
  }
  else {
    res.send({ balance: getData });
  }
})

router.post('/transactionID', async function (req, res) {
  var client = new UserClient();
  var getData = await client.transactionID();
  console.log("Data got from REST API", getData);
  if (getData == 1) {
    res.send({ balance: "There is no Transaction ID " });
  }
  else {
    res.send({ balance: getData });
  }
})

module.exports = router;


