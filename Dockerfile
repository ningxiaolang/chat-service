# 构建阶段
FROM node:20-alpine3.20 AS build-stage

WORKDIR /app

# 设置 npm 镜像源
RUN npm config set registry https://registry.npmmirror.com/

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 使用 npm 安装依赖
RUN npm install

# 复制所有源代码并构建应用
COPY . .
RUN npm run build

# 生产阶段
FROM node:20-alpine3.20 AS production-stage

WORKDIR /app

# 从构建阶段复制构建结果和依赖
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/node_modules /app/node_modules
COPY --from=build-stage /app/config /app/config

# 暴露端口并启动应用
EXPOSE 3000
CMD ["node", "dist/main.js"]
