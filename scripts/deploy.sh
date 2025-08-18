#!/bin/bash
# Скрипт локального деплоя для тестирования

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Переменные
ENVIRONMENT=${1:-development}
IMAGE_NAME="vibesplit-pwa"
CONTAINER_NAME="vibesplit-pwa-${ENVIRONMENT}"

echo -e "${BLUE}🚀 Локальный деплой VibeSplit PWA${NC}"
echo -e "${YELLOW}Окружение: ${ENVIRONMENT}${NC}"

# Проверяем Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker не установлен${NC}"
    exit 1
fi

# Останавливаем старый контейнер если он запущен
if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo -e "${YELLOW}🛑 Останавливаем старый контейнер...${NC}"
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
fi

# Собираем новый образ
echo -e "${YELLOW}🔨 Сборка Docker образа...${NC}"
if [ "$ENVIRONMENT" = "production" ]; then
    docker build -t $IMAGE_NAME:latest -f Dockerfile .
else
    docker build -t $IMAGE_NAME:dev -f Dockerfile .
fi

# Определяем порт и переменные окружения
if [ "$ENVIRONMENT" = "production" ]; then
    PORT=3000
    API_URL="https://api.vibesplit.com"
    TAG="latest"
else
    PORT=3001
    API_URL="http://localhost:3001/api"
    TAG="dev"
fi

# Запускаем новый контейнер
echo -e "${YELLOW}🚀 Запуск нового контейнера...${NC}"
docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p $PORT:80 \
    -e NODE_ENV=$ENVIRONMENT \
    -e VITE_API_URL=$API_URL \
    -v $(pwd)/logs:/var/log/nginx \
    --health-cmd="curl -f http://localhost:80/health || exit 1" \
    --health-interval=30s \
    --health-timeout=10s \
    --health-retries=3 \
    $IMAGE_NAME:$TAG

# Ждем готовности
echo -e "${YELLOW}⏳ Ждем готовности контейнера...${NC}"
sleep 15

# Проверяем health check
for i in {1..10}; do
    if docker exec $CONTAINER_NAME curl -f http://localhost:80/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Контейнер готов к работе!${NC}"
        break
    fi
    if [ $i -eq 10 ]; then
        echo -e "${RED}❌ Health check не прошел${NC}"
        docker logs $CONTAINER_NAME
        exit 1
    fi
    echo -e "${YELLOW}⏳ Попытка $i/10...${NC}"
    sleep 5
done

# Выводим информацию
echo -e "${GREEN}🎉 Деплой завершен успешно!${NC}"
echo -e "${BLUE}📋 Информация о деплое:${NC}"
echo -e "   🌐 URL: http://localhost:$PORT"
echo -e "   🔍 Health check: http://localhost:$PORT/health"
echo -e "   📊 Контейнер: $CONTAINER_NAME"
echo -e "   📝 Логи: docker logs $CONTAINER_NAME"

# Показываем статистику контейнера
echo -e "${BLUE}📊 Статистика контейнера:${NC}"
docker stats $CONTAINER_NAME --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

echo -e "${GREEN}✨ Готово! Приложение доступно по адресу: http://localhost:$PORT${NC}"