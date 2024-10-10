# Use Node.js 20 as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# get env by ARG from github-actions
ARG KAKAO_API_KEY
ARG KAKAO_REDIRECT_URI
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_SELF_URL
ARG NEXT_PUBLIC_BASE_URL
ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_KAKAOJSKEY
ARG NEXT_PUBLIC_GTM_ID

# set env on variable
ENV KAKAO_API_KEY=${KAKAO_API_KEY}
ENV KAKAO_REDIRECT_URI=${KAKAO_REDIRECT_URI}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NEXT_PUBLIC_SELF_URL=${NEXT_PUBLIC_SELF_URL}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ENV NEXT_PUBLIC_KAKAOJSKEY=${NEXT_PUBLIC_KAKAOJSKEY}
ENV NEXT_PUBLIC_GTM_ID=${NEXT_PUBLIC_GTM_ID}

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
