pg_ctl start -l .out/postgres.out
sudo service redis-server start

# Install Python Dependencies
poetry install

# Run Django Migrations
poetry run python manage.py makemigrations 
poetry run python manage.py migrate

yarn install
# yarn start