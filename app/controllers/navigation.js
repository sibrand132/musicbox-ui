'use strict';
angular
    .module('navigation', [ "ngRoute", "ui.bootstrap", "angularFileUpload", "myDirectives", 'RESTService', 'TokenService'])
    .controller('controllerNavigation', function($scope, $http, $location,checkToken){

        $scope.navigation=function(){
            if(/^\/admin/.test($location.path())){

                if(!checkToken.isAdmin())
                {
                    $location.path('/')
                }

                return 'app/partials/admin/navigation.html'
            }
            else if((/^\/leader/.test($location.path()))){
                if(!checkToken.isLeader()) {

                    $scope.isLeader=false;
                    $location.path('/');
                }
                else {
                    $scope.isLeader=true;
                    return 'app/partials/leader/navigation.html'
                }

                $scope.reloadPage = function(){
                    location.reload();
                };
            }
            else  if(/^\/profile/.test($location.path())){

                if(checkToken.isLeader())
                    $scope.isLeader = true;
                else
                    $scope.isLeader = false;

                if(checkToken.loggedIn())
                    $scope.loggedIn = true;
                else{
                    $scope.loggedIn = false;
                    $location.path('/');
                }
                $scope.reloadPage = function(){
                    location.reload();
                };
                return 'app/partials/user/navigation.html';

            }
            else{

                if(checkToken.loggedIn())
                    $scope.loggedIn = true;
                else
                    $scope.loggedIn = false;


                if(checkToken.isAdmin())
                    $scope.isAdmin = true;
                else
                    $scope.isAdmin = false;

                if(checkToken.isLeader())
                    $scope.isLeader = true;
                else
                    $scope.isLeader = false;

                $scope.reloadPage = function(){
                  location.reload();
                };
                return 'app/partials/user/navigation.html'
            }



        };

        $scope.logout = function(){
            checkToken.del();
            location.reload();
        }
    });