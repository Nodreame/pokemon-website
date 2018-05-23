import angular from 'angular';
import ngRoute from 'angular-route';
import gamelist from './game-list.html';
import gamedetail from './game-detail.html';
import delDiage from '../common/deleteDialog.tpl.html';

export default angular.module('pokemon-app.game', [ngRoute])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/games', {
        template: gamelist,
        controller:  'GameListController'
      }).when('/game/:id', {
        template:  gamedetail,
        controller:   'GameDetailController'
      });
  }])
  .controller('GameListController', GameListController)
  .controller('GameDetailController', GameDetailController)
  .controller('GameDelInstanceController', GameDelInstanceController)
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

GameListController.$inject = ['$scope', '$uibModal'];
function GameListController ($scope, $uibModal) {
  $scope.games = games;
  $scope.remove = function (index) {
    console.log('index:', index);
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: delDiage,
      controller: 'GameDelInstanceController',
      resolve: {
        game: function () {
          return $scope.games[index];
        }
      }
    });
    modalInstance.result.then(function (content) {
      console.log('Delete!', content);
      $scope.games.splice(index, 1);   
    }, function (content) {
      console.log('Cancel!', content);
    });
  };
}

GameDetailController.$inject = ['$scope', '$routeParams'];
function GameDetailController ($scope, $routeParams) {
  var id = parseInt($routeParams.id);
  angular.forEach(games, function (element) {
    if (element.id === id) {
      $scope.game = element;
      console.log(element);
    }
  });
}

GameDelInstanceController.$inject = ['$scope', '$uibModalInstance', 'game'];
function GameDelInstanceController ($scope, $uibModalInstance, game) {
  // console.log('thisIndex:', thisIndex);
  console.log('game:', game);
  $scope.modalTitle = '删除';
  $scope.modalBody  = '是否删除' + game.name.cn + '的数据';
  $scope.ok = function () {
    console.log('delete!');
    $uibModalInstance.close(game);
  };
  $scope.cancel = function () {
    console.log('cancel!');
    $uibModalInstance.dismiss('cancel');
  };
}