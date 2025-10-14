FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache curl 
COPY package*.json ./

# Installer les dépendances
RUN npm install

COPY . .

# Pour éviter les soucis avec le hot reload dans Docker
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3000

CMD ["npm", "run", "dev"]
