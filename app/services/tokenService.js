'use strict';
/**
 * Created by Sibrand on 2017-01-19.
 */
angular.module('TokenService', ['angular-storage', 'angular-jwt'])

    .service('checkToken', function(store,jwtHelper){

        var token = store.get('token');
        if(token)
            token = jwtHelper.decodeToken(token);
        else
            token=false;

        this.payload = function(){
            return token;
        };
        this.loggedIn = function(){
            if(token){
                return true;
            }
            else{
                return false;
            }
        };
        this.isAdmin = function(){
            if(token.role=='admin')
            {
                return true;
            }
            else
            {
                return false;
            }
        };

        this.isLeader = function(){
          if(token.bandIdLeader){
              return true;
          }
            else{
              return false;
          }
        };
        this.raw = function(){
            return store.get('token');
        };

        this.del = function()
        {
          store.remove('token');
        }


    });

