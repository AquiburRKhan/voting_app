'use strict';

require('../models/user');

//var mongoose= require('mongoose'),
//    Customer = mongoose.model('Customer');


exports.createUser = function(req, res) {
    var newCustomer = new Customer(req.body);
    newCustomer.lastActive = new Date();
    newCustomer.save(function(error, customer) {
        if(error) {
            return res.status(400).send('Error occurred while creating a customer due to invalid parameter');
        }

        createPromoCode(customer,function(promoErr, referralCode){
            if (promoErr) {
                return res.status(400).send('Error occurred while creating promo code');
            }

            customer.referralCode = referralCode;
            customer.save(function (dbErrorOnUpdate) {
                co(function *(){
                    yield intercomHelper.createCustomer(
                        {
                            "email":customer.email,
                            "user_id":customer._id.toString(),
                            "name":customer.firstName +" "+ customer.lastName,
                            "custom_attributes":{
                                "role": "customer",
                                "phone": customer.phone,
                                "first name": customer.firstName,
                                "last name": customer.lastName,
                                "referral code": customer.referralCode
                            }
                        });
                }).catch(function(coError){
                    console.log('Intercom customer create error ',coError.message)
                });
                if (dbErrorOnUpdate) {
                    return res.status(400).send('Error occurred while saving promo code.');
                } else {
                    return res.status(200).send('Customer created');
                }
            });
        });
    });
};