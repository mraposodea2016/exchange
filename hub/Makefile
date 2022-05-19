HUB_VERSION = v1.0
HOST_PORT = 3001
CONTAINER_PORT = 3000

build:
	docker build --platform=linux/arm64/v8 --tag=hub:${HUB_VERSION} .
run:
	docker run -p ${HOST_PORT}:${CONTAINER_PORT} -d hub:${HUB_VERSION}