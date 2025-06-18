FROM node:22.14-bullseye
WORKDIR /usr/local/readme/publications
COPY ./dist/apps/publications/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/publications/assets/prisma .
ARG POSTGRES_DB_USERNAME
ARG POSTGRES_DB_PASSWORD
ARG POSTGRES_DB_PORT
ARG POSTGRES_DB_NAME
ARG POSTGRES_DB_URL
RUN echo "DATABASE_URL=postgresql://$POSTGRES_DB_USERNAME:$POSTGRES_DB_PASSWORD@$POSTGRES_DB_URL:$POSTGRES_DB_PORT/$POSTGRES_DB_NAME?schema=public" > .env
RUN npx prisma@5.21.1 generate --schema schema.prisma
COPY ./dist/apps/publications .
CMD [ "node", "./main.js" ]

