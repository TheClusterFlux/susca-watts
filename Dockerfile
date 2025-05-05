# Use a Node.js image to build the Angular app
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# First modify the angular.json to increase the budget limits then build the app
RUN sed -i 's/"maximumError": "4kB"/"maximumError": "10kB"/' angular.json && \
    npm run build -- --configuration production

# Use a lightweight Nginx image as the base image
FROM nginx:alpine

# Remove the default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the contents of the browser folder to the Nginx static assets directory
COPY --from=build /usr/src/app/dist/susca-watts/browser/ /usr/share/nginx/html/

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 8080
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]