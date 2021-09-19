ifneq (,$(wildcard ./.env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif

build:
	docker-compose build 
# --remove-orphans

rebuild-api:
	docker-compose up -d --no-deps --build api

up:
	docker-compose up

down:
	docker-compose down
	
# migrate part of start up so only makemigrations needed
makemigrations:
	docker-compose run api sh -c "python manage.py makemigrations"

# Remove all volumes
down-v:
	docker-compose down -v

dj-shell:
	docker-compose run api python manage.py shell

linux-shell:
	docker exec -it capitals /bin/bash