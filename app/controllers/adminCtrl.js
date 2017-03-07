'use strict';
angular
    .module('admin', [ "ngRoute", "ui.bootstrap", "angularFileUpload", "myDirectives", 'RESTService'])
    .controller('controllerAdminPanel', function(AlbumsModel,BandsModel,UsersModel,$scope, $http, $routeParams, FilesModel,checkToken,store){
        $scope.token={};
        $scope.token.token=checkToken.raw();

        function verifyToken(){
            UsersModel.verifyToken($scope.token).then(function(result){
                $scope.token.token=result.data.token;
                $scope.message=result.data.message;
            });
            store.set('token', $scope.token.token);
        }
        verifyToken();

        function getBandLogo(id) {
            return FilesModel.getBandLogo(id);
        }

        $scope.bands =[];
        BandsModel.all().then(function(result) {
            $scope.bands = result.data;
            if($scope.bands[0]!=null){
                $scope.bands.logo={};
                var i=0;
                for(i; i<$scope.bands.length;i++){

                    $scope.bands[i].logo = getBandLogo($scope.bands[i].id);
                }
            }

        });



        $scope.deleteBand = function(band,$index){

            if(!confirm("Do you want to delete this band?")){
                return false;
            }
            BandsModel.deleteBand(band.id);
            $scope.bands.splice($index,1);
        };



        function getAvatar(id) {
            return FilesModel.getUsersAvatar(id);
        }

        $scope.users =[];
            UsersModel.getUsers().then(function(result){
                $scope.users = result.data;
                if($scope.users[0]!=null){
                    $scope.users.avatar={};
                    var i=0;
                    for(i; i<$scope.users.length;i++){

                        $scope.users[i].avatar = getAvatar($scope.users[i].id);
                    }
                }
            });


        $scope.deleteUser = function(user,$index){

            if(!confirm("Do you want to delete this user?")){
                return false;
            }
            UsersModel.deleteUsers(user.id);
            $scope.users.splice($index,1);
        };


        $scope.albumLoc = function(album){

            location.replace("#/album/"+album.id);
        };


    })

///////////////////////////band//////////////////////////////////////

    .controller('controllerBandEdit', function(BandsModel,AlbumsModel,$scope, $http, $routeParams,FilesModel,checkToken,UsersModel,store){
        $scope.token={};
        $scope.token.token=checkToken.raw();

        function verifyToken(){
            UsersModel.verifyToken($scope.token).then(function(result){
                $scope.token.token=result.data.token;
                $scope.message=result.data.message;
            });
            store.set('token', $scope.token.token);
        }
        verifyToken();

        function getBandsById(){
            BandsModel.getBandsById($routeParams.id).then(function(result){
                $scope.band= result.data;
            })
        }
        getBandsById();

        function getBandLogo(){
            $scope.image = FilesModel.getBandLogo($routeParams.id);
        }
        getBandLogo();


        function getAlbumLogo(id){
            return FilesModel.getAlbumLogo(id);
        }

        AlbumsModel.getAlbumsByBandsId($routeParams.id).then(function(result) {
            $scope.albums=result.data;
            $scope.albums.albumLogo={};
            var i=0;
            for(i;i<$scope.albums.length;i++){
                $scope.albums[i].albumLogo=getAlbumLogo($scope.albums[i].id);
            }
        });


        $scope.saveChanges = function(band){
            BandsModel.updateBand($routeParams.id,band).then(function(result){
                $scope.band= result.data;
            });
            location.reload();
        };


        $scope.deleteAlbum = function(album,$index){

            if(!confirm("Do you want to delete this album?")){
                        return false;
            }
            AlbumsModel.deleteAlbum(album.id);
            $scope.albums.splice($index,1);
        }



    })

    .controller('controllerBandCreate', function(BandsModel,$scope, $http,UsersModel,checkToken,store) {

        $scope.token={};
        $scope.token.token=checkToken.raw();

        function verifyToken(){
            UsersModel.verifyToken($scope.token).then(function(result){
                $scope.token.token=result.data.token;
                $scope.message=result.data.message;
            });
            store.set('token', $scope.token.token);
        }
        verifyToken();

        $scope.users =[];
        UsersModel.getUsers().then(function(result){
            $scope.users = result.data;
        });

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
        $scope.established = today;

        $scope.email={};
        $scope.email.email={};

        $scope.createBand = function (band) {
            $scope.band=band;
            $scope.band.established=today;
            BandsModel.createBand($scope.band).then(function (result) {
                initCreateBand();
            });

            $scope.email.email=band.leader;
            UsersModel.setLeader($scope.email);
        };

        function initCreateBand(){
            $scope.band = {name: '', about: ''}
        }
    })

