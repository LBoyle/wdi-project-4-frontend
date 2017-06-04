angular
  .module('pcBuilderApp')
  .controller('RigsNewCtrl', RigsNewCtrl);

RigsNewCtrl.$inject = [
  'Rig',
  'Part',
  'Parttype',
  'filterFilter',
  'TokenService',
  '$rootScope'
];
function RigsNewCtrl(
  Rig,
  Part,
  Parttype,
  filterFilter,
  TokenService,
  $rootScope
) {
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
    for (let i=0; i<vm.partNames.length; i++) {
      vm.partIds.push(filterFilter(vm.partsAll, {name: vm.partNames[i]})[0].id);
      if(i === vm.partNames.length-1) {
        console.log(vm.newRig()+' outgoing');
        $rootScope.$broadcast('loggedIn');
        vm.submitCallback();
      }
    }
  };

  vm.submitCallback = () => {
    setTimeout(() => {
      Rig.save(vm.newRig()).$promise
      .then(res => {
        console.log(res.body+' response');

      });
    }, 50);
  };

  Parttype.query().$promise
  .then(types => {
    vm.types = types;
  });
}
