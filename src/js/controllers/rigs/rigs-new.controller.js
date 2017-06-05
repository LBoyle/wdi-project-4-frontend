angular
  .module('pcBuilderApp')
  .controller('RigsNewCtrl', RigsNewCtrl);

RigsNewCtrl.$inject = [
  'Rig',
  'Part',
  'Parttype',
  'filterFilter',
  'TokenService',
  '$rootScope',
  '$state'
];
function RigsNewCtrl(
  Rig,
  Part,
  Parttype,
  filterFilter,
  TokenService,
  $rootScope,
  $state
) {
  const vm = this;
  // console.log(vm.newRig());

  vm.description = '';
  vm.partNames = [];
  vm.partIds = [];

  Part.query().$promise
  .then(res => {
    vm.partsAll = res;
  });

  vm.submitParts = () => {
    for (let i=0; i<vm.partNames.length; i++) {
      vm.partIds.push(filterFilter(vm.partsAll, {name: vm.partNames[i]})[0].id);
      if(i === vm.partNames.length-1) {
        vm.submitCallback();
      }
    }
  };

  vm.submitCallback = () => {
    setTimeout(() => {
      Rig.save({
        rig: {
          description: vm.description,
          part_ids: vm.partIds
        }
      }).$promise
      .then(res => {
        console.log(res.id);
        $rootScope.$broadcast('userUpdate');
        $state.go('rigsShow', {id: res.id});
      });
    }, 100);
  };

  Parttype.query().$promise
  .then(types => {
    vm.types = types;
  });
}
