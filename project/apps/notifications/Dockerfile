FROM node:22.14-alpine
WORKDIR /usr/local/readme/notifications
COPY ./dist/apps/notifications/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/notifications .
CMD [ "node", "./main.js" ]
