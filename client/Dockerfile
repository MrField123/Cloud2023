#Node runtime
FROM node:14

#Expose Port 8080
EXPOSE 8080

# Set working dir
WORKDIR /src

#Add dependencies
ADD package*.json /src/
RUN npm install

#Copy App Source
ADD . /src/

#Build application
RUN npm run build

#Start application
CMD ["npm", "start"]

