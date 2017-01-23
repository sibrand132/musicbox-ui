'use strict';
angular.module('application', [ "ngRoute", "ui.bootstrap", "angularFileUpload", "myDirectives", 'RESTService','user', 'admin','leader','navigation'])

    .config(['$routeProvider', '$httpProvider',
        function($routeProvider, $httpProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'app/partials/user/home.html',
                    controller: 'controllerMainPage'
                })
                .when('/band/:id', {
                    templateUrl: 'app/partials/user/band.html',
                    controller: 'controllerBandPage'
                })
                .when('/album/:id', {
                    templateUrl: 'app/partials/user/album.html',
                    controller: 'controllerAlbumPage'
                })
                .when('/profile/', {
                    templateUrl: 'app/partials/user/profile.html',
                    controller: 'controllerProfilePage'
                })
                .when('/create-track/', {
                    templateUrl: 'app/partials/user/createTrack.html',
                    controller: 'controllerCreateTrack'
                })
                /////////////////////leader//////////////////////////////

                .when('/leader', {
                    templateUrl: 'app/partials/leader/leaderPanel.html',
                    controller: 'controllerLeaderPanel'
                })

                .when('/leader/create-album/', {
                    templateUrl: 'app/partials/leader/leaderPanelCreateAlbum.html',
                    controller: 'controllerLeaderAlbumCreate'
                })
                .when('/leader/edit-album/:id', {
                    templateUrl: 'app/partials/leader/leaderPanelEditAlbum.html',
                    controller: 'controllerLeaderAlbumEdit'
                })
                .when('/leader/create-song/', {
                    templateUrl: 'app/partials/leader/leaderPanelCreateSong.html',
                    controller: 'controllerLeaderSongCreate'
                })
                .when('/leader/edit-user/:id', {
                    templateUrl: 'app/partials/leader/leaderPanelEditUser.html',
                    controller: 'controllerLeaderUserEdit'
                })
                .when('/leader/create-user/', {
                    templateUrl: 'app/partials/leader/leaderPanelCreateUser.html',
                    controller: 'controllerLeaderUserAdd'
                })
                /////////////////////admin///////////////////////////////
                .when('/admin', {
                    templateUrl: 'app/partials/admin/adminPanel.html',
                    controller: 'controllerAdminPanel'
                })
                .when('/admin/edit-band/:id', {
                    templateUrl: 'app/partials/admin/adminPanelEditBand.html',
                    controller: 'controllerBandEdit'
                })
                .when('/admin/create-band/', {
                    templateUrl: 'app/partials/admin/adminPanelCreateBand.html',
                    controller: 'controllerBandCreate'
                })
                .when('/admin/edit-album/:id', {
                    templateUrl: 'app/partials/admin/adminPanelEditAlbum.html',
                    controller: 'controllerAlbumEdit'
                })
                .when('/admin/create-album/', {
                    templateUrl: 'app/partials/admin/adminPanelCreateAlbum.html',
                    controller: 'controllerAlbumCreate'
                })
                .when('/admin/create-song/', {
                    templateUrl: 'app/partials/admin/adminPanelCreateSong.html',
                    controller: 'controllerSongCreate'
                })
                .when('/admin/edit-user/:id', {
                    templateUrl: 'app/partials/admin/adminPanelEditUser.html',
                    controller: 'controllerUserEdit'
                })
                .when('/admin/create-user/', {
                    templateUrl: 'app/partials/admin/adminPanelCreateUser.html',
                    controller: 'controllerUserCreate'
                })
                .when('/login',{
                    templateUrl:'app/partials/user/login.html',
                    controller: 'controllerLogin'
                })
                .when('/register', {
                    templateUrl: 'app/partials/user/register.html',
                    controller: 'controllerRegister'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]) //routing

//////////////////////////////////Login////Register///////////////

//    .controller('controllerLogin', function($scope, $http){
//        $scope.input={};
//
//        $scope.formSubmit=function(){
//            $scope.errors={};
//            $scope.errors.login ="Invalid login or password";
//        };
//
//    })
//
//    .controller('controllerRegister', function($scope, $http){
//        $scope.input={};
//        $scope.bandNames=[];
//        $http.get("app/data/bands.json").success(function(data){
//            $scope.bands=data;
//            angular.forEach($scope.bands, function(band){
//
//                $scope.bandNames.push(band.name);
//
//            });
//        });
//
//
//        $scope.complete = function(string){
//            $scope.hidethis = false;
//            var output = [];
//            angular.forEach($scope.bandNames, function(bandName){
//                if(bandName.toLowerCase().indexOf(string.toLowerCase()) >= 0)
//                {
//                    output.push(bandName);
//                }
//            });
//            $scope.filterCountry = output;
//        };
//        $scope.fillTextbox = function(string){
//            $scope.bandName = string;
//            $scope.hidethis = true;
//        };
//
//
//        document.onkeydown = function(evt) {
//            evt = evt || window.event;
//            switch (evt.keyCode) {
//                case 38:
//                    document.activeElement.previousElementSibling.focus();
//                    break;
//                case 40:
//                    document.activeElement.nextElementSibling.focus();
//                    break;
//            }
//        };
//
//        $scope.formSubmit=function(){
//            $scope.errors={};
//            $scope.submit=true;
//            $scope.errors.name ="Invalid name";
//            $scope.errors.email ="Invalid email";
//            $scope.errors.password ="Invalid password";
//            $scope.errors.passconf ="Invalid password";
//
//        };
//
//    })
//
/////////////////////////////////////SideMenu////////////////////////////
//
//    .controller('controllerSideMenu', function(BandsModel, $scope){
//
//        $scope.bands =[];
//        function getBands(){
//            BandsModel.all().then(function(result){
//                $scope.bands= result.data;
//                console.log($scope.bands);
//            })
//        }
//        getBands();
//
//        $scope.sideMenu=function(){
//            return 'app/partials/sideMenu.html'
//        };
//    });
