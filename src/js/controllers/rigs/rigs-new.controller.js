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

  vm.description = '';
  vm.partIds = [];
  vm.nullVal = null;

  vm.submitParts = () => {
    Rig.save({
      rig: {
        description: vm.description,
        part_ids: vm.partIds.filter(id => id != false)
      }
    }).$promise
    .then(res => {
      $rootScope.$broadcast('userUpdate');
      $state.go('rigsShow', {id: res.id});
    });
  };

  Parttype.query().$promise
  .then(types => {
    vm.types = types;
  });
}
