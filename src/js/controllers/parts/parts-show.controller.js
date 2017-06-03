angular
  .module('pcBuilderApp')
  .controller('PartsShowCtrl', PartsShowCtrl);

PartsShowCtrl.$inject = ['User', 'Part', 'CurrentUserService', '$stateParams'];
function PartsShowCtrl(User, Part, CurrentUserService, $stateParams) {
  const vm = this;

  Part.get($stateParams).$promise
  .then(part => {
    vm.part = part;
  });
}
