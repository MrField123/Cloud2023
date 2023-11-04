FROM node:slim
EXPOSE 8080
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY read_service.js /app/
CMD node /app/read_service.js