app.post("/napkinvendmachine/response/phonepe", async (req, res) => {
    //console.log(req.params);
    //console.log(req.headers);
    const a = 1000;
    console.log(req.body);
    var tid;
    const saltKey = "e99f19db-e0c5-429e-aacd-50babb81a1bb"
    const saltIndex = 1
    const transactionId = req.body.data.transactionId;
    const merchantId = req.body.data.merchantId;
    const amount = req.body.data.amount;
    console.log(transactionId + " " + merchantId + " " + amount);

    const checksum = cjs.SHA256(merchantId + transactionId + amount + saltKey).toString(cjs.enc.Hex)
    //    console.log("Api checksum: ", checksum);
    xVerify = (checksum + "###" + saltIndex);
    console.log(xVerify);
    try {
        if (xVerify == req.headers['x-verify']) {
            console.log("X-Verify is correct.....")
            if (req.body.data.amount == 1000) {
                var np = false;
                var rf = "NONE";
                var vs = "VendPending";
                console.log("Transaction with Correct Amount Found....");
                const callbackdata = new Callbacktransaction()
                callbackdata.success = req.body.success,
                    callbackdata.code = req.body.code,
                    callbackdata.message = req.body.message,
                    callbackdata.merchantId = req.body.data.merchantId,
                    callbackdata.transactionId = req.body.data.transactionId,
                    callbackdata.providerReferenceId = req.body.data.providerReferenceId,
                    callbackdata.amount = req.body.data.amount,
                    callbackdata.paymentState = req.body.data.paymentState,
                    callbackdata.payResponseCode = req.body.data.payResponseCode,
                    callbackdata.storeId = req.body.data.storeId,
                    callbackdata.terminalId = req.body.data.terminalId,
                    callbackdata.napkinjob = np;
                callbackdata.refundstatus = rf;
                callbackdata.vendstatus = vs;
                let savetransaction = await callbackdata.save();
                console.log(savetransaction);
                console.log("Transation Saved in Database....And New Job add in Jon table...")
                res.status(200).send("success");

            } else {
                const rproviderReferenceId = req.body.data.providerReferenceId;
                const rmerchantId = req.body.data.merchantId;
                console.log("Incorrect amount...................");
                if (req.body.data.amount > a) {
                    console.log("Amount is greater than price....");
                    var ramount = req.body.data.amount - a;
                    console.log(ramount);
                    np = false;
                    rf = "Refund";
                    vs = "VendPending";
                }
                else {
                   
                    console.log("Amount is lesser than price....");
                    var ramount = req.body.data.amount;
                    console.log(ramount);
                    np = true;
                    rf = "Refund";
                    vs = "Invalid Amount Refund Initiated";
                }
               
               
                const callbackdata = new Callbacktransaction()
                callbackdata.success = req.body.success,
                    callbackdata.code = req.body.code,
                    callbackdata.message = req.body.message,
                    callbackdata.merchantId = req.body.data.merchantId,
                    callbackdata.transactionId = req.body.data.transactionId,
                    callbackdata.providerReferenceId = req.body.data.providerReferenceId,
                    callbackdata.amount = req.body.data.amount,
                    callbackdata.paymentState = req.body.data.paymentState,
                    callbackdata.payResponseCode = req.body.data.payResponseCode,
                    callbackdata.storeId = req.body.data.storeId,
                    callbackdata.terminalId = req.body.data.terminalId,
                    callbackdata.napkinjob = np;
                callbackdata.vendstatus = vs;
                callbackdata.refundstatus = rf;
                const savetransaction = await callbackdata.save();
                const tid = savetransaction.id;
                console.log(savetransaction);
                //console.log(a);
               
                console.log("Transaction with Incorrect Amount Found....for Transaction : " + savetransaction.id);
                var refundtry = true ;
                var switchvalue = 0;
              while (refundtry) {
             
                   
                   // console.log(savetransaction.amount);
                    const refund = new Refund()
                    refund.mtransactionId = savetransaction.id
                    const refundSave = await refund.save();
                    rid = refundSave.id;
                    console.log("Refund Transaction Forward Id " + rid);
                    console.log("Refund process START....");
                    //calling PhonePe Refund API//
                    const currentIndex = 0
                    //Configuration
                    const url = "mercury-uat.phonepe.com";
                    const saltKey = "e99f19db-e0c5-429e-aacd-50babb81a1bb"
                    const saltIndex = 1
                    const paths = [
                        '/v3/credit/backToSource'         // POST
                    ]
                    // console.log(req.params.qrCodeId);
                    const decodedRequests = [{
                        "merchantId": rmerchantId,
                        "transactionId": rid,
                        "providerReferenceId": rproviderReferenceId,
                        "amount": ramount,
                        "message": "Incorrect Amount"
                    }
                    ]
                    const path = paths[currentIndex]
                    const decodedRequest = decodedRequests[currentIndex]
                    console.log(decodedRequest);
                    let encodedRequest = decodedRequest === "" ? "" : (Buffer.from(JSON.stringify(decodedRequest)).toString('base64'))
                    generateChecksum(encodedRequest, path, saltKey, saltIndex)
                    function generateChecksum(encodedRequest, path, saltKey, keyIndex) {
                        const cjs = require("crypto-js");
                        const checksum = cjs.SHA256(encodedRequest + path + saltKey).toString(cjs.enc.Hex)
                        console.log("base64 request:", encodedRequest, "Api checksum: ", checksum);
                        xVerify = (checksum + "###" + keyIndex);
                    }
                    if (encodedRequest === "")
                        body1 = "";
                    else
                        body1 = JSON.stringify({ 'request': encodedRequest });


                    const options = {
                        method: 'POST',
                        url: 'https://mercury-uat.phonepe.com/v3/credit/backToSource',
                        // json: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-VERIFY': xVerify,
                        },
                        body: body1
                    };
                    console.log("Request data:");//comment
                    console.log(options);//comment
                    //console.log(`body : ${body}`);
                    request(options, async function (error, response, body) {
                        if (error) {
                            /////////need to handle here if error comes///////
                            console.log(error);//comment
                            console.log("Response error : ")
                            console.log(response)//comment

                        } else {
                            console.log(rid);
                            var data = JSON.parse(body)
                            console.log("Response Body:")//comment
                            console.log(data);//comment
                            console.log("REFUND API RESPONSE: " + data.success);

                          


                            console.log(data.code);
                            switch (data.code) {
                                case 'PAYMENT_SUCCESS':
                                    console.log("Refund Process Completed...")
                                    console.log(rid);
                                     findrefund = await Refund.findOne({ _id: rid });
                                    findrefund.rsuccess = data.success,
                                        findrefund.rcode = data.code,
                                        findrefund.rmessage = data.message,
                                        findrefund.rmerchantId = data.data.merchantId,
                                        findrefund.rtransactionId = tid,
                                        findrefund.rproviderReferenceId = data.data.providerReferenceId,
                                        findrefund.ramount = data.data.amount,
                                        findrefund.rpayResponseCode = data.data.payResponseCode,
                                        findrefund.rstatus = data.data.status
                                      d = await findrefund.save();
                                    console.log("Refund Data.....");
                                    console.log(d);
                                    console.log(refundtry);
                                    refundtry=false;
                                    console.log(refundtry);
                                    res.status(200).send("success");
                                    break;
                                case 'PAYMENT_ERROR':

                                    const refund = new Refund()
                                    refund.mtransactionId = savetransaction.id
                                    const refundSave = await refund.save();
                                    rid = refundSave.id;


                                    console.log("Refund Process Failed...");
                                    console.log(savetransaction.id);
                                   
                                    console.log(rid);
                                    findrefund = await Refund.findOne({ _id: rid });
                                    findrefund.rsuccess = data.success,
                                        findrefund.rcode = data.code,
                                        findrefund.rmessage = data.message,
                                        findrefund.rmerchantId = data.data.merchantId,
                                        findrefund.rtransactionId = tid,
                                        findrefund.rproviderReferenceId = data.data.providerReferenceId,
                                        findrefund.ramount = data.data.amount,
                                        findrefund.rpayResponseCode = data.data.payResponseCode,
                                        findrefund.rstatus = data.data.status
                                     d = await findrefund.save();
                                    console.log("Refund Data.....");
                                    //console.log(d);
                                        console.log(d);
                                        console.log(refundtry);
                                        refundtry=3;
                                        console.log(refundtry);
                                       
                                    break;


                                    case "INTERNAL_SERVER_ERROR":
                                    case "TIMED_OUT":
                                    case "PAYMENT_PENDING":
                                        
                                        console.log("Refund Process status : "+data.data.code);
                                             np = true;
                                             rf = "REFUND_FAIL";
                                             console.log(rid);
                                        findrefund = await Refund.findOne({ _id: rid });
                                        findrefund.rsuccess = data.success,
                                            findrefund.rcode = data.code,
                                            findrefund.rmessage = data.message,
                                            findrefund.rmerchantId = data.data.merchantId,
                                            findrefund.rtransactionId = tid,
                                            findrefund.rproviderReferenceId = data.data.providerReferenceId,
                                            findrefund.ramount = data.data.amount,
                                            findrefund.rpayResponseCode = data.data.payResponseCode,
                                            findrefund.rstatus = data.data.status
                                           d = await findrefund.save();
                                        console.log("Refund Data.....");
                                        console.log(d);
                                            console.log(d);
                                          //  res.status(200).send("success");
                                            console.log(refundtry);
                                            refundtry=3;
                                            console.log(refundtry);
                                        break;              
                                default:
                                    text = "Looking forward to the Weekend";
                            }
                        }
                    });

                 res.status(200).send("success");
               } ///while loop
            }
        }
        else {
            res.status(400).send("fail");
            console.log("incorrect checksum...of callBack request");
        }
    } catch (e) {

        console.log("CATCH error");
        console.log(e);
        res.status(500).send("fail");
        console.log("internal server error");
    }
});




























