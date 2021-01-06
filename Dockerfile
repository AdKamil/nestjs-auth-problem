FROM  node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn global add @nestjs/cli
RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
ADD . .

EXPOSE 4000
CMD bash -c "/usr/local/src/wait-for-it.sh --timeout=0 db:27017"
CMD [ "yarn", "start:dev" ]
