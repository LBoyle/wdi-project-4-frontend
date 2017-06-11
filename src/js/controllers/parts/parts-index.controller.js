angular
  .module('pcBuilderApp')
  .controller('PartsIndexCtrl', PartsIndexCtrl);

PartsIndexCtrl.$inject = [
  'Parttype'
];
function PartsIndexCtrl(
  Parttype
) {
  const vm = this;
  vm.showpartlinks = true;

  Parttype.query()
  .$promise
  .then(res => {
    vm.types = res;
  });
}
