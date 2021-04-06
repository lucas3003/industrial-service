from node:14

# Create app directory
WORKDIR /usr/src/app

ENV PORT=80
ENV HOST=0.0.0.0

COPY package*.json ./

RUN npm install
# Production: RUN npm ci --only=production

COPY . .

EXPOSE 80

CMD ["node", "server.js"]