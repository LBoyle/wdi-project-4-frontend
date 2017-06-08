angular
  .module('pcBuilderApp')
  .factory('Parttype', Parttype);

Parttype.$inject = ['API', '$resource'];
function Parttype(API, $resource) {
  return $resource(`${API}parttypes/:id`, {id: '@_id'},
    {
      'update': { method: 'PUT' }
    }
  );
}
