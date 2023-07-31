FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN npm run build

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
