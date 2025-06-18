FROM node:22.14-alpine
WORKDIR /usr/local/readme/files
COPY ./dist/apps/files/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/files .
CMD [ "node", "./main.js" ]
