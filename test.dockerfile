FROM node:18-alpine
COPY package*.json ./
COPY tsconfig.json ./
COPY jest.config.js ./
COPY ./__tests__ ./
RUN npm i

CMD ["npm", "test"]
