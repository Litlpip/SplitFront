#!/bin/bash
# Скрипт проверки состояния системы

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

CONTAINER_NAME="vibesplit-pwa"
BASE_URL=${1:-"http://localhost:8080"}

echo -e "${BLUE}🏥 Проверка состояния VibeSplit PWA${NC}"
echo -e "${YELLOW}URL: $BASE_URL${NC}"

# Функция для проверки URL
check_url() {
    local url=$1
    local description=$2
    local expected_code=${3:-200}
    
    local response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
    
    if [ "$response" = "$expected_code" ]; then
        echo -e "   ✅ $description ($response)"
        return 0
    else
        echo -e "   ❌ $description ($response)"
        return 1
    fi
}

# Проверка контейнера
echo -e "${BLUE}🐳 Проверка Docker контейнера:${NC}"

if docker ps --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo -e "   ✅ Контейнер запущен"
    
    # Проверяем health status
    HEALTH_STATUS=$(docker inspect --format='{{.State.Health.Status}}' $CONTAINER_NAME 2>/dev/null || echo "unknown")
    case $HEALTH_STATUS in
        "healthy")
            echo -e "   ✅ Health status: healthy"
            ;;
        "unhealthy")
            echo -e "   ❌ Health status: unhealthy"
            ;;
        "starting")
            echo -e "   ⏳ Health status: starting"
            ;;
        *)
            echo -e "   ⚠️  Health status: $HEALTH_STATUS"
            ;;
    esac
    
    # Статистика контейнера
    echo -e "${BLUE}📊 Статистика контейнера:${NC}"
    docker stats $CONTAINER_NAME --no-stream --format "   CPU: {{.CPUPerc}} | RAM: {{.MemUsage}} | NET: {{.NetIO}}"
    
else
    echo -e "   ❌ Контейнер не запущен"
    exit 1
fi

# Проверка веб-доступности
echo -e "${BLUE}🌐 Проверка веб-доступности:${NC}"

FAILED=0

check_url "$BASE_URL/health" "Health endpoint" || FAILED=1
check_url "$BASE_URL/" "Главная страница" || FAILED=1
check_url "$BASE_URL/manifest.json" "PWA Manifest" || FAILED=1
check_url "$BASE_URL/sw.js" "Service Worker" || FAILED=1

# Проверка PWA специфичных функций
echo -e "${BLUE}📱 Проверка PWA функций:${NC}"

# Проверяем содержимое манифеста
MANIFEST_CONTENT=$(curl -s "$BASE_URL/manifest.json" 2>/dev/null || echo "{}")

if echo "$MANIFEST_CONTENT" | grep -q '"name"'; then
    echo -e "   ✅ Manifest содержит name"
else
    echo -e "   ❌ Manifest не содержит name"
    FAILED=1
fi

if echo "$MANIFEST_CONTENT" | grep -q '"start_url"'; then
    echo -e "   ✅ Manifest содержит start_url"
else
    echo -e "   ❌ Manifest не содержит start_url"
    FAILED=1
fi

if echo "$MANIFEST_CONTENT" | grep -q '"icons"'; then
    echo -e "   ✅ Manifest содержит icons"
else
    echo -e "   ❌ Manifest не содержит icons"
    FAILED=1
fi

# Проверка логов на ошибки
echo -e "${BLUE}📝 Проверка логов:${NC}"

ERROR_COUNT=$(docker logs $CONTAINER_NAME --since="1h" 2>&1 | grep -i error | wc -l)
if [ "$ERROR_COUNT" -eq 0 ]; then
    echo -e "   ✅ Нет ошибок в логах за последний час"
else
    echo -e "   ⚠️  Найдено $ERROR_COUNT ошибок в логах за последний час"
    echo -e "${YELLOW}Последние ошибки:${NC}"
    docker logs $CONTAINER_NAME --since="1h" 2>&1 | grep -i error | tail -5 | sed 's/^/     /'
fi

# Проверка дискового пространства
echo -e "${BLUE}💾 Проверка ресурсов:${NC}"

DISK_USAGE=$(df /var/lib/docker | awk 'NR==2{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    echo -e "   ✅ Дисковое пространство: ${DISK_USAGE}%"
else
    echo -e "   ⚠️  Дисковое пространство: ${DISK_USAGE}% (высокая загрузка)"
fi

# Проверка времени аптайма контейнера
STARTED_AT=$(docker inspect --format='{{.State.StartedAt}}' $CONTAINER_NAME)
echo -e "   📅 Время запуска: $STARTED_AT"

# Итоговый результат
echo -e "${BLUE}🏁 Результат проверки:${NC}"

if [ "$FAILED" -eq 0 ]; then
    echo -e "${GREEN}✅ Все проверки пройдены успешно!${NC}"
    exit 0
else
    echo -e "${RED}❌ Обнаружены проблемы!${NC}"
    exit 1
fi