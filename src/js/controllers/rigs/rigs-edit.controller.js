angular
  .module('pcBuilderApp')
  .controller('RigsEditCtrl', RigsEditCtrl);

RigsEditCtrl.$inject = [
  'Rig',
  'Parttype',
  'Part',
  '$stateParams',
  'filterFilter'
];
function RigsEditCtrl(
  Rig,
  Parttype,
  Part,
  $stateParams,
  filterFilter
) {
  const vm = this;

  vm.rigPartsByType = [];

  vm.getPartsInCategory = (part) => {
    const type = part.parttypes[0].parttype;
    return filterFilter(vm.types, {parttype: type})[0].parts.filter(p => p.name !== part.name);
  };

  vm.getRigPartsByCategory = () => {
    setTimeout(() => {
      vm.rig.parts.forEach(part => {
        vm.rigPartsByType.push({
          part: part,
          type: part.parttypes[0].parttype
        });
      });
    }, 500);
  };

  vm.filterRigPartsByCategory = (cat) => {
    return filterFilter(vm.rigPartsByType, {type: cat})[0].part;
  };

  Part.query().$promise
  .then(res => {
    vm.parts = res;
    // console.log(vm.parts);
  });

  Rig.get($stateParams).$promise
  .then(rig => {
    vm.rig = rig;
    // console.log(vm.rig);
  });

  Parttype.query().$promise
  .then(types => {
    vm.types = types;
  });

  vm.getRigPartsByCategory();
  // vm.filterRigPartsByCategory('drive');
}
