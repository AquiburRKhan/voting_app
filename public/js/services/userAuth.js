angular.module('app.services').factory('userAuth', function () {
    var userEmail;
    return {
        setUserEmail: function(email){
            userEmail = email;
            return 'Email saved';
        },
        getUserEmail: function(){
            return userEmail;
        },
        removeUserEmail: function(){
             userEmail = null;
            return 'Email removed';
        }
    }
})