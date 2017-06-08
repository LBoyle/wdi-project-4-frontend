angular
  .module('pcBuilderApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = [
  'User',
  'CurrentUserService',
  '$state',
  'emailValidate'
];
function LoginCtrl(
  User,
  CurrentUserService,
  $state,
  emailValidate
) {
  const vm = this;

  vm.emailValidate = emailValidate;

  vm.login = () => {
    User
      .login(vm.user).$promise
      .then(() => {
        CurrentUserService.getUser();
        $state.go('home');
      }, err => {
        console.log(err);
      });
  };
}
