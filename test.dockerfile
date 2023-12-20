FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY jest.config.js ./
COPY __tests__ ./
RUN npm i

CMD ["npm", "test"]
