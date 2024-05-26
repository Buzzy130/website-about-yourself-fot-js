# Используем официальный образ PHP с Apache
FROM php:8.1-fpm

# Копируем файл package.json и package-lock.json (если есть) в текущую директорию контейнера
COPY package*.json ./

# Устанавливаем зависимости
RUN apt-get update
RUN apt-get install -y curl git

RUN docker-php-ext-install pdo pdo_mysql

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /ospanel/domains/3laba

# Команда для запуска вашего приложения при старте контейнера
CMD ["php-docker"]
