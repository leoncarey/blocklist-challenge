build:
	docker-compose build --pull

run-api: build
	docker-compose up api

test-api: build
	@rm -Rf ./api/.nyc_output
	docker-compose up test-api
	@rm -Rf ./api/coverage
	$(eval ID=$(shell docker ps -a | grep blocklist-challenge-test-api | sed 's/.*blocklist-challenge-test-api//' | head -n 1))
	docker cp blocklist-challenge-test-api$(ID):/app/coverage ./api

test-client: build
	@rm -Rf ./client/.nyc_output
	docker-compose up test-client
	@rm -Rf ./client/coverage
	$(eval ID=$(shell docker ps -a | grep blocklist-challenge-test-client | sed 's/.*blocklist-challenge-test-client//' | head -n 1))
	docker cp blocklist-challenge-test-client$(ID):/app/coverage ./client


run: build
	docker-compose up client

clean:
	docker-compose down