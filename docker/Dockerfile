# PHP 8.4 FPM
FROM php:8.4-fpm

# Install system deps
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install Node (latest LTS via NodeSource)
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

# Set working dir
WORKDIR /var/www/html

# Optional: speed up npm on slower machines
RUN npm config set fund false && npm config set audit false

# Expose PHP-FPM port
EXPOSE 9000
