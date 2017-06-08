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

  vm.submitParts = () => {
    Rig.save({
      rig: {
        description: vm.description,
        part_ids: vm.partIds.filter(id => id !== false && id != null)
      }
    }).$promise
    .then(res => {
      $rootScope.$broadcast('userUpdate');
      $state.go('rigsShow', {id: res.id});
    });
  };

  vm.checkValidation = (id) => {
    if (id) {
      Part.get({ id: id })
      .$promise
      .then(data => {
        const errors = data.incompatibilities.map(incompatibility => {
          if (vm.partIds.indexOf(incompatibility.id) >= 0) {
            return (`Incompatible with ${incompatibility.name}`);
          }
        }).filter(Boolean);
        vm.errors = errors;
        console.log(errors);
      }, err => {
        console.error(err);
      });
    }
  };

  Parttype.query().$promise
  .then(types => {
    vm.types = types;
  });
}
