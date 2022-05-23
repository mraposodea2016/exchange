up:
	docker-compose up -d

down:
	docker-compose down --volumes

prune:
	docker system prune -a

emulate:
	cd client
	npm run metro