/////////////////////////user//////////////////////////////////////////

    .controller('controllerUserEdit', function(UsersModel,$scope, $http, $routeParams,checkToken,store){

        $scope.token={};
        $scope.token.token=checkToken.raw();

        function verifyToken(){
            UsersModel.verifyToken($scope.token).then(function(result){
                $scope.token.token=result.data.token;
                $scope.message=result.data.message;
            });
            store.set('token', $scope.token.token);
        }
        verifyToken();

        function getUsersById(){
            UsersModel.getUsersById($routeParams.id).then(function(result){
                $scope.user= result.data;
            })
        }
        getUsersById();


        $scope.saveChanges = function(user){
            UsersModel.updateUsers($routeParams.id,user).then(function(result){
                $scope.user= result.data;
            });
            location.reload();
        }



    })

    .controller('controllerUserCreate', function(UsersModel,$scope, $http, checkToken,store) {
        $scope.token={};
        $scope.token.token=checkToken.raw();

        function verifyToken(){
            UsersModel.verifyToken($scope.token).then(function(result){
                $scope.token.token=result.data.token;
                $scope.message=result.data.message;
            });
            store.set('token', $scope.token.token);
        }
        verifyToken();

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



        $scope.createUser = function (user) {

            $scope.user=user;
            UsersModel.createUsers($scope.user).then(function (result) {
                initCreateUser();
            });
        };

        function initCreateUser(){
            $scope.user = {name: '', email: '', pass: '', role: ''}
        }
    })

//////////////////////////////album///////////////////////////////////

    .controller('controllerAlbumEdit', function(AlbumsModel,$scope, $http, $routeParams,checkToken,UsersModel,store){
        $scope.token={};
        $scope.token.token=checkToken.raw();

        function verifyToken(){
            UsersModel.verifyToken($scope.token).then(function(result){
                $scope.token.token=result.data.token;
                $scope.message=result.data.message;
            });
            store.set('token', $scope.token.token);
        }
        verifyToken();

        function getAlbumById(){
            AlbumsModel.getAlbumsById($routeParams.id).then(function(result){
                $scope.album= result.data;
            })
        }
        getAlbumById();


        $scope.saveChanges = function(album){
            AlbumsModel.updateAlbum($routeParams.id,album).then(function(result){
                $scope.album= result.data;
            });
            location.reload();
        };


        $scope.deleteSong = function(song, $index){

            if(!confirm("Do you want to delete this song?")){
                return false;
            }

            $scope.songs.splice($index,1);
        };

    })

    .controller('controllerAlbumCreate', function(AlbumsModel,$scope, $http, $routeParams,checkToken,UsersModel,store){
        $scope.token={};
        $scope.token.token=checkToken.raw();

        function verifyToken(){
            UsersModel.verifyToken($scope.token).then(function(result){
                $scope.token.token=result.data.token;
                $scope.message=result.data.message;
            });
            store.set('token', $scope.token.token);
        }
        verifyToken();

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
        var bandsId=$routeParams.id;



        $scope.createAlbum = function (album) {

            $scope.album=album;
            $scope.album.releaseDate=today;
            $scope.album.bandsId=bandsId;
            AlbumsModel.createAlbum($scope.album,bandsId).then(function (result) {
                initCreateAlbum();
            })
        };

        function initCreateAlbum(){
            $scope.album = {title: '', about: ''}
        }

    });
