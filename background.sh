start_client(){
	cd client || exit;
	npm run metro &
	npm run emulator > emulator.log &
	{
		IFS= read -r pid;
		if grep -q -m1 -oF 'boot completed'; then
		  kill -- "$pid";
		fi
	} < <(echo "$BASHPID"; exec tail -n +1 -f emulator.log);
	wait npm run android > app.log;
	cd ..;
	return 0;
}