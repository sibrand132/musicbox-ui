'use strict';
angular
    .module('user', [ "ngRoute", "ui.bootstrap", "angularFileUpload", "myDirectives", 'RESTService','angular-storage'])
    .controller('controllerMainPage', function($scope, $http,checkToken,$location,UsersModel,store) {

        $scope.input={};
        if(checkToken.loggedIn() && !checkToken.isAdmin()){
            $location.path("/profile")
        }
        if(checkToken.loggedIn() && checkToken.isAdmin()){
            $location.path("/admin")
        }
        $scope.formSubmit=function(input){

            $scope.user=input;
            UsersModel.login($scope.user.email, $scope.user.pass).success(function(data) {

                $scope.submit = true;
                $scope.errors = data;

                if ($scope.errors.message!="Error") {
                    store.set('token', data.token);
                    location.reload();

                }
            })
        };
    })

    .controller('controllerBandPage', function(AlbumsModel,BandsModel, $scope, $http, $routeParams, MembersModel,FilesModel, SongsModel) {


        function getBandLogo(id){
            return FilesModel.getBandLogo(id);
        }

        function getBandsById(){
            BandsModel.getBandsById($routeParams.id).then(function(result){
                $scope.band= result.data;
                $scope.band.bandLogo=getBandLogo($routeParams.id);
            })
        }
        getBandsById();


        function getAlbumLogo(id){
            return FilesModel.getAlbumLogo(id);
        }

            AlbumsModel.getAlbumsByBandsId($routeParams.id).then(function(result){
                $scope.albums=result.data;
                $scope.albums.albumLogo={};
                var i=0;
                for(i;i<$scope.albums.length;i++){
                    $scope.albums[i].albumLogo=getAlbumLogo($scope.albums[i].id);
                }

            });


        $scope.albumLoc = function(album){
            location.replace("#/album/"+album.id);
        };

        function getAvatar(id) {
               return FilesModel.getUsersAvatar(id);
        }

            MembersModel.getMembers($routeParams.id).then(function(result) {
                $scope.members = result.data;
                if($scope.members[0]!=null){
                    $scope.members.avatar={};
                    var i=0;
                    for(i; i<$scope.members.length;i++){

                        $scope.members[i].avatar = getAvatar($scope.members[i].id);
                    }
                }

            });



    })

    .controller('controllerAlbumPage', function($scope, $http, $routeParams, AlbumsModel,FilesModel, SongsModel) {

        function getAlbumLogo(id){
            return FilesModel.getAlbumLogo(id);
        }

            AlbumsModel.getAlbumsById($routeParams.id).then(function(result){
                $scope.album=result.data;
                $scope.album.albumLogo=getAlbumLogo($routeParams.id);

            });

        function getSongs(id){
            SongsModel.getSongByAlbumsId(id).then(function(result){
                $scope.songs =result.data;
            })
        }
        getSongs($routeParams.id);


    })


    .controller('controllerProfilePage', function(FilesModel,UsersModel,$scope, $http, $routeParams, checkToken,store,FileUploader, AlbumsModel, MembersModel,TracksModel,BandsModel,$location, SongsModel ) {
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

        function isLeader(){
            if(checkToken.isLeader())
                $scope.isLeader = true;
            else
                $scope.isLeader = false;
        }
        isLeader();

        $scope.bands={};

        function getBandLogo(id){
                    return FilesModel.getBandLogo(id);
            }

                UsersModel.getBandByUserId(checkToken.payload().id).then(function(result) {
                $scope.bands = {};
                $scope.bands.bandsLogo={};
                $scope.bands = result.data;


                var i=0;
                for(i; i<$scope.bands.length; i++){
                    {
                        $scope.bands[i].members={};
                            $scope.bands[i].bandsLogo = getBandLogo($scope.bands[i].id);



                    }
                }
            });


            TracksModel.getTracks(checkToken.payload().id).then(function(result) {

                    $scope.tracks = result.data;

                    for (var i=0; i < $scope.tracks.length; i++) {
                        for(var j=0; j<$scope.bands.length; j++){
                            if($scope.tracks[i].bandsId == $scope.bands[j].id)
                            {
                                $scope.tracks[i].band = $scope.bands[j].name;
                            }
                        }
                    }
                });




        $scope.songs={};
        $scope.loadSongs = function(bandId){
            SongsModel.getSongByBandsId(bandId).then(function(result){
                $scope.songs=result.data;
            })
        };

        $scope.downloadSong = function(bandId, filename){
            location.href= FilesModel.downloadSongs(bandId,filename);
        };

        $scope.bandLoc = function(band){
            location.replace("#/band/"+band.id);
        };

        $scope.user=checkToken.payload();

       var id=checkToken.payload().id;

        var uploaderAvatar = $scope.uploaderAvatar= new FileUploader({
            url: FilesModel.getApi+'uploadUsersAvatar/'+id
        });


        $scope.usersId=checkToken.payload().id;
        uploaderAvatar.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };

        $scope.setUsersId= function(usersId){
            window.location.href="#/profile?usersId="+usersId;
        };


        $scope.setBandsId= function(bandsId,tracksId){
            window.location.href="#/profile?bandId="+bandsId+"&trackId="+tracksId;
        };

        var uploaderTrack = $scope.uploader = new FileUploader({
            url: FilesModel.getApi +'uploadTracks/'+$location.search().bandId
        });


        uploaderTrack.onCompleteItem = function(fileItem, response, status, headers) {
            if(status==200){
                for(var i = 0; i<$scope.tracks.length; i++){
                    if($scope.tracks[i].bandsId == $location.search().bandId && $scope.tracks[i].id== $location.search().trackId)
                    {
                        $scope.tracks[i].uploaded="true";
                        $scope.tracks[i].fileName=$scope.uploader.queue[0].file.name;
                        TracksModel.updateTracks($scope.tracks[i].id, $scope.tracks[i]).success(function(result){
                        });
                    }
                }
            }

            console.info('onCompleteItem', fileItem, response, status, headers);
        };



        $scope.avatarExist={};

        function isAvatar(){
            FilesModel.checkAvatar(checkToken.payload().id).then(function (result) {
                $scope.avatarExist=result.data;

            });
        }
        isAvatar();

        function getAvatar() {
            if($scope.avatarExist) {
                $scope.image = FilesModel.getUsersAvatar(checkToken.payload().id);
            }
        }
        getAvatar();


    })

    .controller('controllerCreateTrack', function(MembersModel,$rootScope, $scope, $http, $routeParams, FileUploader,UsersModel,checkToken, TracksModel,store,FilesModel, $location) {
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

        function getBands(){
            UsersModel.getBandByUserId(checkToken.payload().id).then(function(result) {
                $scope.bands = {};
                $scope.bands = result.data;
            })
        }
        getBands();

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


        var bandId;
        var memberId;
        $scope.createTrack = function (track) {
            $scope.track=track;
            $scope.track.date=today;
            bandId=$scope.track.bandsId;
            MembersModel.getMember(bandId,checkToken.payload().id).then(function(result){
                memberId= result.data.id;
                $scope.track.membersId = memberId;
                TracksModel.createTrack($scope.track).then(function (result) {
                    initCreateTrack();

                });
            });

        };

        $scope.goToProfile = function(){
          $location.path('/profile');
        };

        function initCreateTrack(){
            $scope.track = {comment: '', instrument: '' }
        }





        var uploader = $scope.uploader = new FileUploader({
            url: FilesModel.getApi+'uploadTracks/'+bandId
        });


        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };




    })

    .controller('controllerCreateBand', function(BandsModel,$scope, $http,UsersModel,checkToken,store) {
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
        $scope.band.leader = checkToken.payload().email;
        $scope.createBand = function (band) {
            $scope.band=band;
            $scope.band.established=today;
            BandsModel.createBand($scope.band).then(function (result) {
                initCreateBand();
            });

        };

        function initCreateBand(){
            $scope.band = {name: '', about: ''}
        }
    })
    .controller('controllerLogin', function(UsersModel,$scope, store,checkToken,$location){
        $scope.input={};
        if(checkToken.loggedIn() && !checkToken.isAdmin()){
            $location.path("/profile")
        }
        if(checkToken.loggedIn() && checkToken.isAdmin()){
            $location.path("/admin")
        }
        $scope.formSubmit=function(input){

            $scope.user=input;
            UsersModel.login($scope.user.email, $scope.user.pass).success(function(data) {

                $scope.submit = true;
                $scope.errors = data;

                if ($scope.errors.message!="Error") {
                    store.set('token', data.token);
                    location.reload();

                }
            })
        };

    })

    .controller('controllerRegister', function(UsersModel,BandsModel, $scope, $http){

        $scope.bandNames=[];

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

        $scope.success=false;

        $scope.formSubmit = function (user) {

            $scope.user=user;
            UsersModel.createUsers($scope.user)
            .success(function(errors){
                $scope.message=errors.message;
                $scope.submit=true;
                if(errors){
                    $scope.errors=errors;
                }
                else{
                    $scope.errors={};
                    $scope.user={};
                    $scope.success=true;
                    initCreateUser();
                }
            });



        };

        function initCreateUser(){
            $scope.user = {name: '', email: '', pass: '',passconf:''}
        }


    })

///////////////////////////////////SideMenu////////////////////////////

    .controller('controllerSideMenu', function(BandsModel, $scope){

        $scope.bands =[];
        function getBands(){
            BandsModel.all().then(function(result){
                $scope.bands= result.data;
            })
        }
        getBands();

        $scope.sideMenu=function(){
            return 'app/partials/sideMenu.html'
        };
    });