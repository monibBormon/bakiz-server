const SSLCommerzPayment = require('sslcommerz');
const { v4: uuidv4 } = require('uuid');
const OrderModel = require('../models/order/OrderModel');

exports.setSslCommerz=async(req,res)=>{
    const {user,shipping,products} = req.body;
    const newProduct = products.map(item=>{
       return({
        _id:item._id,
        name:item.name,
        price:item.price,
        quantity:item.quantity,
        images: item.images
       })
    })
    const data = {
        userEmail:user.email,
        total_amount: req.body.price,
        currency: 'BDT',
        tran_id: uuidv4(),
        payment_status:"pending",
        products:newProduct,
        shipping,
        success_url: 'https://bakiz-server.monibbormon.com/api/v1/success',
        fail_url: 'https://bakiz-server.monibbormon.com/api/v1/fail',
        cancel_url: 'https://bakiz-server.monibbormon.com/api/v1/cancel',
        ipn_url: 'https://bakiz-server.monibbormon.com/api/v1/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: user.firstName,
        cus_email: user.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: user.mobile,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D'
    };
    const order = await OrderModel.create(data);
    const sslcommer = new SSLCommerzPayment('bakiz63844ef0a4301', 'bakiz63844ef0a4301@ssl') //true for live default false for sandbox
    sslcommer.init(data).then(data => {
        if(data.GatewayPageURL){
            res.json(data.GatewayPageURL)
        }else {
            return res.status(400).json({
                message: "SSL session was not successful"
            })
        }
        //process the response that got from sslcommerz 
        //https://developer.sslcommerz.com/doc/v4/#returned-parameters
    });
}