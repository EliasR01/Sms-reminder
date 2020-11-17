package operations

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

//Todo type
type Todo struct {
	Key    string `json:"key"`
	Task   string `json:"task"`
	Date   string `json:"date"`
	Status string `json:"status"`
	Email  string `json:"email"`
	Number string `json:"number"`
}

var email string

//ExecuteUpdate Update rows function
func ExecuteUpdate(status string, key string, db *sql.DB) {
	sqlStatement := `UPDATE todos SET STATUS = $1 WHERE KEY = $2`
	_, err := db.Exec(sqlStatement, status, key)

	if err != nil {
		log.Fatal(err)
	}

}

//ExecuteInsert Create new Todos
func ExecuteInsert(todoList []Todo, w http.ResponseWriter, db *sql.DB) {
	sqlInsert := `INSERT INTO todos VALUES($1,$2,$3,$4,$5,$6)`
	sqlDelete := `DELETE FROM todos WHERE email = $1`
	_, err := db.Exec(sqlDelete, email)

	if err != nil {
		log.Fatal("Error deleting rows")
		w.WriteHeader(http.StatusConflict)
	}

	for r := 0; r < len(todoList); r++ {
		if len(todoList[r].Key) > 0 {
			_, err = db.Exec(sqlInsert, todoList[r].Key, todoList[r].Task, todoList[r].Date, todoList[r].Status, todoList[r].Email, todoList[r].Number)
			if err != nil {
				log.Fatal(err)
				w.WriteHeader(http.StatusConflict)
			}
		}
	}
	w.Write([]byte("Todos added successfully"))
}

//ExecuteQuery Return rows
func ExecuteQuery(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	var res *sql.Rows
	var err error
	var result []Todo
	var queryResult Todo

	counter := 0

	sqlStatement := `SELECT * FROM TODOS WHERE EMAIL = $1`
	switch r.Method {
	case "GET":
		for _, v := range r.URL.Query() {
			email = v[0]
			res, err = db.Query(sqlStatement, v[0])
		}
		if err != nil {
			log.Fatal(err)
		}
		defer res.Close()
		for res.Next() {
			res.Scan(&queryResult.Key, &queryResult.Task, &queryResult.Date, &queryResult.Status, &queryResult.Email, &queryResult.Number)
			result = append(result, queryResult)
			counter++
		}
		todo, err := json.Marshal(result)
		if err != nil {
			log.Fatal(err)
		}
		w.WriteHeader(http.StatusOK)
		w.Write(todo)
	default:
		log.Fatal("Can only perform a GET request")
	}
}
