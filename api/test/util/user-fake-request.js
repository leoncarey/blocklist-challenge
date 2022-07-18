const getFakeResAndReq = () => {
  const req = {
    mongo: {
      deleteById: () => true,
      findWithPagination: () => true,
      getLastNextOrderSequence: () => true,
      insertOne: () => true,
      updateOne: () => true
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
