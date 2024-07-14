# Use the official Node.js image from the Docker Hub as a base
FROM node:20

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install the dependencies specified in package.json
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# Expose the port defined by NODE_PORT environment variable

EXPOSE ${NODE_PORT}

# Command to run the application
CMD ["npm", "start"]
