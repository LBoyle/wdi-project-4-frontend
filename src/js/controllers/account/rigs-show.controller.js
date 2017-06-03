angular
  .module('pcBuilderApp')
  .controller('RigsShowCtrl', RigsShowCtrl);

RigsShowCtrl.$inject = ['User', 'Rig', 'CurrentUserService', '$stateParams'];
function RigsShowCtrl(User, Rig, CurrentUserService, $stateParams) {
  const vm = this;

  Rig.get($stateParams).$promise
  .then(rig => {
    console.log(rig);
    vm.rig = rig;
  });
}
