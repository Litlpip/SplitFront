#!/bin/bash
# Скрипт быстрого отката к предыдущей версии

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

CONTAINER_NAME="vibesplit-pwa"
BACKUP_CONTAINER="vibesplit-pwa-backup"

echo -e "${BLUE}🔄 Откат VibeSplit PWA к предыдущей версии${NC}"

# Проверяем наличие backup контейнера
if ! docker ps -a --format 'table {{.Names}}' | grep -q "^${BACKUP_CONTAINER}$"; then
    echo -e "${RED}❌ Backup контейнер не найден!${NC}"
    echo -e "${YELLOW}Попытка создать откат из образа...${NC}"
    
    # Ищем предыдущий образ
    LAST_IMAGE=$(docker images --filter "reference=vibesplit-pwa" --format "table {{.Repository}}:{{.Tag}}" | head -n2 | tail -n1)
    
    if [ -z "$LAST_IMAGE" ]; then
        echo -e "${RED}❌ Предыдущий образ не найден!${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}📦 Используем образ: $LAST_IMAGE${NC}"
else
    echo -e "${GREEN}✅ Backup контейнер найден${NC}"
fi

# Останавливаем текущий контейнер
echo -e "${YELLOW}🛑 Останавливаем текущий контейнер...${NC}"
docker stop $CONTAINER_NAME || true

# Переименовываем текущий контейнер в failed
docker rename $CONTAINER_NAME "${CONTAINER_NAME}-failed-$(date +%Y%m%d-%H%M%S)" || true

if docker ps -a --format 'table {{.Names}}' | grep -q "^${BACKUP_CONTAINER}$"; then
    # Восстанавливаем из backup контейнера
    echo -e "${YELLOW}🔄 Восстанавливаем из backup контейнера...${NC}"
    docker rename $BACKUP_CONTAINER $CONTAINER_NAME
    docker start $CONTAINER_NAME
else
    # Создаем новый контейнер из предыдущего образа
    echo -e "${YELLOW}🔄 Создаем контейнер из предыдущего образа...${NC}"
    docker run -d \
        --name $CONTAINER_NAME \
        --restart unless-stopped \
        -p 8080:80 \
        -v /var/log/vibesplit:/var/log/nginx \
        --health-cmd="curl -f http://localhost:80/health || exit 1" \
        --health-interval=30s \
        --health-timeout=10s \
        --health-retries=3 \
        $LAST_IMAGE
fi

# Ждем готовности
echo -e "${YELLOW}⏳ Ждем готовности контейнера...${NC}"
sleep 15

# Проверяем health check
for i in {1..10}; do
    if docker exec $CONTAINER_NAME curl -f http://localhost:80/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Откат выполнен успешно!${NC}"
        break
    fi
    if [ $i -eq 10 ]; then
        echo -e "${RED}❌ Откат не удался!${NC}"
        docker logs $CONTAINER_NAME
        exit 1
    fi
    echo -e "${YELLOW}⏳ Проверка $i/10...${NC}"
    sleep 5
done

# Перезагружаем Nginx если настроен
if systemctl is-active --quiet nginx 2>/dev/null; then
    echo -e "${YELLOW}🔄 Перезагружаем Nginx...${NC}"
    sudo nginx -t && sudo systemctl reload nginx
fi

echo -e "${GREEN}🎉 Откат завершен успешно!${NC}"
echo -e "${BLUE}📋 Информация:${NC}"
echo -e "   🌐 Приложение доступно по: http://localhost:8080"
echo -e "   🔍 Health check: http://localhost:8080/health"
echo -e "   📝 Логи: docker logs $CONTAINER_NAME"

# Показываем статистику
echo -e "${BLUE}📊 Статистика контейнера:${NC}"
docker stats $CONTAINER_NAME --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"