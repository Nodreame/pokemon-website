import angular from 'angular';
import ngRoute from 'angular-route';

export default angular.module('pokemon-app.prop', [ngRoute])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/props',{
      templateUrl:  'src/prop/prop-list.html',
      controller:   'PropListController'
    })
    .when('/prop/:id', {
      templateUrl:  'src/prop/prop-detail.html',
      controller:   'PropDetailController'
    });
  }])
  .controller('PropListController', PropListController)
  .controller('PropDetailController', PropDetailController)
  .name;

var props = [
  {
    id: 1,
    name: {
      cn: '除虫喷雾',
      jp: 'むしよけスプレー',
      en: 'Repel'
    },
    type: '野外道具',
    version: '-',
    desc: '使用后，在较短的一段时间内，弱小的野生宝可梦将完全不会出现'
  }, 
  {
    id: 2,
    name: {
      cn: '白银喷雾',
      jp: 'シルバースプレー',
      en: 'Super Repel'
    },
    type: '野外道具',
    version: '-',
    desc: '弱小的野生宝可梦将完全不会出现。效果比除虫喷雾更持久'
  }, 
  {
    id: 3,
    name: {
      cn: '黄金喷雾',
      jp: 'ゴールドスプレー',
      en: 'Max Repel'
    },
    type: '野外道具',
    version: '-',
    desc: '弱小的野生宝可梦将完全不会出现。效果比白银喷雾更持久'
  }, 
  {
    id: 4,
    name: {
      cn: '离洞绳',
      jp: 'あなぬけのヒモ',
      en: 'Escape Rope'
    },
    type: '野外道具',
    version: '-',
    desc: '结实的长绳。可以从洞窟或迷宫中脱身'
  }
];

PropListController.$inject = ['$scope'];
function PropListController ($scope) {
  $scope.props = props;
  $scope.remove = function (index) {
    $scope.props.splice(index, 1);
  };
};

PropDetailController.$inject = ['$scope', '$routeParams'];
function PropDetailController ($scope, $routeParams) {
  var id = parseInt($routeParams.id);
  angular.forEach(props, function (element) {
    if (element.id === id) {
      $scope.prop = element;
    }
  });
};