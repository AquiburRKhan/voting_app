'use strict';

var petitionController = require('../controllers/petition_serverController'),
    authHelper = require('../../config/authenticationHelper'),
    wrap = require('co-express');

module.exports = function(router){
    router.route('/petition/create').post(authHelper.loggedIn,wrap(petitionController.createPetition));

    router.route('/petitions').get(wrap(petitionController.getPetitionList));

    router.route('/petition/edit').post(authHelper.loggedIn,wrap(petitionController.editPetition));

    router.route('/petition/delete').post(authHelper.loggedIn,wrap(petitionController.deletePetition));

};