# VibeSplit - Стратегия деплоя PWA приложения

## Обзор архитектуры деплоя

### Executive Summary

Данная стратегия деплоя разработана для PWA приложения VibeSplit с учетом требований производительности, безопасности и специфики Progressive Web App технологий. Архитектура предусматривает деплой фронтенда на отдельный VPS с использованием Docker контейнеризации и Nginx для обслуживания статических файлов с оптимизацией для PWA функциональности.

**Ключевые принципы деплоя:**
- **Контейнеризация**: Docker для изоляции и портабельности
- **HTTPS everywhere**: Обязательное шифрование для PWA функций
- **CDN-ready**: Оптимизация для интеграции с CDN
- **Zero-downtime deployments**: Стратегия деплоя без простоев
- **Progressive rollouts**: Поэтапное развертывание обновлений
- **Monitoring & Observability**: Полный мониторинг производительности и ошибок

### Архитектура инфраструктуры

```
┌─────────────────────────────────────────────────────────────┐
│                     ИНТЕРНЕТ                                 │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE CDN                            │
│  • SSL Termination                                          │
│  • DDoS Protection                                          │
│  • Static Assets Caching                                    │
│  • Gzip Compression                                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    VPS SERVER (Frontend)                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   NGINX (Reverse Proxy)                 ││
│  │  • SSL/TLS (Let's Encrypt)                             ││
│  │  • PWA Headers & Caching                               ││
│  │  • Gzip/Brotli Compression                             ││
│  │  • Security Headers                                     ││
│  └─────────────────────┬───────────────────────────────────┘│
│                        │                                    │
│  ┌─────────────────────▼───────────────────────────────────┐│
│  │              DOCKER CONTAINER                           ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │            VIBE-SPLIT PWA                           │││
│  │  │  • React + TypeScript Build                        │││
│  │  │  • Service Workers                                  │││
│  │  │  • Web App Manifest                                │││
│  │  │  • Static Assets                                    │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼ API Requests
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND SERVER (Remote)                    │
│  • Node.js/Express API                                     │
│  • Database (PostgreSQL)                                   │
│  • Authentication Service                                   │
│  • Business Logic                                          │
└─────────────────────────────────────────────────────────────┘
```

## 1. Технические требования

### 1.1 VPS Сервер (Frontend)

**Минимальные требования:**
- **OS**: Ubuntu 22.04 LTS
- **CPU**: 2 vCPU cores
- **RAM**: 2 GB
- **Storage**: 20 GB SSD
- **Network**: 100 Mbps

**Рекомендуемые требования:**
- **OS**: Ubuntu 22.04 LTS
- **CPU**: 4 vCPU cores
- **RAM**: 4 GB
- **Storage**: 40 GB NVMe SSD
- **Network**: 1 Gbps

### 1.2 Программное обеспечение

