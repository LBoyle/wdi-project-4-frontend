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
  vm.message = '';

  vm.login = () => {
    User
      .login(vm.user).$promise
      .then(res => {
        CurrentUserService.getUser();
        $state.go('home');
      }, err => {
        if(err.status === 401) vm.message = 'Incorrect Credentials';
        console.log(err);
      });
  };
}
