# Dockerfile: gradual-fix-node-app/Dockerfile

# 1. Use a near-latest Node.js LTS version based on a recent Debian
#    This version (20.10.0) might have a few minor underlying OS vulnerabilities
#    that a later minor version or slim image can fix.
FROM node:20.10.0-slim-bookworm

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# 4. Install Node.js dependencies
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port
EXPOSE 8080

# 7. Start the application
CMD ["npm", "start"]