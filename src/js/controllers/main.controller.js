angular
  .module('pcBuilderApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = [
  'CurrentUserService',
  '$rootScope',
  '$state'
];
function MainCtrl(
  CurrentUserService,
  $rootScope,
  $state
) {
  const vm = this;

  vm.isNavCollapsed = true;

  $rootScope.$on('$stateChangeSuccess', () => {
    vm.isNavCollapsed = true;
  });

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
  });

  $rootScope.$on('userUpdate', () => {
    vm.user = CurrentUserService.getUser();
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('login');
  });

  vm.logout = () => {
    CurrentUserService.removeUser();
  };

}
