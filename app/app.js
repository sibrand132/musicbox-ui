'use strict';
angular.module('application', [ "ngRoute", "ui.bootstrap", "angularFileUpload", "myDirectives", 'RESTService','user', 'admin','leader','navigation','angular-storage', 'angular-jwt', 'TokenService'])

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
                .when('/profile/create-track/', {
                    templateUrl: 'app/partials/user/createTrack.html',
                    controller: 'controllerCreateTrack'
                })
                .when('/profile/create-band/', {
                    templateUrl: 'app/partials/user/createBand.html',
                    controller: 'controllerCreateBand'
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
                .when('/admin/create-album/:id', {
                    templateUrl: 'app/partials/admin/adminPanelCreateAlbum.html',
                    controller: 'controllerAlbumCreate'
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
        }]); //routing