**Основные компоненты:**
- Docker Engine 24.0+
- Docker Compose 2.20+
- Nginx 1.24+
- Certbot (Let's Encrypt)
- UFW Firewall
- Fail2ban
- Prometheus Node Exporter

**Мониторинг и логирование:**
- Docker logs
- Nginx access/error logs
- Logrotate
- Prometheus metrics
- Grafana dashboards (опционально)

## 2. Docker контейнеризация

### 2.1 Multi-stage Dockerfile

Dockerfile оптимизирован для производства с multi-stage билдом для минимизации размера финального образа:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
RUN npm ci --only=production --silent

# Копируем исходный код
COPY . .

# Строим приложение
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM nginx:1.24-alpine AS production

# Устанавливаем зависимости для работы в продакшене
RUN apk add --no-cache \
    curl \
    tzdata \
    && rm -rf /var/cache/apk/*

# Настраиваем временную зону
ENV TZ=Europe/Moscow

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Копируем билд из предыдущего этапа
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Создаем директории для логов
RUN mkdir -p /var/log/nginx && \
    touch /var/log/nginx/access.log && \
    touch /var/log/nginx/error.log && \
    chown -R nginx:nginx /var/log/nginx

# Копируем скрипт запуска
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Открываем порт
EXPOSE 80

# Устанавливаем пользователя
USER nginx

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/ || exit 1

# Запускаем приложение
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
```

### 2.2 Docker Compose для локального тестирования

```yaml
version: '3.8'

services:
  vibesplit-frontend:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    container_name: vibesplit-pwa
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
      - VITE_API_URL=http://localhost:3001/api
    volumes:
      - nginx_logs:/var/log/nginx
    restart: unless-stopped
    networks:
      - vibesplit-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Мок бэкенда для тестирования (опционально)
  mock-backend:
    image: wiremock/wiremock:2.35.0
    container_name: vibesplit-mock-api
    ports:
      - "3001:8080"
    volumes:
      - ./mock-api:/home/wiremock
    command: ["--global-response-templating", "--verbose"]
    networks:
      - vibesplit-network

volumes:
  nginx_logs:

networks:
  vibesplit-network:
    driver: bridge
```

## 3. Nginx конфигурация для PWA

### 3.1 Основная конфигурация Nginx

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    # Базовые настройки
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Логирование
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log /var/log/nginx/access.log main;
    
    # Производительность
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;
    
    # Сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json
        application/manifest+json
        image/svg+xml;
    
    # Brotli сжатие (если модуль доступен)
    # brotli on;
    # brotli_comp_level 6;
    # brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Безопасность
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Подключаем конфигурации сайтов
    include /etc/nginx/conf.d/*.conf;
}
```

### 3.2 Конфигурация сайта для PWA

```nginx
server {
    listen 80;
    server_name vibesplit.com www.vibesplit.com;
    root /usr/share/nginx/html;
    index index.html;
    
    # Безопасность PWA
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.vibesplit.com; font-src 'self'; object-src 'none'; media-src 'self'; frame-src 'none';" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    
    # PWA специфичные заголовки
    add_header X-PWA-Cache-Control "public, max-age=31536000" always;
    
    # Service Worker - должен обслуживаться с правильными заголовками
    location /sw.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        add_header Service-Worker-Allowed "/";
        try_files $uri =404;
    }
    
    # Web App Manifest
    location /manifest.json {
        add_header Cache-Control "public, max-age=86400";
        add_header Content-Type "application/manifest+json";
        try_files $uri =404;
    }
    
    # PWA иконки - долгое кеширование
    location ~* ^/(?:pwa-|maskable-|apple-touch-)?icon.*\.(?:png|jpg|jpeg|gif|ico|svg)$ {
        add_header Cache-Control "public, max-age=31536000";
        try_files $uri =404;
    }
    
    # Статические ресурсы - долгое кеширование
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        add_header Cache-Control "public, max-age=31536000";
        try_files $uri =404;
    }
    
    # HTML файлы - без кеширования для получения обновлений
    location ~* \.html$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        try_files $uri /index.html;
    }
    
    # API прокси к бэкенду
    location /api/ {
        proxy_pass https://api.vibesplit.com/;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
        
        # CORS заголовки для API
        add_header Access-Control-Allow-Origin "https://vibesplit.com" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization" always;
        add_header Access-Control-Allow-Credentials "true" always;
        
        # Обработка preflight запросов
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin "https://vibesplit.com";
            add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
            add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization";
            add_header Access-Control-Max-Age 1728000;
            add_header Content-Type "text/plain charset=UTF-8";
            add_header Content-Length 0;
            return 204;
        }
    }
    
    # Основная SPA логика - все неизвестные маршруты направляем в index.html
    location / {
        try_files $uri $uri/ /index.html;
        
        # Заголовки для SPA
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
    
    # Offline страница для PWA
    location /offline.html {
        internal;
        add_header Cache-Control "public, max-age=86400";
    }
    
    # Блокировка доступа к служебным файлам
    location ~ /\. {
        deny all;
    }
    
    location ~ ^/(\.user.ini|\.htaccess|\.htpasswd|\.ssh|\.git) {
        deny all;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}

# HTTPS конфигурация (активируется после получения SSL сертификата)
server {
    listen 443 ssl http2;
    server_name vibesplit.com www.vibesplit.com;
    root /usr/share/nginx/html;
    index index.html;
    
    # SSL сертификаты Let's Encrypt
    ssl_certificate /etc/letsencrypt/live/vibesplit.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vibesplit.com/privkey.pem;
    
    # SSL конфигурация
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    
    # Современные SSL протоколы
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    
    # Включаем конфигурацию из HTTP блока
    include /etc/nginx/snippets/vibesplit-common.conf;
}

# Редирект с HTTP на HTTPS
server {
    if ($host = www.vibesplit.com) {
        return 301 https://$host$request_uri;
    }
    
    if ($host = vibesplit.com) {
        return 301 https://$host$request_uri;
    }
    
    listen 80;
    server_name vibesplit.com www.vibesplit.com;
    return 404;
}
```

## 4. CI/CD Pipeline с GitHub Actions

### 4.1 Основной workflow деплоя

```yaml
name: 'Deploy VibeSplit PWA to Production'

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'production'
        type: choice
        options:
        - staging
        - production

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # Тестирование и линтинг
  test:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run linting
      run: npm run lint
      
    - name: Run type checking
      run: npm run type-check
      
    - name: Run tests
      run: npm test
      
  # Билд и деплой
  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build PWA application
      run: npm run build
      env:
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
        VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}
        VITE_ANALYTICS_KEY: ${{ secrets.VITE_ANALYTICS_KEY }}
        
    - name: Run build tests
      run: npm run preview & sleep 5 && curl -f http://localhost:4173/ && pkill -f preview
      
    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
        
    - name: Extract metadata for Docker
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
          type=raw,value=latest,enable={{is_default_branch}}
          
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
        
    - name: Deploy to VPS
      uses: appleboy/ssh-action@v1.0.0
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USERNAME }}
        key: ${{ secrets.VPS_SSH_KEY }}
        port: ${{ secrets.VPS_PORT }}
        script: |
          # Логинимся в Container Registry
          echo ${{ secrets.GITHUB_TOKEN }} | docker login ${{ env.REGISTRY }} -u ${{ github.actor }} --password-stdin
          
          # Останавливаем текущий контейнер
          docker stop vibesplit-pwa || true
          docker rm vibesplit-pwa || true
          
          # Удаляем старые образы
          docker image prune -f
          
          # Запускаем новый контейнер
          docker run -d \
            --name vibesplit-pwa \
            --restart unless-stopped \
            -p 8080:80 \
            -v /var/log/vibesplit:/var/log/nginx \
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          
          # Проверяем health check
          sleep 10
          curl -f http://localhost:8080/health || exit 1
          
          # Перезагружаем Nginx на хосте для применения новых настроек
          sudo nginx -t && sudo systemctl reload nginx
          
    - name: Run post-deploy tests
      uses: appleboy/ssh-action@v1.0.0
      with:
        host: ${{ secrets.VPS_HOST }}
        username: ${{ secrets.VPS_USERNAME }}
        key: ${{ secrets.VPS_SSH_KEY }}
        port: ${{ secrets.VPS_PORT }}
        script: |
          # Проверяем доступность приложения
          curl -f https://vibesplit.com/ || exit 1
          
          # Проверяем PWA манифест
          curl -f https://vibesplit.com/manifest.json || exit 1
          
          # Проверяем Service Worker
          curl -f https://vibesplit.com/sw.js || exit 1
          
    - name: Notify deployment status
      if: always()
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        channel: '#deployments'
        webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        fields: repo,message,commit,author,action,eventName,ref,workflow
```

### 4.2 Workflow для staging окружения

```yaml
name: 'Deploy to Staging'

on:
  push:
    branches: [ develop, staging ]
  workflow_dispatch:

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build for staging
      run: npm run build
      env:
        VITE_API_URL: ${{ secrets.STAGING_API_URL }}
        VITE_ENVIRONMENT: staging
        
    - name: Deploy to staging server
      uses: appleboy/ssh-action@v1.0.0
      with:
        host: ${{ secrets.STAGING_VPS_HOST }}
        username: ${{ secrets.STAGING_VPS_USERNAME }}
        key: ${{ secrets.STAGING_VPS_SSH_KEY }}
        script: |
          cd /var/www/vibesplit-staging
          git pull origin staging
          npm ci
          npm run build
          sudo systemctl reload nginx
```

## 5. SSL/TLS сертификаты и безопасность

### 5.1 Автоматическая настройка Let's Encrypt

```bash
#!/bin/bash
# setup-ssl.sh - Скрипт для настройки SSL сертификатов

set -e

DOMAIN="vibesplit.com"
EMAIL="admin@vibesplit.com"

echo "🔐 Настройка SSL сертификатов для $DOMAIN..."

# Устанавливаем Certbot
apt update
apt install -y certbot python3-certbot-nginx

# Останавливаем Nginx временно
systemctl stop nginx

# Получаем сертификат
certbot certonly --standalone \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN \
  -d www.$DOMAIN

# Настраиваем автообновление
echo "0 2 * * * root certbot renew --quiet && systemctl reload nginx" > /etc/cron.d/certbot-renew

# Запускаем Nginx обратно
systemctl start nginx
systemctl enable nginx

echo "✅ SSL сертификаты успешно настроены!"
```

### 5.2 Усиленная безопасность

```bash
#!/bin/bash
# security-hardening.sh - Скрипт для усиления безопасности сервера

set -e

echo "🛡️ Усиление безопасности сервера..."

# Настройка UFW Firewall
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Установка Fail2ban
apt install -y fail2ban

# Конфигурация Fail2ban
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
EOF

# Перезапускаем Fail2ban
systemctl restart fail2ban
systemctl enable fail2ban

# Настройка автоматических обновлений безопасности
apt install -y unattended-upgrades
echo 'Unattended-Upgrade::Automatic-Reboot "false";' >> /etc/apt/apt.conf.d/50unattended-upgrades

echo "✅ Безопасность сервера усилена!"
```

## 6. Мониторинг и логирование

### 6.1 Конфигурация мониторинга

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
    restart: unless-stopped
    networks:
      - monitoring

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    ports:
      - "9100:9100"
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning
    restart: unless-stopped
    networks:
      - monitoring

  nginx-exporter:
    image: nginx/nginx-prometheus-exporter:latest
    container_name: nginx-exporter
    ports:
      - "9113:9113"
    command:
      - '-nginx.scrape-uri=http://nginx:80/nginx_status'
    networks:
      - monitoring

volumes:
  prometheus_data:
  grafana_data:

networks:
  monitoring:
    driver: bridge
```

### 6.2 Логирование и ротация

```bash
#!/bin/bash
# setup-logging.sh

# Настройка logrotate для Nginx
cat > /etc/logrotate.d/nginx << EOF
/var/log/nginx/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 nginx nginx
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 `cat /var/run/nginx.pid`
        fi
    endscript
}
EOF

# Настройка logrotate для Docker
cat > /etc/logrotate.d/docker-containers << EOF
/var/lib/docker/containers/*/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    maxsize 100M
    copytruncate
}
EOF

