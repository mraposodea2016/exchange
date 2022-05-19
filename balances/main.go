package main

import (
    "encoding/json"
    "log"
    "net/http"
)

func main() {
    const PORT = ":3000"
    http.HandleFunc("/", balanceHandler)
    log.Fatal(http.ListenAndServe(PORT, nil))
}

func balanceHandler(w http.ResponseWriter, _ *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")

    resp := make(map[string]string)
    resp["balances"] = "Fetched balances"
    jsonResp, createJsonResp := json.Marshal(resp)
    must(createJsonResp)

    _, writeResp := w.Write(jsonResp)
    must(writeResp)

    return
}

func must(err error) {
    if err != nil {
        panic(err)
    }
}
