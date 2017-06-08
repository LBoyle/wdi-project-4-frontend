angular
  .module('pcBuilderApp')
  .controller('RigsEditCtrl', RigsEditCtrl);

RigsEditCtrl.$inject = [
  'Rig',
  'Parttype',
  'Part',
  '$stateParams',
  '$rootScope',
  '$state'
];
function RigsEditCtrl(
  Rig,
  Parttype,
  Part,
  $stateParams,
  $rootScope,
  $state
) {
  const vm = this;

  vm.partIds = [];
  vm.newParts = {};
  vm.errors = {};

  Rig.get($stateParams).$promise
  .then(rig => {
    vm.rig = rig;
    rig.parts.forEach(part => {
      vm.newParts[part.parttypes[0].parttype] = part.id;
      vm.partIds.push(part.id);
    });
    return Parttype.query();
  }, err => {
    console.error(err);
  })
  .then(types => {
    vm.types = types;
  }, err => {
    console.error(err);
  });

  vm.updateRig = () => {
    const newPartsReady = vm.transposeToArr();
    Rig.update($stateParams, { rig: {
      description: vm.rig.description,
      part_ids: newPartsReady
    }})
    .$promise
    .then(res => {
      $rootScope.$broadcast('userUpdate');
      $state.go('rigsShow', {id: res.id});
    }, err => {
      console.error(err);
    });
  };

  vm.transposeToArr = () => {
    return Object.keys(vm.newParts).map(key => vm.newParts[key]).filter(id => id !== false && id != null);
  };

  vm.checkValidation = (id, type) => {
    if (id) {
      Part.get({ id: id })
      .$promise
      .then(data => {
        const errors = data.incompatibilities.map(incompatibility => {
          if (vm.partIds.indexOf(incompatibility.id) >= 0) {
            return (`Incompatible with ${incompatibility.name}`);
          }
        }).filter(Boolean);
        vm.partIds = vm.transposeToArr();
        vm.newParts[type] = data.id;
        vm.errors[type] = errors;

        console.log(errors);
      }, err => {
        console.error(err);
      });
    } else {
      vm.errors[type] = [];
    }
  };

  vm.deleteRig = () => {
    Rig.delete($stateParams).$promise
    .then(() => {
      $rootScope.$broadcast('userUpdate');
      $state.go('home');
    });
  };
}
