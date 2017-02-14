'use strict';


var FBdatabase = require('../../config/nodeFirebase').fbDatabase;

exports.createPetition = function *(req, res) {
    try{
        var id =  Date.now().toString() + Math.floor((Math.random() * 100) + 1).toString();

        var petition = {
            name: req.body.name,
            voteCount: req.body.voteCount,
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
    console.log(req.body);
    console.log(req.user);
    res.json({msg: 'success'});
};


exports.editPetition = function *(req, res) {
    console.log(req.body);
    console.log(req.user);
    res.json({msg: 'success'});
};


exports.deletePetition = function *(req, res) {
    console.log(req.body);
    console.log(req.user);
    res.json({msg: 'success'});
};


