const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./api.json')

const {
  Healthz
} = require('./controllers')

router.use('/docs', swaggerUi.serve)
router.get('/docs', swaggerUi.setup(swaggerDocument))

router.route('/healthz').get(Healthz.get)

module.exports = router
