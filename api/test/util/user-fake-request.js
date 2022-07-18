const getFakeResAndReq = () => {
  const req = {
    mongo: {
      deleteById: () => true,
      findWithPagination: () => true,
      getLastNextOrderSequence: () => true,
      insertOne: () => true,
      ping: () => true,
      updateOne: () => true
    }
  }

  const res = {
    end: () => true,
    status: () => ({
      send: () => true
    })
  }

  return [res, req]
}

module.exports = getFakeResAndReq
