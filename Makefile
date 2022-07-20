
run-api:
	docker-compose build --pull
	docker-compose up api

test-api:
	@rm -Rf ./api/.nyc_output
	docker-compose build --pull
	docker-compose up test-api
	@rm -Rf ./api/coverage
	$(eval ID=$(shell docker ps -a | grep neoway-fullstack-test-api | sed 's/.*neoway-fullstack-test-api//' | head -n 1))
	docker cp neoway-fullstack-test-api$(ID):/app/coverage ./api

test-client:
	@rm -Rf ./client/.nyc_output
	docker-compose build --pull
	docker-compose up test-client
	@rm -Rf ./client/coverage
	$(eval ID=$(shell docker ps -a | grep neoway-fullstack-test-client | sed 's/.*neoway-fullstack-test-client//' | head -n 1))
	docker cp neoway-fullstack-test-client$(ID):/app/coverage ./client


run-client:
	docker-compose build --pull
	docker-compose up client

clean:
	docker-compose down