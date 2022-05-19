BALANCES_VERSION = v1.1
HOST_PORT = 3000
CONTAINER_PORT = 3000

build:
	docker build --tag=balances:${BALANCES_VERSION} .

run:
	docker run -dp ${HOST_PORT}:${CONTAINER_PORT} balances:${BALANCES_VERSION}