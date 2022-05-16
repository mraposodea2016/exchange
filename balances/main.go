package balances

import (
	"io"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", balanceHandler)
	log.Fatal(http.ListenAndServe("127.0.0.1:8080", nil))

}

func balanceHandler(w http.ResponseWriter, _ *http.Request) {
	io.WriteString(w, "balances")
}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
