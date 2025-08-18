# VibeSplit PWA Makefile
.PHONY: help build dev test deploy-local deploy-staging deploy-prod clean health rollback logs

# Переменные
DOCKER_IMAGE = vibesplit-pwa
CONTAINER_NAME = vibesplit-pwa
DOCKER_COMPOSE = docker-compose
PORT = 3000

# Цвета для вывода
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

help: ## Показать справку
	@echo "$(YELLOW)VibeSplit PWA - Команды управления$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

install: ## Установить зависимости
	@echo "$(YELLOW)📦 Установка зависимостей...$(NC)"
	npm ci

build: ## Собрать PWA приложение
	@echo "$(YELLOW)🔨 Сборка приложения...$(NC)"
	npm run build

build-docker: ## Собрать Docker образ
	@echo "$(YELLOW)🐳 Сборка Docker образа...$(NC)"
	docker build -t $(DOCKER_IMAGE):latest .

dev: ## Запустить development сервер
	@echo "$(YELLOW)🚀 Запуск development сервера...$(NC)"
	npm run dev

dev-docker: ## Запустить development версию в Docker
	@echo "$(YELLOW)🚀 Запуск development версии в Docker...$(NC)"
	$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)✅ Приложение доступно: http://localhost:$(PORT)$(NC)"

test: ## Запустить тесты
	@echo "$(YELLOW)🧪 Запуск тестов...$(NC)"
	npm run lint
	npm run type-check

test-build: ## Тестирование сборки
	@echo "$(YELLOW)🧪 Тестирование сборки...$(NC)"
	npm run build
	npm run preview &
	sleep 5
	curl -f http://localhost:4173/ || exit 1
	pkill -f preview

deploy-local: ## Локальный деплой
	@echo "$(YELLOW)🚀 Локальный деплой...$(NC)"
	./scripts/deploy.sh development

deploy-staging: ## Деплой на staging
	@echo "$(YELLOW)🚀 Деплой на staging...$(NC)"
	./scripts/deploy.sh staging

health: ## Проверка состояния системы
	@echo "$(YELLOW)🏥 Проверка состояния...$(NC)"
	./scripts/health-check.sh

rollback: ## Откат к предыдущей версии
	@echo "$(YELLOW)🔄 Откат к предыдущей версии...$(NC)"
	./scripts/rollback.sh

logs: ## Просмотр логов контейнера
	@echo "$(YELLOW)📝 Логи контейнера:$(NC)"
	docker logs $(CONTAINER_NAME) -f

logs-nginx: ## Просмотр логов Nginx
	@echo "$(YELLOW)📝 Логи Nginx:$(NC)"
	docker exec $(CONTAINER_NAME) tail -f /var/log/nginx/access.log

stop: ## Остановить контейнеры
	@echo "$(YELLOW)🛑 Остановка контейнеров...$(NC)"
	$(DOCKER_COMPOSE) down
	docker stop $(CONTAINER_NAME) 2>/dev/null || true

clean: ## Очистка системы
	@echo "$(YELLOW)🧹 Очистка системы...$(NC)"
	$(DOCKER_COMPOSE) down -v
	docker system prune -f
	docker volume prune -f
	rm -rf dist/ node_modules/.cache/

clean-all: ## Полная очистка (включая node_modules)
	@echo "$(YELLOW)🧹 Полная очистка...$(NC)"
	$(DOCKER_COMPOSE) down -v
	docker system prune -af
	docker volume prune -f
	rm -rf dist/ node_modules/ .cache/

status: ## Показать статус контейнеров
	@echo "$(YELLOW)📊 Статус контейнеров:$(NC)"
	docker ps -a --filter name=$(CONTAINER_NAME)
	@echo ""
	@echo "$(YELLOW)📊 Статистика:$(NC)"
	docker stats $(CONTAINER_NAME) --no-stream 2>/dev/null || echo "Контейнер не запущен"

backup: ## Создать backup
	@echo "$(YELLOW)📦 Создание backup...$(NC)"
	mkdir -p backups
	docker save $(DOCKER_IMAGE):latest | gzip > backups/vibesplit-$(shell date +%Y%m%d-%H%M%S).tar.gz
	@echo "$(GREEN)✅ Backup создан в папке backups/$(NC)"

restart: stop dev-docker ## Перезапуск контейнеров

quick-deploy: build-docker stop ## Быстрый деплой (сборка + остановка + запуск)
	@echo "$(YELLOW)⚡ Быстрый деплой...$(NC)"
	docker run -d \
		--name $(CONTAINER_NAME) \
		--restart unless-stopped \
		-p $(PORT):80 \
		$(DOCKER_IMAGE):latest
	@echo "$(GREEN)✅ Приложение запущено: http://localhost:$(PORT)$(NC)"

# Команды для production
prod-build: ## Production сборка
	@echo "$(YELLOW)🏭 Production сборка...$(NC)"
	NODE_ENV=production npm run build
	docker build -t $(DOCKER_IMAGE):production .

prod-deploy: ## Production деплой (только локально)
	@echo "$(YELLOW)🏭 Production деплой...$(NC)"
	./scripts/deploy.sh production

# Утилиты
shell: ## Войти в shell контейнера
	docker exec -it $(CONTAINER_NAME) /bin/sh

inspect: ## Детальная информация о контейнере
	docker inspect $(CONTAINER_NAME)

size: ## Размер образа и билда
	@echo "$(YELLOW)📏 Размеры:$(NC)"
	@echo "Docker образ:"
	docker images $(DOCKER_IMAGE) --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
	@echo ""
	@echo "Билд приложения:"
	@du -sh dist/ 2>/dev/null || echo "Билд не найден (запустите make build)"

# Мониторинг
monitor: ## Мониторинг ресурсов в реальном времени
	@echo "$(YELLOW)📊 Мониторинг ресурсов (Ctrl+C для выхода):$(NC)"
	docker stats $(CONTAINER_NAME)

# По умолчанию показываем help
.DEFAULT_GOAL := help