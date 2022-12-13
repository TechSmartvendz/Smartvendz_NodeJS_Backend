var request = require('request')
var CronJob = require('cron').CronJob;

  

new CronJob('*/15 * * * *', function() {

   
   
  request('http://13.233.20.108/snaxsmart?card=07682&item=A2&date=061021&time=1816&serial=107&status=Rejected&price=14.4', function(error, response, body) {
           console.log(`[1]${response.body} \n[1]error: ${error}`)
    })

    
setTimeout(() => { 
   request('http://13.233.20.108/snaxsmart?card=011175&item=A2&date=061021&time=1816&serial=107&status=Rejected&price=14.4', function(error, response, body) {
        console.log(`[2]${response.body}\n[2]error: ${error}`)
    })
},1000*60*5);

setTimeout(() => { 
   request('http://13.233.20.108/snaxsmart?card=111029&item=A2&date=061021&time=1816&serial=107&status=Rejected&price=14.4', function(error, response, body) {
    console.log(`[3]${response.body}\n[3]error: ${error}`)
    })
},1000*60*9);
    
    console.log(" ................................");
    
}, null, true, "America/Los_Angeles");
