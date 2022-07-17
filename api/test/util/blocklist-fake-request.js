const getFakeResAndReq = () => {
  const req = {
    mongo: {
      findWithPagination: () => true,
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
