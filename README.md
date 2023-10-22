# StopTrip сайт

***

### CI/CD status: <img src="https://github.com/Sagayakov/stop_trip/workflows/CI-CD/badge.svg?branch=master">

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


```shell
docker-compose build
```
Не забудьте создать файл .env
```shell
docker-compose up
```

### После разворота

Swagger - http://0.0.0.0:8000/api/docs/

Admin - http://0.0.0.0:8000/admin/

***

## Макеты

[Figma](https://www.figma.com/file/41Hcq7Feg81dkeuxbzkJrP/StopTrip?type=design&node-id=204-182&mode=design&t=yMN0H2PGqcE1JEWK-0)

[Miro](https://miro.com/app/board/uXjVMs_qgJk=/?share_link_id=530992704029)

***

## ENV

### Backend
```shell
SITE_HOST=localhost
SECRET_KEY=my_secret_key
DEBUG=True
POSTGRES_NAME=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
```