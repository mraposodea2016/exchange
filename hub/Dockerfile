FROM node:16

WORKDIR /exchange/hub

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]