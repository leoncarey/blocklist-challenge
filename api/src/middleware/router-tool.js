const error = require('./error-tool')

class RouterTool {
  static create (router, verb, path, controller) {
    switch (verb) {
      case 'POST':
        router.route(path).post((req, res, next) => error.verifyError(req, res, next, controller))
        break
      case 'PUT':
        router.route(path).put((req, res, next) => error.verifyError(req, res, next, controller))
        break
      case 'PATCH':
        router.route(path).patch((req, res, next) => error.verifyError(req, res, next, controller))
        break
      case 'DELETE':
        router.route(path).delete((req, res, next) => error.verifyError(req, res, next, controller))
        break

      default:
        router.route(path).get((req, res, next) => error.verifyError(req, res, next, controller))
        break
    }
  }
}

module.exports = RouterTool
