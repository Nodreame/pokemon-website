import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';

import ngUIBootstrap from 'angular-ui-bootstrap';
// import jquery from 'jquery';
// import popperjs from 'popper.js';

import pokemon from './pokemon/pokemon';
import skill from './skill/skill';
import hagberry from './hagberry/hagberry';
import prop from './prop/prop';
import game from './game/game';

import icon from '../assert/img/spriteball-common.png'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assert/css/dashboard.css'

(function () {
  'use strict';
  angular.module('pokemon-app', [
    ngRoute,
    ngAnimate,
    ngTouch,
    pokemon,
    skill,
    hagberry,
    prop,
    game,
    ngUIBootstrap
  ])
  .config (['$routeProvider', function ($routeProvider) {
    $routeProvider
      .otherwise({  
        redirectTo: '/pokemons'     // 初始化直接跳转到pokemon模块
      });
  }])
  .run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on('$locationChangeSuccess', function () {
      $rootScope.nowUrl = $location.url();
      console.log('nowUrl:', $rootScope.nowUrl);
      // console.log('$route,routes.null.redirectTo:', $route.routes.null.redirectTo);
    });
  }])
  .controller('AppController', AppController);

  AppController.$inject = ['$scope'];
  function AppController ($scope) {
    // $scope.singleModel = 1;
    var sysIcon = new Image();
    sysIcon.src = icon;
    sysIcon.width = 20;
    sysIcon.height = 20;
    document.getElementById('icon').appendChild(sysIcon);
  }
})();