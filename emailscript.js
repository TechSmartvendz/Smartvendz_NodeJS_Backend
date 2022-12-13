require('dotenv').config();
require("./db/conn");
const nodemailer = require('nodemailer');
const Product = require("./models/product");


// auth
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD
  }
});



async function add(x, y,z,m) {

  
    
    var empdata = x;
    var prodata = y;
    var pdata=z;
    var mdata=m;
   
  


     console.log(empdata.email);
     console.log(empdata.manager_email);
    // console.log("" + prodata.tid + "|" + prodata.titem + "|" + prodata.teid + "|" + prodata.tdate + "|" + prodata.ttime + "|" + prodata.tstatus + "|" + prodata.tserial + "|" + prodata.price + "|" + empdata.card_number + "|");

    // declare vars
    let fromMail = process.env.SENDER_EMAIL;
    let toMail = "" + empdata.email + "," + empdata.manager_email;

    // let toMail = 'gnbaviskar2@gmail.com,gnbaviskar3@gmail.com';

    let subject = 'Snaxmart Item Purchase Report';
    //<img style="margin-left: 436px;width: 179px;" src="http://13.233.20.108/logo" alt="Snaxsmart-Logo">
    let html = `<div style="margin-left: 20px;" ">
 
  <p style="font-size: 16px;">Dear<span style="font-weight: 600;"> Associate,</span></p>
  <br><span></span>
  <span style="font-size: 16px;">Receipt for Vending Machine Transaction</span>
  <br><br><br><div>
      <ul style="list-style-type: none;
      margin: 0;
      padding: 0">
          <li style="margin-top: 10px;
          margin-bottom: 10px;
          font-size: 18px;"><span style="font-weight: 600;">Billed to</span> :${empdata.employee_id}</li>
          <li style="margin-top: 10px;
          margin-bottom: 10px;
          font-size: 18px;"><span style="font-weight: 600;">Card Number</span> : ${empdata.card_number}</li>
          <li style="margin-top: 10px;
          margin-bottom: 10px;
          font-size: 18px;"><span style="font-weight: 600;">Name</span> : ${empdata.employee_name}</li>
          <li style="margin-top: 10px;
          margin-bottom: 10px;
          font-size: 18px;"><span style="font-weight: 600;">Purchase Date</span> : ${prodata.tdate} ${prodata.ttime}</li>
          <li style="margin-top: 10px;
          margin-bottom: 10px; 
          font-size: 18px;"><span style="font-weight: 600;">Transaction Machine</span> : ${mdata.machine_id} </li>
          <li style="margin-top: 10px;
          margin-bottom: 10px;
          font-size: 18px;"><span style="font-weight: 600;">Location</span> : ${mdata.install_location}</li>
        </ul>
  </div>
  <br>
  <div style="border: 1px solid black;border-radius: 10px;border-top: 10px solid #399f17;width: fit-content;padding: 30px;">
  <table style="padding: 0px;">
      <thead style="padding: 0px;">
          <tr style="padding: 0px;">
              <th style="background-color: #399f17;padding: 10px;color: rgb(255, 255, 255);" >ITEMS</th>
              <th style="background-color: #399f17;padding: 10px;color: rgb(255, 255, 255);" >ITEM DESCRIPTION</th>
              <th style="background-color: #399f17;padding: 10px;color: rgb(255, 255, 255);" >SLOT</th>
              <th style="background-color: #399f17;padding: 10px;color: rgb(255, 255, 255);">COST IN INR</th>
            
  
          </tr>
      </thead>
      <tbody style="padding: 0px;">
          <tr style="padding: 0px;">
              <td  style=" background-color: #d7d7d7;
              align-items: center;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font-weight: bold;"data-label="ITEMS#" >1</td>
              <td  style=" background-color: #d7d7d7;
              align-items: center;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font-weight: bold;" data-label="ITEM DESCRIPTION" >${pdata.item_description}</td>
              <td  style=" background-color: #d7d7d7;
              align-items: center;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font-weight: bold;"  data-label="SLOT"  >${pdata.slote_number}</td>
              <td  style=" background-color: #d7d7d7;
              align-items: center;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font-weight: bold;"  data-label="COST IN INR" >${pdata.item_price} INR.</td>
             
          </tr>
      </tbody>
  
  </table>
  <p style="font-size: 16px;"> Please retain this email for your records- <br>
      system email, do not reply
      <br>Thank you
  </p>
  </div>
  </div>`;
  


    // email options
    let mailOptions = {
      from: fromMail,
      to: toMail,
      subject: subject,
      html: html
    };

    // send email
    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
      }else{
      console.log(`\nEmailStatus:{${response.response}} to {${empdata.email},${empdata.manager_email}} for {${prodata._id}}`);
      }
    });

  
  }


  async function pendingconfirm(x) {

  
    
    var pendingdata = x;
  
   
  


     console.log(pendingdata.email);
     console.log(pendingdata.manager_email);
    // console.log("" + prodata.tid + "|" + prodata.titem + "|" + prodata.teid + "|" + prodata.tdate + "|" + prodata.ttime + "|" + prodata.tstatus + "|" + prodata.tserial + "|" + prodata.price + "|" + empdata.card_number + "|");

    // declare vars
    let fromMail = process.env.SENDER_EMAIL;
    let toMail = "" + pendingdata.email + "," + pendingdata.manager_email;

    // let toMail = 'gnbaviskar2@gmail.com,gnbaviskar3@gmail.com';

    let subject = 'Snaxmart Item Purchase Report';
    
    //<img style="margin-left: 436px;width: 179px;" src="http://13.233.20.108/logo" alt="Snaxsmart-Logo">
    let html = `<div style="margin-left: 20px;" ">
 
  <p style="font-size: 16px;">Dear<span style="font-weight: 600;"> Associate,</span></p>
  <br><span></span>
  <span style="font-size: 16px;">Receipt for Vending Machine Transaction</span>
  <br><br><br><div>
      <ul style="list-style-type: none;
      margin: 0;
      padding: 0">
          <li style="margin-top: 10px;
          margin-bottom: 10px;
          font-size: 18px;"><span style="font-weight: 600;">Billed to</span> :${pendingdata.employee_id}</li>
          <li style="margin-top: 10px;
          margin-bottom: 10px;
          font-size: 18px;"><span style="font-weight: 600;">Card Number</span> : ${pendingdata.card_number}</li>
          <li style="margin-top: 10px;
          margin-bottom: 10px;
          font-size: 18px;"><span style="font-weight: 600;">Name</span> : ${pendingdata.employee_name}</li>
          <li style="margin-top: 10px;
          margin-bottom: 10px;
          font-size: 18px;"><span style="font-weight: 600;">Purchase Date</span> : ${pendingdata.tdate} ${pendingdata.ttime}</li>
          <li style="margin-top: 10px;
          margin-bottom: 10px; 
          font-size: 18px;"><span style="font-weight: 600;">Transaction Machine</span> : ${pendingdata.machine_id} </li>
          <li style="margin-top: 10px;
          margin-bottom: 10px;
          font-size: 18px;"><span style="font-weight: 600;">Location</span> : ${pendingdata.install_location}</li>
        </ul>
  </div>
  <br>
  <div style="border: 1px solid black;border-radius: 10px;border-top: 10px solid #399f17;width: fit-content;padding: 30px;">
  <table style="padding: 0px;">
      <thead style="padding: 0px;">
          <tr style="padding: 0px;">
              <th style="background-color: #399f17;padding: 10px;color: rgb(255, 255, 255);" >ITEMS</th>
              <th style="background-color: #399f17;padding: 10px;color: rgb(255, 255, 255);" >ITEM DESCRIPTION</th>
              <th style="background-color: #399f17;padding: 10px;color: rgb(255, 255, 255);" >SLOT</th>
              <th style="background-color: #399f17;padding: 10px;color: rgb(255, 255, 255);">COST IN INR</th>
            
  
          </tr>
      </thead>
      <tbody style="padding: 0px;">
          <tr style="padding: 0px;">
              <td  style=" background-color: #d7d7d7;
              align-items: center;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font-weight: bold;"data-label="ITEMS#" >1</td>
              <td  style=" background-color: #d7d7d7;
              align-items: center;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font-weight: bold;" data-label="ITEM DESCRIPTION" >${pendingdata.item_description}</td>
              <td  style=" background-color: #d7d7d7;
              align-items: center;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font-weight: bold;"  data-label="SLOT"  >${pendingdata.slote_number}</td>
              <td  style=" background-color: #d7d7d7;
              align-items: center;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font-weight: bold;"  data-label="COST IN INR" >${pendingdata.item_price} INR.</td>
             
          </tr>
      </tbody>
  
  </table>
  <p style="font-size: 16px;"> Please retain this email for your records- <br>
      system email, do not reply
      <br>Thank you
  </p>
  </div>
  </div>`;
  let html2="<h1>Hello</H1>";

    // email options
    let mailOptions = {
      from: fromMail,
      to: toMail,
      subject: subject,
      html:html
    };

    // send email
    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
      }else{
      console.log(`\nEmailStatus:{${response.response}} to {${pendingdata.email},${pendingdata.manager_email}} for {${pendingdata.transaction_id}`);
      }
    });

  
  }


