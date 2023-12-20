FROM node:18-alpine
COPY . .
RUN npm i

CMD ["npm", "test"]