app.post("/napkinvendmachine/response/phonepe", async (req, res) => {
    async function callBackDataStoreDB(storeddata, np, rf, vs) {
        const callbackdata = new Callbacktransaction()
        callbackdata.success = storeddata.success,
            callbackdata.code = storeddata.code,
            callbackdata.message = storeddata.message,
            callbackdata.merchantId = storeddata.data.merchantId,
            callbackdata.transactionId = storeddata.data.transactionId,
            callbackdata.providerReferenceId = storeddata.data.providerReferenceId,
            callbackdata.amount = storeddata.data.amount,
            callbackdata.paymentState = storeddata.data.paymentState,
            callbackdata.payResponseCode = storeddata.data.payResponseCode,
            callbackdata.storeId = storeddata.data.storeId,
            callbackdata.terminalId = storeddata.data.terminalId,
            callbackdata.napkinjob = np;
        callbackdata.refundstatus = rf;
        callbackdata.vendstatus = vs;
        let savetransaction = await callbackdata.save();
        return savetransaction;
    }
    async function createRefund(tid) {
        const refund = new Refund()
        refund.mtransactionId = tid
        const refundSave = await refund.save();
        rid = refundSave.id;
        return rid;
    }
    async function storeRefund(data, rid) {
        findrefund = await Refund.findOne({ _id: rid });
        findrefund.rsuccess = data.success,
            findrefund.rcode = data.code,
            findrefund.rmessage = data.message,
            findrefund.rmerchantId = data.data.merchantId,
            findrefund.rtransactionId = tid,
            findrefund.rproviderReferenceId = data.data.providerReferenceId,
            findrefund.ramount = data.data.amount,
            findrefund.rpayResponseCode = data.data.payResponseCode,
            findrefund.rstatus = data.data.status
        d = await findrefund.save();
        console.log("Refund Data.....");
        // console.log(d);
        return d;
    }

    //callRefundAPI(<merchantId>,<refundID>,<providerReferenceId>,<refundfAmount>)
    function callRefundAPI(merchantId, rid, providerReferenceId, ramount) {
        console.log("Calling Refund API");
        const url = "mercury-uat.phonepe.com";
        const path = '/v3/credit/backToSource';
        const saltKey = "e99f19db-e0c5-429e-aacd-50babb81a1bb";
        const saltIndex = 1;
        const decodedRequest = {
            "merchantId": merchantId,
            "transactionId": rid,
            "providerReferenceId": providerReferenceId,
            "amount": ramount,
            "message": "Incorrect Amount"
        }
        console.log(decodedRequest);
        let encodedRequest = decodedRequest === "" ? "" : (Buffer.from(JSON.stringify(decodedRequest)).toString('base64'))
        generateChecksum(encodedRequest, path, saltKey, saltIndex)
        function generateChecksum(encodedRequest, path, saltKey, keyIndex) {
            const checksum = cjs.SHA256(encodedRequest + path + saltKey).toString(cjs.enc.Hex)
            console.log("base64 request:", encodedRequest, "Api checksum: ", checksum);
            xVerify = (checksum + "###" + keyIndex);
        }
        if (encodedRequest === "")
            body1 = "";
        else
            body1 = JSON.stringify({ 'request': encodedRequest });
        const options = {
            method: 'POST',
            url: 'https://mercury-uat.phonepe.com/v3/credit/backToSource',
            headers: {
                'Content-Type': 'application/json',
                'X-VERIFY': xVerify,
            },
            body: body1
        };
        console.log("Request data:");//comment
        console.log(options);//comment

        request(options, function (error, response, body) {
            if (error) {
                /////////need to handle here if error comes///////
                console.log(error);
                ApiRes = false;
                return ApiRes;
            } else {
                var data = JSON.parse(body)
                console.log("Response Body:")//comment
                console.log(data);
                const ApiRes = data;
                return ApiRes;
            }
        });

    }
    //console.log(req.params);
    //console.log(req.headers);
    console.log(req.body);
    console.log("********************************************************");
    const a = 1000;
    var np;
    var rf = "";
    var vs = "";
    var tid;
    const saltKey = "e99f19db-e0c5-429e-aacd-50babb81a1bb"
    const saltIndex = 1
    const transactionId = req.body.data.transactionId;
    const merchantId = req.body.data.merchantId;
    const amount = req.body.data.amount;
    console.log(transactionId + " " + merchantId + " " + amount);
    const checksum = cjs.SHA256(merchantId + transactionId + amount + saltKey).toString(cjs.enc.Hex)
    //console.log("Api checksum: ", checksum);
    xVerify = (checksum + "###" + saltIndex);
    console.log(xVerify);
    if (xVerify == req.headers['x-verify']) {
        console.log("X-Verify is correct.....");
        if (amount == a) {
            console.log("amount==a");
            console.log("Transaction with Correct Amount Found....");
            np = false;
            rf = "NONE";
            vs = "VendPending";
            const svtr = await callBackDataStoreDB(req.body, np, rf, vs);
            console.log("********************************************************");
            console.log(svtr.id);

        } else if (amount > a) {
            const rfAmount = amount - a;
            console.log("amount>a");
            np = false;
            rf = "Refundable Amount is " + rfAmount;
            vs = "VendPending";
            const svtr = await callBackDataStoreDB(req.body, np, rf, vs);
            console.log("********************************************************");
            console.log(svtr);
            const rid = await createRefund(svtr.id);
            console.log(rid);

            console.log("Calling Refund API");
            const url = "mercury-uat.phonepe.com";
            const path = '/v3/credit/backToSource';
            const saltKey = "e99f19db-e0c5-429e-aacd-50babb81a1bb";
            const saltIndex = 1;
            const decodedRequest = {
                "merchantId": merchantId,
                "transactionId": rid,
                "providerReferenceId": svtr.providerReferenceId,
                "amount": rfAmount,
                "message": "Incorrect Amount"
            }
            console.log(decodedRequest);
            let encodedRequest = decodedRequest === "" ? "" : (Buffer.from(JSON.stringify(decodedRequest)).toString('base64'))
            generateChecksum(encodedRequest, path, saltKey, saltIndex)
            function generateChecksum(encodedRequest, path, saltKey, keyIndex) {
                const checksum = cjs.SHA256(encodedRequest + path + saltKey).toString(cjs.enc.Hex)
                console.log("base64 request:", encodedRequest, "Api checksum: ", checksum);
                xVerify = (checksum + "###" + keyIndex);
            }
            if (encodedRequest === "")
                body1 = "";
            else
                body1 = JSON.stringify({ 'request': encodedRequest });
            const options = {
                method: 'POST',
                url: 'https://mercury-uat.phonepe.com/v3/credit/backToSource',
                headers: {
                    'Content-Type': 'application/json',
                    'X-VERIFY': xVerify,
                },
                body: body1
            };
            console.log("Request data:");//comment
            console.log(options);//comment

            request(options, async function (error, response, body) {
                if (error) {
                    /////////need to handle here if error comes///////
                    console.log(error);
                } else {
                    var data = JSON.parse(body)
                    console.log("Level 1 :Response Body:")//comment
                    console.log(data);
                    console.log("Level 1 :REFUND API RESPONSE: " + data.success);
                    console.log(data.code);
                    switch (data.code) {
                        case 'PAYMENT_SUCCESS':
                            console.log("Level 1 :Refund Process Completed...")
                            console.log(rid);
                            const srfd = await storeRefund(data, rid);
                            break;

                        case 'PAYMENT_ERROR':
                            console.log(rid);
                            const frfd = await storeRefund(data, rid);
                            //console.log(svtr);
                            const rid2 = await createRefund(svtr.id);
                            console.log(rid2);
                            //when request complete then add here code for call refund api again and handle errors and pending process
                            break;
                        case "INTERNAL_SERVER_ERROR":
                        case "TIMED_OUT":
                        case "PAYMENT_PENDING":
                            // case 'PAYMENT_ERROR'://need to remove
                            console.log("Level 1 : Refund Process status : " + data.code);
                            const prfd = await storeRefund(data, rid);
                            console.log(prfd);
                            console.log(svtr.id);
                            const checksum = cjs.SHA256("/v3/transaction/" + merchantId + "/" + rid + "/status" + saltKey).toString(cjs.enc.Hex)
                            //console.log("Api checksum: ", checksum);
                            xVerify = (checksum + "###" + saltIndex);
                            console.log(xVerify);
                            const options = {
                                method: 'GET',
                                url: `https://mercury-uat.phonepe.com/v3/transaction/${merchantId}/${rid}/status`,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'X-VERIFY': xVerify,
                                }
                            };
                            console.log("Level 1 : Request data:");//comment
                            console.log(options);//comment
                            request(options, async function (error, response, body) {
                                if (error) {
                                    /////////need to handle here if error comes///////
                                    console.log(error);

                                } else {
                                    var data = JSON.parse(body)
                                    console.log(" Level 2 :Check Status Response Body:")//comment
                                    console.log(data);
                                    console.log("Level 2 : Check Status API RESPONSE: " + data.success);
                                    console.log(data.code);
                                    switch (data.code) {
                                        case 'PAYMENT_SUCCESS':
                                            console.log("Level 2 : Check Status Process Completed...")
                                            console.log(rid);
                                            const srfd = await storeRefund(data, rid);
                                            break;

                                        case 'PAYMENT_ERROR':
                                            console.log(rid);
                                            const frfd = await storeRefund(data, rid);
                                            //console.log(svtr);
                                            const rid2 = await createRefund(svtr.id);
                                            console.log(rid2);
                                            //when request complete then add here code for call refund api again and handle errors and pending process
                                            break;

                                        case "INTERNAL_SERVER_ERROR":
                                        case "TIMED_OUT":
                                        case "PAYMENT_PENDING":
                                            console.log("Level 2 : Refund Process status : " + data.code);
                                            console.log(data.data.transactionId);
                                            console.log(data.data.providerReferenceId);
                                            const prfd = await storeRefund(data, rid);
                                            //console.log(prfd);
                                            // console.log(svtr.id);
                                            const checksum = cjs.SHA256("/v3/transaction/" + merchantId + "/" + rid + "/status" + saltKey).toString(cjs.enc.Hex)
                                            //console.log("Api checksum: ", checksum);
                                            xVerify = (checksum + "###" + saltIndex);
                                            //console.log(xVerify);
                                            const options = {
                                                method: 'GET',
                                                url: `https://mercury-uat.phonepe.com/v3/transaction/${merchantId}/${rid}/status`,
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'X-VERIFY': xVerify,
                                                }
                                            };
                                            console.log(" Level 3 :Request data:");//comment
                                            console.log(options);//comment
                                            request(options, async function (error, response, body) {
                                                if (error) {
                                                    /////////need to handle here if error comes///////
                                                    console.log(error);
                                                } else {
                                                    var data = JSON.parse(body)
                                                    console.log(" Level 3 :Check Status Response Body:")//comment
                                                    console.log(data.data.transactionId);
                                                    console.log(data.data.providerReferenceId);
                                                    console.log("Level 3 :Check Status  API RESPONSE: " + data.success);
                                                    console.log(data.code);
                                                    switch (data.code) {
                                                        case 'PAYMENT_SUCCESS':
                                                            console.log("Level 3 : Refund Process Completed...")
                                                            console.log(rid);
                                                            const srfd = await storeRefund(data, rid);
                                                            break;
                                                        case 'PAYMENT_ERROR':
                                                        case "INTERNAL_SERVER_ERROR":
                                                        case "TIMED_OUT":
                                                        case "PAYMENT_PENDING":
                                                            console.log(rid);
                                                            const frfd = await storeRefund(data, rid);
                                                            console.log(frfd);
                                                            //when request complete then add here code for call refund api again and handle errors and pending process
                                                            break;
                                                        default:
                                                            console.log(rid);
                                                            const frfd2 = await storeRefund(data, rid);
                                                            console.log(frfd2);
                                                    }
                                                }
                                            });
                                            break;
                                        default:
                                            console.log(rid);
                                            const frfd2 = await storeRefund(data, rid);
                                            console.log(frfd2);
                                    }
                                }
                            });
                            break;
                        default:
                            console.log(rid);
                            const frfd2 = await storeRefund(data, rid);
                            console.log(frfd2);
                    }
                }
            });
        } else {
            console.log("amount<a");

        }
    }
    else { console.log("xVerify not matched"); }
});
