FROM node:16.15.1

WORKDIR /app
COPY package*.json /
RUN npm install --location=global npm@8.13.2
RUN npm install --force
COPY . ./

CMD ["npm", "start"]
