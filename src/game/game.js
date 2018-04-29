import angular from 'angular';
import ngRoute from 'angular-route';

export default angular.module('pokemon-app.game', [ngRoute])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/games', {
        templateUrl: 'src/game/game-list.html',
        controller:  'GameListController'
      }).when('/game/:id', {
        templateUrl:  'src/game/game-detail.html',
        controller:   'GameDetailController'
      });
  }])
  .controller('GameListController', GameListController)
  .controller('GameDetailController', GameDetailController)
  .name;

var games = [
  {
    id: 1,
    name: {
      cn: '精灵宝可梦红绿版（日本）',
      jp: '',
      en: ''
    },
    platform: 'GB',
    pubDate: {
      jp: '1996–02–27',
      na: '',
      eu: ''
    }
  },
  {
    id: 2,
    name: {
      cn: '精灵宝可梦蓝版（日本）',
      jp: '',
      en: ''
    },
    platform: 'GB',
    pubDate: {
      jp: '1999–10–10',
      na: '',
      eu: ''
    }
  },
  {
    id: 3,
    name: {
      cn: '精灵宝可梦红蓝版（欧美）',
      jp: '',
      en: ''
    },
    platform: 'GB',
    pubDate: {
      jp: '',
      na: '1998–09–01',
      eu: '1999–10–05'
    }
  },
  {
    id: 4,
    name: {
      cn: '宝可梦竞技场',
      jp: '',
      en: ''
    },
    platform: 'N64',
    pubDate: {
      jp: '1998–08–01',
      na: '',
      eu: ''
    }
  }
];

GameListController.$inject = ['$scope'];
function GameListController ($scope) {
  $scope.games = games;
  $scope.remove = function (index) {
    $scope.games.splice(index, 1);
  };
};

GameDetailController.$inject = ['$scope', '$routeParams'];
function GameDetailController ($scope, $routeParams) {
  var id = parseInt($routeParams.id);
  angular.forEach(games, function (element) {
    if (element.id === id) {
      $scope.game = element;
      console.log(element);
    }
  });
};