import angular from 'angular';
import ngRoute from 'angular-route';
import skilllist from './skill-list.html';
import skilldetail from './skill-detail.html';
import delDiage from '../common/deleteDialog.tpl.html';

export default angular.module('pokemon-app.skill', [ngRoute])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/skills', {
        template: skilllist,
        controller: 'SkillListController'
      })
      .when ('/skill/:no', {
        template: skilldetail,
        controller: 'SkillDetailController'
      })
  }])
  .controller('SkillListController', SkillListController)
  .controller('SkillDetailController', SkillDetailController)
  .controller('SkillDelInstanceController', SkillDelInstanceController)
  .name;

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

SkillListController.$inject = ['$scope', '$uibModal'];
function SkillListController ($scope, $uibModal) {
  $scope.skills = skills;
  $scope.remove = function (index) {
    console.log('index:', index);
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: delDiage,
      controller: 'SkillDelInstanceController',
      resolve: {
        skill: function () {
          return $scope.skills[index];
        }
      }
    });
    modalInstance.result.then(function (content) {
      console.log('Delete!', content);
      $scope.skills.splice(index, 1);   
    }, function (content) {
      console.log('Cancel!', content);
    });
  };
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

SkillDelInstanceController.$inject = ['$scope', '$uibModalInstance', 'skill'];
function SkillDelInstanceController ($scope, $uibModalInstance, skill) {
  // console.log('thisIndex:', thisIndex);
  console.log('skill:', skill);
  $scope.modalTitle = '删除';
  $scope.modalBody  = '是否删除' + skill.name.cn + '的数据';
  $scope.ok = function () {
    console.log('delete!');
    $uibModalInstance.close(skill);
  };
  $scope.cancel = function () {
    console.log('cancel!');
    $uibModalInstance.dismiss('cancel');
  };
}