async function juniperEmail(x) {
    var pendingdata = x;
    console.log(x);
    console.log(pendingdata.email);
    console.log(pendingdata.manager_email);
    // console.log("" + prodata.tid + "|" + prodata.titem + "|" + prodata.teid + "|" + prodata.tdate + "|" + prodata.ttime + "|" + prodata.tstatus + "|" + prodata.tserial + "|" + prodata.price + "|" + empdata.card_number + "|");
    // declare vars
    let fromMail = process.env.SENDER_EMAIL;
    let toMail = "" + pendingdata.email + "," + pendingdata.manager_email;
    // let toMail = 'gnbaviskar2@gmail.com,gnbaviskar3@gmail.com';
    let subject = 'JUNIPER: Item Purchase Report';
    //<img style="margin-left: 436px;width: 179px;" src="http://13.233.20.108/logo" alt="Snaxsmart-Logo">
    let html =
        `<div>

        <p style=" font-size: 16px;">Dear<span style="font-weight: 600;"> Associate,</span></p>
        <br><span></span>
        <span style="font-size: 15px;">Receipt for Vending Machine Transaction</span>
        <br>
        <br>
        <div
            style='width:780px;height:590px;background-color:#fffff;background-image:url("https://smartvendz.com/images/juniper/img.jpg"); background-size: cover;background-repeat: no-repeat;padding-top: 130px;'>
    
            <span style="font-size: 20px;font-weight: 600;
        text-decoration: underline;color: #666;">Your Purchase Receipt</span>
            <br><br>
            <table >
                <tbody>
                    <tr style="font-size:1x">
                        <td>
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td style="border:solid #c4c4c4 1.0pt;background:#3493c1;padding: 15px;">
                                            <p class="MsoNormal"><strong><span
                                                        style="font-family:&quot;Arial&quot;,sans-serif;color:white">Billed
                                                        To</span></strong><span
                                                    style="font-family:&quot;Arial&quot;,sans-serif;color:white"><u></u><u></u></span>
                                            </p>
                                        </td>
    
                                        <td style="border:solid #c4c4c4 1.0pt;background:#3493c1;padding: 15px;">
                                            <p class="MsoNormal"><strong><span
                                                        style="font-family:&quot;Arial&quot;,sans-serif;color:white">Receipt Date</span></strong><span
                                                    style="font-family:&quot;Arial&quot;,sans-serif;color:white"><u></u><u></u></span>
                                            </p>
                                        </td>
                                        <td style="border:solid #c4c4c4 1.0pt;background:#3493c1;padding: 15px;">
                                            <p class="MsoNormal"><strong><span
                                                        style="font-family:&quot;Arial&quot;,sans-serif;color:white">Item
                                                        Description</span></strong><span
                                                    style="font-family:&quot;Arial&quot;,sans-serif;color:white"><u></u><u></u></span>
                                            </p>
                                        </td>
                                        <td style="border:solid #c4c4c4 1.0pt;background:#3493c1;padding: 15px;">
                                            <p class="MsoNormal"><strong><span
                                                        style="font-family:&quot;Arial&quot;,sans-serif;color:white">Item
                                                        Slot</span></strong><span
                                                    style="font-family:&quot;Arial&quot;,sans-serif;color:white"><u></u><u></u></span>
                                            </p>
                                        </td>
                                      
                                        <td style="border:solid #c4c4c4 1.0pt;background:#3493c1;padding: 15px;">
                                            <p class="MsoNormal"><strong><span
                                                        style="font-family:&quot;Arial&quot;,sans-serif;color:white">Cost in
                                                        INR</span></strong><span
                                                    style="font-family:&quot;Arial&quot;,sans-serif;color:white"><u></u><u></u></span>
                                            </p>
                                        </td>
                                        <td style="border:solid #c4c4c4 1.0pt;background:#3493c1;padding: 15px;">
                                            <p class="MsoNormal"><strong><span
                                                        style="font-family:&quot;Arial&quot;,sans-serif;color:white">Quantity</span></strong><span
                                                    style="font-family:&quot;Arial&quot;,sans-serif;color:white"><u></u><u></u></span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr style="height:45.0pt">
                                        <td style="border:solid #c4c4c4 1.0pt;background:#f2f2f2;">
                                            <p class="MsoNormal"><span
                                                    style="font-size:9.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black">${pendingdata.email}<u></u><u></u></span>
                                            </p>
                                        </td>
    
                                        <td style="border:solid #c4c4c4 1.0pt;background:#f2f2f2;">
                                            <p class="MsoNormal"><span
                                                    style="font-size:9.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black">
                                                    ${pendingdata.tdate} ${pendingdata.ttime}<u></u><u></u></span>
                                            </p>
                                        </td>
    
                                        <td style="border:solid #c4c4c4 1.0pt;background:#f2f2f2;">
                                            <p class="MsoNormal"><span
                                                    style="font-size:9.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black">${pendingdata.item_description}<u></u><u></u></span>
                                            </p>
                                        </td>
                                        <td style="border:solid #c4c4c4 1.0pt;background:#f2f2f2;">
                                            <p class="MsoNormal"><span
                                                    style="font-size:9.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black">${pendingdata.slote_number}<u></u><u></u></span>
                                            </p>
                                        </td>
                                        <td style="border:solid #c4c4c4 1.0pt;background:#f2f2f2;">
                                            <p class="MsoNormal"><span
                                                    style="font-size:9.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black">₹
                                                    ${pendingdata.item_price} INR.<u></u><u></u></span></p>
                                        </td>
                                        <td style="border:solid #c4c4c4 1.0pt;background:#f2f2f2;">
                                            <p class="MsoNormal"><span
                                                    style="font-size:9.0pt;font-family:&quot;Arial&quot;,sans-serif;color:black">1
                                                    <u></u><u></u></span></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="border:none;">
                            <br>
                            <p><span style="font-style: italic;font-size:11.5pt;font-family:&quot;Arial&quot;,sans-serif;color: #646464">**Please
                                    note the above item was charged to your department. If you no longer need the item,
                                    please return to IT Connect Center immediately. Please be informed that above price is
                                    inclusive of 10% markup to the MRP.</span></p>
                            <p><b><span style="font-size:11.5pt;font-family:&quot;Arial&quot;,sans-serif;color: #515151;margin-left: 60px;" >If you have any other questions,
                                        please contact the Helpdesk:<br></span></b></p>
                            <p><b><span style="font-size:11.5pt;font-family:&quot;Arial&quot;,sans-serif;color: #515151;margin-left: 160px;">Via the Web:<u></u><u></u></span></b><span
                                    style="font-size:11.5pt;font-family:&quot;Arial&quot;,sans-serif"><a href="https://helpdesk.juniper.net"
                                        target="_blank"> https://helpdesk.juniper.net</a><u></u><u></u></span></p>
    
                            <p><b><span style="font-size:11.5pt;font-family:&quot;Arial&quot;,sans-serif;color: #515151;margin-left: 160px;"> Phone: (India Toll Free
                                    24x7) : <u></u><u></u></span></b>0008001091018</p>
    
                            <p><b><span style="font-size:11.5pt;font-family:&quot;Arial&quot;,sans-serif;color: #515151;margin-left: 160px;">Visit IT
                                    Connect : <u></u><u></u></span></b>Bangalore Elnath Building, 3rd Floor Room</p>
                                    <br><br><br>
                            <p><span style="font-size:11.5pt;font-family:&quot;Arial&quot;,sans-serif;color: #515151">Thank you,<br><br>Juniper IT - End User
                                    Services<u></u><u></u></span></p>
                                   
                            <p align="center" style="text-align:center"><span
                                    style="font-size:11.5pt;font-family:&quot;Arial&quot;,sans-serif"><a href="https://core.juniper.net/it/"
                                        target="_blank"
                                        data-saferedirecturl="https://www.google.com/url?q=https://core.juniper.net/it/&amp;source=gmail&amp;ust=1655439927644000&amp;usg=AOvVaw2lq6jToEdZV4rd9BjgzIQ_"><b>Core
                                            Intranet - IT Central</b></a><u></u><u></u></span></p>
                        </td>
                    </tr>
                
                </tbody>
            </table>
        </div>`;
    let html2 = "<h1>Hello</H1>";
    // email options
    let mailOptions = {
        from: fromMail,
        to: toMail,
        subject: subject,
        html: html
    };
    // send email
    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`\nEmailStatus:{${response.response}} to {${pendingdata.email},${pendingdata.manager_email}} for {${pendingdata.transaction_id}`);
        }
    });
}



