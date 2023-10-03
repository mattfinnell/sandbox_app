FROM python:3.10 as backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# psycopg dependencies
RUN apt-get update \
    && apt-get install -y build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY api/ /app/api/ 
COPY jobs/ /app/jobs/ 
COPY server/ /app/server/ 

COPY poetry.lock pyproject.toml manage.py scripts/init_django.sh /app/
RUN pip install poetry && poetry install

EXPOSE 8000

ENTRYPOINT [ "sh", "init_django.sh" ]

FROM node:18.18-alpine as frontend

WORKDIR /app

COPY public/ /app/public/
COPY src/ /app/src/
COPY package.json yarn.lock /app/
ENV NODE_ENV=production

RUN yarn install --production

ENTRYPOINT [ "yarn", "start" ]