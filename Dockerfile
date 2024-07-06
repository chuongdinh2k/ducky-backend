# Use a Node.js base image
FROM --platform=linux/amd64 node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which your Node.js app runs
EXPOSE 8080

# Define the command to run your Node.js app with parameters
CMD npm run build && \
    npm start
