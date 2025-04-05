###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Copy node_modules from the development stage
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Expose your application port
EXPOSE 8080

# Start your Node.js application
CMD ["node", "dist/main.js"]
