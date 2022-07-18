const router = require('express').Router()
const { RouterTool } = require('./middleware')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./api.json')

const {
  HealthzController,
  UserController
} = require('./controllers')

router.use('/docs', swaggerUi.serve)
router.get('/docs', swaggerUi.setup(swaggerDocument))

// Healthz
RouterTool.create(router, 'GET', '/healthz', HealthzController.get)

// UserController
RouterTool.create(router, 'GET', '/users', UserController.get)
RouterTool.create(router, 'POST', '/users', UserController.post)
RouterTool.create(router, 'DELETE', '/users/:userId', UserController.delete)
RouterTool.create(router, 'PATCH', '/users/:userId', UserController.update)

module.exports = router
