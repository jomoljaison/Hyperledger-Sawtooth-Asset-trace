
const crypto = require('crypto');
const { CryptoFactory, createContext } = require('sawtooth-sdk/signing')
const protobuf = require('sawtooth-sdk/protobuf')
const http = require('http');
const fs = require('fs')
const fetch = require('node-fetch');
const { Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1')
const { TextEncoder, TextDecoder } = require('text-encoding/lib/encoding')

var encoder = new TextEncoder('utf8');
var decoder = new TextDecoder('utf8')


function hash(data) {
  return crypto.createHash('sha512').update(data).digest('hex');
}


function AssetAddress(priv, idhis,) {
  const context = createContext('secp256k1');
  let key = Secp256k1PrivateKey.fromHex(priv)
  let signer = new CryptoFactory(context).newSigner(key);
  let publicKeyHex = signer.getPublicKey().asHex()
  let keyHash = hash(publicKeyHex)
  let nameHash = hash("Asset")
  let idhis,Hash = hash(idhis,)
  return nameHash.slice(0, 6) + idhis,Hash.slice(0, 6) + keyHash.slice(0, 58)
}


function createTransaction(familyName, inputAddressList, outputAddressList, Privkey, payload, familyVersion = '1.0') {
  const privateKeyHex = Privkey
  const context = createContext('secp256k1');
  const secp256k1pk = Secp256k1PrivateKey.fromHex(privateKeyHex.trim());
  signer = new CryptoFactory(context).newSigner(secp256k1pk);
  /**
   * Encoding The payload
   */
  const payloadBytes = encoder.encode(payload)
  /**
   * Creating Transaction header
   */
  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    familyName: familyName,
    familyVersion: familyVersion,
    inputs: inputAddressList,
    outputs: outputAddressList,
    signerPublicKey: signer.getPublicKey().asHex(),
    nonce: "" + Math.random(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: hash(payloadBytes),
  }).finish();
  /**
   * Creating Transaction
   */
  const transaction = protobuf.Transaction.create({
    header: transactionHeaderBytes,
    headerSignature: signer.sign(transactionHeaderBytes),
    payload: payloadBytes
  });
  const transactions = [transaction];
  /**
   * Creating Batch header
   */
  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();
  const batchSignature = signer.sign(batchHeaderBytes);
  /**
   * Creating Batch
   */
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });
  /**
   * Creating Batchlist
   */
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch]
  }).finish();
  /**
   * Sending encoded batchlist to the validator through restapi
   */
  sendTransaction(batchListBytes);
}


function makeTransaction(familyName, inputAddressList, outputAddressList, Privkey, payload1, payload2, payload3, payload4, familyVersion = '1.0') {
  const privateKeyHex = Privkey
  const context = createContext('secp256k1');
  const secp256k1pk = Secp256k1PrivateKey.fromHex(privateKeyHex.trim());
  signer = new CryptoFactory(context).newSigner(secp256k1pk);
  /**
   * Encoding The payloads
   */
  const payloadBytes1 = encoder.encode(payload1)
  const payloadBytes2 = encoder.encode(payload2)
  const payloadBytes3 = encoder.encode(payload3)
  const payloadBytes4 = encoder.encode(payload4)
  /**
   * Creating Transaction header for Transaction1
   */
  const transactionHeaderBytes1 = protobuf.TransactionHeader.encode({
    familyName: familyName,
    familyVersion: familyVersion,
    inputs: inputAddressList,
    outputs: outputAddressList,
    signerPublicKey: signer.getPublicKey().asHex(),
    nonce: "" + Math.random(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: hash(payloadBytes1),
  }).finish();
  /**
   * Creating Transaction header for Transaction2
   */
  const transactionHeaderBytes2 = protobuf.TransactionHeader.encode({
    familyName: familyName,
    familyVersion: familyVersion,
    inputs: inputAddressList,
    outputs: outputAddressList,
    signerPublicKey: signer.getPublicKey().asHex(),
    nonce: "" + Math.random(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: hash(payloadBytes2),
  }).finish();
  /**
   * Creating Transaction header for Transaction3
   */
  const transactionHeaderBytes3 = protobuf.TransactionHeader.encode({
    familyName: familyName,
    familyVersion: familyVersion,
    inputs: inputAddressList,
    outputs: outputAddressList,
    signerPublicKey: signer.getPublicKey().asHex(),
    nonce: "" + Math.random(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: hash(payloadBytes3),
  }).finish();
  /**
   * Creating Transaction header for Transaction4
   */
  const transactionHeaderBytes4 = protobuf.TransactionHeader.encode({
    familyName: familyName,
    familyVersion: familyVersion,
    inputs: inputAddressList,
    outputs: outputAddressList,
    signerPublicKey: signer.getPublicKey().asHex(),
    nonce: "" + Math.random(),
    batcherPublicKey: signer.getPublicKey().asHex(),
    dependencies: [],
    payloadSha512: hash(payloadBytes4),
  }).finish();
  /**
   * Creating Transaction 1
   */
  const transaction1 = protobuf.Transaction.create({
    header: transactionHeaderBytes1,
    headerSignature: signer.sign(transactionHeaderBytes1),
    payload: payloadBytes1
  });
  /**
   * Creating Transaction 2
   */
  const transaction2 = protobuf.Transaction.create({
    header: transactionHeaderBytes2,
    headerSignature: signer.sign(transactionHeaderBytes2),
    payload: payloadBytes2
  });
  /**
   * Creating Transaction 3
   */
  const transaction3 = protobuf.Transaction.create({
    header: transactionHeaderBytes3,
    headerSignature: signer.sign(transactionHeaderBytes3),
    payload: payloadBytes3
  });
  /**
   * Creating Transaction 4
   */
  const transaction4 = protobuf.Transaction.create({
    header: transactionHeaderBytes4,
    headerSignature: signer.sign(transactionHeaderBytes4),
    payload: payloadBytes4
  });
  /**
   * Combining All transactions
   */
  const transactions = [transaction1, transaction2, transaction3, transaction4];
  /**
   * Creating Batch header
   */
  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: transactions.map((txn) => txn.headerSignature),
  }).finish();
  const batchSignature = signer.sign(batchHeaderBytes);
  /**
   * Creating Batch
   */
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions,
  });
  /**
   * Creating Batchlist
   */
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch]
  }).finish();
  /**
   * Sending encoded batchlist to the validator through restapi
   */
  sendTransaction(batchListBytes);
}

