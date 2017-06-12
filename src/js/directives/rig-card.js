angular
  .module('pcBuilderApp')
  .directive('rigcards', rigcards);

rigcards.$inject = [];
function rigcards() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '/js/views/templates/rig-card.html';
  directive.scope = {
    rigslist: '='
    // showpartlinks: '='
  };
  return directive;
}
