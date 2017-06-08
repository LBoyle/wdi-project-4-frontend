angular
  .module('pcBuilderApp')
  .controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject = [
  'User',
  'CurrentUserService',
  '$state',
  'emailValidate'
];
function RegisterCtrl(
  User,
  CurrentUserService,
  $state,
  emailValidate
){
  const vm = this;

  vm.emailValidate = emailValidate;

  vm.register = () => {
    User
      .register(vm.user).$promise
      .then(() => {
        CurrentUserService.getUser();
        $state.go('home');
      }, err => {
        console.log(err);
      });
  };
}
