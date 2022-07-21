### NODE
FROM node:16.5.0 AS base
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .

## Application
FROM base AS application
CMD ["npm", "run", "dev"]


## Test/Coverage
FROM base AS test
CMD ["npm", "run", "coverage"]