start_client(){
	cd client;
	npm run metro &;
	npm run emulator > emulator.log &;
	{
		IFS= read -r pid;
		booted=$(grep -q -m1 -oF 'boot completed');
		kill -- "$pid";
	} < <(echo "$BASHPID"; exec tail -n +1 -f emulator.log);
	npm run android > app.log;
	cd ..;
	return 0;
}