(function () {
  'use strict';
  angular.module('pokemon-app.pokemon', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/pokemons', {
        templateUrl: 'pokemon/pm-list.html',
        controller: 'PMListController'
      })
      .when ('/pokemon/:no', {
        templateUrl: 'pokemon/pm-detail.html',
        controller: 'PMDetailController'
      })
  }])
  .controller('PMListController', PMListController)
  .controller('PMDetailController', PMDetailController);

  
  var pokemons = [
    { no:'001', name:'妙蛙种子', count: 1, weight: 6.9, property: '草/毒', type: '种子宝可梦', character: { common: '茂盛', conceal: '叶绿素'}},
    { no:'002', name:'妙蛙草', count: 1, weight: 13.0, property: '草/毒', type: '种子宝可梦',  character: { common: '茂盛', conceal: '叶绿素'}},
    { no:'003', name:'妙蛙花', count: 1, weight: 100, property: '草/毒', type: '种子宝可梦',  character: { common: '茂盛', conceal: '叶绿素'}},
    { no:'004', name:'小火龙', count: 1, weight: 8.5, property: '火', type: '蜥蜴宝可梦',  character: { common: '猛火', conceal: '太阳之力'}},
    { no:'025', name:'皮卡丘', count: 1, weight: 6, property: '电', type: '鼠宝可梦',  character: { common: '静电', conceal: '避雷针'}}
  ];

  PMListController.$inject = ['$scope'];
  function PMListController ($scope) {
    $scope.pokemons = pokemons;
    $scope.remove = function (index) {
      $scope.pokemons.splice(index, 1);
    }
  }

  PMDetailController.$inject = ['$scope', '$routeParams'];
  function PMDetailController ($scope, $routeParams) {
    console.log('$routeParams:', $routeParams);
    angular.forEach(pokemons, function (element) {
      if (element.no === $routeParams.no) {
        $scope.pokemon = element;
        console.log('the match pokemon:', $scope.pokemon);
      }
    });
  }
})();