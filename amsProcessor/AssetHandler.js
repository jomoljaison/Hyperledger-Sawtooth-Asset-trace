
const { TransactionHandler } = require('sawtooth-sdk/processor/handler')
const crypto = require('crypto');
const { TextEncoder, TextDecoder } = require('text-encoding/lib/encoding')
const { InvalidTransaction, InternalError } = require('sawtooth-sdk/processor/exceptions')

const FAMILY_NAME = 'Asset';
const NAMESPACE = hash(FAMILY_NAME).substring(0, 6);

var encoder = new TextEncoder('utf8')
var decoder = new TextDecoder('utf8')

function hash(v) {
    return crypto.createHash('sha512').update(v).digest('hex');
}


 function AssetDataAddress(assetno, publicKeyHex) {
    let keyHash = hash(publicKeyHex)
    let nameHash = hash("Asset")
    let assetnoHash = hash(assetno)
    return nameHash.slice(0, 6) + assetnoHash.slice(0, 6) + keyHash.slice(0, 58)
}


 function writeToStore(context, address, msg) {

    let msg_eve = msg[2];
    let msg_eve_lower = msg_eve.toLowerCase();
    let msgB = encoder.encode(msg_eve_lower)
    attribute = [['model', msg_eve_lower.toString()]]
    context.addEvent('Asset/WordMatch', attribute, msgB)
   
    context.addReceiptData(Buffer.from("New Asset Data Entered successfully.............", 'utf8'));
   
    msgBytes = encoder.encode(msg)
    let enteries = {
        [address]: msgBytes
    }
    return context.setState(enteries);
}

 function writeToStoreMiddle(context, address, msg) {
    return context.getState([address]).then(function (stateKeyValueAddress) {
        console.log("state Address Value ", JSON.stringify(stateKeyValueAddress));
        var previous_data = 0;
        previous_data = stateKeyValueAddress[address];
        console.log('previous data= ', previous_data);
        if (previous_data == '' || previous_data == null) {
            console.log("No previous data,creating new data");

            context.addReceiptData(Buffer.from("Initial Entry of asset's Middle Department Data successfully....", 'utf8'));
            
            let msgBytes = encoder.encode(msg);
            let entries = {
                [address]: msgBytes
            }
            return context.setState(entries);
        }
        else {
          
            context.addReceiptData(Buffer.from("Asset's Middle Department Data Entered successfully....", 'utf8'));
            
            let message = previous_data + "---" + msg;
            let msgBytes = encoder.encode(message);
            console.log("message ", message);
            let entries = {
                [address]: msgBytes
            }
            return context.setState(entries);
        }
    })
}




 function registration(context, assetno, name, model, date, sign) {
    let asset_Address = AssetDataAddress(assetno, sign)
    let asset_detail = [assetno, name, model, date]
    return context.getState([asset_Address]).then(function (data) {
        console.log("data ", data)
        if (data[asset_Address] == null || data[asset_Address] == "" || data[asset_Address] == []) {
            
            context.addReceiptData(Buffer.from("New asset of assetno No : " + assetno + " Registering..........", 'utf8'));
            return writeToStore(context, asset_Address, asset_detail)
        }
        else {
            throw new InvalidTransaction("Already Registered with assetno no: " + assetno);
        }
    })
}

function test(context, assetno, condition, company, date, sign) {
    let asset_Address = assetDataAddress(assetno, sign)
    let asset_detail = [assetno, condition, company, date]
    return context.getState([asset_Address]).then(function (data) {
        console.log("data ", data)
        if (data[asset_Address] == null || data[asset_Address] == "" || data[asset_Address] == []) {
          
            context.addReceiptData(Buffer.from("New asset of assetno No : " + assetno + " test Details Entering.........", 'utf8'));
            return writeToStore(context, asset_Address, asset_detail)
        }
        else {
            throw new InvalidTransaction("test details Already entered with assetno no: " + assetno);
        }
    })
}


function mechanic(context, assetno, condition, company, date, sign) {
    let asset_Address = assetDataAddress(assetno, sign)
    let asset_detail = [assetno, condition, company, date]
    return context.getState([asset_Address]).then(function (data) {
        console.log("data", data)
        if (data[asset_Address] == null || data[asset_Address] == "" || data[asset_Address] == []) {
        
            context.addReceiptData(Buffer.from("New asset of assetno No : " + assetno + " Insurance Details Entering..........", 'utf8'));
            return writeToStore(context, asset_Address, asset_detail)
        }
        else {
            throw new InvalidTransaction("mechanic details already exists with assetno no: " + assetno);
        }
    })
}

 function deleteData(context, assetno, sign) {
    console.log("assetno " + assetno);
    console.log("sign " + sign);
    let asset_Address = AssetDataAddress(assetno, sign)
    console.log("asset Details Address " + asset_Address)
    console.log("data deletion progressing");
    return context.getState([asset_Address]).then(function (data) {
        console.log("data ", data)
        if (data[asset_Address] == null || data[asset_Address] == "" || data[asset_Address] == []) {
            throw new InvalidTransaction("No such state exists to delete details")
        }
        else {
           
            context.addReceiptData(Buffer.from("Deleting Data of asset with Asset NO : " + assetno + "---------", 'utf8'));
            return context.deleteState([asset_Address])
        }
    })
}



class AssetHandler extends TransactionHandler {
    constructor() {
        super(FAMILY_NAME, ['1.0'], [NAMESPACE]);
    }

    apply(transactionProcessRequest, context) {
      
        let payloadBytes = decoder.decode(transactionProcessRequest.payload)
        console.log("payloadbytes ", payloadBytes);
       
        let sign = transactionProcessRequest.header.signerPublicKey
        console.log("signing Public key " + sign);
        let payload = payloadBytes.toString().split(',')
        console.log("payload ", payload);
        let action = payload[0];
        console.log("action ", action);
    
        if (action === "Add Registration") {
            return registration(context, payload[2], payload[3], payload[4], payload[5], sign)
        }
        
        else if (action === "Add Test") {
            return test(context, payload[2], payload[3], payload[4], payload[5], sign)
        }

        else if (action === "Add Mechanic") {
            return mechanic(context, payload[2], payload[3], payload[4], payload[5], sign)
        }
      
        else if (action === "Delete State") {
            return deleteData(context, payload[2], sign)
        }
                else if (action === "") {
            throw new InvalidTransaction("Action is Required")
        }
    }
}
module.exports = AssetHandler;







