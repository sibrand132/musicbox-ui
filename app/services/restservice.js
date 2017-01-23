'use strict';
/**
 * Created by Sibrand on 2017-01-19.
 */
 angular.module('RESTService', [])

     .constant('ENDPOINT_URI', 'http://localhost:8080/api/bands/')
     .service('BandsModel', function($http, ENDPOINT_URI){
         var service = this;
         var pathAll = 'getBands/';
         var pathById='getBandsById/';
         var pathSave='';

         function getAllUrl(){
             return ENDPOINT_URI + pathAll;
         }
         function getByIdUrl(){
             return ENDPOINT_URI + pathById;
         }

         function save(){
             return ENDPOINT_URI + pathSave;
         }
         service.all = function(){
             return $http.get(getAllUrl());
         };

         service.getBandsById = function(id){
           return $http.get(getByIdUrl()+id);
         };

         service.create = function(bands){
             return $http.post(save(),bands);
         }
     });