# VibeSplit - Руководство по деплою

## Быстрый старт

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Или через Docker
make dev-docker
```

### Локальное тестирование продакшен сборки

```bash
# Простой способ
make deploy-local

# Или вручную
npm run build
docker build -t vibesplit-pwa .
docker run -p 3000:80 vibesplit-pwa
```

## Настройка production сервера

### 1. Требования к серверу

**Минимальные требования:**
- Ubuntu 22.04 LTS
- 2 vCPU, 2GB RAM, 20GB SSD
- Docker 24.0+
- Nginx 1.24+

**Рекомендуемые:**
- 4 vCPU, 4GB RAM, 40GB NVMe SSD

### 2. Автоматическая установка

```bash
# Скачиваем и запускаем скрипт установки
curl -fsSL https://raw.githubusercontent.com/your-org/vibe-split/main/scripts/install.sh | sudo bash

# Или клонируем репозиторий и запускаем
git clone https://github.com/your-org/vibe-split.git
cd vibe-split
sudo ./scripts/install.sh
```

### 3. Ручная установка

```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Устанавливаем Nginx
sudo apt install nginx

# Устанавливаем SSL сертификаты
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Деплой

### GitHub Actions (рекомендуемый способ)

1. **Настройте secrets в GitHub:**

```
VPS_HOST=your-server-ip
VPS_USERNAME=deploy
VPS_SSH_KEY=your-private-ssh-key
VPS_PORT=22
VITE_API_URL=https://api.vibesplit.com
VITE_SENTRY_DSN=your-sentry-dsn
SLACK_WEBHOOK=your-slack-webhook
```

2. **Запушьте в main ветку:**

```bash
git push origin main
```

Деплой произойдет автоматически.

### Ручной деплой на VPS

```bash
# На локальной машине
docker build -t ghcr.io/your-org/vibe-split:latest .
docker push ghcr.io/your-org/vibe-split:latest

# На VPS
docker pull ghcr.io/your-org/vibe-split:latest
docker stop vibesplit-pwa || true
docker rm vibesplit-pwa || true
docker run -d \
  --name vibesplit-pwa \
  --restart unless-stopped \
  -p 8080:80 \
  -v /var/log/vibesplit:/var/log/nginx \
  ghcr.io/your-org/vibe-split:latest

# Проверяем
curl http://localhost:8080/health
```

## Мониторинг и поддержка

### Проверка состояния

```bash
# Локально
make health

# На VPS
./scripts/health-check.sh
```

### Просмотр логов

```bash
# Логи приложения
make logs

# Логи Nginx
make logs-nginx

# На VPS
docker logs vibesplit-pwa -f
```

### Мониторинг ресурсов

```bash
# Реальное время
make monitor

# Одноразовая проверка
make status
```

## Откат и восстановление

### Быстрый откат

```bash
# Локально
make rollback

# На VPS
./scripts/rollback.sh
```

### Восстановление из backup

```bash
# Список backup'ов
ls -la backups/

# Восстановление
docker load < backups/vibesplit-YYYYMMDD-HHMMSS.tar.gz
docker run -d --name vibesplit-pwa-restore vibesplit-pwa:backup-tag
```

## Конфигурация окружений

### Development

```bash
# .env.development
VITE_API_URL=http://localhost:3001/api
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=debug
```

### Staging

```bash
# .env.staging
VITE_API_URL=https://api-staging.vibesplit.com
VITE_ENVIRONMENT=staging
VITE_DEBUG_MODE=false
```

### Production

```bash
# .env.production
VITE_API_URL=https://api.vibesplit.com
VITE_ENVIRONMENT=production
VITE_DEBUG_MODE=false
VITE_SENTRY_DSN=your-production-sentry-dsn
```

## Безопасность

### SSL/TLS

```bash
# Автоматическое обновление сертификатов
sudo crontab -e
# Добавить: 0 2 * * * certbot renew --quiet && systemctl reload nginx
```

### Firewall

```bash
# Настройка UFW
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Monitoring

```bash
# Установка мониторинга
docker-compose -f docker-compose.monitoring.yml up -d

# Grafana доступна на http://your-server:3002
# Prometheus на http://your-server:9090
```

## Troubleshooting

### Типичные проблемы

**1. Контейнер не запускается**
```bash
docker logs vibesplit-pwa
# Проверьте ошибки в логах
```

**2. PWA не работает**
```bash
curl -I https://yourdomain.com/manifest.json
curl -I https://yourdomain.com/sw.js
# Убедитесь что файлы доступны по HTTPS
```

**3. Высокое потребление ресурсов**
```bash
docker stats vibesplit-pwa
# Проверьте использование CPU/Memory
```

**4. Проблемы с SSL**
```bash
sudo certbot certificates
sudo nginx -t
sudo systemctl status nginx
```

### Полезные команды

```bash
# Перезапуск всех сервисов
sudo systemctl restart docker
sudo systemctl restart nginx

# Очистка Docker
docker system prune -f

# Проверка портов
netstat -tulpn | grep :80
netstat -tulpn | grep :443

# Проверка дискового пространства
df -h
du -sh /var/lib/docker/
```

## Производительность

### Оптимизация Nginx

```nginx
# В /etc/nginx/nginx.conf
worker_processes auto;
worker_connections 2048;

# Включить gzip
gzip on;
gzip_comp_level 6;

# Кеширование
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Мониторинг производительности

```bash
# Lighthouse CI для PWA аудита
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# Проверка скорости загрузки
curl -w "@curl-format.txt" -o /dev/null https://yourdomain.com/
```

## Резервное копирование

### Автоматический backup

```bash
# Настройка cron для backup
sudo crontab -e
# Добавить: 0 3 * * * /path/to/scripts/backup.sh
```

### Хранение backup'ов

```bash
# Локальные backup'ы
make backup

# В облаке (AWS S3)
aws s3 cp backup.tar.gz s3://vibesplit-backups/
```

## Масштабирование

### Load Balancer

```nginx
upstream vibesplit_backend {
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;  # Дополнительный инстанс
}

server {
    location / {
        proxy_pass http://vibesplit_backend;
    }
}
```

### CDN интеграция

```bash
# Настройка CloudFlare
# 1. Добавьте домен в CloudFlare
# 2. Настройте кеширование для статических файлов
# 3. Включите Brotli сжатие
```

---

## Поддержка

Для получения помощи:

- 📧 Email: support@vibesplit.com
- 💬 Slack: #vibesplit-support
- 📖 Документация: [docs.vibesplit.com](https://docs.vibesplit.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/vibe-split/issues)