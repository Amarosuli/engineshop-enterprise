FROM node:18.17-alpine AS build

RUN npm install -g pnpm
RUN apk --no-cache add git

WORKDIR /app
# -- UNCOMMENT BELOW IF Dockerfile LIVE IN THE PROJECT FOLDER
# COPY . .

# -- UNCOMMENT BELOW IF NEED TO CLONE THE REPO TO CURRENT FOLDER
RUN git clone https://github.com/Amarosuli/engineshop-enterprise.git .
# RUN mv /engineshop-enterprise/* .

ENV PUBLIC_API_PB=https://engineshop.pockethost.io
# -- svelte need origin to work with form in production 
ENV ORIGIN=http://localhost:3000

RUN pnpm install
RUN pnpm run build

EXPOSE 3000

CMD ["node", "./build/index.js"]


# -- BELOW IS EXAMPLE TO USE BUN AS NODEJS REPLACEMENT
# -- USING BUN ALSO NEED TO REPLACE THE ADAPTER svelte-adapter-bun
# -- MAKE SURE THE ADAPTER AVAILABLE IN package.json AND APPLY IN svelte.config.js

# FROM oven/bun

# -- IF GET SOURCE FROM REPO INSTALL GIT FIRST
# RUN apt-get update  \
#    && apt-get install -y \
#      git \
#    && apt-get clean \
#    && rm -rf /var/lib/apt/lists/*

# WORKDIR /app

# -- UNCOMMENT BELOW IF DOCKERFILE LIVE INSIDE THE PROJECT FOLDER
# COPY . .

# -- UNCOMMENT BELOW IF NEED TO CLONE THE REPO TO CURRENT WORKDIR
# RUN git clone https://github.com/Amarosuli/engineshop-enterprise.git .

# RUN bun install

# ENV PUBLIC_API_PB=https://engineshop.pockethost.io

# RUN bun run build

# EXPOSE 3000

# CMD ["bun", "run", "./build/index.js"]
