'use strict';
angular
    .module('leader', [ "ngRoute", "ui.bootstrap", "angularFileUpload", "myDirectives", 'RESTService','TokenService'])

    .controller('controllerLeaderPanel', function($scope, $http, $routeParams, FileUploader, UsersModel, checkToken, AlbumsModel, store, MembersModel, BandsModel, FilesModel, TracksModel,$location,SongsModel, $window ){

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

        function getLeaderBand() {
            if(checkToken.payload().bandIdLeader) {
                BandsModel.getBandsById(checkToken.payload().bandIdLeader).then(function (result) {
                    $scope.band = result.data;
                });
            }
        }
        getLeaderBand();


        function getAlbumLogo(id){
            return FilesModel.getAlbumLogo(id);
        }

            AlbumsModel.getAlbumsByBandsId(checkToken.payload().bandIdLeader).then(function(result) {
                $scope.albums=result.data;
                $scope.albums.albumLogo={};
                var i=0;
                for(i;i<$scope.albums.length;i++){
                    $scope.albums[i].albumLogo=getAlbumLogo($scope.albums[i].id);
                }
            });

        function getAvatar(id) {
            return FilesModel.getUsersAvatar(id);
        }


            $scope.members={};
            MembersModel.getMembers(checkToken.payload().bandIdLeader).then(function(result) {
                $scope.members = result.data;
                if($scope.members[0]!=null){
                    $scope.members.avatar={};
                    var i=0;
                    for(i; i<$scope.members.length;i++){

                        $scope.members[i].avatar = getAvatar($scope.members[i].id);
                    }
                    $scope.usersList={};
                    $scope.usersList.usersList=[];
                    $scope.usersList.usersList=$scope.members;
                    $scope.users=[];
                    UsersModel.getNotMembers($scope.usersList).then(function(result){
                        $scope.users=result.data;
                        var i=0;
                        for(i; i<$scope.users.length;i++){

                            $scope.users[i].avatar = getAvatar($scope.users[i].id);
                        }

                    });
                }

            });

        function getBandLogo(){
                    $scope.image = FilesModel.getBandLogo(checkToken.payload().bandIdLeader);
        }
        getBandLogo();


        $scope.saveChanges = function(band){
            BandsModel.updateBand(checkToken.payload().bandIdLeader,band).then(function(result){
                $scope.band= result.data;
            });
            location.reload();
        };
        $scope.deleteUser=function(member,$index){

            if(!confirm("Do you want to delete this user from members?")){
                return false;
            }
            MembersModel.deleteMember(member.id,checkToken.payload().bandIdLeader);
            $scope.members.splice($index,1);
            location.reload();
        };

        SongsModel.getSongByBandsId(checkToken.payload().bandIdLeader).then(function(result){
            $scope.songs =result.data;
        });


        $scope.deleteAlbum = function(album,$index){

            if(!confirm("Do you want to delete this album?")){
                return false;
            }
            AlbumsModel.deleteAlbum(album.id);
            $scope.albums.splice($index,1);
        };


        var id=checkToken.payload().bandIdLeader; //band id


        var uploader = $scope.uploader = new FileUploader({
            url: FilesModel.getApi+ 'uploadBandsLogo/' + id
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

        $scope.setBandsId= function(bandsId,songId){
            window.location.href="#/leader?bandId="+bandsId+"&songId="+songId;
        };

        console.log(FilesModel.getApi+'uploadSongs/'+$location.search().bandId);

        var uploaderSong = $scope.uploaderSong = new FileUploader({
            url: FilesModel.getApi+'uploadSongs/'+$location.search().bandId
        });


        uploaderSong.onCompleteItem = function(fileItem, response, status, headers) {
            if (status == 200) {
                for (var i = 0; i < $scope.songs.length; i++) {
                    if ($scope.songs[i].bandsId == $location.search().bandId && $scope.songs[i].id == $location.search().songId) {
                        $scope.songs[i].uploaded = "true";
                        $scope.songs[i].fileName = $scope.uploaderSong.queue[0].file.name;
                        SongsModel.updateSong($scope.songs[i].id, $scope.songs[i]).success(function (result) {
                        });
                    }
                }
            }
            console.log(FilesModel.getApi+'uploadSongs/'+$location.search().bandId);
        };



        $scope.addMember = function(id){
            MembersModel.saveMember(id, checkToken.payload().bandIdLeader,checkToken.raw()).then(function(result){
                $scope.message=result.data;
                location.reload();
            });

        };




        TracksModel.getTracksByBandsId(checkToken.payload().bandIdLeader).then(function(result){
            $scope.tracks=result.data;
        });

        $scope.downloadTrack = function (bandId, filename){
            location.href= FilesModel.downloadTrack(bandId,filename);
        };

        $scope.downloadSong = function (bandId, filename){
            location.href= FilesModel.downloadSongs(bandId,filename);
        };

        $scope.deleteSong = function(song,$index){

            if(!confirm("Do you want to delete this song?")){
                return false;
            }
            SongsModel.deleteSong(song.id);
            $scope.songs.splice($index,1);
        };

        $scope.joinTracks = function(){
            $window.open("http://audio-joiner.com/");

        }



    })

/////////////////////////user//////////////////////////////////////////

    .controller('controllerLeaderUserEdit', function($scope, $http, $routeParams){


        $http.get("app/data/users.json").success(function(data){
            $scope.users=data;
            $scope.user=$scope.users[$routeParams.id];
        });

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


        }
    })

//////////////////////////////album///////////////////////////////////

    .controller('controllerLeaderAlbumEdit', function(FilesModel, AlbumsModel, $scope, $http, $routeParams, FileUploader, checkToken, SongsModel,store, UsersModel){

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

        var id= $routeParams.id;
        $scope.id=id;

        function getAlbumById(){
            AlbumsModel.getAlbumsById($routeParams.id).then(function(result){
                $scope.album= result.data;

            })
        }
        getAlbumById();

        SongsModel.getSongByBandsId(checkToken.payload().bandIdLeader).then(function(result){

            $scope.songsAll =result.data;
            $scope.songs=[];
            for(var i=0;i<$scope.songsAll.length; i++){
                if($scope.songsAll[i].albumsId == $routeParams.id){
                    $scope.songs.push($scope.songsAll[i]);
                }

            }
        });

        $scope.saveChanges = function(album){
            AlbumsModel.updateAlbum($routeParams.id,album).then(function(result){
                $scope.album= result.data;
            });
            location.reload();
        };

        $scope.addSong = function(songId){
            SongsModel.getSongById(songId.id).then(function(result){
               $scope.song = result.data;
                $scope.song.albumsId = $routeParams.id;
                SongsModel.updateSong(songId.id,$scope.song).then(function(result){
                });
            });
            location.reload();
        };

        $scope.deleteSongFromAlbum = function(song, $index){
            $scope.songDel= song;
            $scope.songDel.albumsId="";
            SongsModel.updateSong(song.id,song).then(function(result){

            });
            $scope.songs.splice($index,1);
        };

        function getAlbumLogo(){
            FilesModel.checkAlbumLogo($routeParams.id).then(function (result) {
                $scope.albumLogoExist=result.data;
                if($scope.albumLogoExist.logo) {
                    $scope.image = FilesModel.getAlbumLogo($routeParams.id);
            }
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
        };


        var uploader = $scope.uploader = new FileUploader({
            url: FilesModel.getApi+'uploadAlbumsLogo/'+ id
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

    .controller('controllerLeaderAlbumCreate', function(AlbumsModel,$scope, $http, $routeParams, checkToken,store, UsersModel, $location){
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

        $scope.goToLeader = function (){
            $location.path('/leader');
        };

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



        $scope.createAlbum = function (album) {

            $scope.album=album;
            $scope.album.releaseDate=today;
            $scope.album.bandsId=checkToken.payload().bandIdLeader;
            AlbumsModel.createAlbum($scope.album,checkToken.payload().bandIdLeader).then(function (result) {
                initCreateAlbum();
            })
        };

        function initCreateAlbum(){
            $scope.album = {title: '', about: ''}
        }
    })

///////////////////////////////////song///////////////////////////////

    .controller('controllerLeaderSongCreate', function($scope, $http, $routeParams, SongsModel,checkToken,store,UsersModel,$location){

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




        $scope.createSong = function (song) {

            $scope.song=song;
            $scope.song.date=today;
            $scope.song.bandsId=checkToken.payload().bandIdLeader;
            SongsModel.createSong($scope.song).then(function (result) {
                initCreateSong();
            })
        };

        function initCreateSong(){
            $scope.song = {title: '', date: ''}
        }

        $scope.goToLeader = function (){
            $location.path('/leader');
        }

    });