echo "✅ Логирование настроено!"
```

## 7. Backup стратегия

### 7.1 Автоматический backup

```bash
#!/bin/bash
# backup.sh - Скрипт для автоматического бэкапа

set -e

BACKUP_DIR="/var/backups/vibesplit"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="vibesplit_backup_$DATE"

mkdir -p $BACKUP_DIR

echo "📦 Создание бэкапа $BACKUP_NAME..."

# Создаем директорию для текущего бэкапа
mkdir -p "$BACKUP_DIR/$BACKUP_NAME"

# Бэкап конфигураций Nginx
cp -r /etc/nginx "$BACKUP_DIR/$BACKUP_NAME/"

# Бэкап SSL сертификатов
cp -r /etc/letsencrypt "$BACKUP_DIR/$BACKUP_NAME/"

# Бэкап статических файлов приложения
docker cp vibesplit-pwa:/usr/share/nginx/html "$BACKUP_DIR/$BACKUP_NAME/app"

# Бэкап логов
cp -r /var/log/nginx "$BACKUP_DIR/$BACKUP_NAME/logs"

# Архивируем бэкап
cd $BACKUP_DIR
tar -czf "$BACKUP_NAME.tar.gz" "$BACKUP_NAME"
rm -rf "$BACKUP_NAME"

