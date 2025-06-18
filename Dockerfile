# Dockerfile: gradual-fix-node-app/Dockerfile

# 1. Use a recent but not the absolute latest minor version of Node.js LTS (Bookworm based)
#    Using a valid, specific minor version like 20.11.0 to demonstrate fixes.
FROM node:20.11.1-bookworm-slim

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# 4. Install Node.js dependencies (these are assumed non-vulnerable for this demo)
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port
EXPOSE 8080

# 7. Start the application
CMD ["npm", "start"]