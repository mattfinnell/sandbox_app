#     ____             __                  __
#    / __ )____ ______/ /_____  ____  ____/ /
#   / __  / __ `/ ___/ //_/ _ \/ __ \/ __  / 
#  / /_/ / /_/ / /__/ ,< /  __/ / / / /_/ /  
# /_____/\__,_/\___/_/|_|\___/_/ /_/\__,_/   

FROM python:3.10 as backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install -y build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/ /app

RUN pip install poetry && poetry install

EXPOSE 8000

ENTRYPOINT [ "sh", "run_production.sh" ]

#     ______                 __                 __
#    / ____/________  ____  / /____  ____  ____/ /
#   / /_  / ___/ __ \/ __ \/ __/ _ \/ __ \/ __  / 
#  / __/ / /  / /_/ / / / / /_/  __/ / / / /_/ /  
# /_/   /_/   \____/_/ /_/\__/\___/_/ /_/\__,_/   

FROM node:18.18-alpine as frontend

WORKDIR /app

COPY frontend/ /app

ENV NODE_ENV production

RUN yarn install --production

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]