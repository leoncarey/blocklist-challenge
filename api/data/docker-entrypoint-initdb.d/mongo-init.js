print('Start #################################################################')

db = db.getSiblingDB('neoway-fullstack-db')
db.createUser(
  {
    user: 'root',
    pwd: 'essavagaehminha',
    roles: [{ role: 'readWrite', db: 'neoway-fullstack-db' }]
  }
)
db.createCollection('cpfs')

print('END #################################################################')
