package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func main() {
	const PORT = ":3000"
	http.HandleFunc("/", treasuryHandler)
	log.Fatal(http.ListenAndServe(PORT, nil))
}

type treasuryInfo struct {
	Treasury string
}

func treasuryHandler(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	resp := treasuryInfo{
		Treasury: "Treasury Template Response",
	}
	jsonResp, encodeResponse := json.Marshal(resp)
	must(encodeResponse)

	_, writeJsonResponse := w.Write(jsonResp)
	must(writeJsonResponse)

	return
}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
