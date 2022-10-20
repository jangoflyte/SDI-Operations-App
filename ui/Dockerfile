FROM node:alpine 

WORKDIR /app

COPY . /app

RUN npm install &&\
    apk --no-cache add curl

EXPOSE 3000

CMD ["npm", "start"]