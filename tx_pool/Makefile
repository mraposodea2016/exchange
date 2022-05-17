RUBY_VERSION = 3.1.2
TX_POOL_VERSION = v1.0
HOST_PORT = 49159
CONTAINER_PORT = 3000

lock:
	docker run --rm -v ${PWD}:/exchange/tx_pool -w /exchange/tx_pool ruby:${RUBY_VERSION} bundle install

build:
	docker build --platform=linux/arm64/v8 --tag=tx_pool:${TX_POOL_VERSION} .

run:
	docker run -p ${HOST_PORT}:${CONTAINER_PORT} -d tx_pool:${TX_POOL_VERSION}