const functions = require('firebase-functions');
const express=require('express');
const cors=require('cors');

const stripe=require('stripe')('sk_test_51HcGkPIlI7rXskEQ6dCRbVukBBOuOtAw3msfCttctBMdVlgt6a2StRXdxmisbkK4cdOBdj5NTpI0lGsJ4Mcr4tDU00T0jNrVIy')

//api


//App config
const app=express();


//middlewares
app.use(cors({origin:true}));
app.use(express.json());

//api routes
app.get('/',(request, response)=>response.status(200).send("Hello"));

app.post('/payments/create', async(request,response)=>{
    const total=request.query.total;
    console.log('Payment Request Received. Amount of >>>', total)

    const paymentIntent=await stripe.paymentIntents.create({
        amount: total, //subunits 
        currency:"usd",
    });
    //status good and created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

//listen command
exports.api=functions.https.onRequest(app);