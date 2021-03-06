import angular from 'angular';
import ngRoute from 'angular-route';
import pmlist from './pm-list.html';
import pmdetail from './pm-detail.html';
import delDiage from '../common/deleteDialog.tpl.html';

export default angular.module('pokemon-app.pokemon', [ngRoute])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/pokemons', {
          template: pmlist,
          controller: 'PMListController'
        })
        .when ('/pokemon/:no', {
          template: pmdetail,
          controller: 'PMDetailController'
        })
    }])
    .controller('PMListController', PMListController)
    .controller('PMDetailController', PMDetailController)
    .controller('PMDelInstanceController', PMDelInstanceController)
    .name;

  
var pokemons = [
  { no:'001', name:'妙蛙种子', count: 1, weight: 6.9, property: '草/毒', type: '种子宝可梦', 
    character: { common: '茂盛', conceal: '叶绿素'},
    img: 'https://s1.52poke.wiki/wiki/thumb/2/21/001Bulbasaur.png/300px-001Bulbasaur.png'
  },
  { no:'002', name:'妙蛙草', count: 1, weight: 13.0, property: '草/毒', type: '种子宝可梦',  
    character: { common: '茂盛', conceal: '叶绿素'},
    img: 'https://s1.52poke.wiki/wiki/thumb/7/73/002Ivysaur.png/300px-002Ivysaur.png'
  },
  { no:'003', name:'妙蛙花', count: 1, weight: 100, property: '草/毒', type: '种子宝可梦',  
    character: { common: '茂盛', conceal: '叶绿素'},
    img: 'https://s1.52poke.wiki/wiki/thumb/a/ae/003Venusaur.png/300px-003Venusaur.png'
  },
  { no:'004', name:'小火龙', count: 1, weight: 8.5, property: '火', type: '蜥蜴宝可梦',  
    character: { common: '猛火', conceal: '太阳之力'},
    img: 'https://s1.52poke.wiki/wiki/thumb/7/73/004Charmander.png/300px-004Charmander.png'
  },
  { no:'025', name:'皮卡丘', count: 1, weight: 6, property: '电', type: '鼠宝可梦',  
    character: { common: '静电', conceal: '避雷针'},
    img: 'http://s1.52poke.wiki/wiki/thumb/0/0d/025Pikachu.png/260px-025Pikachu.png',
    forms: [
      { name: '偶像皮卡丘', src: 'http://s1.52poke.wiki/wiki/thumb/e/e8/025Pikachu-Pop_Star.png/260px-025Pikachu-Pop_Star.png'},
      { name: '博士皮卡丘', src: 'http://s1.52poke.wiki/wiki/thumb/2/2f/025Pikachu-PhD.png/260px-025Pikachu-PhD.png'},
      { name: '面罩摔角手皮卡丘', src: 'http://s1.52poke.wiki/wiki/thumb/e/e7/025Pikachu-Libre.png/260px-025Pikachu-Libre.png'},
      { name: '贵妇皮卡丘', src: 'http://s1.52poke.wiki/wiki/thumb/f/f0/025Pikachu-Belle.png/260px-025Pikachu-Belle.png'},
      { name: '重摇滚皮卡丘', src: 'http://s1.52poke.wiki/wiki/thumb/4/4f/025Pikachu-Rock_Star.png/260px-025Pikachu-Rock_Star.png'},
    ] }
];

PMListController.$inject = ['$scope', '$uibModal'];
function PMListController ($scope, $uibModal) {
  $scope.pokemons = pokemons;
  console.log($scope.pokemons);

  $scope.remove = function (index) {
    console.log('index:', index);
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: delDiage,
      controller: 'PMDelInstanceController',
      resolve: {
        pokemon: function () {
          return $scope.pokemons[index];
        }
      }
    });
    modalInstance.result.then(function (content) {
      console.log('Delete!', content);
      $scope.pokemons.splice(index, 1);   
    }, function (content) {
      console.log('Cancel!', content);
    });
  };
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

PMDelInstanceController.$inject = ['$scope', '$uibModalInstance', 'pokemon'];
function PMDelInstanceController ($scope, $uibModalInstance, pokemon) {
  // console.log('thisIndex:', thisIndex);
  console.log('pokemon:', pokemon);
  $scope.modalTitle = '删除';
  $scope.modalBody  = '是否删除' + pokemon.name + '的数据';
  $scope.ok = function () {
    console.log('delete!');
    $uibModalInstance.close(pokemon);
  };
  $scope.cancel = function () {
    console.log('cancel!');
    $uibModalInstance.dismiss('cancel');
  };
}