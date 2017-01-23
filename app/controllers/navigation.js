'use strict';
angular
    .module('navigation', [ "ngRoute", "ui.bootstrap", "angularFileUpload", "myDirectives", 'RESTService'])
    .controller('controllerNavigation', function($scope, $http, $location){

        $scope.navigation=function(){
            if(/^\/admin/.test($location.path())){
                return 'app/partials/admin/navigation.html'
            }
            else if((/^\/leader/.test($location.path()))){
                return 'app/partials/leader/navigation.html'
            }
            else{
                return 'app/partials/user/navigation.html'
            }

        };
    });