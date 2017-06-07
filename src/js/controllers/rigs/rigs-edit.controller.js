angular
  .module('pcBuilderApp')
  .controller('RigsEditCtrl', RigsEditCtrl);

RigsEditCtrl.$inject = [
  'Rig',
  'Parttype',
  'Part',
  '$stateParams'
];
function RigsEditCtrl(
  Rig,
  Parttype,
  Part,
  $stateParams
) {
  const vm = this;

  vm.newParts = {};

  Rig.get($stateParams).$promise
  .then(rig => {
    vm.rig = rig;
    rig.parts.forEach(part => {
      vm.newParts[part.parttypes[0].parttype] = part.id;
    });
    return Parttype.query();
  })
  .then(types => {
    vm.types = types;
  });

  vm.updateRig = () => {
    const newPartsReady = vm.transposeToArr();
    Rig.update($stateParams, { rig: {
      description: vm.rig.description,
      part_ids: newPartsReady
    }})
    .$promise
    .then(rig => {
      console.log('returned');
      console.log(rig);
    });
  };

  vm.transposeToArr = () => {
    return Object.keys(vm.newParts).map(key => vm.newParts[key]).filter(id => id !== false && id != null);
  };
}
