import angular from 'angular';
import route from 'angular-route';
import pokemon from './pokemon/pokemon';
import skill from './skill/skill';
import hagberry from './hagberry/hagberry';
import prop from './prop/prop';
import game from './game/game';

(function () {
  'use strict';
  angular.module('pokemon-app', [
    route,
    pokemon,
    skill,
    hagberry,
    prop,
    game
    // 'ngRoute',
    // 'pokemon-app.pokemon',           // 添加依赖
    // 'pokemon-app.skill',
    // 'pokemon-app.hagberry',
    // 'pokemon-app.prop',
    // 'pokemon-app.game'
  ])
  .config (['$routeProvider', function ($routeProvider) {
    $routeProvider
      .otherwise({  
        redirectTo: '/pokemons'     // 初始化直接跳转到pokemon模块
      });
  }])
  .controller('AppController', AppController);

  AppController.$inject = ['$scope'];
  function AppController ($scope) {}
})();