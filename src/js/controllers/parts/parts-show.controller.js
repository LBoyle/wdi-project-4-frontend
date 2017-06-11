angular
  .module('pcBuilderApp')
  .controller('PartsShowCtrl', PartsShowCtrl);

PartsShowCtrl.$inject = [
  'Part',
  '$stateParams'
];
function PartsShowCtrl(
  Part,
  $stateParams
) {
  const vm = this;
  vm.showpartlink = false;

  Part.get($stateParams).$promise
  .then(part => {
    vm.part = part;
  });
}
