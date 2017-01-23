'use strict';
angular
    .module('leader', [ "ngRoute", "ui.bootstrap", "angularFileUpload", "myDirectives", 'RESTService'])

    .controller('controllerLeaderPanel', function($scope, $http, $routeParams, FileUploader){


        var id=0; //band id
        $scope.id=id;
        $http.get("app/data/users.json").success(function(data){
            $scope.users=data;
        });

        $http.get("app/data/bands.json").success(function(data){
            $scope.band=data[0];
        });

        $http.get("app/data/tracks.json").success(function(data){
            $scope.tracks=data;
        });
        $http.get("app/data/songs.json").success(function(data){
            $scope.songs=data;
        });
        // -------------------------------------------------------------

        function getBandLogo(){
            $http.get("api/leader/images/getBandLogo/"+id).success(function(data){
                $scope.bandLogos = data;
            });
        }

        getBandLogo();


        $scope.delLogo = function(logo, $index){

            $scope.bandLogos.splice($index,1);
            $http.post("api/leader/images/deleteBandLogo/", {
                id: id,
                logo: logo

            }).success(function(data){

            });

        };


        $scope.deleteUser=function(user,$index){

            if(!confirm("Do you want to delete this user from members?")){
                return false;
            }

            $scope.users.splice($index,1);
            console.log(user);
        };

        $http.get("app/data/albums.json").success(function(data){
            $scope.albums=data;
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

        var id=0; //band id

        var uploader = $scope.uploader = new FileUploader({
            url: 'api/leader/images/uploadBandLogo/'+ id
        });


        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length < 1;
            }
        });

        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            getBandLogo();
        };

        $http.get("app/data/users.json").success(function(data){
            $scope.users=data;
            $scope.user=$scope.users[0];
        });




    })

/////////////////////////user//////////////////////////////////////////

    .controller('controllerLeaderUserEdit', function($scope, $http, $routeParams){


        $http.get("app/data/users.json").success(function(data){
            $scope.users=data;
            $scope.user=$scope.users[$routeParams.id];
        });


        $scope.saveChanges = function(user){
            //przesłanie formularza
        }

    })

    .controller('controllerLeaderUserAdd', function($scope, $http) {

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

    .controller('controllerLeaderAlbumEdit', function($scope, $http, $routeParams, FileUploader){

        var id= $routeParams.id;
        $scope.id=id;

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


        function getAlbumLogo(){
            $http.get("api/leader/images/getAlbumLogo/"+id).success(function(data){
                $scope.albumLogos = data;
            });
        }

        getAlbumLogo();


        $scope.delLogo = function(logo, $index){

            $scope.albumLogos.splice($index,1);
            $http.post("api/leader/images/deleteAlbumLogo/", {
                id: id,
                logo: logo

            }).success(function(data){

            });

        };





        $scope.deleteSong = function(song, $index){

            if(!confirm("Do you want to delete this song?")){
                return false;
            }

            $scope.songs.splice($index,1);
            console.log(song)
        };

        var uploader = $scope.uploader = new FileUploader({
            url: 'api/leader/images/uploadAlbumLogo/'+ id
        });


        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length < 1;
            }
        });

        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            getAlbumLogo();
        };

    })

    .controller('controllerLeaderAlbumCreate', function($scope, $http, $routeParams){


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

    .controller('controllerLeaderSongCreate', function($scope, $http, $routeParams){


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



        $scope.createSong = function () {

            console.log($scope.song);
        }
    });