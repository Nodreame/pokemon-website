(function () {
  'use strict';
  angular.module('pokemon-app.hagberry', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/hagberrys', {
        templateUrl: 'hagberry/hagberry-list.html',
        controller:  'HagberryListController'
      }).when('/hagberry/:id', {
        templateUrl:  'hagberry/hagberry-detail.html',
        controller:   'HagberryDetailController'
      });
  }])
  .controller('HagberryListController', HagberryListController)
  .controller('HagberryDetailController', HagberryDetailController);

  var hagberrys = [
    {
      id: 1,
      name: {
        cn: '树果',
        jp: 'きのみ',
        en: 'Berry'
      },
      version: '第二世代',
      desc: '携带后，可以回复自己１０点体力'
    }, 
    {
      id: 2,
      name: {
        cn: '黄金的果实',
        jp: 'おうごんのみ',
        en: 'Gold Berry'
      },
      version: '第二世代',
      desc: '携带后，可以回复自己３０点体力'
    }, 
    {
      id: 3,
      name: {
        cn: '樱子果',
        jp: 'クラボのみ',
        en: 'Cheri Berry'
      },
      version: '第三世代',
      desc: '让宝可梦携带后，可以治愈麻痹'
    }, 
    {
      id: 4,
      name: {
        cn: '零余果',
        jp: 'カゴのみ',
        en: 'Chesto Berry'
      },
      version: '第三世代',
      desc: '让宝可梦携带后，可以治愈睡眠'
    }
  ];

  HagberryListController.$inject = ['$scope'];
  function HagberryListController ($scope) {
    $scope.hagberrys = hagberrys;
    $scope.remove = function (index) {
      $scope.hagberrys.splice(index, 1);
    };
  };

  HagberryDetailController.$inject = ['$scope', '$routeParams'];
  function HagberryDetailController ($scope, $routeParams) {
    console.log('$routeParams.id: ', $routeParams.id);
    var id = parseInt($routeParams.id);
    angular.forEach(hagberrys, function (element) {
      if (element.id === id) {
        $scope.hagberry = element;
        console.log(element);
      }
    });
  };
})();