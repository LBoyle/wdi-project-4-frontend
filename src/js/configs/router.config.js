angular
  .module('pcBuilderApp')
  .config(Router);

Router.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider'
];
function Router(
  $stateProvider,
  $urlRouterProvider,
  $locationProvider
) {

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/js/views/home.html',
      controller: 'HomeCtrl as home'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/js/views/register.html',
      controller: 'RegisterCtrl as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/js/views/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('rigsIndex', {
      url: '/rigs',
      templateUrl: '/js/views/rigs/rigs-index.html',
      controller: 'RigsIndexCtrl as rigs'
    })
    .state('rigsNew', {
      url: '/rigs/new',
      templateUrl: '/js/views/rigs/rigs-new.html',
      controller: 'RigsNewCtrl as rigs'
    })
    .state('rigsShow', {
      url: '/rigs/:id',
      templateUrl: '/js/views/rigs/rigs-show.html',
      controller: 'RigsShowCtrl as rigs'
    })
    .state('rigsEdit', {
      url: '/rigs/:id/edit',
      templateUrl: '/js/views/rigs/rigs-edit.html',
      controller: 'RigsEditCtrl as rigs'
    })
    .state('partsShow', {
      url: '/parts/:id',
      templateUrl: '/js/views/parts/parts-show.html',
      controller: 'PartsShowCtrl as parts'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/js/views/users/users-show.html',
      controller: 'UsersShowCtrl as users'
    });

  $urlRouterProvider.otherwise('/');
}
