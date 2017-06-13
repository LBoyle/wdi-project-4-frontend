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

  vm.newParts = {};
  vm.errors = {};
  vm.recentPart = {};
  vm.partsNotAllowed = [];
  vm.filteredParts = {};

  Rig.get($stateParams).$promise
  .then(rig => {
    vm.rig = rig;
    rig.parts.forEach(part => {
      vm.newParts[part.parttypes[0].parttype] = part.id;
    });
    return Parttype.query().$promise
    .then(types => {
      return types;
    });
  }, err => {
    console.error(err);
  })
  .then(types => {
    console.log(types);
    vm.types = types;
    types.forEach(type => {
      vm.filteredParts[type.parttype] = type;
    });
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
    return Object.keys(vm.newParts).map(key => vm.newParts[key]).filter(Boolean);
  };

  // vm.checkValidationx = (id, type) => {
  //   if (id) {
  //     Part.get({ id: id })
  //     .$promise
  //     .then(data => {
  //       vm.recentPart = data;
  //       const errors = data.incompatibilities.map(incompatibility => {
  //         if (Object.values(vm.newParts).indexOf(incompatibility.id) >= 0) {
  //           return (`Incompatible with ${incompatibility.name}`);
  //         }
  //       }).filter(Boolean);
  //       vm.formIsValid = (errors.length > 0) ? false : true;
  //       vm.newParts[type] = data.id;
  //       vm.errors[type] = errors;
  //     }, err => {
  //       console.error(err);
  //     });
  //   } else {
  //     vm.errors[type] = [];
  //   }
  // };

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
    vm.transposeToArr().filter(Boolean).forEach(id => {
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

  vm.deleteRig = () => {
    Rig.delete($stateParams).$promise
    .then(() => {
      $rootScope.$broadcast('userUpdate');
      $state.go('home');
    });
  };
}
