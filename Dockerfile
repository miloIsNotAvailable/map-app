
FROM node:18

WORKDIR /fapp

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5173

EXPOSE 8080

CMD [ "npm", "run", "dev" ]