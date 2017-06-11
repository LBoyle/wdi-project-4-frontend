angular
  .module('pcBuilderApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', '$stateParams'];
function UsersShowCtrl(User, $stateParams) {
  const vm = this;
  vm.showusers = false;
  vm.showeditbtn = false;

  User.get($stateParams)
  .$promise.then(res => {
    vm.user = res;
  }, err => {
    if(err) console.log(err);
  });
}
