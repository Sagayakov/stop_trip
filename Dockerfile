FROM python:3

ENV PYTHONUNBUFFERED=1

WORKDIR /usr/scr/app

COPY ./requirements.txt .

RUN pip3 install --upgrade pip

RUN pip3 install -r requirements.txt

COPY . .

