print('Start #################################################################')

db = db.getSiblingDB('neoway-fullstack-db')
db.createUser({
  user: 'root',
  pwd: 'essavagaehminha',
  roles: [{ role: 'readWrite', db: 'neoway-fullstack-db' }]
})

db.createCollection('users')

db.users.insertMany([
  {
    name: 'Senhor Stark',
    document: '67470813071',
    documentType: 'CPF',
    blocked: false,
    order: 0,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString()
  },
  {
    name: 'Petter Parker',
    document: '21537299042',
    documentType: 'CPF',
    blocked: true,
    order: 3,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString()
  },
  {
    name: 'Industrias Stark',
    document: '36199692000196',
    documentType: 'CNPJ',
    blocked: false,
    order: 2,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString()
  },
  {
    name: 'Pepper Potts',
    document: '21537299042',
    documentType: 'CPF',
    blocked: false,
    order: 1,
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString()
  }
])

print('END #################################################################')
