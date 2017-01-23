'use strict';
angular
    .module('user', [ "ngRoute", "ui.bootstrap", "angularFileUpload", "myDirectives", 'RESTService'])
    .controller('controllerMainPage', function($scope, $http) {

    })

    .controller('controllerBandPage', function(BandsModel, $scope, $http, $routeParams) {


        function getBandsById(){
            BandsModel.getBandsById($routeParams.id).then(function(result){
                $scope.band= result.data;
                console.log($scope.band);
            })
        }
        getBandsById();


        $scope.albumLoc = function(album){

            location.replace("#/album/"+album.id);
        };
        //$http.get("app/data/bands.json").success(function(data){
        //    $scope.bands=data;
        //    $scope.band=$scope.bands[$routeParams.id];
        //});
        //
        //$http.get("app/data/albums.json").success(function(data){
        //    $scope.albums=data;
        //    $scope.album=$scope.albums[$routeParams.id];
        //});
        //
        //$http.get("app/data/songs.json").success(function(data){
        //    $scope.songs=data;
        //    $scope.song=$scope.songs[$routeParams.id];
        //});
    })

    .controller('controllerAlbumPage', function($scope, $http, $routeParams) {

        $http.get("app/data/albums.json").success(function(data){
            $scope.albums=data;
            $scope.album=$scope.albums[$routeParams.id];
        });

        $http.get("app/data/songs.json").success(function(data){
            $scope.songs=data;
            $scope.song=$scope.songs[$routeParams.id];
        });


    })


    .controller('controllerProfilePage', function($scope, $http, $routeParams) {

        $http.get("app/data/tracks.json").success(function(data){
            $scope.tracks=data;
        });

        $http.get("app/data/users.json").success(function(data){
            $scope.users=data;
        });




    })

    .controller('controllerCreateTrack', function($scope, $http, $routeParams, FileUploader) {

        $http.get("app/data/tracks.json").success(function(data){
            $scope.tracks=data;
        });

        $http.get("app/data/users.json").success(function(data){
            $scope.users=data;
        });

        $scope.track={};

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

        var id=0; //id track
        var uploader = $scope.uploader = new FileUploader({
            url: 'api/user/audios/uploadTrack/'+id
        });


        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };



        $scope.createTrack = function () {

            console.log($scope.track);
        }

    })

    .controller('controllerLogin', function($scope, $http){
        $scope.input={};

        $scope.formSubmit=function(){
            $scope.errors={};
            $scope.errors.login ="Invalid login or password";
        };

    })

    .controller('controllerRegister', function($scope, $http){
        $scope.input={};
        $scope.bandNames=[];
        $http.get("app/data/bands.json").success(function(data){
            $scope.bands=data;
            angular.forEach($scope.bands, function(band){

                $scope.bandNames.push(band.name);

            });
        });


        $scope.complete = function(string){
            $scope.hidethis = false;
            var output = [];
            angular.forEach($scope.bandNames, function(bandName){
                if(bandName.toLowerCase().indexOf(string.toLowerCase()) >= 0)
                {
                    output.push(bandName);
                }
            });
            $scope.filterCountry = output;
        };
        $scope.fillTextbox = function(string){
            $scope.bandName = string;
            $scope.hidethis = true;
        };


        document.onkeydown = function(evt) {
            evt = evt || window.event;
            switch (evt.keyCode) {
                case 38:
                    document.activeElement.previousElementSibling.focus();
                    break;
                case 40:
                    document.activeElement.nextElementSibling.focus();
                    break;
            }
        };

        $scope.formSubmit=function(){
            $scope.errors={};
            $scope.submit=true;
            $scope.errors.name ="Invalid name";
            $scope.errors.email ="Invalid email";
            $scope.errors.password ="Invalid password";
            $scope.errors.passconf ="Invalid password";

        };

    })

///////////////////////////////////SideMenu////////////////////////////

    .controller('controllerSideMenu', function(BandsModel, $scope){

        $scope.bands =[];
        function getBands(){
            BandsModel.all().then(function(result){
                $scope.bands= result.data;
                console.log($scope.bands);
            })
        }
        getBands();

        $scope.sideMenu=function(){
            return 'app/partials/sideMenu.html'
        };
    });