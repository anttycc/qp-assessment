FROM node:18 as base

WORKDIR app

COPY . .

RUN npm install

RUN npm run build

FROM base as serve

WORKDIR  server

COPY --from=base /app/dist /app/package.json /app/data /app/.sequelizerc .

RUN npm install
 
CMD npm start








