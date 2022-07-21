print('Start #################################################################')

const userDb = {
  user: 'root',
  pwd: 'essavagaehminha',
  roles: [{ role: 'readWrite', db: 'blocklist-challenge-db' }]
}

const collectionData = [
  {
    name: 'Senhor Stark',
    document: '67470813071',
    documentType: 'CPF',
    blocked: false,
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Petter Parker',
    document: '21537299042',
    documentType: 'CPF',
    blocked: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Industrias Stark',
    document: '36199692000196',
    documentType: 'CNPJ',
    blocked: false,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Pepper Potts',
    document: '21537299042',
    documentType: 'CPF',
    blocked: false,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

database = db.getSiblingDB('blocklist-challenge-db')
database.createUser(userDb)
database.createCollection('users')
database.users.insertMany(collectionData)


print('END #################################################################')
