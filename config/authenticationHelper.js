module.exports = {
    loggedIn:function (req, res, next) {
        if (req.user) {
            next();
        } else {
            return res.sendStatus(401).send({});
        }
    }
};