angular
  .module('pcBuilderApp')
  .controller('RigsNewCtrl', RigsNewCtrl);

RigsNewCtrl.$inject = [
  'Rig',
  'Part',
  'Parttype',
  'TokenService',
  '$rootScope',
  '$state'
];
function RigsNewCtrl(
  Rig,
  Part,
  Parttype,
  TokenService,
  $rootScope,
  $state
) {
  const vm = this;

  vm.formIsValid = false;
  vm.description = '';
  vm.partIds = [];
  vm.errors = {};
  vm.recentPart = {};

  vm.submitParts = () => {
    if (vm.formIsValid) {
      Rig.save({
        rig: {
          description: vm.description,
          part_ids: vm.partIds.filter(Boolean)
        }
      }).$promise
      .then(res => {
        $rootScope.$broadcast('userUpdate');
        $state.go('rigsShow', {id: res.id});
      }, err => {
        console.error(err);
      });
    } else {
      console.log('form not valid');
    }
  };

  vm.checkValidation = (id, type) => {
    if (id) {
      Part.get({ id: id })
      .$promise
      .then(data => {
        vm.recentPart = data;
        const errors = data.incompatibilities.map(incompatibility => {
          if (vm.partIds.indexOf(incompatibility.id) >= 0) {
            vm.formIsValid = false;
            return (`Incompatible with ${incompatibility.name}`);
          }
        }).filter(Boolean);
        vm.formIsValid = (errors.length > 0) ? false : true;
        vm.errors[type] = errors;
      }, err => {
        console.error(err);
      });
    } else {
      vm.errors[type] = [];
    }
  };

  Parttype.query().$promise
  .then(types => {
    vm.types = types;
  }, err => {
    console.error(err);
  });
}
