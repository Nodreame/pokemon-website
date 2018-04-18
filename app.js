(function () {
  'use strict';
  angular.module('pokemon-app', [])
  .controller('AppController', AppController);
  
  var pokemons = [
    {no:'001', name:'妙蛙种子', count: 1, weight: 6.9},
    {no:'002', name:'妙蛙草', count: 1, weight: 13.0},
    {no:'003', name:'妙蛙花', count: 1, weight: 100},
    {no:'004', name:'小火龙', count: 1, weight: 8.5},
  ];

  AppController.$inject = ['$scope'];
  function AppController ($scope) {
    $scope.pokemons = pokemons;
    $scope.remove = function (index) {
      $scope.pokemons.splice(index, 1);
    }
  }
})();