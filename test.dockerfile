FROM node:18-alpine
COPY . .
RUN npm i bcryptjs@^2.4.3 && npm i -D @types/bcryptjs@^2.4.6 @types/jest@^29.5.10 @types/supertest@^2.0.16 ts-jest@^29.1.1 jest@^29.7.0 supertest@^6.3.3 && npm cache clean --force
RUN npm i

CMD ["npm", "test"]
