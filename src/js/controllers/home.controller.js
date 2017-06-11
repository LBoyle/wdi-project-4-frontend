angular
  .module('pcBuilderApp')
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = [];
function HomeCtrl() {
  const vm = this;
  vm.showusers = false;
  vm.showeditbtn = true;
}
