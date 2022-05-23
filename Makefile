up:
	docker-compose up -d

down:
	docker-compose down --volumes

prune:
	docker system prune -a

emulate:
	source background.sh
	start_client