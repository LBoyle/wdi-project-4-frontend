angular
  .module('pcBuilderApp')
  .controller('RigsEditCtrl', RigsEditCtrl);

RigsEditCtrl.$inject = [
  'Rig',
  'Parttype',
  '$stateParams'
];
function RigsEditCtrl(
  Rig,
  Parttype,
  $stateParams
) {
  const vm = this;

  vm.updated = {
    description: '',
    parts: []
  };

  Rig.get($stateParams).$promise
  .then(rig => {
    vm.rig = rig;
    rig.parts.forEach(part => {
      vm.updated.parts.push(part.id);
    });
  });

  Parttype.query().$promise
  .then(types => {
    vm.types = types;
  });
}
