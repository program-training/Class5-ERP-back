FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY jest.config.js ./
COPY ./__test__ ./
RUN npm i

CMD ["npm", "test"]