# Удаляем старые бэкапы (старше 30 дней)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "✅ Бэкап создан: $BACKUP_DIR/$BACKUP_NAME.tar.gz"

# Опционально: загружаем в облачное хранилище
# aws s3 cp "$BACKUP_DIR/$BACKUP_NAME.tar.gz" s3://vibesplit-backups/
```

### 7.2 Cron задачи для автоматизации

```bash
# /etc/crontab
# Ежедневный бэкап в 3:00 утра
0 3 * * * root /opt/scripts/backup.sh

# Еженедельная очистка Docker в воскресенье в 4:00
0 4 * * 0 root docker system prune -f

# Проверка health check каждые 5 минут
*/5 * * * * root curl -f http://localhost:8080/health || systemctl restart docker
```

## 8. Процедуры обновления и rollback

### 8.1 Blue-Green деплой стратегия

```bash
#!/bin/bash
# blue-green-deploy.sh

set -e

CURRENT_COLOR=$(docker ps --filter "name=vibesplit" --format "table {{.Names}}" | grep -o "blue\|green" | head -n1)
NEW_COLOR="blue"

if [ "$CURRENT_COLOR" = "blue" ]; then
    NEW_COLOR="green"
fi

echo "🔄 Деплой с $CURRENT_COLOR на $NEW_COLOR..."

