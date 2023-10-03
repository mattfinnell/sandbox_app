cd $ROOT_DIR
pg_ctl start -l .out/postgres.out
sudo service redis-server start

# python / django updates

cd $BACKEND_DIR
poetry install
poetry run python manage.py makemigrations 
poetry run python manage.py migrate
cd $ROOT_DIR

yarn --cwd $FRONTEND_DIR install
# yarn start