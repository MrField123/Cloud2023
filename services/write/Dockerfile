FROM node:slim
EXPOSE 8080
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY write_service.js /app/
CMD node /app/write_service.js