
run:
	docker-compose build --pull
	docker-compose up client

clean:
	docker-compose down