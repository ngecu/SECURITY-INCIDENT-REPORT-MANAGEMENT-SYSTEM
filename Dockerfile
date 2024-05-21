# Base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port Vite uses
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "dev"]
