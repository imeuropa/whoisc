FROM node:12
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN apt-get update && apt-get install -y whois
CMD [ "node", "whois.js" ]