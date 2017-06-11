angular
  .module('pcBuilderApp')
  .controller('RigsShowCtrl', RigsShowCtrl);

RigsShowCtrl.$inject = [
  'Rig',
  '$stateParams'
];
function RigsShowCtrl(
  Rig,
  $stateParams
) {
  const vm = this;
  vm.showpartlinks = true;

  Rig.get($stateParams).$promise
  .then(rig => {
    vm.rig = rig;
  });
}
