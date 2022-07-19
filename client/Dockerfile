### NODE 
FROM node:16.5.0 AS base
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
CMD ["npm", "run", "serve"]

## Test/Coverage
FROM base AS test
CMD ["npm", "run", "coverage"]