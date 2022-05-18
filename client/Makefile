CLIENT_VERSION = v1.0

build:
	docker build --platform=linux/arm64/v8 --tag=client:${CLIENT_VERSION} client/

run:
	docker run -d client:${CLIENT_VERSION} npm run start
	docker run -it client:${CLIENT_VERSION} npm run android

#push:
#	...