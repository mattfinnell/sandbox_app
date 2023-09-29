pg_ctl start -l .out/postgres.out
sudo service redis-server start

# Install Python Dependencies
pipenv install

# Run Django Migrations
pipenv run python manage.py makemigrations 
pipenv run python manage.py migrate

yarn install
# yarn start