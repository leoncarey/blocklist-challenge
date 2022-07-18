const getFakeResAndReq = () => {
  const req = {
    method: 'GET',
    mongo: {
      deleteById: () => true,
      findWithPagination: () => true,
      getLastNextOrderSequence: () => true,
      insertOne: () => true,
      ping: () => true,
      updateOne: () => true
    },
    path: '/users',
    statusCode: 200
  }

  const res = {
    end: () => true,
    set: () => true,
    status: () => ({
      send: () => true
    })
  }

  return [res, req]
}

module.exports = getFakeResAndReq
