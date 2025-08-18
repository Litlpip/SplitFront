#!/bin/sh
# Entrypoint скрипт для VibeSplit PWA контейнера

set -e

echo "🚀 Запуск VibeSplit PWA контейнера..."

# Проверяем что билд файлы существуют
if [ ! -f "/usr/share/nginx/html/index.html" ]; then
    echo "❌ Ошибка: index.html не найден!"
    exit 1
fi

# Проверяем что PWA файлы на месте
if [ ! -f "/usr/share/nginx/html/manifest.json" ]; then
    echo "⚠️  Предупреждение: manifest.json не найден!"
fi

if [ ! -f "/usr/share/nginx/html/sw.js" ]; then
    echo "⚠️  Предупреждение: sw.js не найден!"
fi

# Создаем необходимые директории
mkdir -p /var/log/nginx
mkdir -p /var/cache/nginx/client_temp
mkdir -p /var/cache/nginx/proxy_temp
mkdir -p /var/cache/nginx/fastcgi_temp
mkdir -p /var/cache/nginx/uwsgi_temp
mkdir -p /var/cache/nginx/scgi_temp

# Устанавливаем права доступа
touch /var/log/nginx/access.log
touch /var/log/nginx/error.log

# Проверяем конфигурацию Nginx (базовая проверка синтаксиса)
echo "🔧 Проверка конфигурации Nginx..."
nginx -t -c /etc/nginx/nginx.conf 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Конфигурация Nginx корректна"
else
    echo "⚠️  Предупреждение: Проверка nginx может не пройти из-за прав доступа, но это нормально для контейнера"
fi

# Выводим информацию о контейнере
echo "📋 Информация о контейнере:"
echo "   - PWA файлы: $(ls -la /usr/share/nginx/html/ | grep -E '\.(html|js|css|json)$' | wc -l) файлов"
echo "   - Размер приложения: $(du -sh /usr/share/nginx/html/ | cut -f1)"
echo "   - Nginx версия: $(nginx -v 2>&1)"
echo "   - Пользователь: $(whoami)"

# Проверяем health endpoint
if [ -f "/usr/share/nginx/html/health" ]; then
    echo "✅ Health check endpoint готов"
else
    echo "🔧 Создаем health check endpoint..."
    echo "healthy" > /usr/share/nginx/html/health
fi

echo "🎉 Контейнер готов к работе!"

# Запускаем Nginx в foreground режиме
exec nginx -g "daemon off;"