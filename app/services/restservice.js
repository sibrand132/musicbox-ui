'use strict';
/**
 * Created by Sibrand on 2017-01-19.
 */
 angular.module('RESTService', [])

     .constant('ENDPOINT_URI', 'http://b29dfff4.ngrok.io/api/bands/')
     .service('BandsModel', function($http, ENDPOINT_URI){
         var service = this;
         var pathAll = 'getBands/';
         var pathById='getBandsById/';
         var pathSave='saveBands/';
         var pathDelete='deleteBands/';
         var pathUpdate='updateBands/';


         function getAllUrl(){
             return ENDPOINT_URI + pathAll;
         }
         function getByIdUrl(){
             return ENDPOINT_URI + pathById;
         }


         function save(){
             return ENDPOINT_URI + pathSave;
         }

         function deleteBands(){
             return ENDPOINT_URI + pathDelete;
         }

         function updateBands(){
             return ENDPOINT_URI + pathUpdate;
         }


         service.all = function(){
             return $http.get(getAllUrl());
         };

         service.getBandsById = function(id){
           return $http.get(getByIdUrl()+id);
         };


         service.createBand = function(bands){
             return $http.post(save(),bands);
         };

         service.deleteBand = function(id){
             return $http.delete(deleteBands()+id);
         };
         service.updateBand = function (id,bands) {
             return $http.put(updateBands()+id,bands);
         };

     })
     .service('AlbumsModel', function ($http, ENDPOINT_URI) {
         var service = this;
         var pathAlbums = "getAlbumsById/";
         var pathAlbumByBandsId ='getAlbumsByBandsId/';
         var pathAlbumsDelete = 'deleteAlbums/';
         var pathAlbumsUpdate='updateAlbums/';


         function getAlbumsByBandsId(){
             return ENDPOINT_URI + pathAlbumByBandsId;
         }

         function getAlbums(){
             return ENDPOINT_URI + pathAlbums;
         }

         function saveAlbums(){
             return ENDPOINT_URI + pathAlbumByBandsId;
         }

         function deleteAlbums(){
             return ENDPOINT_URI + pathAlbumsDelete;
         }

         function updateAlbums(){
             return ENDPOINT_URI + pathAlbumsUpdate;
         }

         service.getAlbumsByBandsId = function(id){
             return $http.get(getAlbumsByBandsId()+id);
         };
         service.getAlbumsById = function(id){
             return $http.get(getAlbums()+id);
         };
         service.createAlbum = function(album,id){
             return $http.post(saveAlbums()+id,album);
         };
         service.deleteAlbum = function(id){
             return $http.delete(deleteAlbums()+id);
         };
         service.updateAlbum = function(id,album){
             return $http.put(updateAlbums()+id,album);
         };


     })
     .service('UsersModel', function($http,ENDPOINT_URI){
         var service = this;
         var pathUsers = "getUsers/";
         var pathUsersSave="saveUsers/";
         var pathUsersById ='getUsersById/';
         var pathUsersDelete = 'deleteUsers/';
         var pathUsersUpdate='updateUsers/';
         var pathLogin ='login/';
         var pathBand = 'getBandByUsersId/';
         var pathCheckToken='checkToken/';
         var pathGetUserByMemberId ="getUserByMemberId/";
         var pathSetLeader ="setLeader/";
         var pathNotMembers ="getUsersNotMembers/";


         function getUsers(){
             return ENDPOINT_URI + pathUsers;
         }

         function getUsersById(){
             return ENDPOINT_URI + pathUsersById;
         }

         function getUserByMemberId(){
             return ENDPOINT_URI + pathGetUserByMemberId;
         }

         function deleteUsers(){
             return ENDPOINT_URI + pathUsersDelete;
         }

         function saveUsers(){
             return ENDPOINT_URI + pathUsersSave;
         }

         function updateUsers(){
             return ENDPOINT_URI + pathUsersUpdate;
         }

         function login(){
             return ENDPOINT_URI + pathLogin;
         }

         function getBand(){
             return ENDPOINT_URI + pathBand;
         }
         function checkToken(){
             return ENDPOINT_URI + pathCheckToken;
         }

         function setLeader(){
             return ENDPOINT_URI + pathSetLeader;
         }
         function getUsersNotMembers(){
             return ENDPOINT_URI + pathNotMembers;
         }



         service.getUsers = function(){
             return $http.get(getUsers());
         };
         service.getUserByMemberId = function(id){
             return $http.get(getUserByMemberId()+id);
         };
         service.getUsersById = function(id){
             return $http.get(getUsersById()+id);
         };
         service.createUsers = function(user){
             return $http.post(saveUsers(),user);
         };
         service.deleteUsers = function(id){
             return $http.delete(deleteUsers()+id);
         };
         service.updateUsers = function(id,user){
             return $http.put(updateUsers()+id,user);
         };
         service.setLeader = function(email){
             return $http.post(setLeader(),email);
         };
         service.login = function(email,pass){
             return $http.post(login(),{
                     email: email,
                     pass: pass
                 }
             );
         };

         service.getNotMembers = function(users){
             return $http.post(getUsersNotMembers(),users);
         };


         service.getBandByUserId = function(id){
             return $http.get(getBand()+id);
         };
         service.verifyToken = function(token){
             return $http.post(checkToken(), token);
         };


     })
     .service('FilesModel', function($http,ENDPOINT_URI){

         var service = this;
         var pathUsersAvatar = "getUsersAvatar/";
         var pathCheckAvatar = "checkAvatar/";
         var pathCheckBandLogo = "checkBandLogo/";
         var pathCheckAlbumLogo = "checkAlbumLogo/";
         var pathBandLogo = "getBandLogo/";
         var pathAlbumLogo = "getAlbumsLogo/";
         var pathDownloadTrack = "downloadTrack/";
         var pathDownloadSong = "downloadSongs/";
         var pathRunAudacity ="runAudacity";

         function getUsersAvatar(){
             return ENDPOINT_URI + pathUsersAvatar;
         }

         function downloadSongs() {
             return ENDPOINT_URI + pathDownloadSong;
         }

         function downloadTrack(){
             return ENDPOINT_URI + pathDownloadTrack;
         }
         function checkAvatar(){
             return ENDPOINT_URI + pathCheckAvatar;
         }
         function getBandLogo(){
             return ENDPOINT_URI + pathBandLogo;
         }
         function checkBandLogo(){
             return ENDPOINT_URI + pathCheckBandLogo;
         }
         function checkAlbumLogo(){
             return ENDPOINT_URI + pathCheckAlbumLogo;
         }
         function getAlbumLogo(){
             return ENDPOINT_URI + pathAlbumLogo;
         }
         function runAudacity(){
             return ENDPOINT_URI + pathRunAudacity;
         }

         service.getUsersAvatar = function(id){
             return getUsersAvatar()+id;
         };

         service.checkAvatar = function(id){
             return $http.get(checkAvatar()+id);
         };

         service.getBandLogo = function(id){
             return getBandLogo()+id;
         };
         service.getAlbumLogo = function(id){
             return getAlbumLogo()+id;
         };

         service.checkBandLogo = function(id){
             $http.get(checkBandLogo()+id).then(function(result){
                return result.data.logo;
             });
         };
        service.downloadTrack = function(bandId, filename){
            return downloadTrack()+bandId+"/"+filename;
        };
         service.checkAlbumLogo = function(id){
             return $http.get(checkAlbumLogo()+id);
         };

         service.downloadSongs = function(bandsId, filename){
             return downloadSongs()+bandsId+"/"+filename;
         };

         service.runAudacity = function(){
             return runAudacity();
         };
         service.getApi = ENDPOINT_URI;


     })
     .service('MembersModel', function($http, ENDPOINT_URI){
         var service = this;
         var pathGetMembers = 'getUsersByBandsId/';
         var pathMembers = 'getMembersByBandsId/';
         var pathDelMembers = 'deleteMembers/';
         var pathSaveMember ='saveMember/';
         var pathMember = 'getMember/';

         function getMembers(){
             return ENDPOINT_URI + pathGetMembers;
         }
         function getMember(){
             return ENDPOINT_URI + pathMember;
         }

         function saveMember(){
             return ENDPOINT_URI + pathSaveMember;
         }

         function getMembersRaw(){
             return ENDPOINT_URI + pathMembers;
         }

         function deleteMember(){
             return ENDPOINT_URI + pathDelMembers;
         }


         service.getMembers = function(id){
             return $http.get(getMembers()+id);
         };
         service.getMember = function(bandId,userId){
             return $http.get(getMember()+bandId+"/"+userId);
         };
         service.saveMember = function(id,bandId,token){
             return $http.post(saveMember()+bandId+"/"+id,{token: token});
         };
         service.getMembersRaw = function(id){
             return $http.get(getMembersRaw()+id);
         };
         service.deleteMember = function(id,bandId){
             return $http.delete(deleteMember()+id+"/"+bandId);
         };

     })
     .service('TracksModel', function($http, ENDPOINT_URI){
         var service = this;
         var pathCreateTrack = "saveTracks/";
         var pathGetTracks ="getTracksByUsersId/";
         var pathUpdateTracks ="updateTracks/";
         var pathGetTracksByBandsId ="getTracksByBandsId/";

         function saveTrack(){
             return ENDPOINT_URI + pathCreateTrack;
         }

         function updateTrack(){
             return ENDPOINT_URI + pathUpdateTracks;
         }

         function getTracks(){
             return ENDPOINT_URI + pathGetTracks;
         }

         function getTracksByBandsId(){
             return ENDPOINT_URI + pathGetTracksByBandsId;
         }

         service.createTrack=function(track){
             return $http.post(saveTrack(),track);
         };

         service.updateTracks=function(id,track){
             return $http.put(updateTrack()+id,track);
         };

         service.getTracksByBandsId= function(id){
           return $http.get(getTracksByBandsId()+id);
         };


         service.getTracks=function(id){
           return $http.get(getTracks()+id);
         }

     })
     .service('SongsModel',function($http,ENDPOINT_URI){
         var service = this;

         var pathCreateSong="saveSongs/";
         var pathGetSongsByAlbumsId="getSongsByAlbumsId/";
         var pathGetSongsByBandsId="getSongsByBandsId/";
         var pathUpdateSong ="updateSongs/";
         var pathDeleteSong = "deleteSongs/";
         var pathGetSongById = "getSongsById/";

         function createSong(){
             return ENDPOINT_URI + pathCreateSong;
         }

         function getSongsByAlbumsId(){
             return ENDPOINT_URI + pathGetSongsByAlbumsId;
         }

         function getSongsByBandsId(){
             return ENDPOINT_URI + pathGetSongsByBandsId;
         }

         function updateSongs(){
             return ENDPOINT_URI + pathUpdateSong;
         }

         function deleteSong(){
             return ENDPOINT_URI + pathDeleteSong;
         }

         function getSongById(){
             return ENDPOINT_URI + pathGetSongById;
         }

         service.createSong=function(song){
             return $http.post(createSong(),song);
         };
         service.getSongByAlbumsId = function(albumsId) {
             return $http.get(getSongsByAlbumsId() + albumsId);
         };
         service.getSongByBandsId = function(bandsId){
             return $http.get(getSongsByBandsId()+bandsId);
         };
         service.updateSong = function(id, song){
             return $http.put(updateSongs()+id,song);
         };
         service.deleteSong = function(id){
            return $http.delete(deleteSong()+id);
         };
         service.getSongById = function(id){
           return $http.get(getSongById()+id);
         }

     });