# StopTrip сайт

***

### CI/CD production status: <img src="https://github.com/Sagayakov/stop_trip//actions/workflows/build.yml/badge.svg?branch=master">

## Flow  ведения проекта:
1. Ветки создаём от **master**. Название ветки должно состоять из нескольких частей:
 - слово fix или feat (фикс чего-либо или новая фича)
 - в скобках указываем направление работы (back или front)
 - указываем, что сделали максимально коротко.

    Примеры:


     - fix(back)/model_correction
     - feat(back)/cars_filters

2. **На каждую фичу или фикс создаём новую ветку от master.** Не делайте всё в одной ветке, потому что может настать момент, когда надо будет откатить какие-то изменения, и придётся потратить кучу времени
3. **(ДЛЯ backend)** Коммит делаем по такой же логике, как и название ветки, с одним небольшим отличием:
 - в скобках пишем не направление работ (back/front), а название аппки.
 - если проделанная работа касается общих настроек, докера, пакетов и т.д., то можно писать без скобок.

    Примеры:


    - "feat(users): Создал отдельную аппку для пользователей. Добавил модель и админку"
    - "fix(offers): Добавил комментарии к необходимым правкам"
    - "fix: Переписал Dockerfile, docker-compose и добавил пару пакетов на будущее в requirements.txt"


***

## Локальный запуск приложения

Нужен только [Docker Desktop](https://www.docker.com/products/docker-desktop/).

1. В корне проекта должен лежать файл `.env` (пример — ниже, раздел ENV).
2. Запуск (первый раз — 5–15 минут, дальше быстрее):
```shell
docker compose up --build
```
3. Открыть:
   - сайт — http://localhost:3000
   - админка — http://localhost:8000/admin/
   - документация API (Swagger) — http://localhost:8000/api/docs/
4. Создать администратора (в отдельном окне терминала, из папки проекта):
```shell
docker compose exec backend python manage.py createsuperuser
```
5. Тесты бэкенда:
```shell
docker compose run --rm backend pytest -p no:warnings
```

Локально: фото хранятся на диске (`backend/media`), письма (например, ссылка активации
аккаунта) не отправляются, а печатаются в лог контейнера `backend`, nginx не запускается.

Страна, валюта и центр карты задаются в `frontend/src/shared/const/geo.ts`,
список провинций и городов — в `backend/countries/data/vietnam.py`.

***

## Макеты

[Figma](https://www.figma.com/file/41Hcq7Feg81dkeuxbzkJrP/StopTrip?type=design&node-id=204-182&mode=design&t=yMN0H2PGqcE1JEWK-0)

[Miro](https://miro.com/app/board/uXjVMs_qgJk=/?share_link_id=530992704029)

***

## ENV

Файл `.env` в корне проекта. Для локального запуска:
```shell
DEBUG=True
SECRET_KEY=любая-длинная-случайная-строка
SITE_HOST=localhost:3000
POSTGRES_NAME=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=любой-пароль
POSTGRES_PORT=5432
TLS_MODE=off
HTPASSWD_NODE=off
HTPASSWD=off
```

Дополнительно для сервера:
```shell
DEBUG=False
SITE_HOST=stoptrip.com
ALLOWED_HOSTS=stoptrip.com
CORS_ALLOWED_ORIGINS=https://stoptrip.com
MEDIA_URL=/m/
GUNICORN_WORKERS=3
# Вход через Google (ключи из Google Cloud Console)
GOOGLE_OAUTH2_KEY=
GOOGLE_OAUTH2_SECRET=
# Почта для писем активации (без неё письма пишутся в лог)
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
# Необязательно: хранить фото в Yandex Object Storage вместо диска сервера
YND_ACCESS_KEY_ID=
YND_SECRET_ACCESS_KEY=
YND_STORAGE_BUCKET_NAME=
```

`POSTGRES_PASSWORD` обязателен: без него `docker compose` не запустится.
Порты базы (15239) и бэкенда (8000) открываются только при локальном запуске через
`docker-compose.override.yml`. На сервере, где файлы передаются через `-f`, они закрыты.
