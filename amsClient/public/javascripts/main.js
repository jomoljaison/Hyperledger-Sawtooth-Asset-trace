
 const reg_ky= "f2a85a63d0d1a219599256720ae60dffd23ca115a06ee4ac4ec39fcb6d5e7387";
 const test_ky="a77ad1beaddb5b0d936b1e782ca544cdfe8311536ffcf2d698fce16c670041cf";
 const mech_ky="b1acab76c3f82f8b5d9bc0b0e453b80e058d3985b42002449efabe99658cb09d";
 
 
 function registrationDepartment(event) {
    event.preventDefault();
    const data1 = document.getElementById('private1').value
    const data2 = document.getElementById('asset1').value
    const data3 = document.getElementById('name1').value
    const data4 = document.getElementById('make1').value
    const data5 = document.getElementById('date1').value
    console.log(data1);
    console.log(data2);
    console.log(data3);
    console.log(data4);
    console.log(data5);
    if (data1.length == 0 || data2.length == 0 || data3.length == 0 || data4.length == 0 || data5.length == 0) {
        alert("Please Fill The Form Completely");
    }
    else if (data1 === reg_ky)
    {
            $.post('/registration', { write1: data1, write2: data2, write3: data3, write4: data4, write5: data5 }, function (data) {
            if (data.status != 202) {
                alert(data.message);
            }
        }, 'json');
    }
}


 function testDepartment(event) {
    event.preventDefault();
    const data1 = document.getElementById('private2').value
    const data2 = document.getElementById('asset2').value
    const data3 = document.getElementById('condition2').value
    const data4 = document.getElementById('company2').value
    const data5 = document.getElementById('date2').value
    console.log(data1);
    console.log(data2);
    console.log(data3);
    console.log(data4);
    console.log(data5);
    if (data1.length == 0 || data2.length == 0 || data3.length == 0 || data4.length == 0 || data5.length == 0) {
        alert("Please Fill The Form Completely ");
    }
    else if (data1 === test_ky)
    {
        $.post('/test', { write1: data1, write2: data2, write3: data3, write4: data4, write5: data5 }, function (data) {
            if (data.status != 202)
                alert(data.message);
        }, 'json');
    }
}

 function mechanicDepartment(event) {
    event.preventDefault();
    const data1 = document.getElementById('private3').value
    const data2 = document.getElementById('asset3').value
    const data3 = document.getElementById('condition3').value
    const data4 = document.getElementById('company3').value
    const data5 = document.getElementById('date3').value
    console.log(data1);
    console.log(data2);
    console.log(data3);
    console.log(data4);
    console.log(data5);
    if (data1.length == 0 || data2.length == 0 || data3.length == 0 || data4.length == 0 || data5.length == 0) {
        alert("Please Fill The Form Completely")
    }
    else if (data1 === mech_ky)
    {
        $.post('/mechanic', { write1: data1, write2: data2, write3: data3, write4: data4, write5: data5 }, function (data) {
            if (data.status != 202) {
                alert(data.message);
            }
        }, 'json');
    }
}


 function viewData(event) {
    event.preventDefault();
    const data1 = document.getElementById('private5').value
    const data2 = document.getElementById('asset5').value
    console.log(data1);
    console.log(data2);
    if (data1.length == 0 || data2.length == 0) {
        alert("Please Fill The Form Completely")
    }
    else if( data1 === reg_ky || data1 === mech_ky)
   
    {
        console.log("entered into console-------------------------------------------------------")
            $.post('/state', { write1: data1, write2: data2 }, function (data) {
            if (data.status != 202)
                alert("Data of Asset No: " + data2 + " Viewed using key :" + data1)
            document.getElementById("result").value = data.balance;
        }, 'json');
    }
}


 function deleteData(event) {
    event.preventDefault();
    const data1 = document.getElementById('private6').value
    const data2 = document.getElementById('asset6').value
    console.log(data1);
    console.log(data2);
    if (data1.length == 0 || data2.length == 0) {
        alert("Please Fill The Form Completely")
    }
    else {
        $.post('/delete', { write1: data1, write2: data2 }, function (data) {
            if (data.status != 202)
                alert(data.message);
        }, 'json');
    }
}


 function transactionReceiptData(event) {
    event.preventDefault();
    const data1 = document.getElementById('transactionId10').value
    console.log(data1);
    if (data1.length == 0) {
        alert("Please enter the  Transaction ID")
    }
    else {
        $.post('/transactionReceipts', { write1: data1 }, function (data) {
            if (data.status != 202)
                alert("Transaction Receipt Data viewed of Transaction ID :" + data1)
            document.getElementById("result2").value = data.balance;
        }, 'json');
    }
}



 function transactionIdData(event) {
    event.preventDefault();
    $.post('/transactionID', {}, function (data) {
        if (data.status != 202)
            alert("Transaction Id viewed");
        document.getElementById("result3").value = data.balance;
    }, 'json');
}



 function registrationEvent(x) {
    if (x == 0) {
        alert("System Event occured succesfully");
        // location.reload();
    }
}


 if (location.pathname == '/registration') {
    var socket = io("http://localhost:3000");
    var x=0;
    socket.on('Word-Match-Event', () => {
        console.log("socket message recieved");
        registrationEvent(x);
        x=x+1;
    })
}