function registerNotification(x, y) {
  
    var empdata = x;
    var password = y;
    //console.log(empdata.email);
    //console.log(empdata.contact_person_email);
    //console.log(""+prodata.tid+"|"+prodata.titem+"|"+prodata.teid+"|"+prodata.tdate+"|"+prodata.ttime+"|"+prodata.tstatus+"|"+prodata.tserial+"|"+prodata.price+"|"+empdata.card_number+"|");

    // declare vars
    let fromMail = 'vendingreceipt@snaxsmart.com';
    let toMail = "" + empdata.contact_person_email + ",kuldeep@smartvendz.com";



    let subject = 'User Registered and Password Reset Link';
    let html = `<p><span>Hey,</span><br><span style="font-weight: 600;">${empdata.contact_person_name}</span><br><br><br>
              You are Register as ${empdata.role} and your login email "<span style="font-weight: 600;">${empdata.contact_person_email}</span>" and one time login password is "<span style="font-weight: 600;">${password}</span>".
              <br>Use given below link and one time loging password reset your New password.
              <br> Link : http://13.233.20.108/ </p>`;


    // email options
    let mailOptions = {
      from: fromMail,
      to: toMail,
      subject: subject,
      html: html
    };

    // send email
    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
      }else {
      console.log(`RegisterEmail:{${response.response}} to {${response.accepted}}`);
    }
    });
 
 
}

function otpsend(x, y) {
  console.log("~~~~~~~~~~~~~~~~~~~~Email Script~~~~~~~~~~~~~~~~~~~~~~~");
  var empdata = x;
  var otp = y;

  console.log(empdata.contact_person_email);


  // declare vars
  let fromMail = 'vendingreceipt@snaxsmart.com';
  let toMail = "" + empdata.contact_person_email + ",kuldeep@smartvendz.com";
  let subject = 'OTP for Forget Password';
  let html = `<p><span>Hey,</span><br><span style="font-weight: 600;">${empdata.contact_person_name}</span><br><br>
              Your One Time Password is : <h1> ${otp}<h1> `;


  // email options
  let mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    html: html
  };

  // send email
  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    }

    console.log(response);
    return true;
  });


}

module.exports = { add, otpsend, registerNotification, pendingconfirm,juniperEmail};
