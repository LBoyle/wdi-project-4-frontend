angular
  .module('pcBuilderApp')
  .controller('RigsIndexCtrl', RigsIndexCtrl);

RigsIndexCtrl.$inject = ['Rig'];
function RigsIndexCtrl(Rig) {
  const vm = this;

  Rig.query().$promise
  .then(rigs => {
    vm.rigs = rigs;
  });
}
