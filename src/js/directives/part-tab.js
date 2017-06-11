angular
  .module('pcBuilderApp')
  .directive('parttab', parttab);

parttab.$inject = [];
function parttab() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = '/js/views/templates/part-tab.html';
  directive.scope = {
    part: '='
  };
  return directive;
}
