const getFakeResAndReq = () => {
  const req = {
    mongo: {
      findWithPagination: () => true,
      getLastNextOrderSequence: () => true,
      insertOne: () => true
    }
  }

  const res = {
    status: () => ({
      send: () => true
    })
  }

  return [res, req]
}

module.exports = getFakeResAndReq
