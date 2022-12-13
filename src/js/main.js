
// function callLogOut(){
// console.log("Logout call");
// let x = document.cookie;
// console.log(`cookie = ${x}`);
// document.cookie=document.cookie = "cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// window.location.replace("/");
// }

// window.onload = function() {
//   console.log("window.onload");
//   document.getElementById("").addEventListener('click', callLogOut);
  
// }

function calltransactionApi() {
    console.log("API RequestRefund call ")
    fetch("/api/RefundRequestTable")
      .then(response => response.json())
      .then(function(data) {
        console.log(data);
        resstatus=data.status;
        data=data.data;
        var tbl= document.getElementById("table2");
        htmldata="<tr><th>Created Date</th><th>Employee Name</th><th>Contact No.</th><th>Machine No.</th><th>Transaction Date</th><th>Transaction Type</th><th>Total Amount</th><th>Refundable Amount</th><th>Online Transaction Id</th><th>Remark</th></tr>";
       
        i=1;
        if (data.length==0){
          console.log("Transaction not found");
          htmldata="<tr><th>"+data.length+"</th></tr>"; 
        }
        else {
          console.log("data found");
          data.forEach(element => {
            const c = new Date(element.created_date);
            element.created_date=c.toLocaleString();
          // optionhtml='<div class="options"><button id="delete" onclick="deletepro(\''+element._id+'\')" class="btn-option"><i class="fa fa-close"></i></button><button id="edit" class="btn-option"><i class="fa fa-pencil"></i></button></div>';
           htmldata+="<tr><td>"+element.created_date+"</td><td>"+element.ename+"</td><td>"+element.phone+"</td><td>"+element.machine+"</td><td>"+element.tdate+"</td><td>"+element.select+"</td><td>"+element.tamount+"</td><td>"+element.ramount+"</td><td>"+element.transaction_id+"</td><td>"+element.remark+"</td></tr>";
          
           i++;
          });
         
        }
        tbl.innerHTML=htmldata;
      })
      .catch(function(error) {
        // If there is any error you will catch them here
        console.log(error);
      });
  }

function refundsearch() {
    console.log("Call refundSearch");
    start_date = document.getElementById('start_date').value;
    end_date = document.getElementById('end_date').value;
    machine_id = document.getElementById('machine_id').value;
    type = document.getElementById('type').value;
  
    console.log(`${start_date} end :${end_date} item: ${machine_id} ${type}`)
  
    var payload = {
      start_date: document.getElementById('start_date').value,
      end_date: document.getElementById('end_date').value,
      machine_id: document.getElementById('machine_id').value,
      type: document.getElementById('type').value,
    };
    console.log(payload);
    var data;
    data = JSON.stringify(payload);
  
    const apiurl = "/api/RefundRequestReport";
    fetch(apiurl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    })
      .then(response => response.json())
      .then(function (data) {
        console.log(data);
        resstatus = data.status;
        var tbl= document.getElementById("table2");
        if (resstatus=="error"){
          console.log("Transaction not found");
          htmldata="<tr><th>"+data.error+"</th></tr>";
        }else{
        data=data.data;
        htmldata="<tr><th>Created Date</th><th>Employee Name</th><th>Contact No.</th><th>Machine No.</th><th>Transaction Date</th><th>Transaction Type</th><th>Total Amount</th><th>Refundable Amount</th><th>Online Transaction Id</th><th>Remark</th></tr>";
       
        i=1;
        if (data.length==0){
          console.log("Transaction not found");
          htmldata="<tr><th>"+data.length+"</th></tr>"; 
        }
        else {
          console.log("data found");
          data.forEach(element => {
            const c = new Date(element.created_date);
            element.created_date=c.toLocaleString();
          // optionhtml='<div class="options"><button id="delete" onclick="deletepro(\''+element._id+'\')" class="btn-option"><i class="fa fa-close"></i></button><button id="edit" class="btn-option"><i class="fa fa-pencil"></i></button></div>';
           htmldata+="<tr><td>"+element.created_date+"</td><td>"+element.ename+"</td><td>"+element.phone+"</td><td>"+element.machine+"</td><td>"+element.tdate+"</td><td>"+element.select+"</td><td>"+element.tamount+"</td><td>"+element.ramount+"</td><td>"+element.transaction_id+"</td><td>"+element.remark+"</td></tr>";
          
           i++;
          });
         
        }
      }
        tbl.innerHTML=htmldata;
      })
      .catch(function (error) {
        // If there is any error you will catch them here
        console.log(error);
      });
  }