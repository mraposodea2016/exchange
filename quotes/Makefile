RUBY_VERSION=3.1.2
VERSION=v1.0
HOST_PORT=3004
CONTAINER_PORT=3000

lock:
	docker run --rm -v ${PWD}:/exchange/quotes -w /exchange/quotes ruby:${RUBY_VERSION} bundle install
build:
	docker build --tag=quotes:${VERSION} .
run:
	docker run -dp ${HOST_PORT}:${CONTAINER_PORT} quotes:${VERSION}