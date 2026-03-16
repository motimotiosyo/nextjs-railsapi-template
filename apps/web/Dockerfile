FROM node:24.14.0 AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM deps AS dev

COPY . .

CMD ["npm", "run", "dev"]
