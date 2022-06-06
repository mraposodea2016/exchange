package main

import (
	"context"
	"encoding/json"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
	"time"
)

func main() {
	//connectToDb()

	const PORT = ":3000"
	http.HandleFunc("/", balanceHandler)
	log.Fatal(http.ListenAndServe(PORT, nil))
}

type BalanceType struct {
	Asset  string `json:"asset"`
	Amount int64  `json:"amount"`
}

func balanceHandler(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	resp := []BalanceType{{
		Asset:  "BTC",
		Amount: 10000000,
	}}
	jsonResp, createJsonResp := json.Marshal(resp)
	must(createJsonResp)

	_, writeResp := w.Write(jsonResp)
	must(writeResp)

	return
}

func connectToDb() {
	const atlasURI = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.g12ys.mongodb.net/?retryWrites=true&w=majority"
	client, getMongoClient := mongo.NewClient(options.Client().ApplyURI(atlasURI))
	must(getMongoClient)

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	connectToContext := client.Connect(ctx)
	must(connectToContext)
	defer client.Disconnect(ctx)

	databases, getDatabaseNames := client.ListDatabaseNames(ctx, bson.M{})
	must(getDatabaseNames)
	fmt.Println(databases)
}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
