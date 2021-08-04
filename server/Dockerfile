# base image
FROM node:12.14.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app

EXPOSE 3000

# start app
CMD ["npm", "start"]