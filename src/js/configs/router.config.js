angular
  .module('pcBuilderApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {

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
    .state('rigsShow', {
      url: '/rigs/:id',
      templateUrl: '/js/views/rigs/rig-show.html',
      controller: 'RigsShowCtrl as rig'
    });

  $urlRouterProvider.otherwise('/');
}
