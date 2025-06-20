# Use official Node image
FROM node:23-slim

# Install json-server
RUN npm install -g json-server@0.17.4

# Create app directory
WORKDIR /app

COPY tracks.json .
COPY json-server.config.json .

# Expose port
EXPOSE 3001

# Run the server
CMD ["json-server", "tracks.json", "--config", "json-server.config.json"]