/**
 * @title sendTransaction
 * @notice function to submit the batchListBytes to validator through rest-api port 8008
 * @param {*} batchListBytes Encoded batchlist containg the transactions
 */
async function sendTransaction(batchListBytes) {
  let resp = await fetch('http://rest-api:8008/batches', {
    method: 'POST',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: batchListBytes
  })
  console.log("response", resp);
}

/**
 * Transaction Family names 
 */
FAMILY_NAME = 'Asset'
//FAMILY_NAME1 = 'Validator'

/**
 * Class  
 */
class UserClient {


   async addRegistration(registration, data1, data2, data3, data4, data5) {
    let address = AssetAddress(data1, data2)
    let action = "Add Registration"
    let payload = [action, registration, data2, data3, data4, data5].join(',')
    let assetExistAddress = 'http://rest-api:8008/state/' + address;
    let assetCheck = await fetch(assetExistAddress);
    console.log(assetCheck, "Asset check ")
    let assetCheckJSON = await assetCheck.json();
    console.log(assetCheckJSON.data, "Asset check json data");
    let registrationFlag = 0;
    if (assetCheckJSON.data == "" || assetCheckJSON.data == null) {
      console.log(assetCheckJSON, "Asset check json");
      registrationFlag = 1;
      await createTransaction(FAMILY_NAME, [address], [address], data1, payload)
    }
    else {
      console.log('Registration Already  Exist in this Asset NO:')
    }
    return registrationFlag
  }

  async addTest(test, data1, data2, data3, data4, data5) {
    let action = "Add test"
    let address = AssetAddress(data1, data2)
    let payload = [action, test, data2, data3, data4, data5].join(',')
    let assetExistAddress = 'http://rest-api:8008/state/' + address;
    let assetCheck = await fetch(assetExistAddress);
    console.log(assetCheck, "asset check ")
    let assetCheckJSON = await assetCheck.json();
    console.log(assetCheckJSON.data, "asset check json data");
    let testFlag = 0;
    if (assetCheckJSON.data == "" || assetCheckJSON.data == null) {
      console.log(assetCheckJSON, "asset check json");
      testFlag = 1;
      await createTransaction(FAMILY_NAME, [address], [address], data1, payload)
    }
    else {
      console.log('test Already  Exist in this idhis, NO:')
    }
    return testFlag
  }

