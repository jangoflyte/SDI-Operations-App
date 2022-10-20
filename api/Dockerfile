FROM node:alpine 

WORKDIR /app

COPY . /app
RUN npm install -g nodemon@2.0.15 &&\
    npm install &&\
    npm install knex --save &&\
    apk --no-cache add curl

EXPOSE 8080

CMD ["npm", "start"]