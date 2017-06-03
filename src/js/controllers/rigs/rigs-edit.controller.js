angular
  .module('pcBuilderApp')
  .controller('RigsEditCtrl', RigsEditCtrl);

RigsEditCtrl.$inject = [
  'Rig',
  '$stateParams'
];
function RigsEditCtrl(
  Rig,
  $stateParams
) {
  const vm = this;

  Rig.get($stateParams).$promise
  .then(rig => {
    vm.rig = rig;
  });
}
