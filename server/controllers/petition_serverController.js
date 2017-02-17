'use strict';


var FBdatabase = require('../../config/nodeFirebase').fbDatabase;

exports.createPetition = function *(req, res) {
    try{
        var id =  Date.now().toString() + Math.floor((Math.random() * 100) + 1).toString();

        var petition = {
            name: req.body.name,
            voteCount: req.body.voteCount,
            description: req.body.description,
            maxVotes: req.body.maxVotes,
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

exports.votePetition = function *(req, res) {
    try{

        yield FBdatabase.ref('petitions/' + req.body.$id).transaction(function(petition){
            petition.voteCount = petition.voteCount + 1;

            if(petition.voterEmails){
                petition.voterEmails.push(req.user.email);
            } else {
                petition.voterEmails = [req.user.email];
            }

            return petition;
        });

        return res.status(200).send({msg: 'Your vote has been saved'});
    } catch(e){
        console.log(e);
        return res.status(400).send({msg: 'Failed to save vote'});
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

exports.getRecentPetitionList = function *(req, res) {
    try{
        var petitionsSnapshot = yield FBdatabase.ref('petitions').orderByChild("createdAt").limitToLast(5).once('value');
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
