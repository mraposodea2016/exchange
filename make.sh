start_client(){
	cd client || exit;
	npm run metro &
	npm run emulator > emulator.log &
	{
		IFS= read -r pid;
		STOP=$(grep -q -m1 -oF 'boot completed');
		kill -- "$pid";
	} < <(echo "$BASHPID"; exec tail -n +1 -f emulator.log);
	npm run android > app.log &
	cd ..;
	return 0;
}

compose_rebuild() {
  service=$1;
  docker-compose up -d --no-deps --build "$service";
}
