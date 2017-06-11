angular
  .module('pcBuilderApp')
  .controller('RigsIndexCtrl', RigsIndexCtrl);

RigsIndexCtrl.$inject = ['Rig'];
function RigsIndexCtrl(Rig) {
  const vm = this;
  vm.showusers = true;
  vm.showeditbtn = false;

  Rig.query().$promise
  .then(rigs => {
    vm.rigs = rigs;
  });
}
