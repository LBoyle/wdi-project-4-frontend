angular
  .module('pcBuilderApp')
  .controller('RigsNewCtrl', RigsNewCtrl);

RigsNewCtrl.$inject = ['Rig', 'Part', 'Parttype', 'filterFilter', 'TokenService'];
function RigsNewCtrl(Rig, Part, Parttype, filterFilter, TokenService) {
  const vm = this;
  // console.log(vm.newRig());

  vm.description = '';
  vm.partNames = [];
  vm.partIds = [];
  
  vm.newRig = () => {
    return {
      description: vm.description,
      user_id: TokenService.decodeToken().id,
      parts: vm.partIds
    };
  };

  Part.query().$promise
  .then(res => {
    vm.partsAll = res;
  });

  vm.submitParts = () => {
    vm.partNames.forEach(part => {
      vm.partIds.push(filterFilter(vm.partsAll, {name: part})[0].id);
      console.log(vm.newRig());
    });
  };

  Parttype.query().$promise
  .then(types => {
    vm.types = types;
  });
}