# Запускаем новый контейнер
docker run -d \
    --name "vibesplit-pwa-$NEW_COLOR" \
    --restart unless-stopped \
    -p "808${NEW_COLOR:0:1}:80" \
    ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest

# Ждем готовности
sleep 15

# Проверяем health check
if curl -f "http://localhost:808${NEW_COLOR:0:1}/health"; then
    echo "✅ Новая версия запущена успешно"
    
    # Переключаем Nginx на новый порт
    sed -i "s/808./808${NEW_COLOR:0:1}/g" /etc/nginx/sites-available/vibesplit
    nginx -t && systemctl reload nginx
    
    # Останавливаем старый контейнер
    docker stop "vibesplit-pwa-$CURRENT_COLOR" || true
    docker rm "vibesplit-pwa-$CURRENT_COLOR" || true
    
    echo "🎉 Деплой завершен успешно!"
else
    echo "❌ Health check не прошел, откатываемся..."
    docker stop "vibesplit-pwa-$NEW_COLOR"
    docker rm "vibesplit-pwa-$NEW_COLOR"
    exit 1
fi
```

### 8.2 Быстрый rollback

```bash
#!/bin/bash
# rollback.sh

set -e

LAST_WORKING_IMAGE=$(docker images --filter "reference=ghcr.io/*/vibe-split" --format "table {{.Repository}}:{{.Tag}}" | head -n2 | tail -n1)

echo "🔄 Откат к предыдущей версии: $LAST_WORKING_IMAGE"

# Останавливаем текущий контейнер
docker stop vibesplit-pwa || true
docker rm vibesplit-pwa || true

# Запускаем предыдущую версию
docker run -d \
    --name vibesplit-pwa \
    --restart unless-stopped \
    -p 8080:80 \
    -v /var/log/vibesplit:/var/log/nginx \
    $LAST_WORKING_IMAGE

sleep 10

# Проверяем health check
if curl -f http://localhost:8080/health; then
    echo "✅ Откат выполнен успешно!"
else
    echo "❌ Откат не удался!"
    exit 1
fi
```

## 9. Скрипты автоматизации деплоя

### 9.1 Основной скрипт установки

```bash
#!/bin/bash
# install.sh - Полная автоматическая установка VibeSplit PWA

set -e

echo "🚀 Установка VibeSplit PWA на продакшн сервер..."

# Переменные
DOMAIN="vibesplit.com"
EMAIL="admin@vibesplit.com"
VPS_USER="deploy"

# Проверяем root права
if [[ $EUID -ne 0 ]]; then
   echo "Этот скрипт должен запускаться от root"
   exit 1
fi

# Обновляем систему
echo "📦 Обновление системы..."
apt update && apt upgrade -y

# Устанавливаем зависимости
echo "📦 Установка зависимостей..."
apt install -y \
    curl \
    wget \
    git \
    nginx \
    ufw \
    fail2ban \
    certbot \
    python3-certbot-nginx \
    htop \
    unzip

