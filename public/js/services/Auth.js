angular.module('app.services',[]).service('Auth', function () {
    var user;

    return{
        setUser : function(aUser){
            user = aUser;
        },
        removeUser : function(){
            user = {};
        },
        isLoggedIn : function(){
            return(user)? true : false;
        }
    }

});