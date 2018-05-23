import angular from 'angular';
import ngRoute from 'angular-route';
import hagberrylist from './hagberry-list.html';
import hagberrydetail from './hagberry-detail.html';
import delDiage from '../common/deleteDialog.tpl.html';

export default angular.module('pokemon-app.hagberry', [ngRoute])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/hagberrys', {
        template: hagberrylist,
        controller:  'HagberryListController'
      }).when('/hagberry/:id', {
        template:  hagberrydetail,
        controller:   'HagberryDetailController'
      });
  }])
  .controller('HagberryListController', HagberryListController)
  .controller('HagberryDetailController', HagberryDetailController)
  .controller('HagberryDelInstanceController', HagberryDelInstanceController)
  .name;

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

HagberryListController.$inject = ['$scope', '$uibModal'];
function HagberryListController ($scope, $uibModal) {
  $scope.hagberrys = hagberrys;
  $scope.remove = function (index) {
    console.log('index:', index);
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: delDiage,
      controller: 'HagberryDelInstanceController',
      resolve: {
        hagberry: function () {
          return $scope.hagberrys[index];
        }
      }
    });
    modalInstance.result.then(function (content) {
      console.log('Delete!', content);
      $scope.hagberrys.splice(index, 1);   
    }, function (content) {
      console.log('Cancel!', content);
    });
  };
}

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
}

HagberryDelInstanceController.$inject = ['$scope', '$uibModalInstance', 'hagberry'];
function HagberryDelInstanceController ($scope, $uibModalInstance, hagberry) {
  // console.log('thisIndex:', thisIndex);
  console.log('hagberry:', hagberry);
  $scope.modalTitle = '删除';
  $scope.modalBody  = '是否删除' + hagberry.name.cn + '的数据';
  $scope.ok = function () {
    console.log('delete!');
    $uibModalInstance.close(hagberry);
  };
  $scope.cancel = function () {
    console.log('cancel!');
    $uibModalInstance.dismiss('cancel');
  };
}