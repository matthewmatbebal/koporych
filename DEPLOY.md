# Деплой koporych.ru на рег.ру VPS

## Характеристики сервера
- Тариф: Stdp C1-M1-D10 (1 ядро, 1GB RAM, 10GB NVMe)
- ОС: Ubuntu 26.04 LTS
- IP: 89.108.78.196
- Домен: koporych.ru (DNS на R01)

---

## Первичная настройка сервера

### 1. Подключение (с локального компьютера)
```bash
ssh root@89.108.78.196
```

### 2. Обновление системы
```bash
apt update && apt upgrade -y
```

### 3. Установка git
```bash
apt install -y git
```

### 4. Установка Node.js 22
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
node -v  # должно быть v22.x.x
```

### 5. Установка pnpm и PM2
```bash
npm install -g pnpm pm2
```

### 6. Своп (обязательно — без него сборка падает на 1GB RAM)
```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
free -h  # проверить — должна появиться строка Swap: 2.0G
```

### 7. Открыть порты в файрволе
```bash
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 3000
ufw enable
ufw status
```

---

## Деплой приложения

### 8. Клонирование репозитория
```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/matthewmatbebal/koporych koporych
```

Проверить:
```bash
ls /var/www/koporych
# должны быть: package.json, payload.config.ts, src/ и т.д.
```

### 9. Переменные окружения
```bash
cd /var/www/koporych
nano .env
```

Вставить:
```env
DATABASE_URL=file:/var/www/koporych/database.db
PAYLOAD_SECRET=длинная_случайная_строка_минимум_32_символа
NEXT_PUBLIC_SERVER_URL=https://koporych.ru
SMTP_USER=info@koporych.ru
SMTP_PASS=пароль_приложения_яндекса
SMTP_TO=info@koporych.ru
```

`Ctrl+O` → `Enter` → `Ctrl+X`

Проверить:
```bash
cat /var/www/koporych/.env
```

### 10. Установка зависимостей и сборка
```bash
cd /var/www/koporych
pnpm install
NODE_OPTIONS="--max-old-space-size=1536" pnpm build
```

Если сборка упала с `heap out of memory` — своп не добавлен (шаг 6).
Если `Cannot find module` — `rm -rf node_modules && pnpm install`.

### 11. Запуск через PM2
```bash
cd /var/www/koporych
pm2 start pnpm --name koporych -- start
pm2 save
pm2 startup
```

`pm2 startup` выведет команду вида `sudo env PATH=...` — скопировать и выполнить.

Проверить статус:
```bash
pm2 status           # должно быть online
pm2 logs koporych --lines 30  # смотреть логи
```

Проверить в браузере: `http://89.108.78.196:3000`

---

## Nginx + SSL

### 12. Установка nginx и certbot
```bash
apt-get install -y nginx certbot python3-certbot-nginx
```

### 13. Отключить дефолтный сайт nginx
```bash
rm /etc/nginx/sites-enabled/default
```

### 14. Создать конфиг
```bash
nano /etc/nginx/sites-available/koporych
```

Вставить:
```nginx
server {
    listen 80;
    server_name koporych.ru www.koporych.ru;

    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

`Ctrl+O` → `Enter` → `Ctrl+X`

### 15. Подключить конфиг и запустить nginx
```bash
ln -s /etc/nginx/sites-available/koporych /etc/nginx/sites-enabled/
```
```bash
nginx -t
```

Должно быть `test is successful`. Если ошибка — не продолжать.

```bash
systemctl enable nginx
systemctl start nginx
```

Проверить: `http://koporych.ru` должен открыться без порта.

Если 502 Bad Gateway — смотреть:
```bash
tail -20 /var/log/nginx/error.log
pm2 status
```

### 16. Получить SSL сертификат
```bash
certbot --nginx -d koporych.ru -d www.koporych.ru
```

Certbot спросит:
- Email → ввести свой
- Terms → `A`
- Share email → `N`
- Redirect → `2` (если спросит)

После этого certbot сам изменит конфиг nginx и настроит автопродление.

Проверить автопродление:
```bash
certbot renew --dry-run
```

### 17. Проверить итог
- `https://koporych.ru` — сайт с замочком ✓
- `https://koporych.ru/admin` — админка ✓
- `http://koporych.ru` — редиректит на https ✓

---

## Частые проблемы

### 502 Bad Gateway
```bash
tail -20 /var/log/nginx/error.log
pm2 status
```

Если `upstream sent too big header` — в nginx конфиге нужны буферы (уже есть в конфиге выше).

### Изображения не загружаются (400)
Домен не добавлен в `remotePatterns` в `next.config.ts` — добавить и пересобрать.

### Сайт не открывается после смены домена/URL
При смене `NEXT_PUBLIC_SERVER_URL` — обязательно пересобрать:
```bash
cd /var/www/koporych
NODE_OPTIONS="--max-old-space-size=1536" pnpm build
pm2 restart koporych
```

### Изображения битые после смены URL
База хранит старые URL. Удалить базу и перезапустить (сид запустится автоматически):
```bash
rm /var/www/koporych/database.db
pm2 restart koporych
```

### SMTP не работает (ETIMEDOUT)
Рег.ру блокирует исходящий SMTP. Написать в поддержку рег.ру с просьбой разблокировать порты 465 и 587.

### Не получается залогиниться в админку
Убедиться что `NEXT_PUBLIC_SERVER_URL` совпадает с реальным адресом сайта и пересобрать.

---

## Деплой новой версии

```bash
cd /var/www/koporych
git pull
pnpm install
NODE_OPTIONS="--max-old-space-size=1536" pnpm build
pm2 restart koporych
```

---

## Полезные команды

```bash
pm2 status                    # статус процессов
pm2 logs koporych --lines 50  # логи приложения
pm2 restart koporych          # перезапуск
pm2 stop koporych             # остановить
pm2 start koporych            # запустить

systemctl status nginx        # статус nginx
systemctl restart nginx       # перезапустить nginx
systemctl reload nginx        # перезагрузить конфиг nginx без перезапуска
tail -50 /var/log/nginx/error.log  # ошибки nginx

df -h                         # место на диске
free -h                       # память и своп
```

---

## DNS на R01

В личном кабинете R01 → управление DNS → добавить:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | 89.108.78.196 |
| A | www | 89.108.78.196 |

DNS обновляется до 24 часов, обычно быстрее.
