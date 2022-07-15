### Node
FROM node:16.5.0 AS base
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .

## Service
FROM base AS service
CMD ["node", "./src/server.js"]

## Test/Coverage
FROM base AS test
CMD ["npm", "run", "coverage"]
