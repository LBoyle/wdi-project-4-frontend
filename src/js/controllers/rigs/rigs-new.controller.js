angular
  .module('pcBuilderApp')
  .controller('RigsNewCtrl', RigsNewCtrl);

RigsNewCtrl.$inject = ['Rig'];
function RigsNewCtrl(Rig) {
  const vm = this;

  vm.newRig = {
    description: '',
    user: '',
    parts: []
  };
}
