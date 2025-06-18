# Dockerfile: user-dep-fix-node-app/Dockerfile

# 1. Use a recent but not the absolute latest minor version of Node.js LTS (Bookworm based)
FROM node:20.11.1-bookworm-slim

# 2. Set working directory
WORKDIR /app

# 3. **USER INSTRUCTION: Install a potentially vulnerable package (curl)**
#    We assume the version of curl installed by 'apt-get install curl' in this specific
#    base image (20.11.0-bookworm-slim) will trigger a Snyk vulnerability.
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# 4. Copy package.json and package-lock.json
COPY package*.json ./

# 5. Install Node.js dependencies
RUN npm install

# 6. Copy the rest of the application code
COPY . .

# 7. Expose the port
EXPOSE 8080

# 8. Start the application
CMD ["npm", "start"]