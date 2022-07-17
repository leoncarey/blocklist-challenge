
run-api:
	docker-compose build --pull
	docker-compose up api

test-api:
	@rm -Rf ./api/.nyc_output
	docker-compose build --pull
	docker-compose up test-api
	@rm -Rf ./api/coverage
	$(eval ID=$(shell docker ps -a | grep neoway-fullstack-test | sed 's/.*neoway-fullstack-test//' | head -n 1))
	docker cp neoway-fullstack-test$(ID):/app/coverage ./api


run-client:
	docker-compose build --pull
	docker-compose up client

clean:
	docker-compose down