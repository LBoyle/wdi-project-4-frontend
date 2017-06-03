angular
  .module('pcBuilderApp')
  .factory('Rig', Rig);

Rig.$inject = ['API', '$resource'];
function Rig(API, $resource) {
  return $resource(`${API}/rigs/:id`, {id: '@_id'},
    {
      'update': { method: 'PUT' }
    }
  );
}
