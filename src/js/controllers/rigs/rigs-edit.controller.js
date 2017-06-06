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
  vm.newParts = [];

  Rig.get($stateParams).$promise
  .then(rig => {
    vm.rig = rig;
    rig.parts.forEach(part => {
      vm.rigPartsByType.push({
        part: part,
        type: part.parttypes[0].parttype
      });
      // vm.newParts.push(part.id);
    });
    return Parttype.query();
  })
  .then(types => {
    vm.types = types;
  });


  // vm.getPartsInCategory = (part) => {
  //   const type = part.parttypes[0].parttype;
  //   console.log(filterFilter(vm.types, {parttype: type})[0].parts);
  //   return filterFilter(vm.types, {parttype: type})[0].parts;
  //   // .filter(p => p.name !== part.name)
  // };

  vm.getPartsInCategoryx = (part) => {
    return vm.types[part.parttypes[0].parttype].parts;
  };

  vm.filterRigPartsByCategory = (cat) => {
    return filterFilter(vm.rigPartsByType, {type: cat})[0].part;
  };

  vm.updateRig = () => {
    console.log(vm.newParts.filter(n => n != false));
  };
}
