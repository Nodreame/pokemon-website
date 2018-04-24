(function () {
  'use strict';
  angular.module('pokemon-app.skill', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/skills', {
        templateUrl: 'skill/skill-list.html',
        controller: 'SkillListController'
      })
      .when ('/skill/:no', {
        templateUrl: 'skill/skill-detail.html',
        controller: 'SkillDetailController'
      })
  }])
  .controller('SkillListController', SkillListController)
  .controller('SkillDetailController', SkillDetailController);

  var skills = [
    {
      no: 1,
      name: {
        cn: '拍击',	
        jp: 'はたく',
        en:	'Pound'
      },
      property: '一般',
      type: '物理',
      power: 40,
      hitrate: 100,
      pp: 35
    },
    {
      no: 2,
      name: {
        cn: '空手劈',	
        jp: 'からてチョップ',
        en:	'Karate Chop'
      },
      property: '格斗',
      type: '物理',
      power: 50,
      hitrate: 100,
      pp: 25
    },
    {
      no: 3,
      name: {
        cn: '连环巴掌',	
        jp: 'おうふくビンタ',
        en:	'Double Slap'
      },
      property: '一般',
      type: '物理',
      power: 15,
      hitrate: 85,
      pp: 10
    }
  ];

  SkillListController.$inject = ['$scope'];
  function SkillListController ($scope) {
    $scope.skills = skills;
    $scope.remove = function (index) {
      $scope.skills.splice(index, 1);
    }
  }

  SkillDetailController.$inject = ['$scope', '$routeParams'];
  function SkillDetailController ($scope, $routeParams) {
    console.log('$routeParams:', $routeParams);
    var no = parseInt($routeParams.no);
    angular.forEach(skills, function (element) {
      if (element.no === no) {
        $scope.skill = element;
        console.log('the match skill:', $scope.skill);
      }
    });
  }
})();