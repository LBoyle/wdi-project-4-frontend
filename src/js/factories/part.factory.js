angular
  .module('pcBuilderApp')
  .factory('Part', Part);

Part.$inject = ['API', '$resource'];
function Part(API, $resource) {
  return $resource(`${API}/parts/:id`, {id: '@_id'},
    {
      'update': { method: 'PUT' }
    }
  );
}
