# Multi-stage Dockerfile для PWA VibeSplit
# Оптимизирован для производства с минимальным размером образа

# ================================
# Build Stage - Сборка приложения
# ================================
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package files для кеширования зависимостей
COPY package*.json ./

# Устанавливаем все зависимости (включая dev для сборки)
RUN npm ci --silent

# Копируем исходный код
COPY . .

# Собираем приложение для production
ENV NODE_ENV=production
RUN npm run build

# Проверяем что билд создался и очищаем кеш
RUN ls -la dist/ && npm cache clean --force

# ================================
# Production Stage - Финальный образ
# ================================
FROM nginx:1.24-alpine AS production

# Устанавливаем необходимые пакеты
RUN apk add --no-cache \
    curl \
    tzdata \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Настраиваем временную зону
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Создаем группу и пользователя для безопасности
RUN addgroup -g 1001 -S vibesplit && \
    adduser -S vibesplit -u 1001 -G vibesplit

# Копируем собранное приложение из builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Создаем директории для конфигураций
RUN mkdir -p /etc/nginx/conf.d /var/log/nginx /var/cache/nginx

# Копируем оптимизированную конфигурацию Nginx для PWA
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Создаем health check endpoint
RUN echo 'healthy' > /usr/share/nginx/html/health

# Настраиваем права доступа
RUN chown -R vibesplit:vibesplit /usr/share/nginx/html && \
    chown -R vibesplit:vibesplit /var/log/nginx && \
    chown -R vibesplit:vibesplit /var/cache/nginx && \
    chmod -R 755 /usr/share/nginx/html

# Копируем скрипт запуска
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Создаем volume для логов
VOLUME ["/var/log/nginx"]

# Открываем порт 80
EXPOSE 80

# Health check для контейнера
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/health || exit 1

# Метаданные образа
LABEL maintainer="VibeSplit Team <dev@vibesplit.com>"
LABEL description="VibeSplit PWA - Production Ready Container"
LABEL version="1.0.0"

# Переключаемся на непривилегированного пользователя
USER vibesplit

# Используем dumb-init для правильной обработки сигналов
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Запускаем приложение через entrypoint скрипт
CMD ["/entrypoint.sh"]