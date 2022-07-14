
run:
	docker-compose build --pull
	docker-compose up api
#client

clean:
	docker-compose down