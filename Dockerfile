# Dockerfile for tic-tac-toe game
FROM node:18-slim

# Set working directory (følger retningslinjene)
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 80

# Create cache directory (for applikasjonen å skrive til)
RUN mkdir -p ./cache

# Start the application
CMD ["npm", "start"]