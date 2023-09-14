FROM node:18.17-alpine AS build

RUN npm install -g pnpm
RUN apk --no-cache add git

WORKDIR /app
# COPY . .
RUN git clone https://github.com/Amarosuli/engineshop-enterprise.git
# RUN mv /engineshop-enterprise/* .

WORKDIR /app/engineshop-enterprise
ENV PUBLIC_API_PB=https://engineshop.pockethost.io
RUN pnpm install --frozen-lockfile
RUN pnpm run build

EXPOSE 3000

CMD ["node", "./build/index.js"]
