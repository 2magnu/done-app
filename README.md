# 👾 Done App

Создавай именованные списки под любую задачу.

## 🛠 Стек

* Vue 3
* Nuxt 4
* TypeScript
* Pinia
* SCSS
* VueUse
* Vitest

## 🚀 Установка

Требуется Node.js 22+.

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу:

`http://localhost:3000`

## Production

### Production-сборка

```bash
npm run build
```

### Запуск production-сервера

```bash
node .output/server/index.mjs
```

## 🧪 Тестирование

```bash
npm run test
```

## 🐳 Docker

Проект содержит `Dockerfile` и `docker-compose.yaml` для запуска приложения в Docker.

### Запуск

```bash
docker compose up --build
```

После запуска приложение будет доступно по адресу:

`http://localhost:3000`
