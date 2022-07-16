const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./api.json')

const {
  HealthzController,
  BlocklistController
} = require('./controllers')

router.use('/docs', swaggerUi.serve)
router.get('/docs', swaggerUi.setup(swaggerDocument))

router.route('/healthz').get(HealthzController.get)
router.route('/get-blocklist').get(BlocklistController.get)

module.exports = router
