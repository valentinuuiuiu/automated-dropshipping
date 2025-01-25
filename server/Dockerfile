FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Expose ports
EXPOSE 3001
EXPOSE 6380

# Set environment variables
ENV NODE_ENV=production
ENV REDIS_URL=redis://redis:6380

# Start the application
CMD ["node", "index.js"]
