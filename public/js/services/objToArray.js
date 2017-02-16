angular.module('app.services').service('objectToArray', function () {
        return function (objects){
            var array = [];
            angular.forEach(objects, function(object,key){
                object.key = key;
                array.push(object);
            })
            return array;
        }
    });
