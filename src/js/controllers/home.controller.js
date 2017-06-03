angular
  .module('pcBuilderApp')
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function HomeCtrl(User, CurrentUserService, $state) {
  const vm = this;

}
