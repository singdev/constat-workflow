FROM node:lts-stretch

ENV PORT "8080"
ENV MONGODB_HOST "constatassurancedb"
ENV DB_NAME "constat-workflow-dev"
ENV REGISTRY_HOST "constat-srv.orpheenve.xyz"
ENV DOMAIN "constat-assurance.orpheenve.xyz"

RUN mkdir uploads

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --no-optional

COPY . .

EXPOSE 8080

CMD [ "npm", "start"]
