const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./api.json')

const {
  HealthzController,
  UserController
} = require('./controllers')

router.use('/docs', swaggerUi.serve)
router.get('/docs', swaggerUi.setup(swaggerDocument))

// Healthz
router.route('/healthz').get(HealthzController.get)

// UserController
router.route('/users').get(UserController.get)
router.route('/users').post(UserController.post)

module.exports = router
