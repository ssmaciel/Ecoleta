FROM node:12.14.0-alpine3.11

RUN apk add --no-cache bash

RUN touch /root/.bashrc | echo "PS1='\w\$ '" >> /root/.bashrc

WORKDIR /usr/src/app

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]