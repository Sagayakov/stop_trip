#!/bin/sh
wait-for
python manage.py migrate
python manage.py collectstatic --noinput
exec "$@"
