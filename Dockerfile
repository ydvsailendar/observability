FROM node:22.6.0

WORKDIR /usr/src/app

COPY . .

RUN npm install --production

ARG PORT=4747

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]