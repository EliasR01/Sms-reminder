package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"server/pkg/operations"

	_ "github.com/lib/pq"
	"github.com/vonage/vonage-go-sdk"
)

var (
	//Db database
	db    *sql.DB
	err   error
	email string
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "smsreminder"
)

func main() {

	auth := vonage.CreateAuthFromKeySecret("e3b72d17", "0j5p959Mhc51RGp6")
	smsClient := vonage.NewSMSClient(auth)

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err = sql.Open("postgres", psqlInfo)

	defer db.Close()
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	go operations.CheckTodo(smsClient, db)
	http.HandleFunc("/query", queryHandler)
	http.HandleFunc("/add", insertHandler)
	log.Fatal(http.ListenAndServe(":4000", nil))
	fmt.Println("Connection successfully")

}

func queryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Methods", "GET")

	operations.ExecuteQuery(w, r, db)
}

func insertHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "content-type")
	var todoList []operations.Todo
	switch r.Method {
	case "POST":
		err = json.NewDecoder(r.Body).Decode(&todoList)

		if err != nil {
			log.Fatal(err)
		}

		operations.ExecuteInsert(todoList, w, db)

	}
}
