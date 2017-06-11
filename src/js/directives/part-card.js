angular
  .module('pcBuilderApp')
  .directive('partcards', partcards);

partcards.$inject = [];
function partcards() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '/js/views/templates/part-card.html';
  directive.scope = {
    partlist: '='
  };
  return directive;
}
