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

  vm.formIsValid = true;
  vm.description = '';
  vm.partIds = [];
  vm.errors = {};
  vm.partsNotAllowed = [];
  vm.filteredParts = {};

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
        vm.collectIncompatibilities();
      }, err => {
        console.error(err);
      });
    } else {
      vm.errors[type] = [];
      vm.collectIncompatibilities();
    }
  };

  vm.collectIncompatibilities = () => {
    vm.partsNotAllowed = [];
    vm.partIds.filter(Boolean).forEach(id => {
      Part.get({id: id}).$promise
      .then(part => {
        part.incompatibilities.forEach(incompatibility => {
          vm.partsNotAllowed.push(incompatibility.id);
        });
      })
      .then(() => {
        vm.types.forEach(type => {
          vm.filteredParts[type.parttype].parts = type.parts.map(part => {
            if(vm.partsNotAllowed.indexOf(part.id) < 0) {
              return part;
            }
          }).filter(Boolean);
        });
        vm.refreshTypes();
      });
    });
  };

  vm.refreshTypes = () => {
    Parttype.query().$promise
    .then(types => {
      vm.types = types;
    }, err => {
      console.error(err);
    });
  };

  Parttype.query().$promise
  .then(types => {
    vm.types = types;
    types.forEach(type => {
      vm.filteredParts[type.parttype] = type;
    });
  }, err => {
    console.error(err);
  });

}