   async addMechanic(mechanic, data1, data2, data3, data4, data5) {
    let action = "Add mechanic"
    let address = AssetAddress(data1, data2)
    let payload = [action, mechanic, data2, data3, data4, data5].join(',')
    let assetExistAddress = 'http://rest-api:8008/state/' + address;
    let assetCheck = await fetch(assetExistAddress);
    console.log(assetCheck, "asset check ")
    let assetCheckJSON = await assetCheck.json();
    console.log(assetCheckJSON.data, "asset check json data");
    let mechanicFlag = 0;
    if (assetCheckJSON.data == "" || assetCheckJSON.data == null) {
      console.log(assetCheckJSON, "asset check json");
      mechanicFlag = 1;
      await createTransaction(FAMILY_NAME, [address], [address], data1, payload)
    }
    else {
      console.log('mechanic Already  Exist in this Asset NO:')
    }
    return mechanicFlag
  }



 
     async deleteData(deleteState, data1, data2) {
        let action = "Delete State"
        let address = AssetAddress(data1, data2)
        let payload = [action, deleteState, data2].join(',')
        let assetExistAddress = 'http://rest-api:8008/state/' + address;
        let assetCheck = await fetch(assetExistAddress);
        console.log(assetCheck, "asset check ")
        let assetCheckJSON = await assetCheck.json();
        console.log(assetCheckJSON.data, "asset check json data");
        let deleteFlag = 0;
        if (assetCheckJSON.data != "" || assetCheckJSON.data != null) {
          console.log(assetCheckJSON, "asset check json");
          deleteFlag = 1;
          await createTransaction(FAMILY_NAME, [address], [address], data1, payload)
        }
        else {
          console.log('asset Does Not Exist in this Assetid:')
        }
        return deleteFlag
      }


  async result(data1, data2) {
    console.log("result...Private Key and asset...from UserClient " + data1, data2);
    let address = AssetAddress(data1, data2)
    console.log("result (address) from UserClient " + address);
    if (data1 != " " || data1 != null) {
      console.log("Going to fetch Data From Address ");
      var geturl = 'http://rest-api:8008/state/' + address
      console.log("Getting from: " + geturl);
      let response = await fetch(geturl, {
        method: 'GET',
      })
      console.log(response);
      let responseJson = await response.json();
      console.log(responseJson);
      var data = responseJson.data;
      console.log(data + " data obtained from State Address");
      if (data == undefined) {
        console.log("Data Obtained is Undefined");
        var newdata1 = 1;
        return newdata1
      }
       else {
        var newdata = Buffer.from(data, 'base64').toString();
        console.log("Data Obtained from state successfully and is " + newdata);
        return newdata;
      }
    }
    else {
      console.log('Enter valid private key and idhis, no:')
    }
  }

   async transactionReceipt(data1) {
    console.log("transactionID from UserClient" + data1);
    if (data1 != " " || data1 != null) {
      var getTransactionReceipt = 'http://rest-api:8008/receipts?id=' + data1
      console.log("Getting from: " + getTransactionReceipt);
      let response = await fetch(getTransactionReceipt, {
        method: 'GET',
      })
      console.log(response);
      let responseJson = await response.json();
      console.log("Response Json Obtained " + responseJson);
      // var data = JSON.stringify(responseJson);
      var responseData1 = responseJson.data[0].data[0];
      var responseData2 = responseJson.data[0].data[1];
      console.log(responseData1 + " responsedata1");
      console.log(responseData2 + " responsedata2");
      if (responseData1 == undefined) {
        console.log("responseData1 is Undefined ");
        var newdata1 = 1;
        return newdata1
      }
      else if (responseData2 == undefined) {
        console.log("responseData2 is undefined but got responseData1 ");
        var newdata = Buffer.from(responseData1, 'base64').toString();
        console.log("newdata returning..." + newdata);
        return newdata;
      }
      else {
        console.log("Got responseData1 and responseData2 ");
        var newdata1 = Buffer.from(responseData1, 'base64').toString();
        var newdata2 = Buffer.from(responseData2, 'base64').toString();
        console.log("newdata1 is returning..." + newdata1);
        console.log("newdata2 is returning..." + newdata2);
        var newdata = newdata1 + newdata2;
        return newdata;
      }
    }
  }

  async transactionID() {
    var getTransactionList = 'http://rest-api:8008/blocks'
    console.log("Getting from: " + getTransactionList);
    let response = await fetch(getTransactionList, {
      method: 'GET',
    })
    console.log(response);
    let responseJson = await response.json();
    console.log(responseJson);
    var data = responseJson.data[0].batches[0].header.transaction_ids;
    var dataList = JSON.stringify(data);
    console.log("Response Data listing Latest Transaction Id " + data);
    console.log("String of Transaction Id " + dataList);
    if (dataList == undefined) {
      console.log("Obtained Undefined Data");
      var newdata1 = 1;
      return newdata1
    } else {
      console.log("Obtained transaction Id ");
      var newdata = dataList;
      console.log("Returning Transaction Id " + newdata);
      return newdata;
    }
  }



}
module.exports = { UserClient };
