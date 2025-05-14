FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./src ./src

# Compila o projeto
RUN npm run build

FROM node:18-alpine

WORKDIR /app

# Copia apenas o resultado do build e dependências
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Porta exposta
EXPOSE 3000

# Comando de inicialização
CMD ["node", "dist/main.js"]