# Устанавливаем Docker
echo "🐳 Установка Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker $VPS_USER

# Устанавливаем Docker Compose
echo "🐳 Установка Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Создаем пользователя для деплоя
echo "👤 Создание пользователя деплоя..."
useradd -m -s /bin/bash $VPS_USER || true
usermod -aG docker $VPS_USER
usermod -aG sudo $VPS_USER

# Настраиваем SSH для деплоя
mkdir -p /home/$VPS_USER/.ssh
chmod 700 /home/$VPS_USER/.ssh
chown $VPS_USER:$VPS_USER /home/$VPS_USER/.ssh

# Создаем директории проекта
mkdir -p /var/www/vibesplit
mkdir -p /var/log/vibesplit
mkdir -p /var/backups/vibesplit
mkdir -p /opt/scripts

chown -R $VPS_USER:$VPS_USER /var/www/vibesplit
chown -R nginx:nginx /var/log/vibesplit

# Копируем конфигурации
echo "⚙️ Настройка конфигураций..."

# Nginx конфигурация
cp nginx/nginx.conf /etc/nginx/nginx.conf
cp nginx/sites-available/vibesplit /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/vibesplit /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Проверяем конфигурацию Nginx
nginx -t

# Настраиваем SSL
echo "🔐 Настройка SSL..."
./setup-ssl.sh

# Настраиваем безопасность
echo "🛡️ Настройка безопасности..."
./security-hardening.sh

# Настраиваем мониторинг
echo "📊 Настройка мониторинга..."
./setup-logging.sh

# Копируем скрипты автоматизации
cp scripts/*.sh /opt/scripts/
chmod +x /opt/scripts/*.sh

# Настраиваем cron задачи
cp cron/vibesplit /etc/cron.d/

# Запускаем сервисы
systemctl enable nginx
systemctl start nginx
systemctl enable docker
systemctl start docker

echo "✅ Установка завершена!"
echo "🌐 Ваше приложение будет доступно по адресу: https://$DOMAIN"
echo "📋 Следующие шаги:"
echo "  1. Добавьте SSH ключ в /home/$VPS_USER/.ssh/authorized_keys"
echo "  2. Настройте secrets в GitHub Actions"
echo "  3. Запустите первый деплой через GitHub Actions"
```

### 9.2 Конфигурация GitHub Secrets

Необходимые secrets для GitHub Actions:

```bash
# VPS подключение
VPS_HOST=your-server-ip
VPS_USERNAME=deploy
VPS_SSH_KEY=your-private-ssh-key
VPS_PORT=22

# Переменные окружения приложения
VITE_API_URL=https://api.vibesplit.com
VITE_SENTRY_DSN=your-sentry-dsn
VITE_ANALYTICS_KEY=your-analytics-key

# Уведомления
SLACK_WEBHOOK=your-slack-webhook-url

# Staging сервер (опционально)
STAGING_VPS_HOST=staging-server-ip
STAGING_VPS_USERNAME=deploy
STAGING_VPS_SSH_KEY=staging-private-ssh-key
STAGING_API_URL=https://api-staging.vibesplit.com
```

## 10. Заключение

Данная стратегия деплоя обеспечивает:

### Ключевые преимущества:

1. **Безопасность**: HTTPS принудительно, CSP заголовки, SSL/TLS сертификаты
2. **Производительность**: Nginx оптимизация, кеширование, сжатие
3. **Надежность**: Health checks, мониторинг, автоматический rollback
4. **Масштабируемость**: Docker контейнеризация, готовность к CDN
5. **Автоматизация**: CI/CD pipeline, автоматические обновления
6. **PWA совместимость**: Правильная настройка Service Workers и манифеста

### Рекомендации по внедрению:

1. **Поэтапное внедрение**: Начните с базовой настройки, постепенно добавляйте мониторинг
2. **Тестирование**: Обязательно протестируйте на staging окружении
3. **Мониторинг**: Настройте алерты для критических метрик
4. **Документация**: Ведите документацию изменений и процедур
5. **Backup**: Регулярно проверяйте восстановление из бэкапов

Архитектура готова для продакшн деплоя и обеспечивает enterprise-уровень надежности и производительности для PWA приложения VibeSplit.