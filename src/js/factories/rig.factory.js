angular
  .module('pcBuilderApp')
  .factory('Rig', Rig);

Rig.$inject = ['API', '$resource'];
function Rig(API, $resource) {
  const Rig = $resource(`${API}/parts/:id`, {id: '@_id'},
    {
      'update': { method: 'PUT' }
    }
  );

  return Rig;
}
