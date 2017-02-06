var userController = require('../controllers/user_serverController'),
    authHelper = require('../../config/authenticationHelper'),
    wrap = require('co-express');

module.exports = function(router){

    router.route('/customers')
        .post(userController.createUser);

    //router.route('/customers/:customerID')
    //    .get(authHelper.loggedIn,customerController.getCustomerByID)
    //    .put(authHelper.loggedIn,customerController.updateCustomerByID)
    //    .delete(authHelper.loggedIn,customerController.deleteCustomerByID);
    //
    //router.route('/customers/:customerID/:password')
    //    .post(authHelper.loggedIn, customerController.updateCustomerPassword);


};