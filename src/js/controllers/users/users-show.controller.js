angular
  .module('pcBuilderApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', '$stateParams'];
function UsersShowCtrl(User, $stateParams) {
  const vm = this;
  User.get($stateParams)
  .$promise.then(res => {
    vm.user = res;
  }, err => {
    if(err) console.log(err);
  });
}
