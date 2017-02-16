'use strict';

var petitionController = require('../controllers/petition_serverController'),
    authHelper = require('../../config/authenticationHelper'),
    wrap = require('co-express');

module.exports = function(router){
    router.route('/petition/create').post(authHelper.loggedIn,wrap(petitionController.createPetition));

    router.route('/petitions').get(wrap(petitionController.getPetitionList));

    router.route('/recentpetitions').get(wrap(petitionController.getRecentPetitionList));

    router.route('/petition/getuserpetitions').get(authHelper.loggedIn,wrap(petitionController.getUserPetitions));

};