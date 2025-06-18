FROM node:22.14-alpine
WORKDIR /usr/local/readme/customers
COPY ./dist/apps/customers/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/customers .
CMD [ "node", "./main.js" ]
