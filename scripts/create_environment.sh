# create the out directory
if [ ! -d "$PWD/.out" ]; then
  mkdir "$PWD/.out"
fi

# Postgres
sudo apt update
sudo apt install wget ca-certificates -y
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
sudo apt update
sudo apt install postgresql postgresql-contrib postgresql-client -y

pg_ctl start -l .out/postgres.out
psql -U postgres -f scripts/postgres.init.sql

# Redis
sudo apt install redis-server -y

# initialize Django
poetry install
poetry run python manage.py makemigrations 
poetry run python manage.py migrate

bash scripts/generate_github_key.sh 
