'use strict';


var FBdatabase = require('../../config/nodeFirebase').fbDatabase;

exports.createPetition = function *(req, res) {
    try{
        var id =  Date.now().toString() + Math.floor((Math.random() * 100) + 1).toString();

        var petition = {
            name: req.body.name,
            voteCount: req.body.voteCount,
            description: req.body.description,
            createdBy: req.user.username,
            authorEmail: req.user.email,
            createdAt: Date.now().toString()
        };

        yield FBdatabase.ref('petitions/' + id).set(petition);
        return res.status(200).send({msg: 'Petition successfully created'});
    } catch(e){
        return res.status(400).send({msg: 'Failed to create Petition'});
    }
};

exports.getPetitionList = function *(req, res) {
    try{
        var petitionsSnapshot = yield FBdatabase.ref('petitions').once('value');
        var petitions = petitionsSnapshot.val();
        return res.status(200).send({msg: 'Petitions successfully loaded',data: petitions});

    } catch(e){
        console.log(e.stack);
        return res.status(400).send({msg: 'Failed to load Petitions',error: e.stack});
    }
};

exports.getUserPetitions = function *(req, res) {
    try{
        var userPetitionsSnapshot = yield FBdatabase.ref('petitions').orderByChild('authorEmail').equalTo(req.user.email).once('value');
        var userPetitions = userPetitionsSnapshot.val();
        return res.status(200).send({msg: 'Petitions successfully loaded',data: userPetitions});

    } catch(e){
        console.log(e.stack);
        return res.status(400).send({msg: 'Failed to load Petitions',error: e.stack});
    }
};
