poetry run python manage.py makemigrations --no-input
poetry run python manage.py migrate --no-input
poetry run hypercorn server.asgi:application