## Multi-stage Dockerfile for the nikermanas ancient tome application
#
# This repository uses Vite and React to build a static single page application (SPA).
# To keep the final image as small and secure as possible we perform the build in a
# Node.js stage and then copy only the built artefacts into an Nginx stage to serve
# the compiled assets. The Nginx configuration included below enables HTML5
# history fallback so that client-side routing works as expected.

### 1) Build stage
FROM node:20-alpine AS build

# Create a working directory for our application source
WORKDIR /app

# Install only the production dependencies first (using npm ci ensures
# reproducible installs). Copying package.json and package-lock.json first
# allows Docker to cache the install layer when your application code changes.
COPY package*.json ./
RUN npm ci --no-audit --quiet

# Copy the remainder of the source code into the container
COPY . .

# Build the application. Vite will emit the compiled files into the `dist`
# directory by default.
RUN npm run build

### 2) Runtime stage
FROM nginx:alpine

# Copy our custom Nginx configuration. This configuration ensures that
# requests for client-side routes fall back to index.html so that the SPA
# behaves correctly when refreshed or navigated to directly.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static files from the previous stage into the nginx HTML
# directory. Only the contents of `dist` are needed at runtime.
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 so Docker will be able to map a host port to the container
EXPOSE 80

# Use the default Nginx start command
CMD ["nginx", "-g", "daemon off;"]
