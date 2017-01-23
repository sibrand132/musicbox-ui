'use strict';
angular
    .module('admin', [ "ngRoute", "ui.bootstrap", "angularFileUpload", "myDirectives", 'RESTService'])
    .controller('controllerAdminPanel', function($scope, $http){

        $http.get("app/data/users.json").success(function(data){
            $scope.users=data;
        });

        $http.get("app/data/bands.json").success(function(data){
            $scope.bands=data;
        });

        $http.get("app/data/tracks.json").success(function(data){
            $scope.tracks=data;
        });
        $http.get("app/data/songs.json").success(function(data){
            $scope.songs=data;
        });

        $scope.deleteBand=function(band,$index){

            if(!confirm("Do you want to delete this band?")){
                return false;
            }
            $scope.bands.splice($index,1);
            console.log(band)


        };

        $scope.deleteUser=function(user,$index){

            if(!confirm("Do you want to delete this user?")){
                return false;
            }

            $scope.users.splice($index,1);
            console.log(user);
        };
    })

///////////////////////////band//////////////////////////////////////

    .controller('controllerBandEdit', function($scope, $http, $routeParams){

        $http.get("app/data/albums.json").success(function(data){
            $scope.albums=data;
        });

        $http.get("app/data/bands.json").success(function(data){
            $scope.bands=data;
            $scope.band=$scope.bands[$routeParams.id];
        });

        $scope.deleteAlbum=function(album,$index){

            if(!confirm("Do you want to delete this album?")){
                return false;
            }

            $scope.albums.splice($index,1);
            console.log(album)
        };

        $scope.saveChanges = function(band){
            //przesłanie formularza
        };


    })

    .controller('controllerBandCreate', function($scope, $http) {

        //$http.post("app/api/", function () {
        //
        //}).success(function (data) {
        //    $scope.bands = data;
        //    $scope.band = $scope.bands[$routeParams.id];
        //});

        $scope.band={};

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        var today = dd+'.'+mm+'.'+yyyy;
        $scope.currentDate = today;



        $scope.createBand = function () {

            console.log($scope.band);
        }
    })

/////////////////////////user//////////////////////////////////////////

    .controller('controllerUserEdit', function($scope, $http, $routeParams){


        $http.get("app/data/users.json").success(function(data){
            $scope.users=data;
            $scope.user=$scope.users[$routeParams.id];
        });


        $scope.saveChanges = function(user){
            //przesłanie formularza
        }

    })

    .controller('controllerUserCreate', function($scope, $http) {

        //$http.post("app/api/", function () {
        //
        //}).success(function (data) {
        //    $scope.users = data;
        //    $scope.user = $scope.users[$routeParams.id];
        //});

        $scope.user={};
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        var today = dd+'.'+mm+'.'+yyyy;
        $scope.currentDate = today;



        $scope.createUser = function () {

            console.log($scope.user);
        }
    })

//////////////////////////////album///////////////////////////////////

    .controller('controllerAlbumEdit', function($scope, $http, $routeParams){


        $http.get("app/data/albums.json").success(function(data){
            $scope.albums=data;
            $scope.album=$scope.albums[$routeParams.id];
        });

        $http.get("app/data/songs.json").success(function(data){
            $scope.songs=data;
            $scope.song=$scope.song[$routeParams.id];
        });

        $scope.saveChanges = function(band){
            //przesłanie formularza
        };

        $scope.deleteSong = function(song, $index){

            if(!confirm("Do you want to delete this song?")){
                return false;
            }

            $scope.songs.splice($index,1);
            console.log(song)
        };

    })

    .controller('controllerAlbumCreate', function($scope, $http, $routeParams){


        //$http.post("app/api/", function () {
        //
        //}).success(function (data) {
        //    $scope.bands = data;
        //    $scope.band = $scope.bands[$routeParams.id];
        //});

        $scope.album={};

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        var today = dd+'.'+mm+'.'+yyyy;
        $scope.currentDate = today;



        $scope.createAlbum = function () {

            console.log($scope.album);
        }
    })

///////////////////////////////////song///////////////////////////////

    .controller('controllerSongCreate', function($scope, $http, $routeParams){


        //$http.post("app/api/", function () {
        //
        //}).success(function (data) {
        //    $scope.bands = data;
        //    $scope.band = $scope.bands[$routeParams.id];
        //});

        $scope.song={};

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
        var today = dd+'.'+mm+'.'+yyyy;
        $scope.currentDate = today;

        $http.get("app/data/logs.json").success(function(data) {
            $scope.logs=data;
        });

        $scope.createSong = function () {

            console.log($scope.song);
        }
    });
