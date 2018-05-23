import angular from 'angular';
import ngRoute from 'angular-route';
import proplist from './prop-list.html';
import propdetail from './prop-detail.html'; 
import delDiage from '../common/deleteDialog.tpl.html';

export default angular.module('pokemon-app.prop', [ngRoute])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/props',{
      template:  proplist,
      controller:   'PropListController'
    })
    .when('/prop/:id', {
      template:  propdetail,
      controller:   'PropDetailController'
    });
  }])
  .controller('PropListController', PropListController)
  .controller('PropDetailController', PropDetailController)
  .controller('PropDelInstanceController', PropDelInstanceController)
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

PropListController.$inject = ['$scope', '$uibModal'];
function PropListController ($scope, $uibModal) {
  $scope.props = props;
  $scope.remove = function (index) {
    console.log('index:', index);
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: delDiage,
      controller: 'PropDelInstanceController',
      resolve: {
        prop: function () {
          return $scope.props[index];
        }
      }
    });
    modalInstance.result.then(function (content) {
      console.log('Delete!', content);
      $scope.props.splice(index, 1);   
    }, function (content) {
      console.log('Cancel!', content);
    });
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

PropDelInstanceController.$inject = ['$scope', '$uibModalInstance', 'prop'];
function PropDelInstanceController ($scope, $uibModalInstance, prop) {
  // console.log('thisIndex:', thisIndex);
  console.log('prop:', prop);
  $scope.modalTitle = '删除';
  $scope.modalBody  = '是否删除' + prop.name.cn + '的数据';
  $scope.ok = function () {
    console.log('delete!');
    $uibModalInstance.close(prop);
  };
  $scope.cancel = function () {
    console.log('cancel!');
    $uibModalInstance.dismiss('cancel');
  };
}