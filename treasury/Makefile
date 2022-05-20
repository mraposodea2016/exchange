VERSION = v1.0
HOST_PORT = 3003
CONTAINER_PORT = 3000

build:
	docker build --tag=treasury:${VERSION} .

run:
	docker run -dp ${HOST_PORT}:${CONTAINER_PORT} treasury:${VERSION}